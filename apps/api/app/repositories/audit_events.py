from sqlalchemy.ext.asyncio import AsyncSession

from app.models import AuditEvent


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
