from dataclasses import dataclass
from datetime import datetime
from uuid import UUID

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql.elements import ColumnElement

from app.models import AuditEvent


@dataclass(frozen=True, slots=True)
class AuditEventFilters:
    entity_type: str | None = None
    entity_id: UUID | None = None
    action: str | None = None
    from_: datetime | None = None
    to: datetime | None = None


@dataclass(frozen=True, slots=True)
class AuditEventPage:
    items: list[AuditEvent]
    total_items: int


class AuditEventRepository:
    def __init__(
        self,
        session: AsyncSession,
    ) -> None:
        self._session = session

    def add(
        self,
        event: AuditEvent,
    ) -> None:
        self._session.add(event)

    async def list(
        self,
        *,
        filters: AuditEventFilters,
        page: int,
        page_size: int,
    ) -> AuditEventPage:
        conditions: list[ColumnElement[bool]] = []

        if filters.entity_type is not None:
            conditions.append(AuditEvent.entity_type == filters.entity_type)

        if filters.entity_id is not None:
            conditions.append(AuditEvent.entity_id == filters.entity_id)

        if filters.action is not None:
            conditions.append(AuditEvent.action == filters.action)

        if filters.from_ is not None:
            conditions.append(AuditEvent.created_at >= filters.from_)

        if filters.to is not None:
            conditions.append(AuditEvent.created_at <= filters.to)

        count_statement = (
            select(func.count(AuditEvent.id)).select_from(AuditEvent).where(*conditions)
        )

        count_result = await self._session.execute(count_statement)

        total_items = int(count_result.scalar_one())

        offset = (page - 1) * page_size

        statement = (
            select(AuditEvent)
            .where(*conditions)
            .order_by(
                AuditEvent.created_at.desc(),
                AuditEvent.id.desc(),
            )
            .offset(offset)
            .limit(page_size)
        )

        result = await self._session.scalars(statement)

        return AuditEventPage(
            items=list(result.all()),
            total_items=total_items,
        )
