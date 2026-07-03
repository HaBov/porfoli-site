import asyncio
from datetime import date
from uuid import NAMESPACE_URL, UUID, uuid5

from app.db.session import (
    async_session_factory,
    dispose_engine,
)
from app.models import (
    AuditEvent,
    Department,
    Employee,
    EmployeeStatus,
)


def stable_uuid(value: str) -> UUID:
    return uuid5(
        NAMESPACE_URL,
        f"portfolio-demo:{value}",
    )


async def seed_demo_data() -> None:
    engineering_id = stable_uuid("department:engineering")

    operations_id = stable_uuid("department:operations")

    people_id = stable_uuid("department:people")

    alex_id = stable_uuid("employee:alex-morgan")

    jordan_id = stable_uuid("employee:jordan-lee")

    taylor_id = stable_uuid("employee:taylor-smith")

    async with async_session_factory() as session:
        departments = [
            Department(
                id=engineering_id,
                name="Demo Engineering",
                code="ENG",
                description=("Synthetic software delivery department."),
                active=True,
            ),
            Department(
                id=operations_id,
                name="Example Operations",
                code="OPS",
                description=("Synthetic business operations department."),
                active=True,
            ),
            Department(
                id=people_id,
                name="Sample People Operations",
                code="PEOPLE",
                description=("Synthetic people operations department."),
                active=True,
            ),
        ]

        employees = [
            Employee(
                id=alex_id,
                first_name="Alex",
                last_name="Morgan",
                email="alex.morgan@example.com",
                department_id=engineering_id,
                job_title="Backend Developer",
                status=EmployeeStatus.ACTIVE,
                start_date=date(
                    2025,
                    7,
                    1,
                ),
                manager_id=None,
            ),
            Employee(
                id=jordan_id,
                first_name="Jordan",
                last_name="Lee",
                email="jordan.lee@example.org",
                department_id=operations_id,
                job_title=("Operations Coordinator"),
                status=(EmployeeStatus.ONBOARDING),
                start_date=date(
                    2026,
                    7,
                    15,
                ),
                manager_id=None,
            ),
            Employee(
                id=taylor_id,
                first_name="Taylor",
                last_name="Smith",
                email="taylor.smith@example.com",
                department_id=people_id,
                job_title=("People Operations Specialist"),
                status=(EmployeeStatus.OFFBOARDING),
                start_date=date(
                    2025,
                    11,
                    3,
                ),
                manager_id=None,
            ),
        ]

        audit_events = [
            AuditEvent(
                id=stable_uuid("audit:department-engineering"),
                action="department.seeded",
                entity_type="department",
                entity_id=engineering_id,
                actor="demo-seed",
                details={
                    "synthetic": True,
                },
            ),
            AuditEvent(
                id=stable_uuid("audit:employee-alex"),
                action="employee.seeded",
                entity_type="employee",
                entity_id=alex_id,
                actor="demo-seed",
                details={
                    "synthetic": True,
                    "status": "active",
                },
            ),
        ]

        for department in departments:
            await session.merge(department)

        for employee in employees:
            await session.merge(employee)

        for event in audit_events:
            await session.merge(event)

        await session.commit()

    print("Seeded 3 departments, 3 employees, and 2 audit events.")


async def main() -> None:
    try:
        await seed_demo_data()
    finally:
        await dispose_engine()


if __name__ == "__main__":
    asyncio.run(main())
