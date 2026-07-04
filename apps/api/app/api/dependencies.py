import re
from collections.abc import (
    Awaitable,
    Callable,
)
from typing import Annotated

from fastapi import (
    Depends,
    Header,
)
from sqlalchemy.ext.asyncio import (
    AsyncSession,
)

from app.core.errors import (
    AppError,
    ErrorCode,
)
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
from app.services.jobs import JobService

IDEMPOTENCY_KEY_PATTERN = re.compile(r"^[A-Za-z0-9._:-]{8,128}$")


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


async def get_idempotency_key(
    idempotency_key: Annotated[
        str | None,
        Header(alias="Idempotency-Key"),
    ] = None,
) -> str:
    if idempotency_key is None:
        raise AppError(
            status_code=422,
            code=ErrorCode.VALIDATION_ERROR,
            message=("The submitted data is invalid."),
            fields={
                "Idempotency-Key": ("This header is required."),
            },
        )

    normalized_key = idempotency_key.strip()

    if not IDEMPOTENCY_KEY_PATTERN.fullmatch(normalized_key):
        raise AppError(
            status_code=422,
            code=ErrorCode.VALIDATION_ERROR,
            message=("The submitted data is invalid."),
            fields={
                "Idempotency-Key": (
                    "Use 8-128 letters, numbers, dots, underscores, colons, or hyphens."
                ),
            },
        )

    return normalized_key


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


def get_job_service(
    session: SessionDep,
) -> JobService:
    return JobService(session)


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

JobServiceDep = Annotated[
    JobService,
    Depends(get_job_service),
]

IdempotencyKeyDep = Annotated[
    str,
    Depends(get_idempotency_key),
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
