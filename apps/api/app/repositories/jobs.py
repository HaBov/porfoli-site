from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import DemoJob


class JobRepository:
    def __init__(
        self,
        session: AsyncSession,
    ) -> None:
        self._session = session

    async def get_by_id(
        self,
        job_id: UUID,
    ) -> DemoJob | None:
        statement = select(DemoJob).where(DemoJob.id == job_id)

        result = await self._session.execute(statement)

        return result.scalar_one_or_none()

    async def get_by_idempotency_key(
        self,
        key: str,
    ) -> DemoJob | None:
        statement = select(DemoJob).where(DemoJob.idempotency_key == key)

        result = await self._session.execute(statement)

        return result.scalar_one_or_none()

    def add(
        self,
        job: DemoJob,
    ) -> None:
        self._session.add(job)

    async def delete(
        self,
        job: DemoJob,
    ) -> None:
        await self._session.delete(job)
