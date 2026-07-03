from fastapi import APIRouter

from app.core.config import get_settings
from app.domain.roles import DemoRole
from app.schemas.system import (
    ApiMetadataResponse,
    ApiResourceLinks,
    PermissionAction,
    PermissionsResponse,
)

router = APIRouter(
    prefix="/api/demo/v1",
    tags=["Demo Metadata"],
)


@router.get(
    "",
    response_model=ApiMetadataResponse,
    response_model_by_alias=True,
    operation_id="get_demo_metadata",
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


@router.get(
    "/permissions",
    response_model=PermissionsResponse,
    response_model_by_alias=True,
    operation_id="get_demo_permissions",
    summary="Describe demo role permissions",
)
def get_demo_permissions() -> PermissionsResponse:
    return PermissionsResponse(
        header="X-Demo-Role",
        disclaimer=(
            "X-Demo-Role demonstrates "
            "authorization behavior only. "
            "It is not a production "
            "authentication mechanism."
        ),
        roles=[
            DemoRole.VIEWER,
            DemoRole.MANAGER,
            DemoRole.ADMIN,
        ],
        actions=[
            PermissionAction(
                action="List departments",
                viewer=True,
                manager=True,
                admin=True,
            ),
            PermissionAction(
                action="List employees",
                viewer=True,
                manager=True,
                admin=True,
            ),
            PermissionAction(
                action="View employee",
                viewer=True,
                manager=True,
                admin=True,
            ),
            PermissionAction(
                action="Create employee",
                viewer=False,
                manager=True,
                admin=True,
            ),
            PermissionAction(
                action="Update employee",
                viewer=False,
                manager=True,
                admin=True,
            ),
            PermissionAction(
                action="Deactivate employee",
                viewer=False,
                manager=False,
                admin=True,
            ),
            PermissionAction(
                action="View audit events",
                viewer=False,
                manager=True,
                admin=True,
            ),
        ],
    )
