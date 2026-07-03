from dataclasses import dataclass
from typing import Any
from uuid import UUID

from sqlalchemy import func, or_, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql.elements import ColumnElement

from app.models import Department
from app.schemas.department import DepartmentSort


@dataclass(frozen=True, slots=True)
class DepartmentFilters:
    active: bool | None = None
    search: str | None = None


@dataclass(frozen=True, slots=True)
class DepartmentPage:
    items: list[Department]
    total_items: int


class DepartmentRepository:
    def __init__(
        self,
        session: AsyncSession,
    ) -> None:
        self._session = session

    async def get_by_id(
        self,
        department_id: UUID,
    ) -> Department | None:
        statement = select(Department).where(Department.id == department_id)

        result = await self._session.execute(statement)

        return result.scalar_one_or_none()

    async def get_by_code(
        self,
        code: str,
    ) -> Department | None:
        statement = select(Department).where(Department.code == code)

        result = await self._session.execute(statement)

        return result.scalar_one_or_none()

    async def list(
        self,
        *,
        filters: DepartmentFilters,
        page: int,
        page_size: int,
        sort: DepartmentSort,
    ) -> DepartmentPage:
        conditions: list[ColumnElement[bool]] = []

        if filters.active is not None:
            conditions.append(Department.active == filters.active)

        if filters.search:
            escaped_search = self._escape_like(filters.search)

            pattern = f"%{escaped_search}%"

            conditions.append(
                or_(
                    Department.name.ilike(
                        pattern,
                        escape="\\",
                    ),
                    Department.code.ilike(
                        pattern,
                        escape="\\",
                    ),
                )
            )

        count_statement = (
            select(func.count(Department.id)).select_from(Department).where(*conditions)
        )

        total_items = await self._session.scalar(count_statement)

        sort_expressions: dict[
            DepartmentSort,
            ColumnElement[Any],
        ] = {
            DepartmentSort.NAME: Department.name.asc(),
            DepartmentSort.NAME_DESC: Department.name.desc(),
            DepartmentSort.CODE: Department.code.asc(),
            DepartmentSort.CODE_DESC: Department.code.desc(),
            DepartmentSort.CREATED_AT: Department.created_at.asc(),
            DepartmentSort.CREATED_AT_DESC: Department.created_at.desc(),
        }

        offset = (page - 1) * page_size

        statement = (
            select(Department)
            .where(*conditions)
            .order_by(
                sort_expressions[sort],
                Department.id.asc(),
            )
            .offset(offset)
            .limit(page_size)
        )

        result = await self._session.scalars(statement)

        return DepartmentPage(
            items=list(result.all()),
            total_items=int(total_items or 0),
        )

    def add(
        self,
        department: Department,
    ) -> None:
        self._session.add(department)

    @staticmethod
    def _escape_like(
        value: str,
    ) -> str:
        return (
            value.replace(
                "\\",
                "\\\\",
            )
            .replace(
                "%",
                "\\%",
            )
            .replace(
                "_",
                "\\_",
            )
        )
