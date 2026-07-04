from collections.abc import Iterator

import pytest
from fastapi.testclient import TestClient

from app.core.demo_safety import (
    demo_rate_limiter,
)
from app.main import app


@pytest.fixture(autouse=True)
def reset_rate_limit_state() -> Iterator[None]:
    demo_rate_limiter.reset()

    yield

    demo_rate_limiter.reset()


@pytest.fixture
def client() -> Iterator[TestClient]:
    with TestClient(app) as test_client:
        yield test_client
