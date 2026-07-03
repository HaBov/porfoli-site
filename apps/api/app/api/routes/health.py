from fastapi import APIRouter

from app.core.config import get_settings
from app.schemas.system import HealthResponse

router = APIRouter(
    prefix="/api/health",
    tags=["Health"],
)


@router.get(
    "/live",
    response_model=HealthResponse,
    response_model_by_alias=True,
    summary="Check application liveness",
)
def check_liveness() -> HealthResponse:
    settings = get_settings()

    return HealthResponse(
        status="ok",
        service=settings.app_name,
        version=settings.app_version,
        checks={
            "application": "ok",
        },
    )


@router.get(
    "/ready",
    response_model=HealthResponse,
    response_model_by_alias=True,
    summary="Check application readiness",
)
def check_readiness() -> HealthResponse:
    settings = get_settings()

    return HealthResponse(
        status="ready",
        service=settings.app_name,
        version=settings.app_version,
        checks={
            "application": "ok",
        },
    )
