from typing import Annotated
from uuid import UUID

from fastapi import (
    APIRouter,
    Path,
    Response,
    status,
)

from app.api.dependencies import (
    IdempotencyKeyDep,
    JobServiceDep,
    ManagerOrAdminDemoRole,
)
from app.schemas.errors import ErrorResponse
from app.schemas.job import (
    JobCreate,
    JobCreateResponse,
    JobRead,
)

router = APIRouter(
    prefix="/api/demo/v1/jobs",
    tags=["Background Jobs"],
)


@router.post(
    "",
    response_model=JobCreateResponse,
    response_model_by_alias=True,
    status_code=status.HTTP_202_ACCEPTED,
    operation_id="create_demo_job",
    summary="Start a simulated background job",
    description=("Creates a database-backed simulated background job. Requires Idempotency-Key."),
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
        413: {
            "model": ErrorResponse,
        },
        422: {
            "model": ErrorResponse,
        },
        429: {
            "model": ErrorResponse,
        },
    },
)
async def create_job(
    payload: JobCreate,
    service: JobServiceDep,
    role: ManagerOrAdminDemoRole,
    idempotency_key: IdempotencyKeyDep,
    response: Response,
) -> JobCreateResponse:
    result = await service.create_job(
        payload,
        idempotency_key=idempotency_key,
        actor=f"demo-{role.value}",
    )

    response.headers["Idempotency-Replayed"] = "true" if result.replayed else "false"

    return result.response


@router.get(
    "/{job_id}",
    response_model=JobRead,
    response_model_by_alias=True,
    operation_id="get_demo_job",
    summary="Poll a simulated background job",
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
        429: {
            "model": ErrorResponse,
        },
    },
)
async def get_job(
    service: JobServiceDep,
    _role: ManagerOrAdminDemoRole,
    job_id: Annotated[
        UUID,
        Path(),
    ],
) -> JobRead:
    return await service.get_job(job_id)
