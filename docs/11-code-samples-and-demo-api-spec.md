# Code Samples and Demo API Specification

## 1. Document Information

**Document:** Code Samples and Demo API Specification
**File:** `11-code-samples-and-demo-api-spec.md`
**Project:** Khasandjon Babadzhanov — Software Developer Portfolio
**Version:** 1.0
**Status:** Approved implementation specification
**Website language:** English
**Documentation language:** Russian

---

## 2. Purpose of This Document

Этот документ определяет, как портфолио должно демонстрировать качество кода и backend-разработки без публикации конфиденциального production source code.

Он фиксирует:

- набор обязательных code samples;
- структуру каждой страницы с кодом;
- правила переписывания закрытого кода;
- требования к качеству примеров;
- архитектуру demonstration API;
- API resources;
- endpoint contracts;
- request и response schemas;
- synthetic data;
- validation;
- pagination;
- filtering;
- authorization demonstration;
- background job simulation;
- audit events;
- error model;
- rate limiting;
- OpenAPI;
- database schema;
- testing;
- observability;
- security;
- reset strategy;
- UX интеграции demo API;
- критерии готовности.

---

# 3. Main Objective

Code Samples и Demo API должны позволить техническому специалисту проверить, что кандидат понимает:

- API design;
- request validation;
- response schemas;
- business logic separation;
- service layer;
- relational data modeling;
- transactions;
- authorization;
- background jobs;
- idempotency;
- error handling;
- testing;
- migrations;
- Docker;
- deployment;
- production constraints.

Основной принцип:

> Demonstrate engineering patterns without reproducing proprietary business logic or exposing confidential systems.

---

# 4. Code Evidence Strategy

Портфолио использует три уровня технического доказательства.

## 4.1. Inline Project Snippets

Короткие примеры внутри project case study.

Размер:

- примерно 15–50 строк.

Цель:

- подтвердить конкретное technical decision;
- не заставлять пользователя покидать project page.

---

## 4.2. Dedicated Code Sample Pages

Подробные страницы `/code/[slug]`.

Размер:

- примерно 30–120 строк основного кода;
- при необходимости несколько связанных файлов.

Цель:

- показать pattern;
- объяснить design;
- показать errors, testing и trade-offs.

---

## 4.3. Interactive Demo API

Безопасный FastAPI service с synthetic data.

Цель:

- показать working request-response flow;
- продемонстрировать OpenAPI;
- показать validation и error handling;
- предоставить recruiter-safe live demo;
- не зависеть от закрытого corporate backend.

---

# 5. Code Sample Selection Principles

Каждый sample должен:

1. показывать отдельный engineering concept;
2. быть связан с реальным проектом;
3. быть понятным без полного repository;
4. содержать достаточный context;
5. включать realistic error handling;
6. быть типизированным;
7. иметь test example;
8. не содержать confidential source;
9. не выглядеть как учебный `Hello World`;
10. не быть искусственно усложненным.

---

# 6. Version 1 Required Code Samples

Первая версия должна содержать минимум восемь samples.

## Sample 1

**Title:** FastAPI Service Layer
**Slug:** `fastapi-service-layer`
**Language:** Python
**Category:** Service Layer
**Related project:** Internal HR Platform

Показывает:

- route;
- request schema;
- service;
- repository call;
- transaction boundary;
- response schema.

---

## Sample 2

**Title:** Permission-Based FastAPI Dependency
**Slug:** `rbac-permission-check`
**Language:** Python
**Category:** Authorization
**Related project:** Internal HR Platform

Показывает:

- authenticated user dependency;
- permission checking;
- reusable dependency factory;
- explicit authorization error;
- separation from route logic.

---

## Sample 3

**Title:** SQLAlchemy Employee Data Model
**Slug:** `sqlalchemy-data-model`
**Language:** Python
**Category:** Data Modeling
**Related project:** Internal HR Platform

Показывает:

- typed SQLAlchemy 2.0 model;
- relationships;
- indexes;
- status enum;
- timestamps;
- database constraints.

---

## Sample 4

**Title:** Retriable Celery Background Task
**Slug:** `celery-background-task`
**Language:** Python
**Category:** Background Processing
**Related project:** HR Platform или Recording Archive

Показывает:

- task input;
- retry policy;
- idempotency key;
- status update;
- structured logging;
- final failure handling.

---

## Sample 5

**Title:** Pytest API Workflow Test
**Slug:** `pytest-api-workflow`
**Language:** Python
**Category:** Testing
**Related project:** Internal HR Platform

Показывает:

- async client;
- authentication fixture;
- data setup;
- API request;
- permission assertion;
- database verification.

---

## Sample 6

**Title:** Paginated External API Iterator
**Slug:** `external-api-pagination`
**Language:** Python
**Category:** Integration
**Related project:** Call Recording Archive Pipeline

Показывает:

- pagination;
- continuation token;
- typed response;
- retry handling;
- safe iteration;
- rate-limit awareness.

---

## Sample 7

**Title:** TypeScript Telegram Webhook Handler
**Slug:** `typescript-webhook-handler`
**Language:** TypeScript
**Category:** API Design
**Related project:** Finance Telegram Bot

Показывает:

- Hono route;
- Zod validation;
- message type guard;
- command dispatch;
- D1 persistence;
- safe error response.

---

## Sample 8

**Title:** Docker Production Service Configuration
**Slug:** `docker-production-setup`
**Language:** YAML / Dockerfile
**Category:** Infrastructure
**Related project:** Portfolio или HR Platform

Показывает:

- multi-stage image;
- non-root user;
- health check;
- internal network;
- environment handling;
- restart policy.

---

# 7. Optional Code Samples

После Version 1 можно добавить:

- Alembic migration;
- Nginx reverse proxy;
- idempotent file-processing service;
- audit-event model;
- access lifecycle rule evaluator;
- repository pagination;
- API error mapper;
- contact form rate limiter;
- Django translated model;
- Cloudflare D1 repository;
- transaction helper;
- structured logging configuration.

---

# 8. Code Sample Page Structure

Каждая dedicated code page должна использовать следующую структуру.

```text
1. Breadcrumbs
2. Sample Header
3. Context
4. Problem
5. Code
6. How It Works
7. Design Principles
8. Error Handling
9. Testing
10. Trade-offs
11. Production Considerations
12. Confidentiality Note
13. Related Project
14. Related Samples
```

---

# 9. Code Sample Header

Обязательные поля:

- title;
- summary;
- language;
- framework;
- category;
- complexity;
- related project;
- filename;
- reading time;
- rewritten status;
- publication date.

Пример:

```text
Permission-Based FastAPI Dependency

Language: Python
Framework: FastAPI
Category: Authorization
Complexity: Production Pattern
Related Project: Internal HR Platform
Filename: permissions.py
```

---

# 10. Context Section

Раздел должен объяснить:

- где используется pattern;
- почему он нужен;
- какая часть системы зависит от него;
- какие ограничения учитываются.

Пример:

> The pattern is used when multiple API modules need consistent permission checks without repeating authorization logic inside each route handler.

---

# 11. Problem Section

Раздел отвечает:

- какой плохой вариант существовал;
- почему inline permission checks недостаточны;
- какие риски создаются;
- что требуется от reusable solution.

Пример проблем:

- duplicated authorization logic;
- inconsistent status codes;
- missing permission checks;
- routes coupled to database details;
- hard-to-test access rules.

---

# 12. Code Presentation Rules

## 12.1. Main Sample

Основной block должен быть самостоятельным и readable.

## 12.2. Supporting Files

Допустимо показать:

- route;
- service;
- repository;
- schema;
- test.

Не нужно показывать весь project tree.

## 12.3. Filename Labels

Каждый block имеет filename.

Пример:

```text
app/api/dependencies/permissions.py
```

Путь должен быть generic и не повторять confidential source layout.

## 12.4. Highlighted Lines

Highlight используется для:

- permission check;
- transaction;
- retry;
- validation;
- error mapping.

Не подсвечивать слишком много строк.

---

# 13. Code Quality Requirements

Каждый Python sample должен:

- использовать type hints;
- избегать broad `except Exception`, кроме boundary with re-raise or mapping;
- иметь explicit return type;
- использовать descriptive names;
- не смешивать route и business logic;
- не иметь hardcoded secrets;
- не содержать production IDs;
- учитывать errors;
- использовать async только там, где это обосновано.

Каждый TypeScript sample должен:

- работать со strict mode;
- избегать `any`;
- валидировать unknown payload;
- использовать explicit types;
- корректно обрабатывать `undefined`;
- не доверять Telegram payload без проверки;
- возвращать consistent responses.

---

# 14. Rewritten Code Rules

Закрытый production code не копируется напрямую.

Допустимый процесс:

1. Определить engineering pattern.
2. Описать его независимо от конкретной компании.
3. Изменить entity names.
4. Упростить business rules.
5. Создать synthetic models.
6. Переписать implementation с нуля.
7. Добавить tests.
8. Проверить, что source structure не повторяется дословно.
9. Удалить internal identifiers.
10. Выполнить confidentiality review.

---

# 15. Prohibited Code Content

Запрещено публиковать:

- API keys;
- passwords;
- bearer tokens;
- private keys;
- production database URLs;
- internal IP addresses;
- employee identifiers;
- private group IDs;
- call metadata;
- customer names;
- proprietary business rules;
- exact company permission matrix;
- real file paths;
- private bucket names;
- session strings;
- real webhook secrets;
- copied corporate source files.

---

# 16. Standard Code Confidentiality Note

Для rewritten samples:

> This sample was independently written for the portfolio and demonstrates the engineering pattern without reproducing proprietary source code, internal identifiers, or company-specific business rules.

Для public repository:

> This sample is based on the public project linked above. Secrets, production data, and environment-specific configuration are excluded.

---

# 17. Code Sample Testing Requirement

Каждый sample должен иметь один из вариантов:

- inline test;
- linked test file;
- test scenario table;
- explanation of validation strategy.

Минимально требуется показать:

- positive scenario;
- invalid input;
- permission failure или integration failure;
- expected output.

---

# 18. Demo API Purpose

Demo API представляет упрощенную HR-style business application.

Он должен показать:

- REST resource design;
- relational data;
- request validation;
- pagination;
- filtering;
- service layer;
- database transactions;
- permission concepts;
- audit logs;
- background job simulation;
- consistent error responses;
- OpenAPI documentation;
- automated tests.

Demo API не является копией HR Platform.

---

# 19. Demo API Public Name

Рекомендуемое название:

> Portfolio Demo API

OpenAPI title:

> Khasandjon Babadzhanov — Portfolio Demo API

Description:

> A safe demonstration API using synthetic employee and department data. It is isolated from internal company systems and does not contain production data or proprietary business logic.

---

# 20. Demo API Base Path

```text
/api/demo
```

Example production URL:

```text
https://<portfolio-domain>/api/demo/employees
```

OpenAPI:

```text
/api/docs
/api/openapi.json
```

Health:

```text
/api/health/live
/api/health/ready
```

---

# 21. API Versioning

Version 1 may use:

```text
/api/demo/v1
```

Recommended final structure:

```text
/api/demo/v1/departments
/api/demo/v1/employees
/api/demo/v1/audit-events
/api/demo/v1/jobs
```

Использование `/v1` предпочтительно, если API планируется показывать как отдельный engineering artifact.

---

# 22. Demo Resources

Основные resources:

1. Departments
2. Employees
3. Audit Events
4. Jobs
5. Permissions Demo
6. System Metadata

---

# 23. Department Resource

## Fields

```text
id
name
code
description
active
createdAt
updatedAt
```

## Example

```json
{
  "id": "dep_01JDEMO123",
  "name": "Demo Operations",
  "code": "OPS",
  "description": "Synthetic department used by the portfolio demo API.",
  "active": true,
  "createdAt": "2026-07-01T10:00:00Z",
  "updatedAt": "2026-07-01T10:00:00Z"
}
```

---

# 24. Employee Resource

## Fields

```text
id
firstName
lastName
email
departmentId
jobTitle
status
startDate
managerId
createdAt
updatedAt
```

## Statuses

```text
onboarding
active
leave
offboarding
inactive
```

## Example

```json
{
  "id": "emp_01JDEMO456",
  "firstName": "Jordan",
  "lastName": "Lee",
  "email": "jordan.lee@example.com",
  "departmentId": "dep_01JDEMO123",
  "jobTitle": "Operations Coordinator",
  "status": "active",
  "startDate": "2026-06-01",
  "managerId": null,
  "createdAt": "2026-07-01T10:00:00Z",
  "updatedAt": "2026-07-01T10:00:00Z"
}
```

---

# 25. Audit Event Resource

## Fields

```text
id
action
entityType
entityId
actor
metadata
createdAt
```

## Example

```json
{
  "id": "audit_01JDEMO789",
  "action": "employee.created",
  "entityType": "employee",
  "entityId": "emp_01JDEMO456",
  "actor": "demo-user",
  "metadata": {
    "source": "portfolio-demo"
  },
  "createdAt": "2026-07-01T10:02:00Z"
}
```

Audit metadata must not contain sensitive personal data.

---

# 26. Job Resource

Используется для simulation background processing.

## Job Types

```text
employee-report
department-summary
audit-export
```

## Job Statuses

```text
queued
running
completed
failed
```

## Fields

```text
id
type
status
progress
result
error
createdAt
startedAt
completedAt
```

---

# 27. Synthetic User Roles

Demo API может использовать simplified header-based role simulation.

Roles:

```text
viewer
manager
admin
```

Header:

```text
X-Demo-Role: viewer
```

Это не реальная authentication system.

В документации должно быть явно указано:

> `X-Demo-Role` is used only to demonstrate authorization behavior. It is not intended as a production authentication mechanism.

---

# 28. Permission Matrix

| Action              | Viewer | Manager |                    Admin |
| ------------------- | -----: | ------: | -----------------------: |
| List departments    |    Yes |     Yes |                      Yes |
| List employees      |    Yes |     Yes |                      Yes |
| View employee       |    Yes |     Yes |                      Yes |
| Create employee     |     No |     Yes |                      Yes |
| Update employee     |     No |     Yes |                      Yes |
| Deactivate employee |     No |      No |                      Yes |
| View audit events   |     No |     Yes |                      Yes |
| Start demo report   |     No |     Yes |                      Yes |
| Reset demo data     |     No |      No | Restricted internal task |

Matrix is intentionally simplified.

---

# 29. API Endpoint Inventory

## Health

```text
GET /api/health/live
GET /api/health/ready
```

## Metadata

```text
GET /api/demo/v1
GET /api/demo/v1/permissions
```

## Departments

```text
GET    /api/demo/v1/departments
POST   /api/demo/v1/departments
GET    /api/demo/v1/departments/{department_id}
PATCH  /api/demo/v1/departments/{department_id}
```

## Employees

```text
GET    /api/demo/v1/employees
POST   /api/demo/v1/employees
GET    /api/demo/v1/employees/{employee_id}
PATCH  /api/demo/v1/employees/{employee_id}
POST   /api/demo/v1/employees/{employee_id}/deactivate
```

## Audit

```text
GET /api/demo/v1/audit-events
```

## Jobs

```text
POST /api/demo/v1/jobs
GET  /api/demo/v1/jobs/{job_id}
```

---

# 30. API Root Endpoint

```text
GET /api/demo/v1
```

Response:

```json
{
  "name": "Portfolio Demo API",
  "version": "1.0",
  "dataPolicy": "Synthetic demonstration data only",
  "documentation": "/api/docs",
  "resources": {
    "departments": "/api/demo/v1/departments",
    "employees": "/api/demo/v1/employees",
    "auditEvents": "/api/demo/v1/audit-events",
    "jobs": "/api/demo/v1/jobs"
  }
}
```

---

# 31. List Departments Endpoint

```text
GET /api/demo/v1/departments
```

## Query Parameters

```text
active
search
page
pageSize
sort
```

## Example

```text
GET /api/demo/v1/departments?active=true&page=1&pageSize=20
```

## Response

```json
{
  "items": [
    {
      "id": "dep_01JDEMO123",
      "name": "Demo Operations",
      "code": "OPS",
      "active": true,
      "createdAt": "2026-07-01T10:00:00Z",
      "updatedAt": "2026-07-01T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "totalItems": 4,
    "totalPages": 1
  }
}
```

---

# 32. Create Department Endpoint

```text
POST /api/demo/v1/departments
```

Required role:

```text
admin
```

## Request

```json
{
  "name": "Demo Engineering",
  "code": "ENG",
  "description": "Synthetic department."
}
```

## Validation

- name: 2–80 characters;
- code: 2–10 uppercase characters;
- code unique;
- description: maximum 300 characters.

## Success

```text
201 Created
```

## Conflict

```text
409 Conflict
```

When code already exists.

---

# 33. List Employees Endpoint

```text
GET /api/demo/v1/employees
```

## Query Parameters

```text
page
pageSize
search
status
departmentId
sort
```

## Supported Sorts

```text
createdAt
-createdAt
lastName
-lastName
startDate
-startDate
```

## Example

```text
GET /api/demo/v1/employees?status=active&departmentId=dep_01JDEMO123&page=1&pageSize=20
```

---

# 34. Create Employee Endpoint

```text
POST /api/demo/v1/employees
```

Required roles:

```text
manager
admin
```

## Request

```json
{
  "firstName": "Taylor",
  "lastName": "Smith",
  "email": "taylor.smith@example.com",
  "departmentId": "dep_01JDEMO123",
  "jobTitle": "Backend Developer",
  "status": "onboarding",
  "startDate": "2026-07-15",
  "managerId": null
}
```

## Validation Rules

- firstName: 1–80 characters;
- lastName: 1–80 characters;
- email must be valid;
- only `example.com` or approved demo domains;
- department must exist and be active;
- manager must exist if provided;
- manager cannot reference the same employee;
- status must be approved enum;
- startDate must be a valid date.

## Transaction

Employee creation and audit-event creation occur in one database transaction.

---

# 35. Employee Create Response

```text
201 Created
```

```json
{
  "data": {
    "id": "emp_01JDEMO999",
    "firstName": "Taylor",
    "lastName": "Smith",
    "email": "taylor.smith@example.com",
    "departmentId": "dep_01JDEMO123",
    "jobTitle": "Backend Developer",
    "status": "onboarding",
    "startDate": "2026-07-15",
    "managerId": null,
    "createdAt": "2026-07-01T12:00:00Z",
    "updatedAt": "2026-07-01T12:00:00Z"
  },
  "meta": {
    "requestId": "req_01JDEMO"
  }
}
```

---

# 36. Update Employee Endpoint

```text
PATCH /api/demo/v1/employees/{employee_id}
```

Required roles:

```text
manager
admin
```

## Partial Request

```json
{
  "departmentId": "dep_01JDEMO777",
  "jobTitle": "Senior Demo Coordinator"
}
```

`Senior Demo Coordinator` is synthetic content, not candidate positioning.

## Rules

- omitted fields remain unchanged;
- empty payload rejected;
- inactive department rejected;
- email uniqueness preserved;
- update creates audit event;
- `updatedAt` changes;
- transaction rollback on audit failure.

---

# 37. Deactivate Employee Endpoint

```text
POST /api/demo/v1/employees/{employee_id}/deactivate
```

Required role:

```text
admin
```

## Request

```json
{
  "reason": "Synthetic offboarding demonstration"
}
```

## Behavior

- status changes to `inactive`;
- duplicate deactivate remains idempotent;
- audit event is recorded;
- second identical call returns current state without duplicate side effect.

---

# 38. Audit Events Endpoint

```text
GET /api/demo/v1/audit-events
```

Required roles:

```text
manager
admin
```

## Filters

```text
entityType
entityId
action
from
to
page
pageSize
```

Audit endpoint is read-only.

---

# 39. Start Background Job Endpoint

```text
POST /api/demo/v1/jobs
```

Required roles:

```text
manager
admin
```

## Request

```json
{
  "type": "employee-report",
  "parameters": {
    "departmentId": "dep_01JDEMO123"
  },
  "idempotencyKey": "demo-report-2026-07-01-ops"
}
```

## Response

```text
202 Accepted
```

```json
{
  "data": {
    "id": "job_01JDEMO222",
    "type": "employee-report",
    "status": "queued",
    "progress": 0,
    "createdAt": "2026-07-01T12:10:00Z"
  },
  "meta": {
    "pollUrl": "/api/demo/v1/jobs/job_01JDEMO222"
  }
}
```

---

# 40. Background Job Implementation Options

## Option A — Simple Database Simulation

Job status changes through application-managed delayed task.

Suitable for first release.

Advantages:

- less infrastructure;
- clear demonstration;
- easy reset.

Limitations:

- not a true distributed queue.

## Option B — Redis and Celery

Adds:

- queue;
- worker;
- retries;
- realistic background processing.

Advantages:

- stronger backend demonstration.

Limitations:

- additional service;
- deployment and monitoring complexity.

## Decision

Version 1 may start with database-backed simulation.

Celery can be added after core portfolio launch if it does not delay publication.

Static code sample can still demonstrate Celery independently.

---

# 41. Idempotency

Write endpoints where repeated requests may create duplicate work should support:

```text
Idempotency-Key
```

At minimum:

- create job;
- optional create employee;
- file-processing sample.

Behavior:

- same key plus same payload returns original result;
- same key plus different payload returns conflict;
- keys expire after controlled period;
- key does not contain personal information.

---

# 42. Pagination Model

Request:

```text
page
pageSize
```

Defaults:

```text
page = 1
pageSize = 20
```

Limits:

```text
minimum pageSize = 1
maximum pageSize = 100
```

Response:

```json
{
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "totalItems": 42,
    "totalPages": 3
  }
}
```

Do not mix cursor and page pagination in the same Version 1 resource.

---

# 43. Filtering Rules

Filters must:

- use explicit query parameters;
- reject invalid enum values;
- ignore no unknown filters silently;
- use indexed fields where relevant;
- be documented in OpenAPI.

Example:

```text
status=active
departmentId=...
search=jordan
```

---

# 44. Search Behavior

Employee `search` may match:

- first name;
- last name;
- email;
- job title.

Rules:

- trimmed;
- case-insensitive;
- maximum length;
- safe parameterized query;
- no raw SQL concatenation.

---

# 45. Sorting Rules

Sort parameter uses allowlist.

Example:

```text
sort=-createdAt
```

Unknown sort field returns:

```text
422 Validation Error
```

Never pass arbitrary sort strings directly into SQL.

---

# 46. Standard Success Envelope

Single resource:

```json
{
  "data": {},
  "meta": {
    "requestId": "req_01JDEMO"
  }
}
```

Collection:

```json
{
  "items": [],
  "pagination": {},
  "meta": {
    "requestId": "req_01JDEMO"
  }
}
```

Avoid inconsistent envelopes between endpoints.

---

# 47. Standard Error Model

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The submitted data is invalid.",
    "requestId": "req_01JDEMO",
    "fields": {
      "email": "Use an approved demonstration email domain."
    }
  }
}
```

---

# 48. Error Codes

Approved error codes:

```text
VALIDATION_ERROR
UNAUTHORIZED
FORBIDDEN
NOT_FOUND
CONFLICT
RATE_LIMITED
PAYLOAD_TOO_LARGE
IDEMPOTENCY_CONFLICT
DATABASE_UNAVAILABLE
SERVICE_UNAVAILABLE
INTERNAL_ERROR
```

User-facing messages must be safe and concise.

---

# 49. HTTP Status Rules

| Scenario                     | Status |
| ---------------------------- | -----: |
| Successful read              |    200 |
| Successful creation          |    201 |
| Accepted background job      |    202 |
| Successful no-body operation |    204 |
| Invalid request              |    422 |
| Missing demo role            |    401 |
| Insufficient role            |    403 |
| Missing resource             |    404 |
| Duplicate unique value       |    409 |
| Idempotency conflict         |    409 |
| Rate limit                   |    429 |
| Unexpected server error      |    500 |
| Temporary dependency issue   |    503 |

---

# 50. Validation Error Format

Field paths should support nested values.

Example:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The submitted data is invalid.",
    "fields": {
      "departmentId": "Department does not exist.",
      "email": "Use a valid example.com address."
    }
  }
}
```

Raw Pydantic internal error format should not be returned directly if it is difficult for demo users to read.

---

# 51. Request ID

Every request receives:

```text
X-Request-ID
```

If valid incoming request ID is absent, server generates one.

Request ID appears in:

- response header;
- error body;
- structured logs.

Do not accept unbounded arbitrary header values.

---

# 52. Rate Limiting

Rate limits protect:

- contact endpoint;
- demo write endpoints;
- job creation;
- OpenAPI abuse where necessary.

Recommended starting limits:

## Read Endpoints

```text
60 requests per minute per client
```

## Write Endpoints

```text
10 requests per minute per client
```

## Background Jobs

```text
3 requests per minute per client
```

## Contact Form

```text
3 submissions per hour per client
```

Exact values may be adjusted after monitoring.

---

# 53. Rate Limit Response

```text
429 Too Many Requests
```

Headers:

```text
Retry-After
X-RateLimit-Limit
X-RateLimit-Remaining
```

Body:

```json
{
  "error": {
    "code": "RATE_LIMITED",
    "message": "Too many requests. Please try again later.",
    "requestId": "req_01JDEMO"
  }
}
```

---

# 54. Request Body Limits

Recommended:

## Contact

```text
32 KB
```

## Demo JSON Request

```text
64 KB
```

## File Upload

Not supported in Version 1.

Requests exceeding limit return:

```text
413 Payload Too Large
```

---

# 55. Synthetic Data Policy

Все данные demo API должны быть:

- fictional;
- deterministic where useful;
- non-sensitive;
- resettable;
- safe for screenshots;
- safe for public logs;
- independent from company data.

Allowed domains:

```text
example.com
example.org
example.net
```

---

# 56. Synthetic Dataset

Initial seed:

## Departments

- Demo Operations;
- Demo Engineering;
- Demo Finance;
- Demo People Team.

## Employees

10–20 fictional records.

Statuses should cover:

- onboarding;
- active;
- leave;
- offboarding;
- inactive.

## Audit Events

Generated from seed and user demo operations.

---

# 57. Data Reset Strategy

The demo database should reset:

- once daily;
- on deployment when necessary;
- through an internal command;
- not through public unauthenticated endpoint.

Command:

```bash
python -m app.db.reset_demo
```

Reset process:

1. acquire reset lock;
2. clear demo tables;
3. insert deterministic seed;
4. verify counts;
5. write system audit event;
6. release lock.

---

# 58. Data Retention

Demo data created by visitors should be temporary.

Recommended retention:

- maximum 24 hours;
- deleted on daily reset.

Contact messages are handled separately and must not appear in demo database.

---

# 59. Database Tables

Recommended tables:

```text
demo_departments
demo_employees
demo_audit_events
demo_jobs
demo_idempotency_keys
```

Optional:

```text
demo_job_attempts
```

---

# 60. Department Table

Important constraints:

- primary key;
- unique code;
- normalized name;
- active boolean;
- created timestamp;
- updated timestamp.

Indexes:

- code;
- active;
- normalized name if search requires it.

---

# 61. Employee Table

Important constraints:

- primary key;
- unique email;
- department foreign key;
- nullable manager foreign key to employee;
- status enum;
- start date;
- timestamps.

Indexes:

- department ID;
- status;
- last name;
- created date.

Manager relationship must prevent direct self-reference at application and database level where possible.

---

# 62. Audit Event Table

Fields:

- ID;
- action;
- entity type;
- entity ID;
- actor;
- metadata JSON;
- created time.

Indexes:

- entity type and ID;
- action;
- created time.

Audit events are append-only in normal API behavior.

---

# 63. Job Table

Fields:

- ID;
- type;
- status;
- parameters;
- progress;
- result;
- error code;
- timestamps;
- idempotency key.

Indexes:

- status;
- type;
- created time;
- idempotency key.

---

# 64. Transaction Rules

Use one transaction for related operations.

Examples:

## Employee Creation

```text
Create employee
+ Create audit event
= One transaction
```

## Employee Deactivation

```text
Update status
+ Create audit event
= One transaction
```

If audit creation fails, business change should roll back in demo implementation.

---

# 65. Service Layer Rules

Route handlers should:

- parse HTTP request;
- call service;
- map response.

Services should:

- enforce business rules;
- coordinate repositories;
- manage transaction;
- create audit event;
- raise domain exceptions.

Repositories should:

- execute database operations;
- not know HTTP status codes;
- not contain UI messages.

---

# 66. Domain Exceptions

Recommended exceptions:

```text
DepartmentNotFound
EmployeeNotFound
DuplicateDepartmentCode
DuplicateEmployeeEmail
InactiveDepartment
InvalidManager
PermissionDenied
IdempotencyConflict
JobNotFound
```

Exception mapper converts them into API errors.

---

# 67. Repository Interface Example

```python
class EmployeeRepository(Protocol):
    async def get_by_id(
        self,
        employee_id: UUID,
    ) -> Employee | None:
        ...

    async def get_by_email(
        self,
        email: str,
    ) -> Employee | None:
        ...

    async def add(
        self,
        employee: Employee,
    ) -> None:
        ...

    async def list(
        self,
        filters: EmployeeFilters,
        pagination: Pagination,
        sort: EmployeeSort,
    ) -> Page[Employee]:
        ...
```

Code sample should use only the methods necessary to explain the pattern.

---

# 68. API Schema Naming

Request schemas:

```text
DepartmentCreate
DepartmentUpdate
EmployeeCreate
EmployeeUpdate
EmployeeDeactivate
JobCreate
```

Response schemas:

```text
DepartmentRead
EmployeeRead
AuditEventRead
JobRead
```

Avoid ambiguous names:

```text
EmployeeSchema
DataModel
ResponseObject
```

---

# 69. OpenAPI Requirements

OpenAPI must include:

- title;
- version;
- description;
- synthetic data disclaimer;
- tags;
- operation summaries;
- request examples;
- response examples;
- error responses;
- role header explanation;
- rate limit note.

---

# 70. OpenAPI Tags

Recommended tags:

```text
Health
Demo Metadata
Departments
Employees
Audit Events
Background Jobs
Contact
```

Contact may be hidden from public docs if preferred.

---

# 71. OpenAPI Operation IDs

Use stable operation IDs:

```text
list_demo_departments
create_demo_department
get_demo_employee
create_demo_employee
update_demo_employee
deactivate_demo_employee
list_demo_audit_events
create_demo_job
get_demo_job
```

Stable IDs improve generated-client readability.

---

# 72. OpenAPI Examples

Each major endpoint should include:

- valid request;
- success response;
- validation error;
- permission error;
- not-found error;
- conflict where relevant.

Examples must use synthetic values only.

---

# 73. OpenAPI Security Description

Because header role simulation is not production authentication, document it as an API key-like header only for demo purposes.

Example description:

> This header simulates user roles for portfolio demonstration. It does not authenticate a real user and must not be treated as a production security design.

---

# 74. Interactive Demo UI

Project or Code Sample page may contain a safe API explorer.

## Required Elements

- method;
- endpoint;
- role selector;
- request fields;
- Send Request;
- response status;
- response time;
- formatted JSON;
- copy response;
- reset form;
- OpenAPI link.

---

# 75. Demo UI Default State

Default endpoint should be read-only:

```text
GET /api/demo/v1/employees
```

Reason:

- immediate success;
- no data modification;
- clear response structure;
- safe for first interaction.

---

# 76. Demo UI Role Selector

Options:

- Viewer;
- Manager;
- Admin.

Display explanation:

> Roles are simulated for demonstration purposes.

The role selector adds:

```text
X-Demo-Role
```

to the request.

---

# 77. Demo UI Request Safety

The browser should not allow:

- arbitrary external URL;
- arbitrary headers;
- file uploads;
- raw SQL;
- unrestricted JSON size;
- custom HTTP methods outside allowlist.

Only predefined endpoints are available.

---

# 78. Demo UI Response Display

Display:

- HTTP status;
- duration;
- request ID;
- formatted JSON;
- error fields;
- rate-limit message.

Do not display:

- internal stack trace;
- database query;
- secret headers;
- infrastructure hostname.

---

# 79. Demo UI Failure State

Text:

> The demonstration API is temporarily unavailable. Static code samples and project details remain available.

Actions:

- Retry;
- View Code Sample;
- Open Documentation, if docs respond.

---

# 80. Contact Endpoint Separation

`/api/contact` must not reuse demo role simulation.

Contact endpoint has separate:

- schemas;
- rate limits;
- logs;
- email service;
- abuse protection.

Demo database must not store contact message body.

---

# 81. CORS and Origin Rules

Production API is accessed through same origin.

Rules:

- no wildcard CORS;
- explicit local development origins;
- no credentials unless necessary;
- reject invalid Host where configured;
- Nginx proxies `/api`.

---

# 82. Demo API Security Rules

- no real authentication claims;
- no permanent account creation;
- no password fields;
- no tokens;
- no real personal data;
- no open redirects;
- no file upload;
- no raw HTML output;
- no arbitrary query execution;
- no external company APIs;
- no unrestricted background execution.

---

# 83. Database Security Rules

- database port not public;
- application user is not superuser;
- migrations use controlled credentials;
- parameterized queries;
- limited connection pool;
- transaction timeouts where useful;
- reset command not public.

---

# 84. Logging Rules

Allowed fields:

```text
request_id
route
method
status_code
duration_ms
demo_role
error_code
```

Do not log:

- full request body;
- email body;
- contact message;
- database password;
- authorization values;
- sensitive environment variables.

Demo employee email may be logged only if synthetic, but logging it is unnecessary.

---

# 85. Structured Log Example

```json
{
  "timestamp": "2026-07-01T12:30:00Z",
  "level": "INFO",
  "service": "portfolio-api",
  "requestId": "req_01JDEMO",
  "method": "POST",
  "route": "/api/demo/v1/employees",
  "statusCode": 201,
  "durationMs": 48,
  "demoRole": "manager"
}
```

---

# 86. Health Endpoint Contracts

## Liveness

```text
GET /api/health/live
```

```json
{
  "status": "ok",
  "service": "portfolio-api"
}
```

Does not query database.

## Readiness

```text
GET /api/health/ready
```

```json
{
  "status": "ready",
  "service": "portfolio-api",
  "dependencies": {
    "database": "ok"
  }
}
```

Readiness should fail when required dependency is unavailable.

---

# 87. API Performance Expectations

Demo API does not claim high-load performance.

Reasonable goals:

- common read endpoints respond quickly under normal portfolio traffic;
- pagination prevents unbounded lists;
- request body limits are enforced;
- database queries avoid N+1 where practical;
- list endpoints use indexes;
- background-style work does not block request unnecessarily.

No unsupported claims about scalability should be shown.

---

# 88. Timeout Strategy

Recommended boundaries:

- database statement timeout;
- email provider timeout;
- external requests timeout;
- Nginx upstream timeout;
- background job maximum duration.

Demo endpoints should not perform uncontrolled long-running work.

---

# 89. Testing Strategy Overview

Tests should demonstrate:

- unit-level business logic;
- repository integration;
- API behavior;
- authorization;
- validation;
- idempotency;
- audit creation;
- migration health;
- reset behavior.

---

# 90. Unit Tests

Test examples:

- inactive department rejected;
- viewer cannot create employee;
- manager can create employee;
- invalid manager rejected;
- duplicate email rejected;
- deactivate is idempotent;
- same idempotency key returns original job.

---

# 91. Repository Tests

Use isolated test database.

Test:

- employee insert;
- unique email;
- pagination;
- filtering;
- sorting;
- relationship loading;
- transaction rollback;
- audit query.

---

# 92. API Integration Tests

Critical scenarios:

1. list employees;
2. create employee as manager;
3. fail create as viewer;
4. fail invalid email;
5. update employee;
6. deactivate as admin;
7. verify audit event;
8. create background job;
9. poll job;
10. hit rate limit;
11. unknown resource returns consistent error;
12. health readiness fails when database is unavailable.

---

# 93. Test Data

Tests use factories or fixtures.

Requirements:

- deterministic;
- isolated;
- no dependency on production seed;
- no real identities;
- database cleanup between tests.

---

# 94. OpenAPI Contract Tests

Tests should verify:

- schema can be generated;
- operation IDs unique;
- documented response models valid;
- no internal fields exposed;
- contact endpoint visibility matches decision;
- role header documented.

---

# 95. Migration Tests

Test:

```text
empty database
→ alembic upgrade head
→ seed demo
→ API smoke test
```

Optional:

- migration from previous schema version;
- downgrade for non-destructive migration where supported.

---

# 96. Demo Reset Tests

Verify:

- visitor-created records removed;
- base synthetic records restored;
- IDs deterministic where intended;
- reset does not affect non-demo data;
- reset cannot be triggered publicly.

---

# 97. Code Sample Review Checklist

Each sample must pass:

## Correctness

- code parses;
- types valid;
- imports valid or clearly simplified;
- behavior tested.

## Clarity

- one main concept;
- understandable names;
- no unnecessary abstraction;
- explanation matches code.

## Security

- no secrets;
- no real data;
- no internal URL;
- no proprietary logic.

## Evidence

- related project;
- test;
- trade-off;
- production consideration.

## Presentation

- filename;
- syntax highlighting;
- line numbers;
- copy action;
- mobile scrolling;
- confidentiality note.

---

# 98. Demo API Review Checklist

Before publication verify:

- all data synthetic;
- database isolated;
- role simulation clearly labeled;
- write endpoints limited;
- reset active;
- OpenAPI examples safe;
- error messages generic;
- rate limiting works;
- body limits work;
- no stack traces;
- health endpoints correct;
- database not public;
- request IDs present;
- logs exclude bodies;
- tests pass.

---

# 99. Demo API Deployment Services

Minimum:

```text
portfolio-api
portfolio-db
```

Optional later:

```text
portfolio-redis
portfolio-worker
```

Core portfolio pages must not depend on these services being healthy.

---

# 100. Environment Variables

Recommended backend variables:

```text
APP_ENV
APP_NAME
APP_VERSION
DATABASE_URL
ALLOWED_HOSTS
DEMO_RESET_ENABLED
DEMO_RESET_INTERVAL_HOURS
DEMO_ALLOWED_EMAIL_DOMAINS
DEMO_DEFAULT_PAGE_SIZE
DEMO_MAX_PAGE_SIZE
DEMO_READ_RATE_LIMIT
DEMO_WRITE_RATE_LIMIT
DEMO_JOB_RATE_LIMIT
CONTACT_RATE_LIMIT
LOG_LEVEL
```

No secret value should appear in `.env.example`.

---

# 101. API Documentation Page Integration

Portfolio may include a dedicated page block:

> Explore the Demo API

Content:

- short explanation;
- synthetic data badge;
- endpoint count;
- OpenAPI CTA;
- Try Request CTA;
- source samples;
- architecture diagram.

---

# 102. Demo API Project Relationship

The Demo API is not listed as a separate flagship company project.

It can be presented as:

- portfolio engineering artifact;
- public demonstration project;
- related proof inside HR Platform case study;
- dedicated technical section.

Possible public name:

> Backend Patterns Demo API

---

# 103. Public Repository Strategy

If published, repository should include:

```text
apps/api
migrations
tests
Dockerfile
compose development configuration
README
.env.example
```

Must exclude:

```text
production .env
contact credentials
private assets
company code
company screenshots
server configuration containing real secrets
```

---

# 104. Demo API README Requirements

README should explain:

- purpose;
- architecture;
- synthetic data policy;
- local setup;
- migrations;
- seed;
- tests;
- API docs;
- role simulation;
- Docker;
- security limitations;
- why it is not production authentication.

---

# 105. Local Development Workflow

Example:

```bash
docker compose up -d db
alembic upgrade head
python -m app.db.seed_demo
fastapi dev app/main.py
```

Then:

```text
http://localhost:8000/api/docs
```

Actual command depends on selected Python package manager.

---

# 106. Demo API Limitations Disclosure

Public documentation should state:

- role header is simulated;
- data resets regularly;
- API is rate limited;
- no real users are authenticated;
- no production data is used;
- endpoints are intentionally limited;
- file upload is not supported;
- background jobs may be simulated.

This increases credibility rather than weakening the project.

---

# 107. Implementation Order

## Phase 1 — Static Code Samples

1. FastAPI Service Layer;
2. RBAC Permission Check;
3. SQLAlchemy Model;
4. Pytest Workflow;
5. TypeScript Webhook;
6. Docker Setup.

## Phase 2 — API Foundation

1. FastAPI app;
2. config;
3. error model;
4. request ID;
5. health endpoints;
6. OpenAPI metadata.

## Phase 3 — Database

1. SQLAlchemy;
2. Alembic;
3. departments;
4. employees;
5. audit events;
6. seed.

## Phase 4 — Endpoints

1. list departments;
2. list employees;
3. get employee;
4. create employee;
5. update employee;
6. deactivate employee;
7. audit events.

## Phase 5 — Permissions and Safety

1. role simulation;
2. permission dependency;
3. rate limit;
4. body limit;
5. synthetic email restrictions.

## Phase 6 — Jobs

1. job schema;
2. idempotency;
3. job endpoint;
4. polling;
5. optional worker.

## Phase 7 — UI Integration

1. API explorer;
2. role selector;
3. request form;
4. response viewer;
5. unavailable state.

## Phase 8 — Quality

1. tests;
2. OpenAPI review;
3. security review;
4. deployment;
5. monitoring.

---

# 108. Version 1 Scope

## Must Have

- eight selected code samples;
- at least six dedicated code pages;
- FastAPI demo API;
- departments and employees;
- audit events;
- consistent error model;
- pagination;
- filtering;
- simulated roles;
- OpenAPI;
- synthetic data;
- tests;
- rate limiting;
- daily reset;
- API unavailable fallback.

## Should Have

- background job endpoint;
- idempotency;
- interactive API explorer;
- Dockerized local setup;
- public repository.

## Could Have

- Redis;
- Celery worker;
- generated client;
- API metrics page;
- request history in browser;
- multiple demo domains.

## Not Required

- real login;
- JWT;
- password storage;
- real employee data;
- file upload;
- full HR system;
- production RBAC matrix;
- company integrations.

---

# 109. Risks

## 109.1. Demo API Delays Portfolio Launch

**Risk:** backend work blocks static site publication.

**Mitigation:**

- publish static case studies first;
- demo API is an independent phase;
- pages provide static code fallback.

---

## 109.2. Role Header Looks Like Real Security

**Risk:** technical reviewer may interpret it as poor authentication design.

**Mitigation:**

- label it clearly as simulation;
- explain production alternative;
- avoid claims that it is secure authentication.

---

## 109.3. Overly Simplified Code

**Risk:** samples look like tutorials.

**Mitigation:**

- include transactions;
- domain exceptions;
- tests;
- trade-offs;
- realistic validation;
- repository/service separation.

---

## 109.4. Excessive Abstraction

**Risk:** samples become difficult to read.

**Mitigation:**

- one concept per sample;
- omit irrelevant infrastructure;
- explain simplifications;
- avoid unnecessary design patterns.

---

## 109.5. Abuse of Public Endpoints

**Risk:** visitor creates excessive data or load.

**Mitigation:**

- rate limits;
- page-size limits;
- body limits;
- daily reset;
- no uploads;
- bounded job creation;
- monitoring.

---

## 109.6. Confidentiality Leak

**Risk:** rewritten sample retains internal names or rules.

**Mitigation:**

- independent rewrite;
- generic entities;
- synthetic data;
- manual review;
- secret scanning;
- comparison against prohibited content list.

---

# 110. Definition of Done

Code Samples and Demo API are ready when:

- required samples are selected;
- each sample demonstrates one clear concept;
- code is syntactically valid;
- code has tests or documented test scenarios;
- code contains no proprietary source;
- confidentiality notes are present;
- code pages work on mobile;
- FastAPI service starts successfully;
- migrations apply to empty database;
- synthetic seed works;
- departments and employees endpoints work;
- permission simulation works;
- viewer cannot perform restricted writes;
- transactions create audit events;
- pagination and filtering are validated;
- errors use common structure;
- request IDs are present;
- rate limits work;
- request body limits work;
- OpenAPI is clear and safe;
- no database port is public;
- no real personal data exists;
- reset process removes visitor-created demo data;
- tests cover critical flows;
- static portfolio remains available when API is down;
- API failure state is implemented in UI;
- production deployment is documented.

---

# 111. Final Technical Evidence Principle

Code samples should demonstrate how the candidate thinks about software boundaries, not just whether the code compiles.

The Demo API should be small enough to understand and complete enough to demonstrate production-oriented behavior.

Main principle:

> Show realistic engineering decisions through safe, tested, and independently written examples built around synthetic data.
