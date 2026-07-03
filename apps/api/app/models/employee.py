from __future__ import annotations

from enum import StrEnum
from typing import TYPE_CHECKING
from uuid import UUID

from sqlalchemy import (
    CheckConstraint,
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
            "char_length(first_name) BETWEEN 2 AND 80",
            name="first_name_length",
        ),
        CheckConstraint(
            "char_length(last_name) BETWEEN 2 AND 80",
            name="last_name_length",
        ),
        CheckConstraint(
            "email = lower(email)",
            name="email_lowercase",
        ),
        Index(
            "ix_employees_department_status",
            "department_id",
            "status",
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

    status: Mapped[EmployeeStatus] = mapped_column(
        employee_status_enum,
        default=EmployeeStatus.ONBOARDING,
        server_default=EmployeeStatus.ONBOARDING.value,
        nullable=False,
    )

    department: Mapped[Department] = relationship(
        back_populates="employees",
    )
