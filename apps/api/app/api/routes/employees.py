from typing import Annotated
from uuid import UUID

from fastapi import (
    APIRouter,
    Path,
    Query,
    status,
)

from app.api.dependencies import (
    AdminDemoRole,
    AnyDemoRole,
    EmployeeServiceDep,
    ManagerOrAdminDemoRole,
)
from app.models import EmployeeStatus
from app.schemas.employee import (
    EmployeeCreate,
    EmployeeDeactivate,
    EmployeeListResponse,
    EmployeeRead,
    EmployeeSort,
    EmployeeUpdate,
)
from app.schemas.errors import ErrorResponse

router = APIRouter(
    prefix="/api/demo/v1/employees",
    tags=["Employees"],
)


@router.get(
    "",
    response_model=EmployeeListResponse,
    response_model_by_alias=True,
    operation_id="list_demo_employees",
    summary="List synthetic employees",
    responses={
        401: {
            "model": ErrorResponse,
        },
    },
)
async def list_employees(
    service: EmployeeServiceDep,
    _role: AnyDemoRole,
    search: Annotated[
        str | None,
        Query(
            min_length=1,
            max_length=100,
        ),
    ] = None,
    employee_status: Annotated[
        EmployeeStatus | None,
        Query(alias="status"),
    ] = None,
    department_id: Annotated[
        UUID | None,
        Query(alias="departmentId"),
    ] = None,
    page: Annotated[
        int,
        Query(ge=1),
    ] = 1,
    page_size: Annotated[
        int,
        Query(
            alias="pageSize",
            ge=1,
            le=100,
        ),
    ] = 20,
    sort: Annotated[
        EmployeeSort,
        Query(),
    ] = EmployeeSort.CREATED_AT_DESC,
) -> EmployeeListResponse:
    return await service.list_employees(
        search=search,
        status=employee_status,
        department_id=department_id,
        page=page,
        page_size=page_size,
        sort=sort,
    )


@router.get(
    "/{employee_id}",
    response_model=EmployeeRead,
    response_model_by_alias=True,
    operation_id="get_demo_employee",
    summary="Get a synthetic employee",
    responses={
        401: {
            "model": ErrorResponse,
        },
        404: {
            "model": ErrorResponse,
        },
    },
)
async def get_employee(
    service: EmployeeServiceDep,
    _role: AnyDemoRole,
    employee_id: Annotated[
        UUID,
        Path(),
    ],
) -> EmployeeRead:
    return await service.get_employee(employee_id)


@router.post(
    "",
    response_model=EmployeeRead,
    response_model_by_alias=True,
    status_code=status.HTTP_201_CREATED,
    operation_id="create_demo_employee",
    summary="Create a synthetic employee",
    responses={
        401: {
            "model": ErrorResponse,
        },
        403: {
            "model": ErrorResponse,
        },
        404: {
            "model": ErrorResponse,
        },
        409: {
            "model": ErrorResponse,
        },
        422: {
            "model": ErrorResponse,
        },
    },
)
async def create_employee(
    payload: EmployeeCreate,
    service: EmployeeServiceDep,
    role: ManagerOrAdminDemoRole,
) -> EmployeeRead:
    return await service.create_employee(
        payload,
        actor=f"demo-{role.value}",
    )


@router.patch(
    "/{employee_id}",
    response_model=EmployeeRead,
    response_model_by_alias=True,
    operation_id="update_demo_employee",
    summary="Update a synthetic employee",
    responses={
        401: {
            "model": ErrorResponse,
        },
        403: {
            "model": ErrorResponse,
        },
        404: {
            "model": ErrorResponse,
        },
        409: {
            "model": ErrorResponse,
        },
        422: {
            "model": ErrorResponse,
        },
    },
)
async def update_employee(
    payload: EmployeeUpdate,
    service: EmployeeServiceDep,
    role: ManagerOrAdminDemoRole,
    employee_id: Annotated[
        UUID,
        Path(),
    ],
) -> EmployeeRead:
    return await service.update_employee(
        employee_id,
        payload,
        actor=f"demo-{role.value}",
    )


@router.post(
    "/{employee_id}/deactivate",
    response_model=EmployeeRead,
    response_model_by_alias=True,
    operation_id="deactivate_demo_employee",
    summary="Deactivate a synthetic employee",
    responses={
        401: {
            "model": ErrorResponse,
        },
        403: {
            "model": ErrorResponse,
        },
        404: {
            "model": ErrorResponse,
        },
        422: {
            "model": ErrorResponse,
        },
    },
)
async def deactivate_employee(
    payload: EmployeeDeactivate,
    service: EmployeeServiceDep,
    role: AdminDemoRole,
    employee_id: Annotated[
        UUID,
        Path(),
    ],
) -> EmployeeRead:
    return await service.deactivate_employee(
        employee_id,
        payload,
        actor=f"demo-{role.value}",
    )
