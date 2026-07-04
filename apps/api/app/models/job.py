from datetime import datetime
from enum import StrEnum
from typing import Any

from sqlalchemy import (
    CheckConstraint,
    DateTime,
    Enum,
    Index,
    SmallInteger,
    String,
    text,
)
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import (
    Base,
    CreatedAtMixin,
    UuidPrimaryKeyMixin,
)


class JobType(StrEnum):
    EMPLOYEE_REPORT = "employee-report"
    DEPARTMENT_SUMMARY = "department-summary"
    AUDIT_EXPORT = "audit-export"


class JobStatus(StrEnum):
    QUEUED = "queued"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"


job_type_enum = Enum(
    JobType,
    name="demo_job_type",
    values_callable=lambda enum_type: [item.value for item in enum_type],
    validate_strings=True,
)


job_status_enum = Enum(
    JobStatus,
    name="demo_job_status",
    values_callable=lambda enum_type: [item.value for item in enum_type],
    validate_strings=True,
)


class DemoJob(
    UuidPrimaryKeyMixin,
    CreatedAtMixin,
    Base,
):
    __tablename__ = "demo_jobs"

    __table_args__ = (
        CheckConstraint(
            "progress BETWEEN 0 AND 100",
            name="progress_range",
        ),
        Index(
            "ix_demo_jobs_status",
            "status",
        ),
        Index(
            "ix_demo_jobs_type",
            "type",
        ),
        Index(
            "ix_demo_jobs_created_at",
            "created_at",
        ),
    )

    type: Mapped[JobType] = mapped_column(
        job_type_enum,
        nullable=False,
    )

    status: Mapped[JobStatus] = mapped_column(
        job_status_enum,
        default=JobStatus.QUEUED,
        server_default=text("'queued'::demo_job_status"),
        nullable=False,
    )

    parameters: Mapped[dict[str, Any]] = mapped_column(
        JSONB,
        default=dict,
        server_default=text("'{}'::jsonb"),
        nullable=False,
    )

    progress: Mapped[int] = mapped_column(
        SmallInteger,
        default=0,
        server_default=text("0"),
        nullable=False,
    )

    result: Mapped[dict[str, Any] | None] = mapped_column(
        JSONB,
        nullable=True,
    )

    error_code: Mapped[str | None] = mapped_column(
        String(80),
        nullable=True,
    )

    idempotency_key: Mapped[str] = mapped_column(
        String(128),
        unique=True,
        nullable=False,
    )

    request_hash: Mapped[str] = mapped_column(
        String(64),
        nullable=False,
    )

    idempotency_expires_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
    )

    started_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    completed_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )
