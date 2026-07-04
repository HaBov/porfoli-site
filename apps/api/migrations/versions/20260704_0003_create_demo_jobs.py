"""Create demo background jobs.

Revision ID: 20260704_0003
Revises: 20260704_0002
Create Date: 2026-07-04
"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

revision: str = "20260704_0003"
down_revision: str | None = "20260704_0002"
branch_labels: Sequence[str] | None = None
depends_on: Sequence[str] | None = None

job_type = postgresql.ENUM(
    "employee-report",
    "department-summary",
    "audit-export",
    name="demo_job_type",
    create_type=False,
)

job_status = postgresql.ENUM(
    "queued",
    "running",
    "completed",
    "failed",
    name="demo_job_status",
    create_type=False,
)


def upgrade() -> None:
    job_type.create(
        op.get_bind(),
        checkfirst=True,
    )

    job_status.create(
        op.get_bind(),
        checkfirst=True,
    )

    op.create_table(
        "demo_jobs",
        sa.Column(
            "type",
            job_type,
            nullable=False,
        ),
        sa.Column(
            "status",
            job_status,
            server_default=sa.text("'queued'::demo_job_status"),
            nullable=False,
        ),
        sa.Column(
            "parameters",
            postgresql.JSONB(astext_type=sa.Text()),
            server_default=sa.text("'{}'::jsonb"),
            nullable=False,
        ),
        sa.Column(
            "progress",
            sa.SmallInteger(),
            server_default=sa.text("0"),
            nullable=False,
        ),
        sa.Column(
            "result",
            postgresql.JSONB(astext_type=sa.Text()),
            nullable=True,
        ),
        sa.Column(
            "error_code",
            sa.String(length=80),
            nullable=True,
        ),
        sa.Column(
            "idempotency_key",
            sa.String(length=128),
            nullable=False,
        ),
        sa.Column(
            "request_hash",
            sa.String(length=64),
            nullable=False,
        ),
        sa.Column(
            "idempotency_expires_at",
            sa.DateTime(timezone=True),
            nullable=False,
        ),
        sa.Column(
            "started_at",
            sa.DateTime(timezone=True),
            nullable=True,
        ),
        sa.Column(
            "completed_at",
            sa.DateTime(timezone=True),
            nullable=True,
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
        sa.CheckConstraint(
            "progress BETWEEN 0 AND 100",
            name=("ck_demo_jobs_progress_range"),
        ),
        sa.PrimaryKeyConstraint(
            "id",
            name="pk_demo_jobs",
        ),
        sa.UniqueConstraint(
            "idempotency_key",
            name=("uq_demo_jobs_idempotency_key"),
        ),
    )

    op.create_index(
        "ix_demo_jobs_status",
        "demo_jobs",
        ["status"],
        unique=False,
    )

    op.create_index(
        "ix_demo_jobs_type",
        "demo_jobs",
        ["type"],
        unique=False,
    )

    op.create_index(
        "ix_demo_jobs_created_at",
        "demo_jobs",
        ["created_at"],
        unique=False,
    )


def downgrade() -> None:
    op.drop_index(
        "ix_demo_jobs_created_at",
        table_name="demo_jobs",
    )

    op.drop_index(
        "ix_demo_jobs_type",
        table_name="demo_jobs",
    )

    op.drop_index(
        "ix_demo_jobs_status",
        table_name="demo_jobs",
    )

    op.drop_table("demo_jobs")

    job_status.drop(
        op.get_bind(),
        checkfirst=True,
    )

    job_type.drop(
        op.get_bind(),
        checkfirst=True,
    )
