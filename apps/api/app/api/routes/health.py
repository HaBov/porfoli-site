from fastapi import APIRouter
from fastapi.responses import JSONResponse

from app.core.config import get_settings
from app.db.health import check_database
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
async def check_readiness() -> HealthResponse | JSONResponse:
    settings = get_settings()

    database_ready = await check_database()

    if not database_ready:
        payload = HealthResponse(
            status="unavailable",
            service=settings.app_name,
            version=settings.app_version,
            checks={
                "application": "ok",
                "database": "unavailable",
            },
        )

        return JSONResponse(
            status_code=503,
            content=payload.model_dump(
                mode="json",
                by_alias=True,
            ),
        )

    return HealthResponse(
        status="ready",
        service=settings.app_name,
        version=settings.app_version,
        checks={
            "application": "ok",
            "database": "ok",
        },
    )
