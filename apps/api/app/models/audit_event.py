from typing import Any
from uuid import UUID

from sqlalchemy import Index, String, text
from sqlalchemy.dialects.postgresql import (
    JSONB,
)
from sqlalchemy.dialects.postgresql import (
    UUID as PostgreSQLUUID,
)
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import (
    Base,
    CreatedAtMixin,
    UuidPrimaryKeyMixin,
)


class AuditEvent(
    UuidPrimaryKeyMixin,
    CreatedAtMixin,
    Base,
):
    __tablename__ = "audit_events"

    __table_args__ = (
        Index(
            "ix_audit_events_entity",
            "entity_type",
            "entity_id",
        ),
        Index(
            "ix_audit_events_created_at",
            "created_at",
        ),
    )

    action: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    entity_type: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )

    entity_id: Mapped[UUID] = mapped_column(
        PostgreSQLUUID(as_uuid=True),
        nullable=False,
    )

    actor: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    details: Mapped[dict[str, Any]] = mapped_column(
        JSONB,
        default=dict,
        server_default=text("'{}'::jsonb"),
        nullable=False,
    )
