from datetime import date
from uuid import uuid4

import pytest
from pydantic import ValidationError

from app.schemas.employee import (
    EmployeeCreate,
    EmployeeDeactivate,
    EmployeeUpdate,
)


def test_employee_create_normalizes_values() -> None:
    payload = EmployeeCreate(
        first_name="  Alex   Morgan ",
        last_name=" Example ",
        email="ALEX@EXAMPLE.COM",
        department_id=uuid4(),
        job_title=" Backend   Developer ",
        start_date=date(2026, 7, 15),
    )

    assert payload.first_name == ("Alex Morgan")

    assert payload.last_name == "Example"

    assert str(payload.email) == ("alex@example.com")

    assert payload.job_title == ("Backend Developer")


def test_employee_requires_demo_domain() -> None:
    with pytest.raises(ValidationError):
        EmployeeCreate(
            first_name="Alex",
            last_name="Example",
            email="alex@company.com",
            department_id=uuid4(),
            job_title="Developer",
            start_date=date(2026, 7, 15),
        )


def test_employee_update_rejects_empty() -> None:
    with pytest.raises(ValidationError):
        EmployeeUpdate()


def test_employee_update_allows_manager_removal() -> None:
    payload = EmployeeUpdate.model_validate(
        {
            "managerId": None,
        }
    )

    assert payload.manager_id is None

    assert "manager_id" in payload.model_fields_set


def test_deactivate_normalizes_reason() -> None:
    payload = EmployeeDeactivate(reason=(" Synthetic   offboarding  demonstration "))

    assert payload.reason == ("Synthetic offboarding demonstration")
