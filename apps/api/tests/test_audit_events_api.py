from collections.abc import Iterator
from datetime import UTC, datetime
from uuid import UUID

import pytest
from fastapi.testclient import TestClient

from app.api.dependencies import (
    get_audit_event_service,
)
from app.main import app
from app.schemas.audit_event import (
    AuditEventListResponse,
    AuditEventRead,
)
from app.schemas.base import PaginationMetadata


class FakeAuditEventService:
    async def list_audit_events(
        self,
        *,
        entity_type: str | None,
        entity_id: UUID | None,
        action: str | None,
        from_: datetime | None,
        to: datetime | None,
        page: int,
        page_size: int,
    ) -> AuditEventListResponse:
        del entity_type
        del entity_id
        del action
        del from_
        del to

        event = AuditEventRead(
            id=UUID("33333333-3333-4333-8333-333333333333"),
            action="employee.created",
            entity_type="employee",
            entity_id=UUID("11111111-1111-4111-8111-111111111111"),
            actor="demo-manager",
            metadata={
                "synthetic": True,
            },
            created_at=datetime(
                2026,
                7,
                4,
                12,
                0,
                tzinfo=UTC,
            ),
        )

        return AuditEventListResponse(
            items=[event],
            pagination=PaginationMetadata(
                page=page,
                page_size=page_size,
                total_items=1,
                total_pages=1,
            ),
        )


@pytest.fixture
def audit_service() -> FakeAuditEventService:
    return FakeAuditEventService()


@pytest.fixture
def client(
    audit_service: FakeAuditEventService,
) -> Iterator[TestClient]:
    app.dependency_overrides[get_audit_event_service] = lambda: audit_service

    try:
        with TestClient(app) as test_client:
            yield test_client
    finally:
        app.dependency_overrides.pop(
            get_audit_event_service,
            None,
        )


def test_viewer_cannot_read_audit_events(
    client: TestClient,
) -> None:
    response = client.get(
        "/api/demo/v1/audit-events",
        headers={
            "X-Demo-Role": "viewer",
        },
    )

    assert response.status_code == 403


def test_manager_can_read_audit_events(
    client: TestClient,
) -> None:
    response = client.get(
        ("/api/demo/v1/audit-events?pageSize=10"),
        headers={
            "X-Demo-Role": "manager",
        },
    )

    assert response.status_code == 200

    payload = response.json()

    assert payload["items"][0]["action"] == ("employee.created")

    assert payload["items"][0]["metadata"] == {
        "synthetic": True,
    }


def test_audit_events_require_role(
    client: TestClient,
) -> None:
    response = client.get("/api/demo/v1/audit-events")

    assert response.status_code == 401
