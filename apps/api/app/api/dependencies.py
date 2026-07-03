from collections.abc import Awaitable, Callable
from typing import Annotated

from fastapi import Depends, Header
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.errors import AppError, ErrorCode
from app.db.session import get_session
from app.domain.roles import DemoRole
from app.services.audit_events import (
    AuditEventService,
)
from app.services.departments import (
    DepartmentService,
)
from app.services.employees import (
    EmployeeService,
)


async def get_demo_role(
    x_demo_role: Annotated[
        str | None,
        Header(alias="X-Demo-Role"),
    ] = None,
) -> DemoRole:
    if x_demo_role is None:
        raise AppError(
            status_code=401,
            code=ErrorCode.UNAUTHORIZED,
            message=("A valid X-Demo-Role header is required."),
            fields={
                "X-Demo-Role": ("Use viewer, manager, or admin."),
            },
        )

    normalized_role = x_demo_role.strip().lower()

    try:
        return DemoRole(normalized_role)
    except ValueError as error:
        raise AppError(
            status_code=401,
            code=ErrorCode.UNAUTHORIZED,
            message=("A valid X-Demo-Role header is required."),
            fields={
                "X-Demo-Role": ("Use viewer, manager, or admin."),
            },
        ) from error


RoleDependency = Callable[
    [DemoRole],
    Awaitable[DemoRole],
]


def require_demo_roles(
    *allowed_roles: DemoRole,
) -> RoleDependency:
    async def dependency(
        role: Annotated[
            DemoRole,
            Depends(get_demo_role),
        ],
    ) -> DemoRole:
        if role not in allowed_roles:
            raise AppError(
                status_code=403,
                code=ErrorCode.FORBIDDEN,
                message=("The selected demo role cannot perform this action."),
            )

        return role

    return dependency


SessionDep = Annotated[
    AsyncSession,
    Depends(get_session),
]


def get_department_service(
    session: SessionDep,
) -> DepartmentService:
    return DepartmentService(session)


def get_employee_service(
    session: SessionDep,
) -> EmployeeService:
    return EmployeeService(session)


def get_audit_event_service(
    session: SessionDep,
) -> AuditEventService:
    return AuditEventService(session)


DepartmentServiceDep = Annotated[
    DepartmentService,
    Depends(get_department_service),
]

EmployeeServiceDep = Annotated[
    EmployeeService,
    Depends(get_employee_service),
]

AuditEventServiceDep = Annotated[
    AuditEventService,
    Depends(get_audit_event_service),
]


AnyDemoRole = Annotated[
    DemoRole,
    Depends(
        require_demo_roles(
            DemoRole.VIEWER,
            DemoRole.MANAGER,
            DemoRole.ADMIN,
        )
    ),
]


ManagerOrAdminDemoRole = Annotated[
    DemoRole,
    Depends(
        require_demo_roles(
            DemoRole.MANAGER,
            DemoRole.ADMIN,
        )
    ),
]


AdminDemoRole = Annotated[
    DemoRole,
    Depends(
        require_demo_roles(
            DemoRole.ADMIN,
        )
    ),
]
