import hashlib
import json
import math
import time
from collections.abc import (
    Awaitable,
    Callable,
)
from dataclasses import dataclass
from threading import Lock
from typing import Any

from fastapi import Request, Response
from starlette.middleware.base import (
    BaseHTTPMiddleware,
)
from starlette.types import (
    ASGIApp,
    Message,
    Receive,
    Scope,
    Send,
)

from app.core.errors import (
    ErrorCode,
    create_error_response,
)


@dataclass(slots=True)
class WindowState:
    started_at: float
    count: int


@dataclass(frozen=True, slots=True)
class RateLimitDecision:
    allowed: bool
    limit: int
    remaining: int
    retry_after: int


class InMemoryFixedWindowLimiter:
    def __init__(self) -> None:
        self._windows: dict[
            tuple[str, str],
            WindowState,
        ] = {}

        self._lock = Lock()

    def consume(
        self,
        *,
        bucket: str,
        client_key: str,
        limit: int,
        window_seconds: int,
    ) -> RateLimitDecision:
        now = time.monotonic()
        lookup_key = (
            bucket,
            client_key,
        )

        with self._lock:
            state = self._windows.get(lookup_key)

            if state is None or (now - state.started_at) >= window_seconds:
                state = WindowState(
                    started_at=now,
                    count=0,
                )

                self._windows[lookup_key] = state

            elapsed = now - state.started_at

            retry_after = max(
                1,
                math.ceil(window_seconds - elapsed),
            )

            if state.count >= limit:
                return RateLimitDecision(
                    allowed=False,
                    limit=limit,
                    remaining=0,
                    retry_after=retry_after,
                )

            state.count += 1

            return RateLimitDecision(
                allowed=True,
                limit=limit,
                remaining=max(
                    limit - state.count,
                    0,
                ),
                retry_after=retry_after,
            )

    def reset(self) -> None:
        with self._lock:
            self._windows.clear()


demo_rate_limiter = InMemoryFixedWindowLimiter()


RequestResponseEndpoint = Callable[
    [Request],
    Awaitable[Response],
]


class DemoRateLimitMiddleware(BaseHTTPMiddleware):
    def __init__(
        self,
        app: ASGIApp,
        *,
        read_limit: int,
        write_limit: int,
        job_limit: int,
        window_seconds: int,
        salt: str,
    ) -> None:
        super().__init__(app)

        self._read_limit = read_limit
        self._write_limit = write_limit
        self._job_limit = job_limit
        self._window_seconds = window_seconds

        self._salt = salt

    async def dispatch(
        self,
        request: Request,
        call_next: RequestResponseEndpoint,
    ) -> Response:
        if not request.url.path.startswith("/api/demo/v1"):
            return await call_next(request)

        bucket, limit = self._resolve_policy(request)

        client_host = request.client.host if request.client else "unknown"

        client_key = hashlib.sha256((f"{self._salt}:{client_host}").encode()).hexdigest()

        decision = demo_rate_limiter.consume(
            bucket=bucket,
            client_key=client_key,
            limit=limit,
            window_seconds=(self._window_seconds),
        )

        headers = {
            "X-RateLimit-Limit": str(decision.limit),
            "X-RateLimit-Remaining": str(decision.remaining),
        }

        if not decision.allowed:
            headers["Retry-After"] = str(decision.retry_after)

            return create_error_response(
                request=request,
                status_code=429,
                code=ErrorCode.RATE_LIMITED,
                message=("Too many requests. Please try again later."),
                headers=headers,
            )

        response = await call_next(request)

        for name, value in headers.items():
            response.headers[name] = value

        return response

    def _resolve_policy(
        self,
        request: Request,
    ) -> tuple[str, int]:
        normalized_path = request.url.path.rstrip("/")

        if request.method == "POST" and normalized_path == "/api/demo/v1/jobs":
            return (
                "jobs",
                self._job_limit,
            )

        if request.method in {
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
        }:
            return (
                "writes",
                self._write_limit,
            )

        return (
            "reads",
            self._read_limit,
        )


class BodyLimitExceeded(Exception):
    pass


class DemoBodyLimitMiddleware:
    def __init__(
        self,
        app: ASGIApp,
        *,
        max_bytes: int,
    ) -> None:
        self._app = app
        self._max_bytes = max_bytes

    async def __call__(
        self,
        scope: Scope,
        receive: Receive,
        send: Send,
    ) -> None:
        if not self._should_limit(scope):
            await self._app(
                scope,
                receive,
                send,
            )

            return

        headers = {
            key.lower(): value
            for key, value in scope.get(
                "headers",
                [],
            )
        }

        raw_content_length = headers.get(b"content-length")

        if raw_content_length is not None:
            try:
                content_length = int(raw_content_length)
            except ValueError:
                content_length = 0

            if content_length > self._max_bytes:
                await self._send_too_large(
                    scope,
                    send,
                )

                return

        received_bytes = 0

        async def limited_receive() -> Message:
            nonlocal received_bytes

            message = await receive()

            if message["type"] == "http.request":
                body = message.get(
                    "body",
                    b"",
                )

                received_bytes += len(body)

                if received_bytes > self._max_bytes:
                    raise BodyLimitExceeded

            return message

        try:
            await self._app(
                scope,
                limited_receive,
                send,
            )
        except BodyLimitExceeded:
            await self._send_too_large(
                scope,
                send,
            )

    @staticmethod
    def _should_limit(
        scope: Scope,
    ) -> bool:
        if scope["type"] != "http":
            return False

        path = str(scope.get("path", ""))

        method = str(scope.get("method", "")).upper()

        return path.startswith("/api/demo/v1") and method in {
            "POST",
            "PUT",
            "PATCH",
        }

    async def _send_too_large(
        self,
        scope: Scope,
        send: Send,
    ) -> None:
        state: dict[str, Any] = scope.get("state") or {}

        request_id = str(
            state.get(
                "request_id",
                "unknown",
            )
        )

        body = json.dumps(
            {
                "error": {
                    "code": ("PAYLOAD_TOO_LARGE"),
                    "message": ("The request body is too large."),
                    "requestId": request_id,
                }
            },
            ensure_ascii=False,
        ).encode("utf-8")

        await send(
            {
                "type": "http.response.start",
                "status": 413,
                "headers": [
                    (
                        b"content-type",
                        b"application/json",
                    ),
                    (
                        b"content-length",
                        str(len(body)).encode("ascii"),
                    ),
                ],
            }
        )

        await send(
            {
                "type": "http.response.body",
                "body": body,
            }
        )
