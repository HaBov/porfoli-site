from math import ceil
from uuid import UUID

from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.domain.exceptions import (
    DepartmentNotFound,
    DuplicateEmployeeEmail,
    EmployeeNotFound,
    InactiveDepartment,
    InvalidEmployeeStatusChange,
    InvalidManager,
)
from app.models import (
    AuditEvent,
    Employee,
    EmployeeStatus,
)
from app.repositories.audit_events import (
    AuditEventRepository,
)
from app.repositories.departments import (
    DepartmentRepository,
)
from app.repositories.employees import (
    EmployeeFilters,
    EmployeeRepository,
)
from app.schemas.base import PaginationMetadata
from app.schemas.employee import (
    EmployeeCreate,
    EmployeeDeactivate,
    EmployeeListResponse,
    EmployeeRead,
    EmployeeSort,
    EmployeeUpdate,
)


class EmployeeService:
    def __init__(
        self,
        session: AsyncSession,
        employee_repository: EmployeeRepository | None = None,
        department_repository: DepartmentRepository | None = None,
        audit_repository: AuditEventRepository | None = None,
    ) -> None:
        self._session = session

        self._employees = employee_repository or EmployeeRepository(session)

        self._departments = department_repository or DepartmentRepository(session)

        self._audit_events = audit_repository or AuditEventRepository(session)

    async def list_employees(
        self,
        *,
        search: str | None,
        status: EmployeeStatus | None,
        department_id: UUID | None,
        page: int,
        page_size: int,
        sort: EmployeeSort,
    ) -> EmployeeListResponse:
        normalized_search = search.strip() if search else None

        result = await self._employees.list(
            filters=EmployeeFilters(
                search=normalized_search,
                status=status,
                department_id=department_id,
            ),
            page=page,
            page_size=page_size,
            sort=sort,
        )

        total_pages = ceil(result.total_items / page_size) if result.total_items else 0

        return EmployeeListResponse(
            items=[EmployeeRead.model_validate(employee) for employee in result.items],
            pagination=PaginationMetadata(
                page=page,
                page_size=page_size,
                total_items=result.total_items,
                total_pages=total_pages,
            ),
        )

    async def get_employee(
        self,
        employee_id: UUID,
    ) -> EmployeeRead:
        employee = await self._require_employee(employee_id)

        return EmployeeRead.model_validate(employee)

    async def create_employee(
        self,
        payload: EmployeeCreate,
        *,
        actor: str,
    ) -> EmployeeRead:
        email = str(payload.email)

        existing = await self._employees.get_by_email(email)

        if existing is not None:
            raise DuplicateEmployeeEmail(email)

        await self._require_active_department(payload.department_id)

        if payload.manager_id is not None:
            await self._require_manager(payload.manager_id)

        employee = Employee(
            first_name=payload.first_name,
            last_name=payload.last_name,
            email=email,
            department_id=payload.department_id,
            job_title=payload.job_title,
            status=payload.status,
            start_date=payload.start_date,
            manager_id=payload.manager_id,
        )

        try:
            self._employees.add(employee)

            await self._session.flush()

            self._audit_events.add(
                AuditEvent(
                    action="employee.created",
                    entity_type="employee",
                    entity_id=employee.id,
                    actor=actor,
                    details={
                        "synthetic": True,
                        "departmentId": str(employee.department_id),
                        "status": employee.status.value,
                    },
                )
            )

            await self._session.commit()
        except IntegrityError as error:
            await self._session.rollback()

            if "uq_employees_email" in str(error.orig):
                raise DuplicateEmployeeEmail(email) from error

            raise
        except Exception:
            await self._session.rollback()
            raise

        await self._session.refresh(employee)

        return EmployeeRead.model_validate(employee)

    async def update_employee(
        self,
        employee_id: UUID,
        payload: EmployeeUpdate,
        *,
        actor: str,
    ) -> EmployeeRead:
        employee = await self._require_employee(employee_id)

        supplied_fields = payload.model_fields_set

        changed_fields: list[str] = []

        if "email" in supplied_fields and payload.email is not None:
            email = str(payload.email)

            if email != employee.email:
                existing = await self._employees.get_by_email(email)

                if existing is not None and existing.id != employee.id:
                    raise DuplicateEmployeeEmail(email)

                employee.email = email
                changed_fields.append("email")

        if (
            "department_id" in supplied_fields
            and payload.department_id is not None
            and payload.department_id != employee.department_id
        ):
            await self._require_active_department(payload.department_id)

            employee.department_id = payload.department_id

            changed_fields.append("departmentId")

        if "manager_id" in supplied_fields:
            manager_id = payload.manager_id

            if manager_id == employee.id:
                raise InvalidManager(
                    manager_id,
                    ("An employee cannot be their own manager."),
                )

            if manager_id is not None:
                await self._require_manager(manager_id)

            if manager_id != employee.manager_id:
                employee.manager_id = manager_id
                changed_fields.append("managerId")

        if (
            "first_name" in supplied_fields
            and payload.first_name is not None
            and payload.first_name != employee.first_name
        ):
            employee.first_name = payload.first_name

            changed_fields.append("firstName")

        if (
            "last_name" in supplied_fields
            and payload.last_name is not None
            and payload.last_name != employee.last_name
        ):
            employee.last_name = payload.last_name

            changed_fields.append("lastName")

        if (
            "job_title" in supplied_fields
            and payload.job_title is not None
            and payload.job_title != employee.job_title
        ):
            employee.job_title = payload.job_title

            changed_fields.append("jobTitle")

        if (
            "start_date" in supplied_fields
            and payload.start_date is not None
            and payload.start_date != employee.start_date
        ):
            employee.start_date = payload.start_date

            changed_fields.append("startDate")

        if "status" in supplied_fields and payload.status is not None:
            if payload.status == EmployeeStatus.INACTIVE:
                raise (
                    InvalidEmployeeStatusChange(
                        "Use the deactivate endpoint to make an employee inactive."
                    )
                )

            if payload.status != employee.status:
                employee.status = payload.status

                changed_fields.append("status")

        if not changed_fields:
            return EmployeeRead.model_validate(employee)

        try:
            self._audit_events.add(
                AuditEvent(
                    action="employee.updated",
                    entity_type="employee",
                    entity_id=employee.id,
                    actor=actor,
                    details={
                        "synthetic": True,
                        "changedFields": changed_fields,
                    },
                )
            )

            await self._session.commit()
        except IntegrityError as error:
            await self._session.rollback()

            if "uq_employees_email" in str(error.orig):
                raise DuplicateEmployeeEmail(employee.email) from error

            raise
        except Exception:
            await self._session.rollback()
            raise

        await self._session.refresh(employee)

        return EmployeeRead.model_validate(employee)

    async def deactivate_employee(
        self,
        employee_id: UUID,
        payload: EmployeeDeactivate,
        *,
        actor: str,
    ) -> EmployeeRead:
        employee = await self._require_employee(employee_id)

        if employee.status == EmployeeStatus.INACTIVE:
            return EmployeeRead.model_validate(employee)

        employee.status = EmployeeStatus.INACTIVE

        try:
            self._audit_events.add(
                AuditEvent(
                    action=("employee.deactivated"),
                    entity_type="employee",
                    entity_id=employee.id,
                    actor=actor,
                    details={
                        "synthetic": True,
                        "reason": payload.reason,
                    },
                )
            )

            await self._session.commit()
        except Exception:
            await self._session.rollback()
            raise

        await self._session.refresh(employee)

        return EmployeeRead.model_validate(employee)

    async def _require_employee(
        self,
        employee_id: UUID,
    ) -> Employee:
        employee = await self._employees.get_by_id(employee_id)

        if employee is None:
            raise EmployeeNotFound(employee_id)

        return employee

    async def _require_active_department(
        self,
        department_id: UUID,
    ) -> None:
        department = await self._departments.get_by_id(department_id)

        if department is None:
            raise DepartmentNotFound(department_id)

        if not department.active:
            raise InactiveDepartment(department_id)

    async def _require_manager(
        self,
        manager_id: UUID,
    ) -> Employee:
        manager = await self._employees.get_by_id(manager_id)

        if manager is None:
            raise InvalidManager(
                manager_id,
                "The selected manager does not exist.",
            )

        return manager
