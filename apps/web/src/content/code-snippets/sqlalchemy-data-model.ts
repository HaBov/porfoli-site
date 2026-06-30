export const employeeModelCode = String.raw`import enum
from datetime import date, datetime
from uuid import UUID, uuid4

from sqlalchemy import CheckConstraint, Date, DateTime, Enum, ForeignKey, Index, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class EmployeeStatus(str, enum.Enum):
    ONBOARDING = "onboarding"
    ACTIVE = "active"
    LEAVE = "leave"
    OFFBOARDING = "offboarding"
    INACTIVE = "inactive"


class Employee(Base):
    __tablename__ = "employees"
    __table_args__ = (
        CheckConstraint("char_length(full_name) >= 2", name="ck_employee_name_length"),
        Index("ix_employee_department_status", "department_id", "status"),
    )

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    email: Mapped[str] = mapped_column(String(254), unique=True, index=True)
    full_name: Mapped[str] = mapped_column(String(120))
    start_date: Mapped[date] = mapped_column(Date)
    status: Mapped[EmployeeStatus] = mapped_column(
        Enum(EmployeeStatus, name="employee_status"),
        default=EmployeeStatus.ONBOARDING,
        index=True,
    )

    department_id: Mapped[UUID] = mapped_column(
        ForeignKey("departments.id", ondelete="RESTRICT"),
        index=True,
    )
    manager_id: Mapped[UUID | None] = mapped_column(
        ForeignKey("employees.id", ondelete="SET NULL"),
        nullable=True,
    )

    department: Mapped["Department"] = relationship(back_populates="employees")
    manager: Mapped["Employee | None"] = relationship(
        remote_side="Employee.id",
        back_populates="direct_reports",
    )
    direct_reports: Mapped[list["Employee"]] = relationship(back_populates="manager")

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )`;

export const employeeConstraintTestCode = String.raw`import pytest
from sqlalchemy.exc import IntegrityError

from app.models.employee import Employee


@pytest.mark.asyncio
async def test_employee_email_is_unique(session, department) -> None:
    session.add_all(
        [
            Employee(
                email="alex.morgan@example.com",
                full_name="Alex Morgan",
                start_date="2026-07-01",
                department_id=department.id,
            ),
            Employee(
                email="alex.morgan@example.com",
                full_name="Second Record",
                start_date="2026-07-02",
                department_id=department.id,
            ),
        ]
    )

    with pytest.raises(IntegrityError):
        await session.commit()

    await session.rollback()`;
