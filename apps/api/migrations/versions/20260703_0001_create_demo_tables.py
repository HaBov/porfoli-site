"""Create demo database tables.

Revision ID: 20260703_0001
Revises:
Create Date: 2026-07-03
"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

revision: str = "20260703_0001"
down_revision: str | None = None
branch_labels: Sequence[str] | None = None
depends_on: Sequence[str] | None = None

employee_status = postgresql.ENUM(
    "onboarding",
    "active",
    "offboarding",
    "inactive",
    name="employee_status",
    create_type=False,
)


def upgrade() -> None:
    employee_status.create(
        op.get_bind(),
        checkfirst=True,
    )

    op.create_table(
        "departments",
        sa.Column(
            "name",
            sa.String(length=120),
            nullable=False,
        ),
        sa.Column(
            "code",
            sa.String(length=20),
            nullable=False,
        ),
        sa.Column(
            "description",
            sa.Text(),
            nullable=True,
        ),
        sa.Column(
            "active",
            sa.Boolean(),
            server_default=sa.true(),
            nullable=False,
        ),
        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            nullable=False,
        ),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            nullable=False,
        ),
        sa.CheckConstraint(
            "code = upper(code)",
            name="ck_departments_code_uppercase",
        ),
        sa.CheckConstraint(
            "char_length(code) BETWEEN 2 AND 20",
            name="ck_departments_code_length",
        ),
        sa.CheckConstraint(
            "char_length(name) BETWEEN 2 AND 120",
            name="ck_departments_name_length",
        ),
        sa.PrimaryKeyConstraint(
            "id",
            name="pk_departments",
        ),
        sa.UniqueConstraint(
            "code",
            name="uq_departments_code",
        ),
    )

    op.create_index(
        "ix_departments_active",
        "departments",
        ["active"],
        unique=False,
    )

    op.create_table(
        "employees",
        sa.Column(
            "first_name",
            sa.String(length=80),
            nullable=False,
        ),
        sa.Column(
            "last_name",
            sa.String(length=80),
            nullable=False,
        ),
        sa.Column(
            "email",
            sa.String(length=254),
            nullable=False,
        ),
        sa.Column(
            "department_id",
            postgresql.UUID(as_uuid=True),
            nullable=False,
        ),
        sa.Column(
            "status",
            employee_status,
            server_default=sa.text("'onboarding'::employee_status"),
            nullable=False,
        ),
        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            nullable=False,
        ),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            nullable=False,
        ),
        sa.CheckConstraint(
            "email = lower(email)",
            name="ck_employees_email_lowercase",
        ),
        sa.CheckConstraint(
            "char_length(first_name) BETWEEN 2 AND 80",
            name="ck_employees_first_name_length",
        ),
        sa.CheckConstraint(
            "char_length(last_name) BETWEEN 2 AND 80",
            name="ck_employees_last_name_length",
        ),
        sa.ForeignKeyConstraint(
            ["department_id"],
            ["departments.id"],
            name=("fk_employees_department_id_departments"),
            ondelete="RESTRICT",
        ),
        sa.PrimaryKeyConstraint(
            "id",
            name="pk_employees",
        ),
        sa.UniqueConstraint(
            "email",
            name="uq_employees_email",
        ),
    )

    op.create_index(
        "ix_employees_department_status",
        "employees",
        ["department_id", "status"],
        unique=False,
    )

    op.create_table(
        "audit_events",
        sa.Column(
            "action",
            sa.String(length=100),
            nullable=False,
        ),
        sa.Column(
            "entity_type",
            sa.String(length=50),
            nullable=False,
        ),
        sa.Column(
            "entity_id",
            postgresql.UUID(as_uuid=True),
            nullable=False,
        ),
        sa.Column(
            "actor",
            sa.String(length=100),
            nullable=False,
        ),
        sa.Column(
            "details",
            postgresql.JSONB(astext_type=sa.Text()),
            server_default=sa.text("'{}'::jsonb"),
            nullable=False,
        ),
        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            nullable=False,
        ),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
        ),
        sa.PrimaryKeyConstraint(
            "id",
            name="pk_audit_events",
        ),
    )

    op.create_index(
        "ix_audit_events_created_at",
        "audit_events",
        ["created_at"],
        unique=False,
    )

    op.create_index(
        "ix_audit_events_entity",
        "audit_events",
        ["entity_type", "entity_id"],
        unique=False,
    )


def downgrade() -> None:
    op.drop_index(
        "ix_audit_events_entity",
        table_name="audit_events",
    )

    op.drop_index(
        "ix_audit_events_created_at",
        table_name="audit_events",
    )

    op.drop_table("audit_events")

    op.drop_index(
        "ix_employees_department_status",
        table_name="employees",
    )

    op.drop_table("employees")

    op.drop_index(
        "ix_departments_active",
        table_name="departments",
    )

    op.drop_table("departments")

    employee_status.drop(
        op.get_bind(),
        checkfirst=True,
    )
