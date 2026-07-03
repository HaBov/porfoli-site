from sqlalchemy import CheckConstraint

from app.models import (
    Employee,
    EmployeeStatus,
)


def test_employee_profile_columns_exist() -> None:
    assert {
        "id",
        "first_name",
        "last_name",
        "email",
        "department_id",
        "job_title",
        "status",
        "start_date",
        "manager_id",
        "created_at",
        "updated_at",
    } <= set(Employee.__table__.columns.keys())


def test_employee_status_values_match_contract() -> None:
    assert [status.value for status in EmployeeStatus] == [
        "onboarding",
        "active",
        "leave",
        "offboarding",
        "inactive",
    ]


def test_employee_manager_foreign_key() -> None:
    foreign_key = next(iter(Employee.__table__.c.manager_id.foreign_keys))

    assert foreign_key.target_fullname == ("employees.id")

    assert foreign_key.ondelete == "SET NULL"


def test_employee_prevents_direct_self_manager() -> None:
    check_names = {
        constraint.name
        for constraint in Employee.__table__.constraints
        if isinstance(
            constraint,
            CheckConstraint,
        )
    }

    assert "ck_employees_manager_not_self" in check_names


def test_employee_search_indexes_exist() -> None:
    index_names = {index.name for index in Employee.__table__.indexes}

    assert {
        "ix_employees_department_status",
        "ix_employees_last_name",
        "ix_employees_created_at",
        "ix_employees_manager_id",
    } <= index_names
