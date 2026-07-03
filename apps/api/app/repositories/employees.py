from dataclasses import dataclass
from typing import Any
from uuid import UUID

from sqlalchemy import func, or_, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql.elements import ColumnElement

from app.models import Employee, EmployeeStatus
from app.schemas.employee import EmployeeSort


@dataclass(frozen=True, slots=True)
class EmployeeFilters:
    search: str | None = None
    status: EmployeeStatus | None = None
    department_id: UUID | None = None


@dataclass(frozen=True, slots=True)
class EmployeePage:
    items: list[Employee]
    total_items: int


class EmployeeRepository:
    def __init__(
        self,
        session: AsyncSession,
    ) -> None:
        self._session = session

    async def get_by_id(
        self,
        employee_id: UUID,
    ) -> Employee | None:
        statement = select(Employee).where(Employee.id == employee_id)

        result = await self._session.execute(statement)

        return result.scalar_one_or_none()

    async def get_by_email(
        self,
        email: str,
    ) -> Employee | None:
        statement = select(Employee).where(Employee.email == email)

        result = await self._session.execute(statement)

        return result.scalar_one_or_none()

    async def list(
        self,
        *,
        filters: EmployeeFilters,
        page: int,
        page_size: int,
        sort: EmployeeSort,
    ) -> EmployeePage:
        conditions: list[ColumnElement[bool]] = []

        if filters.status is not None:
            conditions.append(Employee.status == filters.status)

        if filters.department_id is not None:
            conditions.append(Employee.department_id == filters.department_id)

        if filters.search:
            escaped_search = self._escape_like(filters.search)

            pattern = f"%{escaped_search}%"

            conditions.append(
                or_(
                    Employee.first_name.ilike(
                        pattern,
                        escape="\\",
                    ),
                    Employee.last_name.ilike(
                        pattern,
                        escape="\\",
                    ),
                    Employee.email.ilike(
                        pattern,
                        escape="\\",
                    ),
                    Employee.job_title.ilike(
                        pattern,
                        escape="\\",
                    ),
                )
            )

        count_statement = select(func.count(Employee.id)).select_from(Employee).where(*conditions)

        count_result = await self._session.execute(count_statement)

        total_items = int(count_result.scalar_one())

        sort_expressions: dict[
            EmployeeSort,
            ColumnElement[Any],
        ] = {
            EmployeeSort.CREATED_AT: Employee.created_at.asc(),
            EmployeeSort.CREATED_AT_DESC: Employee.created_at.desc(),
            EmployeeSort.LAST_NAME: Employee.last_name.asc(),
            EmployeeSort.LAST_NAME_DESC: Employee.last_name.desc(),
            EmployeeSort.START_DATE: Employee.start_date.asc(),
            EmployeeSort.START_DATE_DESC: Employee.start_date.desc(),
        }

        offset = (page - 1) * page_size

        statement = (
            select(Employee)
            .where(*conditions)
            .order_by(
                sort_expressions[sort],
                Employee.id.asc(),
            )
            .offset(offset)
            .limit(page_size)
        )

        result = await self._session.scalars(statement)

        return EmployeePage(
            items=list(result.all()),
            total_items=total_items,
        )

    def add(
        self,
        employee: Employee,
    ) -> None:
        self._session.add(employee)

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
