export const celeryArchiveTaskCode = String.raw`from datetime import UTC, datetime
from uuid import UUID

from celery import Task
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.celery import celery_app
from app.db.session import session_factory
from app.integrations.archive import (
    ArchiveClient,
    PermanentArchiveError,
    RetryableArchiveError,
)
from app.logging import get_logger
from app.models.archive_item import ArchiveItem, ArchiveStatus

logger = get_logger(__name__)

RETRY_DELAYS_SECONDS = (30, 120, 300, 900)


def retry_delay(retry_number: int) -> int:
    index = min(retry_number, len(RETRY_DELAYS_SECONDS) - 1)
    return RETRY_DELAYS_SECONDS[index]


def load_item_for_update(
    session: Session,
    item_id: UUID,
) -> ArchiveItem:
    item = session.scalar(
        select(ArchiveItem)
        .where(ArchiveItem.id == item_id)
        .with_for_update()
    )

    if item is None:
        raise LookupError(f"Archive item {item_id} was not found")

    return item


@celery_app.task(
    bind=True,
    max_retries=4,
    acks_late=True,
    reject_on_worker_lost=True,
)
def archive_media_item(
    self: Task,
    item_id: str,
) -> dict[str, str]:
    archive_item_id = UUID(item_id)
    task_id = self.request.id or "unknown"

    with session_factory() as session:
        item = load_item_for_update(session, archive_item_id)

        if item.status == ArchiveStatus.COMPLETED:
            return {
                "item_id": item_id,
                "status": "already_completed",
                "storage_key": item.storage_key or "",
            }

        item.status = ArchiveStatus.PROCESSING
        item.task_id = task_id
        item.attempt_count += 1
        item.last_error = None
        item.updated_at = datetime.now(UTC)

        source_url = item.source_url
        storage_key = item.requested_storage_key

        session.commit()

    client = ArchiveClient()

    try:
        result = client.transfer(
            source_url=source_url,
            storage_key=storage_key,
        )
    except RetryableArchiveError as error:
        retries_used = int(self.request.retries)

        if retries_used >= int(self.max_retries or 0):
            mark_item_failed(
                item_id=archive_item_id,
                error_code="retry_limit_exceeded",
                error_message=str(error),
            )

            logger.exception(
                "Archive item exhausted retry limit",
                extra={
                    "archive_item_id": item_id,
                    "task_id": task_id,
                    "retry_count": retries_used,
                },
            )
            raise

        mark_item_for_retry(
            item_id=archive_item_id,
            error_message=str(error),
        )

        delay = retry_delay(retries_used)

        logger.warning(
            "Archive item scheduled for retry",
            extra={
                "archive_item_id": item_id,
                "task_id": task_id,
                "retry_count": retries_used,
                "retry_delay_seconds": delay,
            },
        )

        raise self.retry(
            exc=error,
            countdown=delay,
        )
    except PermanentArchiveError as error:
        mark_item_failed(
            item_id=archive_item_id,
            error_code="permanent_archive_failure",
            error_message=str(error),
        )

        logger.exception(
            "Archive item failed permanently",
            extra={
                "archive_item_id": item_id,
                "task_id": task_id,
            },
        )
        raise
    except Exception as error:
        mark_item_failed(
            item_id=archive_item_id,
            error_code="unexpected_archive_failure",
            error_message=str(error),
        )

        logger.exception(
            "Archive item failed unexpectedly",
            extra={
                "archive_item_id": item_id,
                "task_id": task_id,
            },
        )
        raise

    with session_factory() as session:
        item = load_item_for_update(session, archive_item_id)
        item.status = ArchiveStatus.COMPLETED
        item.storage_key = result.storage_key
        item.content_type = result.content_type
        item.size_bytes = result.size_bytes
        item.completed_at = datetime.now(UTC)
        item.updated_at = datetime.now(UTC)
        session.commit()

    logger.info(
        "Archive item completed",
        extra={
            "archive_item_id": item_id,
            "task_id": task_id,
            "storage_key": result.storage_key,
            "size_bytes": result.size_bytes,
        },
    )

    return {
        "item_id": item_id,
        "status": "completed",
        "storage_key": result.storage_key,
    }


def mark_item_for_retry(
    *,
    item_id: UUID,
    error_message: str,
) -> None:
    with session_factory() as session:
        item = load_item_for_update(session, item_id)
        item.status = ArchiveStatus.RETRY_PENDING
        item.last_error = error_message[:500]
        item.updated_at = datetime.now(UTC)
        session.commit()


def mark_item_failed(
    *,
    item_id: UUID,
    error_code: str,
    error_message: str,
) -> None:
    with session_factory() as session:
        item = load_item_for_update(session, item_id)
        item.status = ArchiveStatus.FAILED
        item.error_code = error_code
        item.last_error = error_message[:500]
        item.failed_at = datetime.now(UTC)
        item.updated_at = datetime.now(UTC)
        session.commit()`;

export const celeryArchiveTaskTestCode = String.raw`from unittest.mock import Mock

import pytest

from app.models.archive_item import ArchiveStatus
from app.tasks.archive_items import archive_media_item


@pytest.mark.usefixtures("celery_eager_mode")
def test_completed_item_is_not_transferred_twice(
    session,
    completed_archive_item,
    monkeypatch,
) -> None:
    transfer = Mock()
    monkeypatch.setattr(
        "app.tasks.archive_items.ArchiveClient.transfer",
        transfer,
    )

    result = archive_media_item.apply(
        args=[str(completed_archive_item.id)],
    ).get()

    assert result == {
        "item_id": str(completed_archive_item.id),
        "status": "already_completed",
        "storage_key": completed_archive_item.storage_key,
    }
    transfer.assert_not_called()

    session.refresh(completed_archive_item)
    assert completed_archive_item.status == ArchiveStatus.COMPLETED`;
