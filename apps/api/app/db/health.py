import logging

from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

from app.db.session import engine

logger = logging.getLogger(
    "portfolio.api.database",
)


async def check_database() -> bool:
    try:
        async with engine.connect() as connection:
            await connection.execute(text("SELECT 1"))

        return True
    except SQLAlchemyError as error:
        logger.warning(
            "Database readiness check failed",
            extra={
                "errorType": type(error).__name__,
            },
        )

        return False
