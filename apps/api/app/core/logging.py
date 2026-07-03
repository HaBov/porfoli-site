import json
import logging
from datetime import UTC, datetime
from typing import Any

from app.core.request_id import get_request_id


class JsonFormatter(logging.Formatter):
    def format(
        self,
        record: logging.LogRecord,
    ) -> str:
        payload: dict[str, Any] = {
            "timestamp": datetime.now(UTC).isoformat(),
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
            "requestId": get_request_id(),
        }

        if record.exc_info:
            payload["exception"] = self.formatException(record.exc_info)

        return json.dumps(
            payload,
            ensure_ascii=False,
        )


def configure_logging(
    log_level: str,
) -> None:
    handler = logging.StreamHandler()
    handler.setFormatter(JsonFormatter())

    root_logger = logging.getLogger()
    root_logger.handlers.clear()
    root_logger.addHandler(handler)

    resolved_level = getattr(
        logging,
        log_level.upper(),
        logging.INFO,
    )

    root_logger.setLevel(resolved_level)
