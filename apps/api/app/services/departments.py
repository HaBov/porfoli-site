from math import ceil
from uuid import UUID

from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.domain.exceptions import (
    DepartmentNotFound,
    DuplicateDepartmentCode,
)
from app.models import AuditEvent, Department
from app.repositories.audit_events import (
    AuditEventRepository,
)
from app.repositories.departments import (
    DepartmentFilters,
    DepartmentRepository,
)
from app.schemas.base import (
    PaginationMetadata,
)
from app.schemas.department import (
    DepartmentCreate,
    DepartmentListResponse,
    DepartmentRead,
    DepartmentSort,
    DepartmentUpdate,
)


class DepartmentService:
    def __init__(
        self,
        session: AsyncSession,
        department_repository: DepartmentRepository | None = None,
        audit_repository: AuditEventRepository | None = None,
    ) -> None:
        self._session = session

        self._departments = department_repository or DepartmentRepository(session)

        self._audit_events = audit_repository or AuditEventRepository(session)

    async def list_departments(
        self,
        *,
        active: bool | None,
        search: str | None,
        page: int,
        page_size: int,
        sort: DepartmentSort,
    ) -> DepartmentListResponse:
        normalized_search = search.strip() if search else None

        result = await self._departments.list(
            filters=DepartmentFilters(
                active=active,
                search=normalized_search,
            ),
            page=page,
            page_size=page_size,
            sort=sort,
        )

        total_pages = ceil(result.total_items / page_size) if result.total_items else 0

        return DepartmentListResponse(
            items=[DepartmentRead.model_validate(department) for department in result.items],
            pagination=PaginationMetadata(
                page=page,
                page_size=page_size,
                total_items=(result.total_items),
                total_pages=total_pages,
            ),
        )

    async def get_department(
        self,
        department_id: UUID,
    ) -> DepartmentRead:
        department = await self._departments.get_by_id(department_id)

        if department is None:
            raise DepartmentNotFound(department_id)

        return DepartmentRead.model_validate(department)

    async def create_department(
        self,
        payload: DepartmentCreate,
        *,
        actor: str,
    ) -> DepartmentRead:
        existing = await self._departments.get_by_code(payload.code)

        if existing is not None:
            raise DuplicateDepartmentCode(payload.code)

        department = Department(
            name=payload.name,
            code=payload.code,
            description=payload.description,
            active=True,
        )

        try:
            self._departments.add(department)

            await self._session.flush()

            self._audit_events.add(
                AuditEvent(
                    action=("department.created"),
                    entity_type="department",
                    entity_id=department.id,
                    actor=actor,
                    details={
                        "synthetic": True,
                        "code": department.code,
                    },
                )
            )

            await self._session.commit()
        except IntegrityError as error:
            await self._session.rollback()

            if "uq_departments_code" in str(error.orig):
                raise (DuplicateDepartmentCode(payload.code)) from error

            raise
        except Exception:
            await self._session.rollback()
            raise

        await self._session.refresh(department)

        return DepartmentRead.model_validate(department)

    async def update_department(
        self,
        department_id: UUID,
        payload: DepartmentUpdate,
        *,
        actor: str,
    ) -> DepartmentRead:
        department = await self._departments.get_by_id(department_id)

        if department is None:
            raise DepartmentNotFound(department_id)

        changed_fields: list[str] = []
        supplied_fields = payload.model_fields_set

        if (
            "code" in supplied_fields
            and payload.code is not None
            and payload.code != department.code
        ):
            existing = await self._departments.get_by_code(payload.code)

            if existing is not None and existing.id != department.id:
                raise (DuplicateDepartmentCode(payload.code))

            department.code = payload.code
            changed_fields.append("code")

        if (
            "name" in supplied_fields
            and payload.name is not None
            and payload.name != department.name
        ):
            department.name = payload.name
            changed_fields.append("name")

        if "description" in supplied_fields and payload.description != department.description:
            department.description = payload.description

            changed_fields.append("description")

        if (
            "active" in supplied_fields
            and payload.active is not None
            and payload.active != department.active
        ):
            department.active = payload.active

            changed_fields.append("active")

        if not changed_fields:
            return DepartmentRead.model_validate(department)

        try:
            self._audit_events.add(
                AuditEvent(
                    action=("department.updated"),
                    entity_type="department",
                    entity_id=department.id,
                    actor=actor,
                    details={
                        "synthetic": True,
                        "changedFields": changed_fields,
                    },
                )
            )

            await self._session.commit()
        except IntegrityError as error:
            await self._session.rollback()

            if "uq_departments_code" in str(error.orig):
                raise (DuplicateDepartmentCode(payload.code or department.code)) from error

            raise
        except Exception:
            await self._session.rollback()
            raise

        await self._session.refresh(department)

        return DepartmentRead.model_validate(department)
