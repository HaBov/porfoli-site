from typing import Literal

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/api/health", tags=["Health"])


class HealthResponse(BaseModel):
    status: Literal["ok"]


@router.get(
    "/live",
    response_model=HealthResponse,
    summary="Check whether the API process is running",
)
async def live_health_check() -> HealthResponse:
    return HealthResponse(status="ok")


@router.get(
    "/ready",
    response_model=HealthResponse,
    summary="Check whether the API is ready to receive traffic",
)
async def ready_health_check() -> HealthResponse:
    return HealthResponse(status="ok")
