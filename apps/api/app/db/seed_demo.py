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

    finance_id = stable_uuid("department:finance")

    alex_id = stable_uuid("employee:alex-morgan")

    jordan_id = stable_uuid("employee:jordan-lee")

    taylor_id = stable_uuid("employee:taylor-smith")

    casey_id = stable_uuid("employee:casey-rivera")

    morgan_id = stable_uuid("employee:morgan-chen")

    riley_id = stable_uuid("employee:riley-brooks")

    jamie_id = stable_uuid("employee:jamie-patel")

    drew_id = stable_uuid("employee:drew-parker")

    cameron_id = stable_uuid("employee:cameron-wells")

    avery_id = stable_uuid("employee:avery-reed")

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
            Department(
                id=finance_id,
                name="Demo Finance",
                code="FIN",
                description=("Synthetic finance department."),
                active=True,
            ),
        ]

        for department in departments:
            await session.merge(department)

        await session.flush()

        employees = [
            Employee(
                id=alex_id,
                first_name="Alex",
                last_name="Morgan",
                email=("alex.morgan@example.com"),
                department_id=engineering_id,
                job_title=("Engineering Manager"),
                status=EmployeeStatus.ACTIVE,
                start_date=date(2025, 7, 1),
                manager_id=None,
            ),
            Employee(
                id=jordan_id,
                first_name="Jordan",
                last_name="Lee",
                email=("jordan.lee@example.org"),
                department_id=operations_id,
                job_title=("Operations Manager"),
                status=EmployeeStatus.ACTIVE,
                start_date=date(2025, 8, 11),
                manager_id=None,
            ),
            Employee(
                id=taylor_id,
                first_name="Taylor",
                last_name="Smith",
                email=("taylor.smith@example.com"),
                department_id=people_id,
                job_title=("People Operations Lead"),
                status=EmployeeStatus.ACTIVE,
                start_date=date(2025, 11, 3),
                manager_id=None,
            ),
            Employee(
                id=cameron_id,
                first_name="Cameron",
                last_name="Wells",
                email=("cameron.wells@example.net"),
                department_id=finance_id,
                job_title="Finance Lead",
                status=EmployeeStatus.ACTIVE,
                start_date=date(2025, 10, 6),
                manager_id=None,
            ),
            Employee(
                id=casey_id,
                first_name="Casey",
                last_name="Rivera",
                email=("casey.rivera@example.com"),
                department_id=engineering_id,
                job_title="Backend Developer",
                status=EmployeeStatus.ACTIVE,
                start_date=date(2026, 1, 12),
                manager_id=alex_id,
            ),
            Employee(
                id=morgan_id,
                first_name="Morgan",
                last_name="Chen",
                email=("morgan.chen@example.org"),
                department_id=engineering_id,
                job_title="QA Engineer",
                status=EmployeeStatus.LEAVE,
                start_date=date(2026, 2, 2),
                manager_id=alex_id,
            ),
            Employee(
                id=riley_id,
                first_name="Riley",
                last_name="Brooks",
                email=("riley.brooks@example.com"),
                department_id=operations_id,
                job_title=("Operations Coordinator"),
                status=(EmployeeStatus.ONBOARDING),
                start_date=date(2026, 7, 15),
                manager_id=jordan_id,
            ),
            Employee(
                id=jamie_id,
                first_name="Jamie",
                last_name="Patel",
                email=("jamie.patel@example.net"),
                department_id=people_id,
                job_title=("People Operations Specialist"),
                status=(EmployeeStatus.OFFBOARDING),
                start_date=date(2025, 12, 1),
                manager_id=taylor_id,
            ),
            Employee(
                id=drew_id,
                first_name="Drew",
                last_name="Parker",
                email=("drew.parker@example.com"),
                department_id=finance_id,
                job_title=("Financial Analyst"),
                status=EmployeeStatus.ACTIVE,
                start_date=date(2026, 3, 9),
                manager_id=cameron_id,
            ),
            Employee(
                id=avery_id,
                first_name="Avery",
                last_name="Reed",
                email=("avery.reed@example.org"),
                department_id=operations_id,
                job_title=("Former Demo Coordinator"),
                status=EmployeeStatus.INACTIVE,
                start_date=date(2025, 9, 15),
                manager_id=jordan_id,
            ),
        ]

        for employee in employees:
            await session.merge(employee)

        audit_events = [
            AuditEvent(
                id=stable_uuid("audit:seed-departments"),
                action="dataset.seeded",
                entity_type="department",
                entity_id=engineering_id,
                actor="demo-seed",
                details={
                    "synthetic": True,
                    "departmentCount": 4,
                },
            ),
            AuditEvent(
                id=stable_uuid("audit:seed-employees"),
                action="dataset.seeded",
                entity_type="employee",
                entity_id=alex_id,
                actor="demo-seed",
                details={
                    "synthetic": True,
                    "employeeCount": 10,
                },
            ),
        ]

        for event in audit_events:
            await session.merge(event)

        await session.commit()

    print("Seeded 4 departments, 10 employees, and 2 audit events.")


async def main() -> None:
    try:
        await seed_demo_data()
    finally:
        await dispose_engine()


if __name__ == "__main__":
    asyncio.run(main())
