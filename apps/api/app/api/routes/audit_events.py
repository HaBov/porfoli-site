from datetime import datetime
from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Query

from app.api.dependencies import (
    AuditEventServiceDep,
    ManagerOrAdminDemoRole,
)
from app.schemas.audit_event import (
    AuditEventListResponse,
)
from app.schemas.errors import ErrorResponse

router = APIRouter(
    prefix="/api/demo/v1/audit-events",
    tags=["Audit Events"],
)


@router.get(
    "",
    response_model=AuditEventListResponse,
    response_model_by_alias=True,
    operation_id="list_demo_audit_events",
    summary="List synthetic audit events",
    responses={
        401: {
            "model": ErrorResponse,
        },
        403: {
            "model": ErrorResponse,
        },
        422: {
            "model": ErrorResponse,
        },
    },
)
async def list_audit_events(
    service: AuditEventServiceDep,
    _role: ManagerOrAdminDemoRole,
    entity_type: Annotated[
        str | None,
        Query(
            alias="entityType",
            min_length=1,
            max_length=50,
        ),
    ] = None,
    entity_id: Annotated[
        UUID | None,
        Query(alias="entityId"),
    ] = None,
    action: Annotated[
        str | None,
        Query(
            min_length=1,
            max_length=100,
        ),
    ] = None,
    from_: Annotated[
        datetime | None,
        Query(alias="from"),
    ] = None,
    to: Annotated[
        datetime | None,
        Query(),
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
) -> AuditEventListResponse:
    return await service.list_audit_events(
        entity_type=entity_type,
        entity_id=entity_id,
        action=action,
        from_=from_,
        to=to,
        page=page,
        page_size=page_size,
    )
