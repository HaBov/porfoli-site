import hashlib
import json
from dataclasses import dataclass
from datetime import UTC, datetime, timedelta
from uuid import UUID

from sqlalchemy import func, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import get_settings
from app.domain.exceptions import (
    IdempotencyConflict,
    JobNotFound,
)
from app.models import (
    AuditEvent,
    DemoJob,
    Department,
    Employee,
    EmployeeStatus,
    JobStatus,
    JobType,
)
from app.repositories.audit_events import (
    AuditEventRepository,
)
from app.repositories.jobs import JobRepository
from app.schemas.job import (
    JobCreate,
    JobCreateMetadata,
    JobCreateResponse,
    JobRead,
)


@dataclass(frozen=True, slots=True)
class JobCreationResult:
    response: JobCreateResponse
    replayed: bool


class JobService:
    def __init__(
        self,
        session: AsyncSession,
        job_repository: JobRepository | None = None,
        audit_repository: AuditEventRepository | None = None,
    ) -> None:
        self._session = session

        self._jobs = job_repository or JobRepository(session)

        self._audit_events = audit_repository or AuditEventRepository(session)

        self._settings = get_settings()

    async def create_job(
        self,
        payload: JobCreate,
        *,
        idempotency_key: str,
        actor: str,
    ) -> JobCreationResult:
        now = datetime.now(UTC)

        request_hash = self._create_request_hash(payload)

        existing = await self._jobs.get_by_idempotency_key(idempotency_key)

        if existing is not None and existing.idempotency_expires_at > now:
            if existing.request_hash != request_hash:
                raise IdempotencyConflict(idempotency_key)

            return JobCreationResult(
                response=self._create_response(existing),
                replayed=True,
            )

        if existing is not None:
            await self._jobs.delete(existing)
            await self._session.flush()

        job = DemoJob(
            type=payload.type,
            status=JobStatus.QUEUED,
            parameters=dict(payload.parameters),
            progress=0,
            result=None,
            error_code=None,
            idempotency_key=idempotency_key,
            request_hash=request_hash,
            idempotency_expires_at=(
                now + timedelta(hours=(self._settings.demo_idempotency_ttl_hours))
            ),
            started_at=None,
            completed_at=None,
        )

        try:
            self._jobs.add(job)

            await self._session.flush()

            self._audit_events.add(
                AuditEvent(
                    action="job.created",
                    entity_type="job",
                    entity_id=job.id,
                    actor=actor,
                    details={
                        "synthetic": True,
                        "type": job.type.value,
                    },
                )
            )

            await self._session.commit()
        except IntegrityError as error:
            await self._session.rollback()

            concurrent_job = await self._jobs.get_by_idempotency_key(idempotency_key)

            if concurrent_job is None:
                raise

            if concurrent_job.request_hash != request_hash:
                raise IdempotencyConflict(idempotency_key) from error

            return JobCreationResult(
                response=self._create_response(concurrent_job),
                replayed=True,
            )
        except Exception:
            await self._session.rollback()
            raise

        await self._session.refresh(job)

        return JobCreationResult(
            response=self._create_response(job),
            replayed=False,
        )

    async def get_job(
        self,
        job_id: UUID,
    ) -> JobRead:
        job = await self._jobs.get_by_id(job_id)

        if job is None:
            raise JobNotFound(job_id)

        await self._advance_job(job)

        return JobRead.model_validate(job)

    async def _advance_job(
        self,
        job: DemoJob,
    ) -> None:
        if job.status in {
            JobStatus.COMPLETED,
            JobStatus.FAILED,
        }:
            return

        now = datetime.now(UTC)

        elapsed = (now - job.created_at).total_seconds()

        queue_seconds = self._settings.demo_job_queue_seconds

        completion_seconds = self._settings.demo_job_completion_seconds

        changed = False

        if elapsed >= completion_seconds:
            job.status = JobStatus.COMPLETED
            job.progress = 100

            if job.started_at is None:
                job.started_at = job.created_at + timedelta(seconds=queue_seconds)

            job.completed_at = now
            job.result = await self._build_result(job)

            changed = True

        elif elapsed >= queue_seconds:
            job.status = JobStatus.RUNNING

            if job.started_at is None:
                job.started_at = now

            running_duration = max(
                completion_seconds - queue_seconds,
                0.1,
            )

            progress_fraction = min(
                (elapsed - queue_seconds) / running_duration,
                0.99,
            )

            calculated_progress = 10 + int(progress_fraction * 80)

            job.progress = max(
                job.progress,
                calculated_progress,
            )

            changed = True

        if changed:
            try:
                await self._session.commit()
            except Exception:
                await self._session.rollback()
                raise

            await self._session.refresh(job)

    async def _build_result(
        self,
        job: DemoJob,
    ) -> dict[str, object]:
        if job.type == JobType.EMPLOYEE_REPORT:
            department_value = job.parameters.get("departmentId")

            department_id = UUID(str(department_value)) if department_value else None

            base_conditions = []

            if department_id is not None:
                base_conditions.append(Employee.department_id == department_id)

            total_statement = select(func.count(Employee.id)).where(*base_conditions)

            total_result = await self._session.execute(total_statement)

            employee_count = int(total_result.scalar_one())

            status_counts: dict[str, int] = {}

            for status in EmployeeStatus:
                status_statement = select(func.count(Employee.id)).where(
                    *base_conditions,
                    Employee.status == status,
                )

                status_result = await self._session.execute(status_statement)

                status_counts[status.value] = int(status_result.scalar_one())

            return {
                "employeeCount": employee_count,
                "departmentId": (str(department_id) if department_id else None),
                "statusCounts": status_counts,
            }

        if job.type == JobType.DEPARTMENT_SUMMARY:
            active_only = bool(
                job.parameters.get(
                    "activeOnly",
                    False,
                )
            )

            total_statement = select(func.count(Department.id))

            if active_only:
                total_statement = total_statement.where(Department.active.is_(True))

            total_result = await self._session.execute(total_statement)

            active_result = await self._session.execute(
                select(func.count(Department.id)).where(Department.active.is_(True))
            )

            return {
                "departmentCount": int(total_result.scalar_one()),
                "activeDepartmentCount": int(active_result.scalar_one()),
                "activeOnly": active_only,
            }

        entity_type_value = job.parameters.get("entityType")

        audit_statement = select(func.count(AuditEvent.id))

        if entity_type_value is not None:
            audit_statement = audit_statement.where(
                AuditEvent.entity_type == str(entity_type_value)
            )

        audit_result = await self._session.execute(audit_statement)

        return {
            "format": "json",
            "eventCount": int(audit_result.scalar_one()),
            "entityType": (str(entity_type_value) if entity_type_value else None),
            "downloadAvailable": False,
        }

    @staticmethod
    def _create_request_hash(
        payload: JobCreate,
    ) -> str:
        canonical_payload = json.dumps(
            payload.model_dump(
                mode="json",
                by_alias=True,
            ),
            sort_keys=True,
            separators=(",", ":"),
        )

        return hashlib.sha256(canonical_payload.encode("utf-8")).hexdigest()

    @staticmethod
    def _create_response(
        job: DemoJob,
    ) -> JobCreateResponse:
        return JobCreateResponse(
            data=JobRead.model_validate(job),
            meta=JobCreateMetadata(
                poll_url=(f"/api/demo/v1/jobs/{job.id}"),
            ),
        )
