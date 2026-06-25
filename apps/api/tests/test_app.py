from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_openapi_metadata_is_available() -> None:
    response = client.get("/api/openapi.json")

    assert response.status_code == 200

    payload = response.json()

    assert payload["info"]["title"] == (
        "Khasandjon Babadzhanov — Portfolio API"
    )
    assert payload["info"]["version"] == "0.1.0"


def test_live_health_check_returns_ok() -> None:
    response = client.get("/api/health/live")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_ready_health_check_returns_ok() -> None:
    response = client.get("/api/health/ready")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
