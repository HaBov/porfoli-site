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
    DepartmentServiceDep,
)
from app.schemas.department import (
    DepartmentCreate,
    DepartmentListResponse,
    DepartmentRead,
    DepartmentSort,
    DepartmentUpdate,
)
from app.schemas.errors import ErrorResponse

router = APIRouter(
    prefix="/api/demo/v1/departments",
    tags=["Departments"],
)


@router.get(
    "",
    response_model=DepartmentListResponse,
    response_model_by_alias=True,
    operation_id="list_demo_departments",
    summary="List synthetic departments",
    responses={
        401: {
            "model": ErrorResponse,
            "description": ("Missing or invalid demo role."),
        },
    },
)
async def list_departments(
    service: DepartmentServiceDep,
    _role: AnyDemoRole,
    active: Annotated[
        bool | None,
        Query(),
    ] = None,
    search: Annotated[
        str | None,
        Query(
            min_length=1,
            max_length=80,
        ),
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
        DepartmentSort,
        Query(),
    ] = DepartmentSort.NAME,
) -> DepartmentListResponse:
    return await service.list_departments(
        active=active,
        search=search,
        page=page,
        page_size=page_size,
        sort=sort,
    )


@router.get(
    "/{department_id}",
    response_model=DepartmentRead,
    response_model_by_alias=True,
    operation_id="get_demo_department",
    summary="Get a synthetic department",
    responses={
        401: {
            "model": ErrorResponse,
        },
        404: {
            "model": ErrorResponse,
        },
    },
)
async def get_department(
    service: DepartmentServiceDep,
    _role: AnyDemoRole,
    department_id: Annotated[
        UUID,
        Path(),
    ],
) -> DepartmentRead:
    return await service.get_department(department_id)


@router.post(
    "",
    response_model=DepartmentRead,
    response_model_by_alias=True,
    status_code=status.HTTP_201_CREATED,
    operation_id="create_demo_department",
    summary="Create a synthetic department",
    responses={
        401: {
            "model": ErrorResponse,
        },
        403: {
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
async def create_department(
    payload: DepartmentCreate,
    service: DepartmentServiceDep,
    role: AdminDemoRole,
) -> DepartmentRead:
    return await service.create_department(
        payload,
        actor=f"demo-{role.value}",
    )


@router.patch(
    "/{department_id}",
    response_model=DepartmentRead,
    response_model_by_alias=True,
    operation_id="update_demo_department",
    summary="Update a synthetic department",
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
async def update_department(
    payload: DepartmentUpdate,
    service: DepartmentServiceDep,
    role: AdminDemoRole,
    department_id: Annotated[
        UUID,
        Path(),
    ],
) -> DepartmentRead:
    return await service.update_department(
        department_id,
        payload,
        actor=f"demo-{role.value}",
    )
