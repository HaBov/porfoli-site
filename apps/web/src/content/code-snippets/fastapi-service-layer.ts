export const employeeSchemasCode = String.raw`from datetime import date
from uuid import UUID

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class EmployeeCreate(BaseModel):
    email: EmailStr
    full_name: str = Field(min_length=2, max_length=120)
    department_id: UUID
    start_date: date


class EmployeeRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    email: EmailStr
    full_name: str
    department_id: UUID
    start_date: date
    status: str`;

export const employeeRouteCode = String.raw`from typing import Annotated

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies.auth import CurrentActor
from app.api.dependencies.database import get_session
from app.schemas.employees import EmployeeCreate, EmployeeRead
from app.services.employees import EmployeeService

router = APIRouter(prefix="/employees", tags=["employees"])


@router.post("", response_model=EmployeeRead, status_code=status.HTTP_201_CREATED)
async def create_employee(
    payload: EmployeeCreate,
    actor: CurrentActor,
    session: Annotated[AsyncSession, Depends(get_session)],
) -> EmployeeRead:
    employee = await EmployeeService(session).create(payload=payload, actor=actor)
    return EmployeeRead.model_validate(employee)`;

export const employeeServiceCode = String.raw`from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies.auth import CurrentActor
from app.errors import ConflictError, NotFoundError
from app.models.employee import Employee
from app.repositories.departments import DepartmentRepository
from app.repositories.employees import EmployeeRepository
from app.schemas.employees import EmployeeCreate


class EmployeeService:
    def __init__(self, session: AsyncSession) -> None:
        self._session = session
        self._employees = EmployeeRepository(session)
        self._departments = DepartmentRepository(session)

    async def create(
        self,
        *,
        payload: EmployeeCreate,
        actor: CurrentActor,
    ) -> Employee:
        if await self._employees.email_exists(payload.email):
            raise ConflictError(code="employee_email_exists")

        department = await self._departments.get(payload.department_id)
        if department is None or not department.active:
            raise NotFoundError(code="department_not_found")

        employee = Employee(
            email=payload.email.lower(),
            full_name=payload.full_name.strip(),
            department_id=department.id,
            start_date=payload.start_date,
            status="onboarding",
            created_by=actor.user_id,
        )

        self._employees.add(employee)

        try:
            await self._session.commit()
        except Exception:
            await self._session.rollback()
            raise

        await self._session.refresh(employee)
        return employee`;

export const employeeServiceTestCode = String.raw`import pytest

from app.errors import ConflictError
from app.schemas.employees import EmployeeCreate
from app.services.employees import EmployeeService


@pytest.mark.asyncio
async def test_create_employee_rejects_duplicate_email(
    session,
    actor,
    active_department,
    existing_employee,
) -> None:
    payload = EmployeeCreate(
        email=existing_employee.email,
        full_name="Jordan Lee",
        department_id=active_department.id,
        start_date="2026-07-01",
    )

    with pytest.raises(ConflictError) as error:
        await EmployeeService(session).create(payload=payload, actor=actor)

    assert error.value.code == "employee_email_exists"`;
