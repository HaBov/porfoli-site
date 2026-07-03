from collections.abc import Iterator
from datetime import UTC, datetime
from uuid import UUID, uuid4

import pytest
from fastapi.testclient import TestClient

from app.api.dependencies import (
    get_department_service,
)
from app.domain.exceptions import (
    DepartmentNotFound,
)
from app.main import app
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


class FakeDepartmentService:
    def __init__(self) -> None:
        timestamp = datetime(
            2026,
            7,
            3,
            12,
            0,
            tzinfo=UTC,
        )

        self.department = DepartmentRead(
            id=UUID("11111111-1111-4111-8111-111111111111"),
            name="Demo Engineering",
            code="ENG",
            description=("Synthetic engineering department."),
            active=True,
            created_at=timestamp,
            updated_at=timestamp,
        )

    async def list_departments(
        self,
        *,
        active: bool | None,
        search: str | None,
        page: int,
        page_size: int,
        sort: DepartmentSort,
    ) -> DepartmentListResponse:
        del active
        del search
        del sort

        return DepartmentListResponse(
            items=[self.department],
            pagination=PaginationMetadata(
                page=page,
                page_size=page_size,
                total_items=1,
                total_pages=1,
            ),
        )

    async def get_department(
        self,
        department_id: UUID,
    ) -> DepartmentRead:
        if department_id != self.department.id:
            raise DepartmentNotFound(department_id)

        return self.department

    async def create_department(
        self,
        payload: DepartmentCreate,
        *,
        actor: str,
    ) -> DepartmentRead:
        del actor

        timestamp = datetime.now(UTC)

        self.department = DepartmentRead(
            id=uuid4(),
            name=payload.name,
            code=payload.code,
            description=payload.description,
            active=True,
            created_at=timestamp,
            updated_at=timestamp,
        )

        return self.department

    async def update_department(
        self,
        department_id: UUID,
        payload: DepartmentUpdate,
        *,
        actor: str,
    ) -> DepartmentRead:
        del actor

        if department_id != self.department.id:
            raise DepartmentNotFound(department_id)

        updates = {
            field: getattr(
                payload,
                field,
            )
            for field in payload.model_fields_set
        }

        updates["updated_at"] = datetime.now(UTC)

        self.department = self.department.model_copy(update=updates)

        return self.department


@pytest.fixture
def department_service() -> FakeDepartmentService:
    return FakeDepartmentService()


@pytest.fixture
def client(
    department_service: FakeDepartmentService,
) -> Iterator[TestClient]:
    app.dependency_overrides[get_department_service] = lambda: department_service

    try:
        with TestClient(app) as test_client:
            yield test_client
    finally:
        app.dependency_overrides.pop(
            get_department_service,
            None,
        )


def test_permissions_endpoint(
    client: TestClient,
) -> None:
    response = client.get("/api/demo/v1/permissions")

    assert response.status_code == 200
    assert response.json()["header"] == ("X-Demo-Role")

    assert response.json()["roles"] == [
        "viewer",
        "manager",
        "admin",
    ]


def test_departments_require_demo_role(
    client: TestClient,
) -> None:
    response = client.get("/api/demo/v1/departments")

    assert response.status_code == 401
    assert response.json()["error"]["code"] == "UNAUTHORIZED"


def test_viewer_can_list_departments(
    client: TestClient,
) -> None:
    response = client.get(
        "/api/demo/v1/departments?pageSize=10",
        headers={
            "X-Demo-Role": "viewer",
        },
    )

    assert response.status_code == 200

    payload = response.json()

    assert payload["items"][0]["code"] == "ENG"

    assert payload["pagination"] == {
        "page": 1,
        "pageSize": 10,
        "totalItems": 1,
        "totalPages": 1,
    }


def test_viewer_cannot_create_department(
    client: TestClient,
) -> None:
    response = client.post(
        "/api/demo/v1/departments",
        headers={
            "X-Demo-Role": "viewer",
        },
        json={
            "name": "Demo Quality",
            "code": "QA",
            "description": ("Synthetic quality team."),
        },
    )

    assert response.status_code == 403
    assert response.json()["error"]["code"] == "FORBIDDEN"


def test_admin_can_create_department(
    client: TestClient,
) -> None:
    response = client.post(
        "/api/demo/v1/departments",
        headers={
            "X-Demo-Role": "admin",
        },
        json={
            "name": "Demo Quality",
            "code": "QA",
            "description": ("Synthetic quality team."),
        },
    )

    assert response.status_code == 201

    payload = response.json()

    assert payload["name"] == ("Demo Quality")

    assert payload["code"] == "QA"
    assert payload["active"] is True


def test_invalid_demo_role_is_rejected(
    client: TestClient,
) -> None:
    response = client.get(
        "/api/demo/v1/departments",
        headers={
            "X-Demo-Role": "owner",
        },
    )

    assert response.status_code == 401


def test_missing_department_returns_404(
    client: TestClient,
) -> None:
    response = client.get(
        ("/api/demo/v1/departments/22222222-2222-4222-8222-222222222222"),
        headers={
            "X-Demo-Role": "viewer",
        },
    )

    assert response.status_code == 404

    assert response.json()["error"]["code"] == "NOT_FOUND"


def test_admin_can_update_department(
    client: TestClient,
    department_service: FakeDepartmentService,
) -> None:
    response = client.patch(
        (f"/api/demo/v1/departments/{department_service.department.id}"),
        headers={
            "X-Demo-Role": "admin",
        },
        json={
            "description": ("Updated synthetic department."),
            "active": False,
        },
    )

    assert response.status_code == 200

    payload = response.json()

    assert payload["active"] is False
    assert payload["description"] == ("Updated synthetic department.")


def test_department_code_must_be_uppercase(
    client: TestClient,
) -> None:
    response = client.post(
        "/api/demo/v1/departments",
        headers={
            "X-Demo-Role": "admin",
        },
        json={
            "name": "Demo Quality",
            "code": "qa",
        },
    )

    assert response.status_code == 422

    assert "code" in (response.json()["error"]["fields"])
