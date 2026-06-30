export const permissionDependencyCode = String.raw`from collections.abc import Callable
from typing import Annotated

from fastapi import Depends, HTTPException, status

from app.api.dependencies.auth import AuthenticatedActor, get_current_actor
from app.services.permissions import PermissionService


class AuthorizedActor(AuthenticatedActor):
    granted_permission: str


def require_permission(permission: str) -> Callable[..., AuthorizedActor]:
    async def dependency(
        actor: Annotated[AuthenticatedActor, Depends(get_current_actor)],
        permissions: Annotated[PermissionService, Depends()],
    ) -> AuthorizedActor:
        allowed = await permissions.actor_has_permission(
            actor_id=actor.user_id,
            tenant_id=actor.tenant_id,
            permission=permission,
        )

        if not allowed:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail={
                    "code": "permission_denied",
                    "required_permission": permission,
                },
            )

        return AuthorizedActor(
            **actor.model_dump(),
            granted_permission=permission,
        )

    return dependency


CanCreateEmployee = Annotated[
    AuthorizedActor,
    Depends(require_permission("employees.create")),
]`;

export const permissionRouteCode = String.raw`from typing import Annotated

from fastapi import APIRouter, Depends, status

from app.api.dependencies.permissions import CanCreateEmployee
from app.schemas.employees import EmployeeCreate, EmployeeRead
from app.services.employees import EmployeeService

router = APIRouter(prefix="/employees")


@router.post(
    "",
    response_model=EmployeeRead,
    status_code=status.HTTP_201_CREATED,
)
async def create_employee(
    payload: EmployeeCreate,
    actor: CanCreateEmployee,
    service: Annotated[EmployeeService, Depends()],
) -> EmployeeRead:
    return await service.create(
        payload=payload,
        actor=actor,
    )`;

export const permissionTestCode = String.raw`import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_create_employee_returns_403_without_permission(
    client: AsyncClient,
    viewer_headers: dict[str, str],
) -> None:
    response = await client.post(
        "/employees",
        headers=viewer_headers,
        json={
            "email": "jordan.lee@example.com",
            "full_name": "Jordan Lee",
            "department_id": "11111111-1111-4111-8111-111111111111",
            "start_date": "2026-07-01",
        },
    )

    assert response.status_code == 403
    assert response.json()["detail"] == {
        "code": "permission_denied",
        "required_permission": "employees.create",
    }`;
