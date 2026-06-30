export const externalApiPaginationCode = String.raw`import asyncio
from collections.abc import AsyncIterator
from datetime import datetime
from email.utils import parsedate_to_datetime
from typing import Any

import httpx
from pydantic import BaseModel, ConfigDict, Field


class ExternalRecording(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str
    created_at: datetime
    duration_seconds: int = Field(ge=0)
    download_url: str | None = None


class RecordingPage(BaseModel):
    model_config = ConfigDict(extra="ignore")

    items: list[ExternalRecording]
    continuation_token: str | None = None


class ExternalApiError(RuntimeError):
    pass


class ExternalRateLimitError(ExternalApiError):
    pass


class RecordingClient:
    def __init__(
        self,
        *,
        http: httpx.AsyncClient,
        base_url: str,
        access_token: str,
        max_retries: int = 4,
    ) -> None:
        self._http = http
        self._base_url = base_url.rstrip("/")
        self._access_token = access_token
        self._max_retries = max_retries

    async def iter_recordings(
        self,
        *,
        date_from: datetime,
        date_to: datetime,
        page_size: int = 100,
        max_pages: int | None = None,
    ) -> AsyncIterator[ExternalRecording]:
        continuation_token: str | None = None
        seen_tokens: set[str] = set()
        page_number = 0

        while True:
            if max_pages is not None and page_number >= max_pages:
                return

            page = await self._fetch_page(
                date_from=date_from,
                date_to=date_to,
                page_size=page_size,
                continuation_token=continuation_token,
            )

            for recording in page.items:
                yield recording

            page_number += 1
            next_token = page.continuation_token

            if next_token is None:
                return

            if next_token in seen_tokens:
                raise ExternalApiError(
                    "Pagination stopped because the API repeated a continuation token"
                )

            seen_tokens.add(next_token)
            continuation_token = next_token

    async def _fetch_page(
        self,
        *,
        date_from: datetime,
        date_to: datetime,
        page_size: int,
        continuation_token: str | None,
    ) -> RecordingPage:
        params: dict[str, Any] = {
            "date_from": date_from.isoformat(),
            "date_to": date_to.isoformat(),
            "per_page": page_size,
        }

        if continuation_token:
            params["continuation_token"] = continuation_token

        for attempt in range(self._max_retries + 1):
            response = await self._http.get(
                f"{self._base_url}/recordings",
                headers={
                    "authorization": f"Bearer {self._access_token}",
                    "accept": "application/json",
                },
                params=params,
                timeout=httpx.Timeout(20.0),
            )

            if response.status_code == 429:
                if attempt >= self._max_retries:
                    raise ExternalRateLimitError(
                        "The external API rate limit retry budget was exhausted"
                    )

                await asyncio.sleep(
                    self._retry_delay(
                        response=response,
                        attempt=attempt,
                    )
                )
                continue

            if response.status_code >= 500:
                if attempt >= self._max_retries:
                    raise ExternalApiError(
                        f"External API failed with status {response.status_code}"
                    )

                await asyncio.sleep(min(2**attempt, 8))
                continue

            if response.status_code >= 400:
                raise ExternalApiError(
                    f"External API rejected the request with status {response.status_code}"
                )

            return RecordingPage.model_validate(response.json())

        raise ExternalApiError("External API retry loop ended unexpectedly")

    @staticmethod
    def _retry_delay(
        *,
        response: httpx.Response,
        attempt: int,
    ) -> float:
        retry_after = response.headers.get("retry-after")

        if retry_after is None:
            return float(min(2**attempt, 30))

        try:
            return max(float(retry_after), 0.0)
        except ValueError:
            retry_at = parsedate_to_datetime(retry_after)
            now = datetime.now(retry_at.tzinfo)
            return max((retry_at - now).total_seconds(), 0.0)`;

export const externalApiPaginationTestCode = String.raw`from datetime import UTC, datetime

import httpx
import pytest

from app.integrations.recordings import RecordingClient


@pytest.mark.asyncio
async def test_iterator_follows_continuation_token() -> None:
    requested_tokens: list[str | None] = []

    async def handler(request: httpx.Request) -> httpx.Response:
        token = request.url.params.get("continuation_token")
        requested_tokens.append(token)

        if token is None:
            return httpx.Response(
                200,
                json={
                    "items": [
                        {
                            "id": "recording-001",
                            "created_at": "2026-06-01T10:00:00Z",
                            "duration_seconds": 42,
                        }
                    ],
                    "continuation_token": "page-two",
                },
            )

        return httpx.Response(
            200,
            json={
                "items": [
                    {
                        "id": "recording-002",
                        "created_at": "2026-06-01T11:00:00Z",
                        "duration_seconds": 65,
                    }
                ],
                "continuation_token": None,
            },
        )

    transport = httpx.MockTransport(handler)

    async with httpx.AsyncClient(transport=transport) as http:
        client = RecordingClient(
            http=http,
            base_url="https://api.example.com",
            access_token="test-token",
        )

        recordings = [
            item
            async for item in client.iter_recordings(
                date_from=datetime(2026, 6, 1, tzinfo=UTC),
                date_to=datetime(2026, 6, 2, tzinfo=UTC),
            )
        ]

    assert [item.id for item in recordings] == [
        "recording-001",
        "recording-002",
    ]
    assert requested_tokens == [None, "page-two"]`;
