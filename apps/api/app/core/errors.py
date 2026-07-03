import logging
from collections.abc import Mapping
from enum import StrEnum
from typing import Any

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.domain.exceptions import (
    DepartmentNotFound,
    DuplicateDepartmentCode,
)

logger = logging.getLogger("portfolio.api.errors")


class ErrorCode(StrEnum):
    VALIDATION_ERROR = "VALIDATION_ERROR"
    UNAUTHORIZED = "UNAUTHORIZED"
    FORBIDDEN = "FORBIDDEN"
    NOT_FOUND = "NOT_FOUND"
    CONFLICT = "CONFLICT"
    RATE_LIMITED = "RATE_LIMITED"
    PAYLOAD_TOO_LARGE = "PAYLOAD_TOO_LARGE"
    IDEMPOTENCY_CONFLICT = "IDEMPOTENCY_CONFLICT"
    DATABASE_UNAVAILABLE = "DATABASE_UNAVAILABLE"
    SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE"
    INTERNAL_ERROR = "INTERNAL_ERROR"


class AppError(Exception):
    def __init__(
        self,
        *,
        status_code: int,
        code: ErrorCode,
        message: str,
        fields: Mapping[str, str] | None = None,
    ) -> None:
        super().__init__(message)

        self.status_code = status_code
        self.code = code
        self.message = message
        self.fields = dict(fields or {})


def get_request_id(request: Request) -> str:
    return getattr(
        request.state,
        "request_id",
        "unknown",
    )


def create_error_response(
    *,
    request: Request,
    status_code: int,
    code: ErrorCode,
    message: str,
    fields: Mapping[str, str] | None = None,
) -> JSONResponse:
    error: dict[str, Any] = {
        "code": code.value,
        "message": message,
        "requestId": get_request_id(request),
    }

    if fields:
        error["fields"] = dict(fields)

    return JSONResponse(
        status_code=status_code,
        content={
            "error": error,
        },
    )


def validation_field_name(
    location: tuple[Any, ...],
) -> str:
    ignored_parts = {
        "body",
        "query",
        "path",
        "header",
        "cookie",
    }

    parts = [str(part) for part in location if str(part) not in ignored_parts]

    return ".".join(parts) or "request"


def safe_validation_message(
    error: Mapping[str, Any],
) -> str:
    message = str(
        error.get(
            "msg",
            "The submitted value is invalid.",
        )
    )

    if message == "Field required":
        return "This field is required."

    return message


def status_error_code(
    status_code: int,
) -> ErrorCode:
    mapping = {
        401: ErrorCode.UNAUTHORIZED,
        403: ErrorCode.FORBIDDEN,
        404: ErrorCode.NOT_FOUND,
        409: ErrorCode.CONFLICT,
        413: ErrorCode.PAYLOAD_TOO_LARGE,
        429: ErrorCode.RATE_LIMITED,
        503: ErrorCode.SERVICE_UNAVAILABLE,
    }

    if status_code in mapping:
        return mapping[status_code]

    if 400 <= status_code < 500:
        return ErrorCode.VALIDATION_ERROR

    return ErrorCode.INTERNAL_ERROR


def register_exception_handlers(
    app: FastAPI,
) -> None:
    @app.exception_handler(DepartmentNotFound)
    async def handle_department_not_found(
        request: Request,
        _error: DepartmentNotFound,
    ) -> JSONResponse:
        return create_error_response(
            request=request,
            status_code=404,
            code=ErrorCode.NOT_FOUND,
            message="Department was not found.",
        )

    @app.exception_handler(DuplicateDepartmentCode)
    async def handle_duplicate_department_code(
        request: Request,
        error: DuplicateDepartmentCode,
    ) -> JSONResponse:
        return create_error_response(
            request=request,
            status_code=409,
            code=ErrorCode.CONFLICT,
            message=("A department with this code already exists."),
            fields={
                "code": (f"Code {error.code} is already in use."),
            },
        )

    @app.exception_handler(AppError)
    async def handle_app_error(
        request: Request,
        error: AppError,
    ) -> JSONResponse:
        return create_error_response(
            request=request,
            status_code=error.status_code,
            code=error.code,
            message=error.message,
            fields=error.fields,
        )

    @app.exception_handler(RequestValidationError)
    async def handle_validation_error(
        request: Request,
        error: RequestValidationError,
    ) -> JSONResponse:
        fields: dict[str, str] = {}

        for item in error.errors():
            field = validation_field_name(tuple(item.get("loc", ())))

            fields.setdefault(
                field,
                safe_validation_message(item),
            )

        return create_error_response(
            request=request,
            status_code=422,
            code=ErrorCode.VALIDATION_ERROR,
            message="The submitted data is invalid.",
            fields=fields,
        )

    @app.exception_handler(StarletteHTTPException)
    async def handle_http_error(
        request: Request,
        error: StarletteHTTPException,
    ) -> JSONResponse:
        message = (
            error.detail if isinstance(error.detail, str) else "The request could not be completed."
        )

        return create_error_response(
            request=request,
            status_code=error.status_code,
            code=status_error_code(error.status_code),
            message=message,
        )

    @app.exception_handler(Exception)
    async def handle_unexpected_error(
        request: Request,
        error: Exception,
    ) -> JSONResponse:
        logger.exception(
            "Unhandled API error",
            extra={
                "requestId": get_request_id(request),
                "errorType": type(error).__name__,
            },
        )

        return create_error_response(
            request=request,
            status_code=500,
            code=ErrorCode.INTERNAL_ERROR,
            message=("The request could not be completed."),
        )
