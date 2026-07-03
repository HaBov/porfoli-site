from __future__ import annotations

from typing import TYPE_CHECKING

from sqlalchemy import (
    Boolean,
    CheckConstraint,
    Index,
    String,
    Text,
    true,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import (
    Base,
    TimestampMixin,
    UuidPrimaryKeyMixin,
)

if TYPE_CHECKING:
    from app.models.employee import Employee


class Department(
    UuidPrimaryKeyMixin,
    TimestampMixin,
    Base,
):
    __tablename__ = "departments"

    __table_args__ = (
        CheckConstraint(
            "char_length(name) BETWEEN 2 AND 120",
            name="name_length",
        ),
        CheckConstraint(
            "char_length(code) BETWEEN 2 AND 20",
            name="code_length",
        ),
        CheckConstraint(
            "code = upper(code)",
            name="code_uppercase",
        ),
        Index(
            "ix_departments_active",
            "active",
        ),
    )

    name: Mapped[str] = mapped_column(
        String(120),
        nullable=False,
    )

    code: Mapped[str] = mapped_column(
        String(20),
        unique=True,
        nullable=False,
    )

    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        server_default=true(),
        nullable=False,
    )

    employees: Mapped[list[Employee]] = relationship(
        back_populates="department",
        passive_deletes=True,
    )
