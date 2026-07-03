from fastapi import APIRouter

from app.core.config import get_settings
from app.schemas.system import (
    ApiMetadataResponse,
    ApiResourceLinks,
)

router = APIRouter(
    prefix="/api/demo/v1",
    tags=["Demo Metadata"],
)


@router.get(
    "",
    response_model=ApiMetadataResponse,
    response_model_by_alias=True,
    summary="Describe the demonstration API",
)
def get_demo_metadata() -> ApiMetadataResponse:
    settings = get_settings()

    return ApiMetadataResponse(
        name=settings.app_name,
        version="1.0",
        data_policy=("Synthetic demonstration data only"),
        documentation=settings.docs_url,
        resources=ApiResourceLinks(
            departments=("/api/demo/v1/departments"),
            employees=("/api/demo/v1/employees"),
            audit_events=("/api/demo/v1/audit-events"),
            jobs="/api/demo/v1/jobs",
        ),
    )
