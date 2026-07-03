from __future__ import annotations

from datetime import date
from enum import StrEnum
from typing import TYPE_CHECKING
from uuid import UUID

from sqlalchemy import (
    CheckConstraint,
    Date,
    Enum,
    ForeignKey,
    Index,
    String,
)
from sqlalchemy.dialects.postgresql import UUID as PostgreSQLUUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import (
    Base,
    TimestampMixin,
    UuidPrimaryKeyMixin,
)

if TYPE_CHECKING:
    from app.models.department import Department


class EmployeeStatus(StrEnum):
    ONBOARDING = "onboarding"
    ACTIVE = "active"
    LEAVE = "leave"
    OFFBOARDING = "offboarding"
    INACTIVE = "inactive"


employee_status_enum = Enum(
    EmployeeStatus,
    name="employee_status",
    values_callable=lambda enum_type: [item.value for item in enum_type],
    validate_strings=True,
)


class Employee(
    UuidPrimaryKeyMixin,
    TimestampMixin,
    Base,
):
    __tablename__ = "employees"

    __table_args__ = (
        CheckConstraint(
            "char_length(first_name) BETWEEN 1 AND 80",
            name="first_name_length",
        ),
        CheckConstraint(
            "char_length(last_name) BETWEEN 1 AND 80",
            name="last_name_length",
        ),
        CheckConstraint(
            "char_length(job_title) BETWEEN 2 AND 120",
            name="job_title_length",
        ),
        CheckConstraint(
            "email = lower(email)",
            name="email_lowercase",
        ),
        CheckConstraint(
            "manager_id IS NULL OR manager_id <> id",
            name="manager_not_self",
        ),
        Index(
            "ix_employees_department_status",
            "department_id",
            "status",
        ),
        Index(
            "ix_employees_last_name",
            "last_name",
        ),
        Index(
            "ix_employees_created_at",
            "created_at",
        ),
        Index(
            "ix_employees_manager_id",
            "manager_id",
        ),
    )

    first_name: Mapped[str] = mapped_column(
        String(80),
        nullable=False,
    )

    last_name: Mapped[str] = mapped_column(
        String(80),
        nullable=False,
    )

    email: Mapped[str] = mapped_column(
        String(254),
        unique=True,
        nullable=False,
    )

    department_id: Mapped[UUID] = mapped_column(
        PostgreSQLUUID(as_uuid=True),
        ForeignKey(
            "departments.id",
            ondelete="RESTRICT",
        ),
        nullable=False,
    )

    job_title: Mapped[str] = mapped_column(
        String(120),
        nullable=False,
    )

    status: Mapped[EmployeeStatus] = mapped_column(
        employee_status_enum,
        default=EmployeeStatus.ONBOARDING,
        server_default=EmployeeStatus.ONBOARDING.value,
        nullable=False,
    )

    start_date: Mapped[date] = mapped_column(
        Date,
        nullable=False,
    )

    manager_id: Mapped[UUID | None] = mapped_column(
        PostgreSQLUUID(as_uuid=True),
        ForeignKey(
            "employees.id",
            name="fk_employees_manager_id_employees",
            ondelete="SET NULL",
        ),
        nullable=True,
    )

    department: Mapped[Department] = relationship(
        back_populates="employees",
    )

    manager: Mapped[Employee | None] = relationship(
        back_populates="direct_reports",
        remote_side=lambda: [Employee.id],
        foreign_keys=lambda: [
            Employee.manager_id,
        ],
    )

    direct_reports: Mapped[list[Employee]] = relationship(
        back_populates="manager",
        foreign_keys=lambda: [
            Employee.manager_id,
        ],
        passive_deletes=True,
    )
