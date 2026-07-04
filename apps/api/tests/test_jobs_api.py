import json
from collections.abc import Iterator
from datetime import UTC, datetime
from uuid import UUID, uuid4

import pytest
from fastapi.testclient import TestClient

from app.api.dependencies import (
    get_job_service,
)
from app.domain.exceptions import (
    IdempotencyConflict,
    JobNotFound,
)
from app.main import app
from app.models import (
    JobStatus,
)
from app.schemas.job import (
    JobCreate,
    JobCreateMetadata,
    JobCreateResponse,
    JobRead,
)
from app.services.jobs import (
    JobCreationResult,
)


class FakeJobService:
    def __init__(self) -> None:
        self._jobs: dict[
            UUID,
            JobRead,
        ] = {}

        self._idempotency: dict[
            str,
            tuple[str, UUID],
        ] = {}

    async def create_job(
        self,
        payload: JobCreate,
        *,
        idempotency_key: str,
        actor: str,
    ) -> JobCreationResult:
        del actor

        fingerprint = json.dumps(
            payload.model_dump(
                mode="json",
                by_alias=True,
            ),
            sort_keys=True,
        )

        existing = self._idempotency.get(idempotency_key)

        if existing is not None:
            previous_fingerprint, job_id = existing

            if previous_fingerprint != fingerprint:
                raise IdempotencyConflict(idempotency_key)

            job = self._jobs[job_id]

            return JobCreationResult(
                response=self._response(job),
                replayed=True,
            )

        now = datetime.now(UTC)
        job_id = uuid4()

        job = JobRead(
            id=job_id,
            type=payload.type,
            status=JobStatus.QUEUED,
            parameters=payload.parameters,
            progress=0,
            result=None,
            error_code=None,
            created_at=now,
            started_at=None,
            completed_at=None,
        )

        self._jobs[job_id] = job

        self._idempotency[idempotency_key] = (
            fingerprint,
            job_id,
        )

        return JobCreationResult(
            response=self._response(job),
            replayed=False,
        )

    async def get_job(
        self,
        job_id: UUID,
    ) -> JobRead:
        job = self._jobs.get(job_id)

        if job is None:
            raise JobNotFound(job_id)

        completed = job.model_copy(
            update={
                "status": JobStatus.COMPLETED,
                "progress": 100,
                "result": {
                    "employeeCount": 10,
                },
                "started_at": datetime.now(UTC),
                "completed_at": datetime.now(UTC),
            }
        )

        self._jobs[job_id] = completed

        return completed

    @staticmethod
    def _response(
        job: JobRead,
    ) -> JobCreateResponse:
        return JobCreateResponse(
            data=job,
            meta=JobCreateMetadata(
                poll_url=(f"/api/demo/v1/jobs/{job.id}"),
            ),
        )


@pytest.fixture
def job_service() -> FakeJobService:
    return FakeJobService()


@pytest.fixture
def client(
    job_service: FakeJobService,
) -> Iterator[TestClient]:
    app.dependency_overrides[get_job_service] = lambda: job_service

    try:
        with TestClient(app) as test_client:
            yield test_client
    finally:
        app.dependency_overrides.pop(
            get_job_service,
            None,
        )


def create_job_request(
    client: TestClient,
    *,
    key: str,
    job_type: str = "employee-report",
) -> object:
    return client.post(
        "/api/demo/v1/jobs",
        headers={
            "X-Demo-Role": "manager",
            "Idempotency-Key": key,
        },
        json={
            "type": job_type,
            "parameters": {},
        },
    )


def test_manager_can_create_job(
    client: TestClient,
) -> None:
    response = create_job_request(
        client,
        key="demo-job-create-001",
    )

    assert response.status_code == 202

    payload = response.json()

    assert payload["data"]["status"] == ("queued")

    assert payload["data"]["progress"] == 0

    assert response.headers["idempotency-replayed"] == "false"


def test_viewer_cannot_create_job(
    client: TestClient,
) -> None:
    response = client.post(
        "/api/demo/v1/jobs",
        headers={
            "X-Demo-Role": "viewer",
            "Idempotency-Key": "demo-job-viewer-001",
        },
        json={
            "type": "employee-report",
            "parameters": {},
        },
    )

    assert response.status_code == 403


def test_job_requires_idempotency_key(
    client: TestClient,
) -> None:
    response = client.post(
        "/api/demo/v1/jobs",
        headers={
            "X-Demo-Role": "manager",
        },
        json={
            "type": "employee-report",
            "parameters": {},
        },
    )

    assert response.status_code == 422

    assert "Idempotency-Key" in response.json()["error"]["fields"]


def test_same_key_returns_original_job(
    client: TestClient,
) -> None:
    first = create_job_request(
        client,
        key="demo-job-replay-001",
    )

    second = create_job_request(
        client,
        key="demo-job-replay-001",
    )

    assert first.status_code == 202
    assert second.status_code == 202

    assert first.json()["data"]["id"] == second.json()["data"]["id"]

    assert second.headers["idempotency-replayed"] == "true"


def test_same_key_different_payload_conflicts(
    client: TestClient,
) -> None:
    first = create_job_request(
        client,
        key="demo-job-conflict-001",
    )

    second = create_job_request(
        client,
        key="demo-job-conflict-001",
        job_type="audit-export",
    )

    assert first.status_code == 202
    assert second.status_code == 409

    assert second.json()["error"]["code"] == "IDEMPOTENCY_CONFLICT"


def test_manager_can_poll_job(
    client: TestClient,
) -> None:
    created = create_job_request(
        client,
        key="demo-job-poll-001",
    )

    job_id = created.json()["data"]["id"]

    response = client.get(
        (f"/api/demo/v1/jobs/{job_id}"),
        headers={
            "X-Demo-Role": "manager",
        },
    )

    assert response.status_code == 200

    assert response.json()["status"] == ("completed")

    assert response.json()["progress"] == 100


def test_unknown_job_returns_404(
    client: TestClient,
) -> None:
    response = client.get(
        ("/api/demo/v1/jobs/11111111-1111-4111-8111-111111111111"),
        headers={
            "X-Demo-Role": "manager",
        },
    )

    assert response.status_code == 404


def test_job_creation_rate_limit(
    client: TestClient,
) -> None:
    responses = [
        create_job_request(
            client,
            key=f"demo-job-limit-00{index}",
        )
        for index in range(1, 5)
    ]

    assert [response.status_code for response in responses] == [
        202,
        202,
        202,
        429,
    ]

    limited = responses[-1]

    assert limited.json()["error"]["code"] == "RATE_LIMITED"

    assert limited.headers["x-ratelimit-limit"] == "3"

    assert "retry-after" in limited.headers


def test_oversized_json_is_rejected(
    client: TestClient,
) -> None:
    response = client.post(
        "/api/demo/v1/jobs",
        headers={
            "X-Demo-Role": "manager",
            "Idempotency-Key": "demo-job-large-001",
        },
        json={
            "type": "audit-export",
            "parameters": {
                "entityType": ("x" * 70_000),
            },
        },
    )

    assert response.status_code == 413

    assert response.json()["error"]["code"] == "PAYLOAD_TOO_LARGE"
