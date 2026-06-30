export const pytestWorkflowCode = String.raw`from uuid import UUID

import pytest
from httpx import AsyncClient
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.employee import Employee


@pytest.mark.asyncio
async def test_manager_can_create_employee_and_audit_event(
    client: AsyncClient,
    session: AsyncSession,
    manager_headers: dict[str, str],
    active_department,
) -> None:
    response = await client.post(
        "/api/employees",
        headers=manager_headers,
        json={
            "email": "casey.brown@example.com",
            "full_name": "Casey Brown",
            "department_id": str(active_department.id),
            "start_date": "2026-07-01",
        },
    )

    assert response.status_code == 201
    payload = response.json()
    employee_id = UUID(payload["id"])

    employee = await session.scalar(
        select(Employee).where(Employee.id == employee_id)
    )

    assert employee is not None
    assert employee.email == "casey.brown@example.com"
    assert employee.status == "onboarding"

    audit_response = await client.get(
        "/api/audit-events",
        headers=manager_headers,
        params={"entity_id": str(employee_id)},
    )

    assert audit_response.status_code == 200
    assert audit_response.json()["items"][0]["action"] == "employee.created"`;

export const pytestPermissionCaseCode = String.raw`@pytest.mark.asyncio
async def test_viewer_cannot_create_employee(
    client: AsyncClient,
    viewer_headers: dict[str, str],
    active_department,
) -> None:
    response = await client.post(
        "/api/employees",
        headers=viewer_headers,
        json={
            "email": "taylor.smith@example.com",
            "full_name": "Taylor Smith",
            "department_id": str(active_department.id),
            "start_date": "2026-07-01",
        },
    )

    assert response.status_code == 403
    assert response.json()["detail"]["code"] == "permission_denied"`;
