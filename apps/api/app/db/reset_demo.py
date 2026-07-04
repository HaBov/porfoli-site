import asyncio
from uuid import uuid4

from sqlalchemy import (
    delete,
    func,
    select,
    text,
)

from app.db.seed_demo import (
    seed_demo_data,
    stable_uuid,
)
from app.db.session import (
    async_session_factory,
    dispose_engine,
)
from app.models import (
    AuditEvent,
    DemoJob,
    Department,
    Employee,
)

RESET_LOCK_KEY = 7_420_310


async def reset_demo_data() -> None:
    async with async_session_factory() as session:
        await session.execute(
            text("SELECT pg_advisory_lock(:key)"),
            {
                "key": RESET_LOCK_KEY,
            },
        )

        try:
            await session.execute(delete(AuditEvent))

            await session.execute(delete(DemoJob))

            await session.execute(delete(Employee))

            await session.execute(delete(Department))

            await session.commit()

            await seed_demo_data()

            department_result = await session.execute(select(func.count(Department.id)))

            employee_result = await session.execute(select(func.count(Employee.id)))

            job_result = await session.execute(select(func.count(DemoJob.id)))

            department_count = int(department_result.scalar_one())

            employee_count = int(employee_result.scalar_one())

            job_count = int(job_result.scalar_one())

            if department_count != 4 or employee_count != 10 or job_count != 0:
                raise RuntimeError("Demo reset verification failed.")

            session.add(
                AuditEvent(
                    id=uuid4(),
                    action=("system.reset.completed"),
                    entity_type="system",
                    entity_id=stable_uuid("system:demo-dataset"),
                    actor="internal-reset",
                    details={
                        "synthetic": True,
                        "departmentCount": department_count,
                        "employeeCount": employee_count,
                        "jobCount": job_count,
                    },
                )
            )

            await session.commit()

            print("Demo data reset completed: 4 departments, 10 employees, 0 jobs.")
        except Exception:
            await session.rollback()
            raise
        finally:
            try:
                await session.execute(
                    text("SELECT pg_advisory_unlock(:key)"),
                    {
                        "key": RESET_LOCK_KEY,
                    },
                )

                await session.commit()
            except Exception:
                await session.rollback()
                raise


async def main() -> None:
    try:
        await reset_demo_data()
    finally:
        await dispose_engine()


if __name__ == "__main__":
    asyncio.run(main())
