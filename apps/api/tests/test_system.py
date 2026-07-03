import re
from unittest.mock import AsyncMock

from fastapi.testclient import TestClient

import app.api.routes.health as health_module

REQUEST_ID_PATTERN = re.compile(r"^req_[0-9a-f]{32}$")


def test_liveness_endpoint(
    client: TestClient,
) -> None:
    response = client.get("/api/health/live")

    assert response.status_code == 200
    assert response.json() == {
        "status": "ok",
        "service": "Portfolio Demo API",
        "version": "1.0.0",
        "checks": {
            "application": "ok",
        },
    }

    request_id = response.headers["x-request-id"]

    assert REQUEST_ID_PATTERN.fullmatch(request_id)


def test_readiness_endpoint(
    client: TestClient,
    monkeypatch,
) -> None:
    monkeypatch.setattr(
        health_module,
        "check_database",
        AsyncMock(return_value=True),
    )

    response = client.get("/api/health/ready")

    assert response.status_code == 200
    assert response.json() == {
        "status": "ready",
        "service": "Portfolio Demo API",
        "version": "1.0.0",
        "checks": {
            "application": "ok",
            "database": "ok",
        },
    }


def test_readiness_fails_when_database_is_down(
    client: TestClient,
    monkeypatch,
) -> None:
    monkeypatch.setattr(
        health_module,
        "check_database",
        AsyncMock(return_value=False),
    )

    response = client.get("/api/health/ready")

    assert response.status_code == 503
    assert response.json() == {
        "status": "unavailable",
        "service": "Portfolio Demo API",
        "version": "1.0.0",
        "checks": {
            "application": "ok",
            "database": "unavailable",
        },
    }


def test_valid_incoming_request_id_is_used(
    client: TestClient,
) -> None:
    response = client.get(
        "/api/health/live",
        headers={
            "X-Request-ID": "portfolio-test-request",
        },
    )

    assert response.headers["x-request-id"] == "portfolio-test-request"


def test_invalid_request_id_is_replaced(
    client: TestClient,
) -> None:
    response = client.get(
        "/api/health/live",
        headers={
            "X-Request-ID": ("invalid request id with spaces"),
        },
    )

    request_id = response.headers["x-request-id"]

    assert request_id != ("invalid request id with spaces")

    assert REQUEST_ID_PATTERN.fullmatch(request_id)


def test_demo_metadata_endpoint(
    client: TestClient,
) -> None:
    response = client.get("/api/demo/v1")

    assert response.status_code == 200

    assert response.json() == {
        "name": "Portfolio Demo API",
        "version": "1.0",
        "dataPolicy": ("Synthetic demonstration data only"),
        "documentation": "/api/docs",
        "resources": {
            "departments": ("/api/demo/v1/departments"),
            "employees": ("/api/demo/v1/employees"),
            "auditEvents": ("/api/demo/v1/audit-events"),
            "jobs": "/api/demo/v1/jobs",
        },
    }


def test_unknown_route_uses_error_envelope(
    client: TestClient,
) -> None:
    response = client.get("/api/demo/v1/missing")

    assert response.status_code == 404

    payload = response.json()

    assert payload["error"]["code"] == ("NOT_FOUND")

    assert payload["error"]["message"] == ("Not Found")

    assert payload["error"]["requestId"] == response.headers["x-request-id"]


def test_openapi_schema_is_available(
    client: TestClient,
) -> None:
    response = client.get("/api/openapi.json")

    assert response.status_code == 200

    schema = response.json()

    assert schema["info"]["title"] == ("Portfolio Demo API")

    assert "/api/health/live" in schema["paths"]

    assert "/api/demo/v1" in schema["paths"]
