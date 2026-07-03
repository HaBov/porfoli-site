from datetime import datetime
from typing import Any
from uuid import UUID

from pydantic import Field

from app.schemas.base import (
    ApiModel,
    PaginationMetadata,
)


class AuditEventRead(ApiModel):
    id: UUID
    action: str
    entity_type: str
    entity_id: UUID
    actor: str

    metadata: dict[str, Any] = Field(
        validation_alias="details",
    )

    created_at: datetime


class AuditEventListResponse(ApiModel):
    items: list[AuditEventRead]
    pagination: PaginationMetadata
