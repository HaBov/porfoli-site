import re
from collections.abc import Awaitable, Callable
from contextvars import ContextVar
from uuid import uuid4

from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware

REQUEST_ID_HEADER = "X-Request-ID"

_REQUEST_ID_PATTERN = re.compile(r"^[A-Za-z0-9._:-]{1,64}$")

_request_id_context: ContextVar[str] = ContextVar(
    "portfolio_request_id",
    default="unknown",
)


def get_request_id() -> str:
    return _request_id_context.get()


def generate_request_id() -> str:
    return f"req_{uuid4().hex}"


def resolve_request_id(
    incoming_value: str | None,
) -> str:
    if incoming_value is None:
        return generate_request_id()

    candidate = incoming_value.strip()

    if not _REQUEST_ID_PATTERN.fullmatch(candidate):
        return generate_request_id()

    return candidate


RequestResponseEndpoint = Callable[
    [Request],
    Awaitable[Response],
]


class RequestIdMiddleware(BaseHTTPMiddleware):
    async def dispatch(
        self,
        request: Request,
        call_next: RequestResponseEndpoint,
    ) -> Response:
        request_id = resolve_request_id(request.headers.get(REQUEST_ID_HEADER))

        token = _request_id_context.set(request_id)

        request.state.request_id = request_id

        try:
            response = await call_next(request)

            response.headers[REQUEST_ID_HEADER] = request_id

            return response
        finally:
            _request_id_context.reset(token)
