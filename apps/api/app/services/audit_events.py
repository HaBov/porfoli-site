from datetime import datetime
from math import ceil
from uuid import UUID

from sqlalchemy.ext.asyncio import AsyncSession

from app.domain.exceptions import (
    InvalidAuditDateRange,
)
from app.repositories.audit_events import (
    AuditEventFilters,
    AuditEventRepository,
)
from app.schemas.audit_event import (
    AuditEventListResponse,
    AuditEventRead,
)
from app.schemas.base import PaginationMetadata


class AuditEventService:
    def __init__(
        self,
        session: AsyncSession,
        repository: AuditEventRepository | None = None,
    ) -> None:
        self._repository = repository or AuditEventRepository(session)

    async def list_audit_events(
        self,
        *,
        entity_type: str | None,
        entity_id: UUID | None,
        action: str | None,
        from_: datetime | None,
        to: datetime | None,
        page: int,
        page_size: int,
    ) -> AuditEventListResponse:
        if from_ is not None and to is not None and from_ > to:
            raise InvalidAuditDateRange()

        normalized_entity_type = entity_type.strip() if entity_type else None

        normalized_action = action.strip() if action else None

        result = await self._repository.list(
            filters=AuditEventFilters(
                entity_type=(normalized_entity_type),
                entity_id=entity_id,
                action=normalized_action,
                from_=from_,
                to=to,
            ),
            page=page,
            page_size=page_size,
        )

        total_pages = ceil(result.total_items / page_size) if result.total_items else 0

        return AuditEventListResponse(
            items=[AuditEventRead.model_validate(event) for event in result.items],
            pagination=PaginationMetadata(
                page=page,
                page_size=page_size,
                total_items=result.total_items,
                total_pages=total_pages,
            ),
        )
