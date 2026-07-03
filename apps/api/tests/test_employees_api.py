from collections.abc import Iterator
from datetime import UTC, date, datetime
from uuid import UUID, uuid4

import pytest
from fastapi.testclient import TestClient

from app.api.dependencies import (
    get_employee_service,
)
from app.domain.exceptions import (
    EmployeeNotFound,
)
from app.main import app
from app.models import EmployeeStatus
from app.schemas.base import PaginationMetadata
from app.schemas.employee import (
    EmployeeCreate,
    EmployeeDeactivate,
    EmployeeListResponse,
    EmployeeRead,
    EmployeeSort,
    EmployeeUpdate,
)


class FakeEmployeeService:
    def __init__(self) -> None:
        timestamp = datetime(
            2026,
            7,
            4,
            12,
            0,
            tzinfo=UTC,
        )

        self.employee = EmployeeRead(
            id=UUID("11111111-1111-4111-8111-111111111111"),
            first_name="Alex",
            last_name="Morgan",
            email="alex.morgan@example.com",
            department_id=UUID("22222222-2222-4222-8222-222222222222"),
            job_title="Backend Developer",
            status=EmployeeStatus.ACTIVE,
            start_date=date(2026, 1, 12),
            manager_id=None,
            created_at=timestamp,
            updated_at=timestamp,
        )

    async def list_employees(
        self,
        *,
        search: str | None,
        status: EmployeeStatus | None,
        department_id: UUID | None,
        page: int,
        page_size: int,
        sort: EmployeeSort,
    ) -> EmployeeListResponse:
        del search
        del status
        del department_id
        del sort

        return EmployeeListResponse(
            items=[self.employee],
            pagination=PaginationMetadata(
                page=page,
                page_size=page_size,
                total_items=1,
                total_pages=1,
            ),
        )

    async def get_employee(
        self,
        employee_id: UUID,
    ) -> EmployeeRead:
        if employee_id != self.employee.id:
            raise EmployeeNotFound(employee_id)

        return self.employee

    async def create_employee(
        self,
        payload: EmployeeCreate,
        *,
        actor: str,
    ) -> EmployeeRead:
        del actor

        timestamp = datetime.now(UTC)

        self.employee = EmployeeRead(
            id=uuid4(),
            first_name=payload.first_name,
            last_name=payload.last_name,
            email=payload.email,
            department_id=(payload.department_id),
            job_title=payload.job_title,
            status=payload.status,
            start_date=payload.start_date,
            manager_id=payload.manager_id,
            created_at=timestamp,
            updated_at=timestamp,
        )

        return self.employee

    async def update_employee(
        self,
        employee_id: UUID,
        payload: EmployeeUpdate,
        *,
        actor: str,
    ) -> EmployeeRead:
        del actor

        if employee_id != self.employee.id:
            raise EmployeeNotFound(employee_id)

        updates = {field: getattr(payload, field) for field in payload.model_fields_set}

        updates["updated_at"] = datetime.now(UTC)

        self.employee = self.employee.model_copy(update=updates)

        return self.employee

    async def deactivate_employee(
        self,
        employee_id: UUID,
        payload: EmployeeDeactivate,
        *,
        actor: str,
    ) -> EmployeeRead:
        del payload
        del actor

        if employee_id != self.employee.id:
            raise EmployeeNotFound(employee_id)

        self.employee = self.employee.model_copy(
            update={
                "status": EmployeeStatus.INACTIVE,
                "updated_at": datetime.now(UTC),
            }
        )

        return self.employee


@pytest.fixture
def employee_service() -> FakeEmployeeService:
    return FakeEmployeeService()


@pytest.fixture
def client(
    employee_service: FakeEmployeeService,
) -> Iterator[TestClient]:
    app.dependency_overrides[get_employee_service] = lambda: employee_service

    try:
        with TestClient(app) as test_client:
            yield test_client
    finally:
        app.dependency_overrides.pop(
            get_employee_service,
            None,
        )


def test_viewer_can_list_employees(
    client: TestClient,
) -> None:
    response = client.get(
        ("/api/demo/v1/employees?pageSize=10"),
        headers={
            "X-Demo-Role": "viewer",
        },
    )

    assert response.status_code == 200

    assert response.json()["items"][0]["email"] == "alex.morgan@example.com"


def test_employees_require_role(
    client: TestClient,
) -> None:
    response = client.get("/api/demo/v1/employees")

    assert response.status_code == 401


def test_viewer_cannot_create_employee(
    client: TestClient,
) -> None:
    response = client.post(
        "/api/demo/v1/employees",
        headers={
            "X-Demo-Role": "viewer",
        },
        json={
            "firstName": "Jordan",
            "lastName": "Lee",
            "email": ("jordan.lee@example.org"),
            "departmentId": ("22222222-2222-4222-8222-222222222222"),
            "jobTitle": ("Operations Coordinator"),
            "startDate": "2026-07-15",
        },
    )

    assert response.status_code == 403


def test_manager_can_create_employee(
    client: TestClient,
) -> None:
    response = client.post(
        "/api/demo/v1/employees",
        headers={
            "X-Demo-Role": "manager",
        },
        json={
            "firstName": "Jordan",
            "lastName": "Lee",
            "email": ("jordan.lee@example.org"),
            "departmentId": ("22222222-2222-4222-8222-222222222222"),
            "jobTitle": ("Operations Coordinator"),
            "status": "onboarding",
            "startDate": "2026-07-15",
            "managerId": None,
        },
    )

    assert response.status_code == 201
    assert response.json()["firstName"] == ("Jordan")


def test_manager_can_update_employee(
    client: TestClient,
    employee_service: FakeEmployeeService,
) -> None:
    response = client.patch(
        (f"/api/demo/v1/employees/{employee_service.employee.id}"),
        headers={
            "X-Demo-Role": "manager",
        },
        json={
            "jobTitle": ("Senior Backend Developer"),
        },
    )

    assert response.status_code == 200

    assert response.json()["jobTitle"] == ("Senior Backend Developer")


def test_manager_cannot_deactivate_employee(
    client: TestClient,
    employee_service: FakeEmployeeService,
) -> None:
    response = client.post(
        (f"/api/demo/v1/employees/{employee_service.employee.id}/deactivate"),
        headers={
            "X-Demo-Role": "manager",
        },
        json={
            "reason": ("Synthetic offboarding demonstration"),
        },
    )

    assert response.status_code == 403


def test_admin_can_deactivate_employee(
    client: TestClient,
    employee_service: FakeEmployeeService,
) -> None:
    response = client.post(
        (f"/api/demo/v1/employees/{employee_service.employee.id}/deactivate"),
        headers={
            "X-Demo-Role": "admin",
        },
        json={
            "reason": ("Synthetic offboarding demonstration"),
        },
    )

    assert response.status_code == 200
    assert response.json()["status"] == ("inactive")


def test_invalid_employee_email_domain(
    client: TestClient,
) -> None:
    response = client.post(
        "/api/demo/v1/employees",
        headers={
            "X-Demo-Role": "manager",
        },
        json={
            "firstName": "Jordan",
            "lastName": "Lee",
            "email": "jordan@company.com",
            "departmentId": ("22222222-2222-4222-8222-222222222222"),
            "jobTitle": "Developer",
            "startDate": "2026-07-15",
        },
    )

    assert response.status_code == 422
