from uuid import UUID


class DepartmentNotFound(Exception):
    def __init__(self, department_id: UUID) -> None:
        self.department_id = department_id
        super().__init__("Department was not found.")


class DuplicateDepartmentCode(Exception):
    def __init__(self, code: str) -> None:
        self.code = code
        super().__init__("A department with this code already exists.")


class EmployeeNotFound(Exception):
    def __init__(self, employee_id: UUID) -> None:
        self.employee_id = employee_id
        super().__init__("Employee was not found.")


class DuplicateEmployeeEmail(Exception):
    def __init__(self, email: str) -> None:
        self.email = email
        super().__init__("An employee with this email already exists.")


class InactiveDepartment(Exception):
    def __init__(self, department_id: UUID) -> None:
        self.department_id = department_id
        super().__init__("The selected department is inactive.")


class InvalidManager(Exception):
    def __init__(
        self,
        manager_id: UUID,
        message: str = "The selected manager is invalid.",
    ) -> None:
        self.manager_id = manager_id
        self.message = message
        super().__init__(message)


class InvalidEmployeeStatusChange(Exception):
    def __init__(self, message: str) -> None:
        self.message = message
        super().__init__(message)


class InvalidAuditDateRange(Exception):
    def __init__(self) -> None:
        super().__init__("The audit date range is invalid.")
