"""Expand employee profile fields.

Revision ID: 20260704_0002
Revises: 20260703_0001
Create Date: 2026-07-04
"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

revision: str = "20260704_0002"
down_revision: str | None = "20260703_0001"
branch_labels: Sequence[str] | None = None
depends_on: Sequence[str] | None = None


def upgrade() -> None:
    op.execute("ALTER TYPE employee_status ADD VALUE IF NOT EXISTS 'leave'")

    op.drop_constraint(
        "ck_employees_first_name_length",
        "employees",
        type_="check",
    )

    op.drop_constraint(
        "ck_employees_last_name_length",
        "employees",
        type_="check",
    )

    op.create_check_constraint(
        "ck_employees_first_name_length",
        "employees",
        "char_length(first_name) BETWEEN 1 AND 80",
    )

    op.create_check_constraint(
        "ck_employees_last_name_length",
        "employees",
        "char_length(last_name) BETWEEN 1 AND 80",
    )

    op.add_column(
        "employees",
        sa.Column(
            "job_title",
            sa.String(length=120),
            nullable=True,
        ),
    )

    op.add_column(
        "employees",
        sa.Column(
            "start_date",
            sa.Date(),
            nullable=True,
        ),
    )

    op.add_column(
        "employees",
        sa.Column(
            "manager_id",
            postgresql.UUID(as_uuid=True),
            nullable=True,
        ),
    )

    op.execute(
        """
        UPDATE employees
        SET job_title = 'Demo Team Member'
        WHERE job_title IS NULL
        """
    )

    op.execute(
        """
        UPDATE employees
        SET start_date = created_at::date
        WHERE start_date IS NULL
        """
    )

    op.alter_column(
        "employees",
        "job_title",
        existing_type=sa.String(length=120),
        nullable=False,
    )

    op.alter_column(
        "employees",
        "start_date",
        existing_type=sa.Date(),
        nullable=False,
    )

    op.create_check_constraint(
        "ck_employees_job_title_length",
        "employees",
        "char_length(job_title) BETWEEN 2 AND 120",
    )

    op.create_check_constraint(
        "ck_employees_manager_not_self",
        "employees",
        "manager_id IS NULL OR manager_id <> id",
    )

    op.create_foreign_key(
        "fk_employees_manager_id_employees",
        "employees",
        "employees",
        ["manager_id"],
        ["id"],
        ondelete="SET NULL",
    )

    op.create_index(
        "ix_employees_last_name",
        "employees",
        ["last_name"],
        unique=False,
    )

    op.create_index(
        "ix_employees_created_at",
        "employees",
        ["created_at"],
        unique=False,
    )

    op.create_index(
        "ix_employees_manager_id",
        "employees",
        ["manager_id"],
        unique=False,
    )


def downgrade() -> None:
    op.drop_index(
        "ix_employees_manager_id",
        table_name="employees",
    )

    op.drop_index(
        "ix_employees_created_at",
        table_name="employees",
    )

    op.drop_index(
        "ix_employees_last_name",
        table_name="employees",
    )

    op.drop_constraint(
        "fk_employees_manager_id_employees",
        "employees",
        type_="foreignkey",
    )

    op.drop_constraint(
        "ck_employees_manager_not_self",
        "employees",
        type_="check",
    )

    op.drop_constraint(
        "ck_employees_job_title_length",
        "employees",
        type_="check",
    )

    op.drop_column(
        "employees",
        "manager_id",
    )

    op.drop_column(
        "employees",
        "start_date",
    )

    op.drop_column(
        "employees",
        "job_title",
    )

    op.drop_constraint(
        "ck_employees_first_name_length",
        "employees",
        type_="check",
    )

    op.drop_constraint(
        "ck_employees_last_name_length",
        "employees",
        type_="check",
    )

    op.create_check_constraint(
        "ck_employees_first_name_length",
        "employees",
        "char_length(first_name) BETWEEN 2 AND 80",
    )

    op.create_check_constraint(
        "ck_employees_last_name_length",
        "employees",
        "char_length(last_name) BETWEEN 2 AND 80",
    )

    # PostgreSQL enum values are intentionally not removed
    # during downgrade. The upgrade remains repeatable because
    # it uses ADD VALUE IF NOT EXISTS.
