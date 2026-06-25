# Technical Architecture

## 1. Document Information

**Document:** Technical Architecture
**File:** `09-technical-architecture.md`
**Project:** Khasandjon Babadzhanov — Software Developer Portfolio
**Version:** 1.0
**Status:** Approved technical foundation
**Website language:** English
**Documentation language:** Russian
**Target environment:** Linux VPS
**Primary deployment model:** Docker Compose with host-level Nginx

---

## 2. Purpose of This Document

Этот документ определяет техническую архитектуру сайта-портфолио Khasandjon Babadzhanov.

Он фиксирует:

- технологический стек;
- структуру репозитория;
- frontend architecture;
- content architecture;
- backend demonstration API;
- database strategy;
- routing;
- rendering strategy;
- server и client component boundaries;
- authentication requirements;
- contact form architecture;
- security boundaries;
- Docker architecture;
- Nginx и HTTPS;
- environment strategy;
- deployment workflow;
- observability;
- testing;
- backup и recovery;
- performance requirements;
- границы первой версии;
- технические критерии готовности.

Документ является техническим источником истины для реализации проекта.

---

# 3. Architecture Goals

Архитектура должна обеспечить следующие качества.

## 3.1. Professional Technical Evidence

Сам сайт должен подтверждать навыки кандидата:

- Next.js;
- TypeScript;
- React;
- Python;
- FastAPI;
- PostgreSQL;
- SQLAlchemy;
- Pydantic;
- Alembic;
- Docker;
- Nginx;
- Linux;
- API design;
- testing;
- deployment.

---

## 3.2. Content-First Architecture

Основная ценность сайта находится в:

- project case studies;
- architecture diagrams;
- code samples;
- experience;
- metrics;
- technical explanations.

Архитектура не должна усложнять публикацию нового контента.

---

## 3.3. Fast Static Experience

Большая часть сайта должна:

- генерироваться на сервере или во время build;
- не зависеть от database request при каждом открытии;
- работать даже при временной недоступности demonstration API;
- иметь минимальный client-side JavaScript.

---

## 3.4. Safe Demonstration Environment

Интерактивные backend demos должны:

- использовать только synthetic data;
- быть изолированы от production company systems;
- не обращаться к внутренним API;
- не хранить конфиденциальную информацию;
- иметь rate limiting;
- поддерживать reset или reproducible seed.

---

## 3.5. Simple VPS Deployment

Архитектура должна быть понятной и воспроизводимой на одном Linux VPS.

Не требуется:

- Kubernetes;
- service mesh;
- multi-region deployment;
- complex orchestration;
- managed cloud infrastructure;
- microservices architecture.

---

## 3.6. Graceful Degradation

Если backend demo временно недоступен:

- статические страницы продолжают работать;
- Projects остаются доступны;
- Code Samples остаются доступны;
- Resume скачивается;
- direct email остается доступным;
- Contact page показывает email fallback.

---

## 3.7. Maintainability

Новый проект или code sample должен добавляться преимущественно через content file, а не через создание новой page implementation.

---

# 4. High-Level Architecture

Основная архитектура:

```text
Visitor
   │
   ▼
DNS / Optional CDN Proxy
   │
   ▼
Host Nginx
   ├── /                     → Next.js Web Container
   ├── /api/*                → FastAPI Container
   ├── /api/docs             → FastAPI OpenAPI Documentation
   ├── /downloads/*          → Next.js Public Assets
   └── static caching        → Images, fonts, compiled assets
                                  │
                                  ▼
                         Internal Docker Network
                            ├── Web
                            ├── API
                            └── PostgreSQL
```

Дополнительные внешние сервисы:

```text
FastAPI Contact Endpoint
   ├── Email Provider / SMTP
   └── Application Logs

Next.js
   └── Privacy-Conscious Analytics, optional
```

---

# 5. Core Technology Stack

## 5.1. Frontend

- Next.js with App Router;
- React;
- TypeScript;
- Tailwind CSS;
- MDX;
- CSS custom properties;
- Radix-based accessible primitives where required;
- Lucide Icons;
- Shiki or equivalent build-time syntax highlighting;
- Mermaid or SVG for technical diagrams.

---

## 5.2. Backend Demo API

- Python;
- FastAPI;
- Pydantic v2;
- SQLAlchemy 2.0;
- Alembic;
- PostgreSQL;
- Uvicorn;
- structured application logging;
- Pytest.

---

## 5.3. Infrastructure

- Docker;
- Docker Compose;
- host-level Nginx;
- Linux VPS;
- TLS certificate automation;
- Git;
- environment files outside source control.

---

## 5.4. Quality Tooling

### Frontend

- TypeScript strict mode;
- ESLint;
- Prettier;
- Vitest;
- React Testing Library;
- Playwright;
- accessibility testing tools.

### Backend

- Ruff;
- Pytest;
- type checking;
- migration checks;
- API schema validation.

---

# 6. Architecture Decision Summary

| Area                  | Decision                                |
| --------------------- | --------------------------------------- |
| Frontend framework    | Next.js App Router                      |
| Main language         | TypeScript                              |
| Content format        | Local MDX with validated frontmatter    |
| Styling               | Tailwind CSS and semantic CSS variables |
| Main rendering model  | Static generation and Server Components |
| Interactive islands   | Client Components only where required   |
| Demo backend          | FastAPI                                 |
| Demo database         | PostgreSQL with synthetic data          |
| ORM                   | SQLAlchemy 2.0                          |
| Migrations            | Alembic                                 |
| Production packaging  | Docker                                  |
| Service orchestration | Docker Compose                          |
| Edge proxy            | Host-level Nginx                        |
| TLS                   | Automated certificate renewal           |
| Primary host          | Existing Linux VPS                      |
| CMS                   | Not included in Version 1               |
| Search                | Not included in Version 1               |
| Authentication        | Not required for public website         |
| Public repository     | Optional, not required for deployment   |

---

# 7. Repository Strategy

## 7.1. Repository Type

Использовать один repository для:

- frontend;
- backend demonstration API;
- content;
- infrastructure;
- documentation;
- tests.

Это упрощает:

- local development;
- coordinated releases;
- Docker Compose;
- documentation;
- portfolio review;
- deployment.

---

## 7.2. Public Access Strategy

Repository может оставаться private во время разработки.

После security review возможны два варианта.

### Option A — Public Portfolio Repository

Публикуется весь portfolio repository, если:

- отсутствует proprietary code;
- отсутствуют internal assets;
- secrets удалены;
- screenshots безопасны;
- commit history проверена.

### Option B — Private Main Repository and Public Samples

Основной repository остается private, а выбранные code examples публикуются отдельно.

Первая версия сайта не зависит от выбора между этими вариантами.

---

# 8. Recommended Repository Structure

```text
portfolio/
├── apps/
│   ├── web/
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── content/
│   │   │   ├── lib/
│   │   │   ├── styles/
│   │   │   ├── types/
│   │   │   └── tests/
│   │   ├── mdx-components.tsx
│   │   ├── next.config.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── Dockerfile
│   │
│   └── api/
│       ├── app/
│       │   ├── api/
│       │   ├── core/
│       │   ├── db/
│       │   ├── models/
│       │   ├── repositories/
│       │   ├── schemas/
│       │   ├── services/
│       │   └── main.py
│       ├── migrations/
│       ├── tests/
│       ├── alembic.ini
│       ├── pyproject.toml
│       └── Dockerfile
│
├── content/
│   ├── projects/
│   ├── code/
│   ├── experience/
│   └── profile/
│
├── infrastructure/
│   ├── nginx/
│   │   ├── portfolio.conf
│   │   └── security-headers.conf
│   ├── scripts/
│   │   ├── deploy.sh
│   │   ├── backup.sh
│   │   ├── restore.sh
│   │   └── health-check.sh
│   └── systemd/
│
├── docs/
│   ├── 01-portfolio-vision-and-goals.md
│   ├── 02-personal-positioning-and-messaging.md
│   ├── 03-information-architecture.md
│   ├── 04-content-inventory-and-project-selection.md
│   ├── 05-project-case-study-content-spec.md
│   ├── 06-visual-language-and-brand-direction.md
│   ├── 07-design-system-and-components.md
│   ├── 08-page-by-page-ux-specification.md
│   └── 09-technical-architecture.md
│
├── compose.yaml
├── compose.production.yaml
├── .env.example
├── .gitignore
├── README.md
└── Makefile
```

---

# 9. Frontend Application Structure

Recommended App Router structure:

```text
apps/web/src/app/
├── layout.tsx
├── page.tsx
├── not-found.tsx
├── error.tsx
├── global-error.tsx
├── sitemap.ts
├── robots.ts
├── manifest.ts
│
├── projects/
│   ├── page.tsx
│   └── [slug]/
│       ├── page.tsx
│       ├── loading.tsx
│       └── not-found.tsx
│
├── code/
│   ├── page.tsx
│   └── [slug]/
│       ├── page.tsx
│       └── not-found.tsx
│
├── experience/
│   └── page.tsx
│
├── about/
│   └── page.tsx
│
├── contact/
│   └── page.tsx
│
├── resume/
│   └── page.tsx
│
└── privacy/
    └── page.tsx
```

API endpoints должны обслуживаться FastAPI через Nginx и не дублироваться внутри Next.js без необходимости.

---

# 10. Frontend Rendering Strategy

## 10.1. Static Content

Следующие страницы должны генерироваться статически:

- Home;
- Projects;
- project detail pages;
- Code Samples;
- code detail pages;
- Experience;
- About;
- Resume;
- Privacy;
- 404.

Преимущества для проекта:

- быстрый ответ;
- отсутствие database dependency;
- хорошая индексируемость;
- предсказуемый production behavior;
- простое caching.

---

## 10.2. Dynamic Content

Динамическими являются только:

- contact form submission;
- demo API requests;
- optional analytics;
- future live status widgets.

---

## 10.3. Server Components

Server Components используются по умолчанию для:

- page layouts;
- project lists;
- MDX rendering;
- experience;
- skills;
- footer;
- static diagrams;
- metadata;
- related content.

---

## 10.4. Client Components

Client Components используются только для:

- theme switcher;
- mobile navigation;
- project filters;
- code copy button;
- active table of contents;
- dialogs;
- contact form;
- interactive API demo;
- optional diagram controls.

---

## 10.5. Client Boundary Rule

Нельзя добавлять `"use client"` на:

- entire layout;
- full project page;
- project content tree;
- global page container;

если интерактивность требуется только небольшому вложенному компоненту.

---

# 11. Content Architecture

## 11.1. Content Storage

Project case studies и code samples хранятся в MDX.

Профильные данные хранятся как validated TypeScript objects или JSON.

---

## 11.2. MDX Content Types

```text
content/
├── projects/
│   ├── internal-hr-platform.mdx
│   ├── call-recording-archive.mdx
│   ├── access-lifecycle-automation.mdx
│   ├── video-delivery-pipeline.mdx
│   ├── finance-telegram-bot.mdx
│   └── multilingual-school-website.mdx
│
└── code/
    ├── fastapi-service-layer.mdx
    ├── rbac-permission-check.mdx
    ├── sqlalchemy-data-model.mdx
    ├── celery-background-task.mdx
    ├── pytest-api-workflow.mdx
    └── typescript-webhook-handler.mdx
```

---

## 11.3. MDX Responsibilities

MDX используется для:

- narrative content;
- headings;
- code samples;
- diagrams;
- tables;
- callouts;
- technical decisions;
- confidentiality notes;
- related-content references.

---

## 11.4. Frontmatter

Каждый content file должен содержать validated metadata.

Пример:

```yaml
---
title: "Internal HR Platform"
slug: "internal-hr-platform"
summary: "A multi-module platform for employee lifecycle workflows."
status: "Internal Production"
role: "Backend Developer"
featured: true
priority: 1
confidentialityLevel: 2
publishedAt: "2026-07-01"
updatedAt: "2026-07-01"

categories:
  - "Business Application"
  - "Backend Platform"

technologies:
  - "Python"
  - "FastAPI"
  - "PostgreSQL"
  - "SQLAlchemy"
  - "Redis"
  - "Celery"
  - "Docker"

relatedCode:
  - "fastapi-service-layer"
  - "rbac-permission-check"
---
```

---

## 11.5. Metadata Validation

Frontmatter должен проверяться на build stage.

Использовать schema validation для:

- required fields;
- valid status values;
- valid confidentiality levels;
- duplicate slugs;
- missing related content;
- invalid URLs;
- invalid date values.

Build должен завершаться ошибкой при критически некорректном content metadata.

---

## 11.6. Content Loader

Создать единый content layer:

```text
src/lib/content/
├── projects.ts
├── code-samples.ts
├── frontmatter.ts
├── mdx.ts
├── related-content.ts
└── validation.ts
```

Основные functions:

```typescript
getAllProjects();
getFeaturedProjects();
getProjectBySlug(slug);
getAllCodeSamples();
getCodeSampleBySlug(slug);
getRelatedProjects(slug);
getRelatedCodeSamples(projectSlug);
```

---

## 11.7. Content Duplication Rule

Project metrics, title и stack не должны вручную дублироваться:

- на Home;
- в Projects;
- в project detail page.

Они должны загружаться из одного content source.

---

# 12. MDX Component Mapping

Required mapping:

```typescript
export function useMDXComponents() {
  return {
    h2: SectionHeading,
    h3: SubsectionHeading,
    p: ArticleParagraph,
    a: ContentLink,
    pre: CodeBlock,
    table: DataTable,
    blockquote: Quote,
    Callout,
    DiagramContainer,
    MediaFrame,
    TechnicalDecision,
    ChallengeCard,
    ResultComparison,
    ConfidentialityNote,
  };
}
```

MDX не должен иметь доступ к произвольным небезопасным components.

---

# 13. Syntax Highlighting

## 13.1. Strategy

Syntax highlighting должен выполняться преимущественно на build или server side.

Это уменьшает:

- client JavaScript;
- layout shifts;
- runtime processing;
- dependency on browser execution.

---

## 13.2. Supported Languages

Минимальный список:

- Python;
- TypeScript;
- JavaScript;
- SQL;
- JSON;
- YAML;
- Bash;
- Dockerfile;
- Nginx configuration;
- HTML;
- CSS.

---

## 13.3. Code Metadata

Code block должен поддерживать:

- filename;
- language;
- highlighted lines;
- line numbers;
- caption;
- copy action.

---

# 14. Diagram Architecture

## 14.1. Primary Formats

### Mermaid

Используется для:

- maintainable flow diagrams;
- sequence diagrams;
- simple system architecture;
- state diagrams.

### SVG

Используется для:

- polished final diagrams;
- custom branded visuals;
- complex architecture illustrations.

---

## 14.2. Rendering Strategy

Предпочтительно:

- render diagrams during build;
- store generated SVG;
- avoid large diagram runtime library in initial page bundle.

---

## 14.3. Diagram Source

Source files могут храниться:

```text
content/diagrams/
├── internal-hr-platform/
│   ├── system-context.mmd
│   └── deployment.svg
```

---

# 15. Asset Architecture

## 15.1. Public Assets

```text
apps/web/public/
├── images/
│   ├── projects/
│   ├── profile/
│   └── open-graph/
├── diagrams/
├── icons/
├── downloads/
└── fonts/
```

---

## 15.2. Images

Использовать:

- optimized WebP или AVIF;
- PNG только когда требуется lossless transparency;
- SVG для diagrams и icons;
- meaningful filenames.

---

## 15.3. Screenshot File Naming

Пример:

```text
internal-hr-platform-employee-directory.webp
finance-bot-expense-report.webp
```

Не использовать:

```text
Screenshot_2026-06-23_final2.png
```

---

## 15.4. Private Original Assets

Оригинальные screenshots до anonymization не должны храниться в public application directory.

Recommended local-only path:

```text
private-assets/
```

Этот directory должен находиться в `.gitignore`.

---

# 16. Backend Demo API Purpose

FastAPI service создается не как обязательный backend для всего сайта, а как безопасная демонстрация backend skills.

Он поддерживает:

- contact form;
- read-only demonstration endpoints;
- OpenAPI documentation;
- health endpoints;
- synthetic portfolio data;
- selected API patterns.

---

# 17. Backend Service Boundaries

FastAPI отвечает только за:

```text
/api/contact
/api/demo/*
/api/health/*
/api/docs
/api/openapi.json
```

FastAPI не отвечает за:

- rendering project pages;
- loading MDX;
- Resume;
- navigation;
- theme;
- static assets;
- SEO metadata.

---

# 18. Demonstration API Scope

Version 1 demo API может показывать simplified HR workflow.

Recommended resources:

```text
GET    /api/demo/departments
GET    /api/demo/employees
GET    /api/demo/employees/{id}
POST   /api/demo/employees
PATCH  /api/demo/employees/{id}
GET    /api/demo/audit-events
POST   /api/demo/jobs/report
GET    /api/demo/jobs/{id}
```

Все данные являются synthetic.

---

## 18.1. Demo API Rules

- no real employee data;
- no actual company names;
- no external company integrations;
- no unrestricted file upload;
- no privileged administration;
- no permanent personal data;
- no connection to production systems.

---

## 18.2. Read and Write Behavior

Write endpoints могут:

- сохранять temporary synthetic records;
- периодически reset database;
- ограничивать количество records;
- reject suspicious payloads;
- rate-limit each source.

---

## 18.3. Demo Reset

Database должна поддерживать:

- scheduled daily reset;
- manual seed command;
- deterministic synthetic fixtures.

Пример:

```bash
python -m app.db.seed_demo
```

---

# 19. Backend Application Structure

```text
apps/api/app/
├── api/
│   ├── dependencies.py
│   ├── router.py
│   └── routes/
│       ├── contact.py
│       ├── demo_departments.py
│       ├── demo_employees.py
│       ├── demo_jobs.py
│       └── health.py
│
├── core/
│   ├── config.py
│   ├── logging.py
│   ├── security.py
│   ├── rate_limit.py
│   └── exceptions.py
│
├── db/
│   ├── base.py
│   ├── session.py
│   ├── seed.py
│   └── transaction.py
│
├── models/
│   ├── department.py
│   ├── employee.py
│   ├── audit_event.py
│   └── demo_job.py
│
├── repositories/
│   ├── departments.py
│   ├── employees.py
│   ├── audit_events.py
│   └── demo_jobs.py
│
├── schemas/
│   ├── contact.py
│   ├── department.py
│   ├── employee.py
│   ├── audit_event.py
│   └── demo_job.py
│
├── services/
│   ├── contact.py
│   ├── employees.py
│   ├── audit.py
│   ├── demo_jobs.py
│   └── email.py
│
└── main.py
```

---

# 20. Backend Layer Responsibilities

## 20.1. Routes

Отвечают за:

- HTTP semantics;
- dependencies;
- request parsing;
- response status;
- response schemas.

Routes не должны содержать сложную business logic.

---

## 20.2. Services

Отвечают за:

- workflows;
- business rules;
- transaction boundaries;
- coordination between repositories;
- email sending;
- audit events.

---

## 20.3. Repositories

Отвечают за:

- database queries;
- persistence;
- filtering;
- pagination;
- row retrieval.

---

## 20.4. Schemas

Отвечают за:

- request validation;
- response serialization;
- public API contracts.

---

## 20.5. Models

Отвечают за:

- relational database representation;
- constraints;
- indexes;
- relationships;
- timestamps.

---

# 21. Database Architecture

## 21.1. Database Purpose

PostgreSQL используется только для:

- synthetic demo data;
- contact submission metadata, если хранение действительно требуется;
- demo job status;
- audit examples.

Основной site content не хранится в PostgreSQL.

---

## 21.2. Initial Tables

```text
demo_departments
demo_employees
demo_audit_events
demo_jobs
contact_delivery_attempts, optional
```

---

## 21.3. Contact Data Storage

Предпочтительный вариант:

- message отправляется по email;
- полный текст сообщения не хранится постоянно;
- logs не содержат message body;
- delivery metadata хранится только при необходимости.

---

## 21.4. Migrations

Все schema changes выполняются через Alembic.

Production deployment должен выполнять:

```bash
alembic upgrade head
```

до запуска новой API version или как отдельный controlled deployment step.

---

## 21.5. Database Exposure

PostgreSQL:

- доступен только во внутренней Docker network;
- не публикует port в public interface;
- использует отдельного application user;
- не работает под superuser для normal requests.

---

# 22. Contact Form Architecture

Request flow:

```text
Contact Page
   │
   ▼
POST /api/contact
   │
   ├── Validate body
   ├── Check honeypot
   ├── Check submission timing
   ├── Apply rate limit
   ├── Normalize fields
   ├── Send email
   ├── Record delivery result without message body
   └── Return generic response
```

---

## 22.1. Request Fields

```text
name
email
company, optional
subject
message
sourcePage
honeypot
formStartedAt
```

---

## 22.2. Validation

Server-side validation must define:

- minimum and maximum lengths;
- valid email format;
- allowed character ranges;
- maximum request body;
- rejection of empty messages;
- honeypot validation.

---

## 22.3. Rate Limiting

Rate limiting применяется:

- at Nginx;
- optionally inside application;
- by IP or privacy-safe request key;
- with stricter limits on `/api/contact`.

---

## 22.4. Error Responses

Response must not reveal:

- mail provider details;
- stack traces;
- internal exception messages;
- whether a target email exists.

---

## 22.5. Email Provider Abstraction

Email sending is hidden behind an interface:

```python
class EmailSender(Protocol):
    async def send_contact_message(
        self,
        message: ContactMessage,
    ) -> None:
        ...
```

Это позволяет заменить:

- SMTP;
- transactional email API;
- another provider;

без изменения route и business logic.

---

# 23. API Documentation

## 23.1. Public Documentation

OpenAPI documentation может быть доступна публично для demonstration endpoints.

Recommended routes:

```text
/api/docs
/api/openapi.json
```

---

## 23.2. Contact Endpoint Visibility

Contact endpoint может быть исключен из public OpenAPI schema, если его демонстрация не нужна.

---

## 23.3. Documentation Disclaimer

Docs должны содержать:

> This API uses synthetic demonstration data and is isolated from internal company systems.

---

# 24. Authentication Strategy

## 24.1. Version 1

Публичный portfolio и demo API не требуют user accounts.

Это исключает ненужные:

- login;
- password storage;
- session management;
- password reset;
- private dashboards.

---

## 24.2. Demo Write Protection

Write operations защищаются через:

- strict validation;
- rate limiting;
- small data limits;
- synthetic-only fields;
- scheduled reset;
- restricted endpoint scope.

---

## 24.3. Future Authentication

Authentication может быть добавлена только если появляется:

- admin CMS;
- private project preview;
- protected recruiter materials.

Это не входит в Version 1.

---

# 25. Same-Origin API Strategy

Production routes:

```text
https://<portfolio-domain>/
https://<portfolio-domain>/api/*
```

Nginx routes `/api/*` to FastAPI.

Преимущества:

- simpler browser policy;
- no separate public API domain;
- fewer CORS problems;
- consistent TLS;
- clearer analytics;
- simpler deployment.

---

# 26. CORS Strategy

Так как web и API работают под одним origin:

- broad CORS configuration не требуется;
- wildcard origins запрещены;
- development origins задаются явно;
- credentials не включаются без необходимости.

---

# 27. Configuration Strategy

## 27.1. Frontend Configuration

Public configuration may include:

```text
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_API_BASE_URL
NEXT_PUBLIC_ANALYTICS_ID
```

Никакие secrets не должны использовать `NEXT_PUBLIC_`.

---

## 27.2. Backend Configuration

```text
APP_ENV
APP_NAME
DATABASE_URL
ALLOWED_HOSTS
CONTACT_RECIPIENT
EMAIL_PROVIDER
SMTP_HOST
SMTP_PORT
SMTP_USERNAME
SMTP_PASSWORD
EMAIL_FROM
RATE_LIMIT_CONTACT
LOG_LEVEL
```

---

## 27.3. Infrastructure Configuration

```text
COMPOSE_PROJECT_NAME
WEB_IMAGE_TAG
API_IMAGE_TAG
POSTGRES_DB
POSTGRES_USER
POSTGRES_PASSWORD
PORTFOLIO_DOMAIN
```

---

# 28. Environment Matrix

| Environment | Purpose                    |
| ----------- | -------------------------- |
| Local       | Active development         |
| Test        | Automated tests            |
| Preview     | Optional deployment review |
| Production  | Public portfolio           |

---

## 28.1. Local

- hot reload;
- local Docker database;
- synthetic seed data;
- debug logs;
- no production email;
- optional mail catcher.

---

## 28.2. Test

- isolated database;
- deterministic fixtures;
- disabled external email;
- fast test configuration;
- no production credentials.

---

## 28.3. Production

- production domain;
- secure secrets;
- HTTPS;
- optimized builds;
- restricted logs;
- health checks;
- controlled migrations.

---

# 29. Environment File Rules

Files:

```text
.env.example
.env.local
.env.test
.env.production
```

Only `.env.example` is committed.

`.env.example` contains:

- variable names;
- safe placeholders;
- comments;
- no secrets.

Production secrets are stored:

- on VPS;
- outside repository;
- with restricted file permissions;
- or in CI secret storage.

---

# 30. Docker Architecture

Recommended production services:

```text
portfolio-web
portfolio-api
portfolio-db
```

Host Nginx runs outside Docker.

---

## 30.1. Web Container

Responsibilities:

- run production Next.js application;
- serve rendered pages;
- serve compiled assets;
- respond to health check.

Suggested internal port:

```text
3000
```

Published only to localhost:

```text
127.0.0.1:3100
```

---

## 30.2. API Container

Responsibilities:

- serve FastAPI;
- process contact requests;
- serve demo endpoints;
- connect to PostgreSQL.

Suggested internal port:

```text
8000
```

Published only to localhost:

```text
127.0.0.1:8100
```

---

## 30.3. Database Container

Responsibilities:

- store synthetic demo data;
- persist migrations and demo state.

Port should not be exposed publicly.

---

## 30.4. Docker Networks

```text
portfolio_internal
```

Web does not need direct database access.

API accesses database through internal network.

---

## 30.5. Docker Volumes

```text
portfolio_postgres_data
```

No company data may be stored in this volume.

---

# 31. Dockerfile Strategy

## 31.1. Frontend Dockerfile

Use multi-stage structure:

```text
dependencies
builder
runner
```

Final image contains only:

- production runtime;
- compiled application;
- required assets;
- non-root user.

---

## 31.2. Backend Dockerfile

Use:

- official Python base;
- dependency installation;
- application copy;
- non-root user;
- health check;
- direct Uvicorn command.

---

## 31.3. Build Requirements

- pinned dependencies;
- reproducible build;
- `.dockerignore`;
- no `.env` inside image;
- no development tools in runtime image;
- no private source assets in public image.

---

# 32. Docker Compose Strategy

## 32.1. Base Compose

`compose.yaml` defines:

- shared services;
- networks;
- volumes;
- health checks;
- dependencies.

---

## 32.2. Production Override

`compose.production.yaml` defines:

- production build targets;
- restart policies;
- localhost port bindings;
- resource constraints where appropriate;
- production commands;
- production environment.

---

## 32.3. Development Override

Optional:

```text
compose.development.yaml
```

Defines:

- source mounts;
- hot reload;
- development ports;
- debug commands.

---

# 33. Health Checks

## 33.1. Web

Route:

```text
/health
```

Response:

```json
{
  "status": "ok",
  "service": "portfolio-web"
}
```

---

## 33.2. API Liveness

```text
/api/health/live
```

Checks:

- process running.

---

## 33.3. API Readiness

```text
/api/health/ready
```

Checks:

- database connection;
- required configuration;
- migration compatibility where practical.

---

## 33.4. Database

Use native readiness check.

---

# 34. Nginx Architecture

Host-level Nginx responsibilities:

- terminate TLS;
- redirect HTTP to HTTPS;
- route requests;
- add security headers;
- apply request body limits;
- apply rate limiting;
- cache static assets;
- compress responses;
- protect upstream ports.

---

## 34.1. Routing

```text
location /         → http://127.0.0.1:3100
location /api/     → http://127.0.0.1:8100
```

---

## 34.2. Static Asset Caching

Long-lived caching for hashed assets:

```text
/_next/static/*
```

More conservative caching for:

```text
/images/*
/downloads/*
```

Resume caching must allow updates without stale public content.

---

## 34.3. Proxy Headers

Nginx forwards:

- Host;
- X-Real-IP;
- X-Forwarded-For;
- X-Forwarded-Proto.

Application must trust proxy headers only from controlled proxy infrastructure.

---

## 34.4. Request Limits

Apply limits to:

- contact form body;
- demo writes;
- unsupported large uploads.

File upload is not required in Version 1.

---

# 35. Domain and TLS Strategy

Recommended:

```text
https://<portfolio-domain>
```

Optional:

```text
https://www.<portfolio-domain>
```

One host is canonical.

The other redirects permanently.

TLS requirements:

- automatic renewal;
- HTTP to HTTPS redirect;
- modern protocols;
- no mixed content;
- certificate monitoring.

---

# 36. Security Headers

Recommended headers:

- Content-Security-Policy;
- Strict-Transport-Security;
- X-Content-Type-Options;
- Referrer-Policy;
- Permissions-Policy;
- frame protection through CSP;
- controlled cross-origin policies where needed.

CSP must be tested with:

- Next.js assets;
- fonts;
- analytics;
- code highlighting;
- diagrams;
- contact form.

Do not use an ineffective wildcard CSP.

---

# 37. Application Security

## 37.1. Input Validation

All backend input validated through Pydantic schemas.

Client-side validation improves UX but never replaces server validation.

---

## 37.2. Output Safety

User-provided content must not be rendered as raw HTML.

Contact message appears only in controlled email templates.

---

## 37.3. Secrets

Secrets must never appear in:

- browser bundle;
- MDX;
- screenshots;
- Docker images;
- git history;
- application logs;
- public OpenAPI examples.

---

## 37.4. Dependency Security

Regularly check:

- frontend dependencies;
- Python dependencies;
- container base images.

Critical updates should be prioritized.

---

## 37.5. Database Security

- separate application user;
- strong password;
- internal-only network;
- no public port;
- minimum required permissions;
- parameterized ORM queries.

---

# 38. Confidential Content Boundary

The public portfolio may contain:

- rewritten code;
- synthetic data;
- simplified diagrams;
- approved screenshots;
- public metrics;
- generic business flows.

It must not contain:

- proprietary source code;
- real employee data;
- company credentials;
- internal IP addresses;
- private domain names;
- real access rules;
- API tokens;
- database dumps;
- private call records;
- customer data.

---

# 39. Logging Strategy

## 39.1. Frontend

Log only:

- unexpected server errors;
- build errors;
- health status.

Do not log:

- contact message body;
- personal form values;
- secrets.

---

## 39.2. API

Structured fields may include:

```text
timestamp
level
service
request_id
route
method
status_code
duration_ms
error_type
```

---

## 39.3. Privacy

Do not log:

- full email;
- message text;
- authorization headers;
- request bodies;
- SMTP credentials.

Email may be partially masked only when operationally necessary.

---

# 40. Request Correlation

Nginx or API generates a request ID.

Flow:

```text
Nginx
→ X-Request-ID
→ FastAPI log
→ Error response reference
```

User-facing errors may include a safe reference ID without exposing internal details.

---

# 41. Error Handling

## 41.1. Frontend Errors

Provide:

- `error.tsx`;
- `global-error.tsx`;
- `not-found.tsx`;
- recovery actions.

No stack traces in public UI.

---

## 41.2. API Errors

Use consistent error structure:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The submitted data is invalid.",
    "requestId": "..."
  }
}
```

---

## 41.3. Internal Exceptions

- logged with request ID;
- mapped to generic response;
- no implementation detail returned.

---

# 42. Analytics Strategy

Analytics is optional for Version 1.

If implemented, it should be privacy-conscious.

Track:

- page views;
- project openings;
- code sample openings;
- Resume downloads;
- email clicks;
- contact success;
- outbound links.

Do not track:

- contact message content;
- typed form values;
- copied code content;
- personal visitor identity.

---

# 43. Monitoring Strategy

Minimum production monitoring:

- container health;
- disk usage;
- TLS expiry;
- service uptime;
- HTTP status errors;
- database health;
- backup success.

Optional tools:

- self-hosted uptime monitor;
- privacy-safe error monitoring;
- server metrics dashboard.

Monitoring must not delay Version 1 launch.

---

# 44. Performance Architecture

## 44.1. Primary Strategy

- static generation;
- Server Components;
- minimal Client Components;
- optimized images;
- local or optimized fonts;
- build-time syntax highlighting;
- build-time diagrams;
- limited third-party scripts.

---

## 44.2. JavaScript Budget

Avoid adding heavy libraries for:

- simple animation;
- code display;
- icons;
- filters;
- diagrams rendered statically.

---

## 44.3. Image Strategy

- correct dimensions;
- responsive sizes;
- lazy loading below fold;
- priority only for hero-critical visual;
- WebP or AVIF;
- no uncompressed screenshots.

---

## 44.4. Font Strategy

Use optimized loading for:

- Inter;
- JetBrains Mono.

Load only necessary subsets and weights.

---

## 44.5. Caching

### Long Cache

- hashed JS;
- CSS;
- optimized static assets.

### Moderate Cache

- project screenshots;
- diagrams;
- downloadable Resume with version control.

### No Store

- contact responses;
- dynamic write requests.

---

# 45. SEO Architecture

Each route must support:

- unique title;
- meta description;
- canonical URL;
- Open Graph;
- Twitter/X card metadata;
- structured data;
- sitemap entry;
- robots policy.

---

## 45.1. Dynamic Project Metadata

Project metadata generated from frontmatter.

Example:

```typescript
export async function generateMetadata({ params }) {
  const project = await getProjectBySlug(params.slug);

  return {
    title: `${project.title} | Khasandjon Babadzhanov`,
    description: project.summary,
  };
}
```

---

## 45.2. Static Route Generation

Project and code pages should use known slugs during build.

Missing slugs return proper 404.

---

# 46. Accessibility Architecture

Accessibility is implemented through:

- semantic components;
- server-rendered content;
- keyboard-safe interactions;
- visible focus;
- reduced motion;
- proper labels;
- text alternatives;
- automated and manual tests.

Client-side enhancements must not remove access to core content.

---

# 47. Frontend Testing Strategy

## 47.1. Static Checks

- TypeScript;
- ESLint;
- formatting;
- content schema validation;
- duplicate slug check;
- broken internal link check.

---

## 47.2. Unit Tests

Test:

- content utilities;
- filter logic;
- metadata generation;
- form validation;
- URL helpers.

---

## 47.3. Component Tests

Test:

- mobile navigation;
- theme switcher;
- project filters;
- contact form;
- code copy;
- table of contents.

---

## 47.4. End-to-End Tests

Critical flows:

1. Home → Project.
2. Project → Code Sample.
3. Resume download.
4. Contact form success.
5. Contact validation error.
6. Mobile menu navigation.
7. Theme preference persistence.
8. Unknown project returns 404.

---

## 47.5. Accessibility Tests

Include:

- automated accessibility scan;
- keyboard navigation;
- focus order;
- dialog behavior;
- form errors;
- zoom at 200%;
- reduced motion;
- color contrast review.

---

# 48. Backend Testing Strategy

## 48.1. Unit Tests

Test:

- validation;
- business rules;
- email formatting;
- rate-limit logic;
- service functions.

---

## 48.2. Repository Tests

Test:

- create;
- update;
- pagination;
- constraints;
- transaction rollback.

---

## 48.3. API Tests

Test:

- valid request;
- invalid request;
- missing record;
- rate limit;
- oversized body;
- honeypot;
- health endpoints;
- contact provider failure.

---

## 48.4. Migration Tests

Verify:

- clean database upgrade;
- migration to head;
- seed after migration;
- downgrade only where supported and useful.

---

## 48.5. Synthetic Data Test

Ensure seed data contains:

- no real company information;
- no real people;
- deterministic identifiers;
- realistic but fictional values.

---

# 49. Development Workflow

Recommended local workflow:

```bash
git checkout -b feature/homepage-hero
docker compose up -d db
pnpm dev
uv run fastapi dev
```

Alternative full-stack Docker workflow:

```bash
docker compose -f compose.yaml -f compose.development.yaml up --build
```

---

## 49.1. Branch Strategy

Simple strategy:

```text
main
feature/*
fix/*
content/*
```

`main` should remain deployable.

---

## 49.2. Commit Style

Use clear action-oriented commits.

Examples:

```text
Add project content validation
Build responsive portfolio header
Implement FastAPI contact endpoint
Add HR platform case study
Configure production Nginx proxy
```

Avoid:

```text
fix
changes
update files
final
```

---

# 50. Build Pipeline

Frontend build steps:

```text
Install dependencies
→ Type check
→ Lint
→ Validate content
→ Run tests
→ Build Next.js
→ Build Docker image
```

Backend build steps:

```text
Install dependencies
→ Ruff checks
→ Type checks
→ Run tests
→ Validate migrations
→ Build Docker image
```

---

# 51. CI/CD Strategy

## 51.1. Initial Release

Manual controlled deployment is acceptable for the first release.

Process:

```text
Pull approved commit
→ Build images
→ Run tests
→ Back up database
→ Run migrations
→ Recreate containers
→ Run health checks
→ Verify public pages
```

---

## 51.2. Future Automated Pipeline

Possible pipeline:

```text
Push to main
→ CI checks
→ Build images
→ Push images
→ SSH deployment
→ Migration
→ Health checks
→ Rollback on failure
```

Repository does not need to be public for CI/CD.

---

# 52. Deployment Process

Recommended production workflow:

```bash
git pull --ff-only
docker compose \
  -f compose.yaml \
  -f compose.production.yaml \
  build

docker compose \
  -f compose.yaml \
  -f compose.production.yaml \
  run --rm api alembic upgrade head

docker compose \
  -f compose.yaml \
  -f compose.production.yaml \
  up -d

./infrastructure/scripts/health-check.sh
```

Actual commands may change after implementation.

---

# 53. Deployment Safety

Before deployment:

- confirm backup;
- confirm environment file;
- validate Compose configuration;
- run tests;
- build frontend;
- check migrations.

After deployment:

- inspect container status;
- verify health endpoints;
- open Home;
- open one project;
- open one code sample;
- download Resume;
- test Contact;
- inspect logs.

---

# 54. Rollback Strategy

## 54.1. Application Rollback

Keep previous image tag.

Example:

```text
portfolio-web:2026-07-01
portfolio-api:2026-07-01
```

Rollback by restoring previous tags and recreating services.

---

## 54.2. Database Rollback

Prefer forward-fix migrations.

Before risky migrations:

- create database backup;
- verify restore procedure;
- avoid destructive change in same release where possible.

---

## 54.3. Content Rollback

Content is version-controlled and can be reverted through Git.

---

# 55. Backup Strategy

## 55.1. What Must Be Backed Up

- PostgreSQL data;
- production environment configuration;
- Nginx configuration;
- TLS configuration where necessary;
- public uploads, if added later;
- current Resume;
- repository or release artifact.

---

## 55.2. What Can Be Rebuilt

- Next.js output;
- Docker images;
- static diagrams;
- synthetic demo database, if no important contact metadata is stored.

---

## 55.3. Backup Frequency

For synthetic demo data, daily backup is optional.

Critical items:

- production configuration;
- Resume;
- domain setup;
- contact delivery configuration.

---

# 56. Recovery Strategy

Recovery documentation must cover:

1. clean VPS preparation;
2. Docker installation;
3. repository or artifact restoration;
4. environment restoration;
5. database restoration or reseeding;
6. Nginx configuration;
7. TLS setup;
8. health verification.

---

# 57. Dependency Management

## Frontend

Use:

- one package manager;
- lockfile committed;
- dependency versions pinned through lockfile;
- controlled updates.

## Backend

Use:

- `pyproject.toml`;
- locked dependency resolution;
- separated development dependencies;
- reproducible installation.

Do not use unpinned production dependencies.

---

# 58. Version Selection

At project initialization:

- choose current stable major versions;
- record versions in README;
- commit lockfiles;
- avoid automatic uncontrolled major upgrades;
- review upgrade notes before major changes.

The documentation should not hardcode a framework version until implementation begins.

---

# 59. README Requirements

Root README must include:

- project purpose;
- architecture summary;
- stack;
- repository structure;
- local setup;
- environment variables;
- content workflow;
- tests;
- Docker setup;
- deployment overview;
- confidentiality rules;
- license.

---

# 60. Makefile or Task Runner

Recommended commands:

```text
make dev
make test
make lint
make build
make up
make down
make migrate
make seed
make deploy
make health
make backup
```

Commands should wrap common workflows without hiding important behavior.

---

# 61. Local Development Requirements

A new environment should be runnable with:

```bash
cp .env.example .env
docker compose up -d db
```

Then frontend and backend may run:

- directly for hot reload;
- or through development Compose.

README must describe both options if both are supported.

---

# 62. Content Publishing Workflow

Recommended flow:

```text
Create MDX file
→ Add frontmatter
→ Add assets
→ Validate content
→ Review English
→ Review confidentiality
→ Build preview
→ Merge
→ Deploy
```

---

## 62.1. Draft Content

Frontmatter may support:

```yaml
draft: true
```

Draft content:

- does not appear in production lists;
- may appear locally;
- must not be indexed.

---

## 62.2. Publication Date

Use publication dates for:

- sitemap;
- metadata;
- update display;
- content maintenance.

Project date and article publication date are separate values.

---

# 63. Content Security Review

Before a project can change from `draft` to published:

- code reviewed;
- screenshots reviewed;
- diagram reviewed;
- metrics verified;
- company identifiers reviewed;
- secrets scan passed;
- internal URLs removed;
- image metadata removed where necessary.

---

# 64. API Demo UX Integration

Demo component flow:

```text
Project Case Study
→ Try Demo API
→ Display request
→ Submit safe payload
→ Show response status
→ Show formatted JSON
→ Link to OpenAPI docs
```

Demo should clearly state:

> Uses synthetic data.

---

# 65. Demo API Availability Handling

If API is unavailable:

```text
The demonstration API is temporarily unavailable.
The project case study and static code examples remain available.
```

Actions:

- Retry;
- View Code Sample;
- Open API Documentation, only if available.

---

# 66. Technology Decisions and Trade-offs

## 66.1. Next.js Instead of Static HTML

Selected because the site requires:

- reusable components;
- dynamic route generation;
- structured metadata;
- MDX integration;
- theme support;
- future interactive demos.

Trade-off:

- more runtime and build complexity than plain static HTML.

---

## 66.2. MDX Instead of CMS

Selected because:

- content is technical and version-controlled;
- code and diagrams are first-class content;
- one developer manages publication;
- no editorial team exists.

Trade-off:

- content updates require repository access and deployment.

---

## 66.3. Separate FastAPI Service

Selected because:

- demonstrates backend skills;
- supports safe API demos;
- provides OpenAPI;
- separates content rendering from backend behavior.

Trade-off:

- adds deployment and monitoring complexity.

---

## 66.4. PostgreSQL for Demo Data

Selected because:

- demonstrates relational modeling;
- supports SQLAlchemy and Alembic examples;
- matches target backend profile.

Trade-off:

- static portfolio could work without a database;
- therefore database must remain isolated and optional to core content availability.

---

## 66.5. Host-Level Nginx

Selected because:

- VPS may host multiple applications;
- TLS is managed at one edge;
- containers remain private;
- host routing remains centralized.

Trade-off:

- infrastructure is partly outside Compose.

---

## 66.6. Single VPS

Selected because:

- portfolio traffic is expected to be moderate;
- architecture remains understandable;
- cost and maintenance stay controlled.

Trade-off:

- single-server failure affects public availability;
- external uptime monitoring is recommended.

---

# 67. Out of Scope for Version 1

Not included:

- Kubernetes;
- GraphQL;
- user registration;
- portfolio admin panel;
- CMS;
- full-text search;
- comments;
- recruiter accounts;
- real employee workflows;
- production file upload;
- background worker cluster;
- event streaming platform;
- machine learning;
- WebSocket features;
- multiple production regions;
- complex service mesh;
- mobile application.

---

# 68. Future Architecture Options

Possible future additions:

- dedicated public API repository;
- CI/CD automation;
- Redis for rate limiting or job queue;
- background demonstration jobs;
- public Odoo module;
- search;
- technical articles;
- monitoring dashboard;
- object storage for public assets;
- preview environments;
- admin-only content editor.

They must be added only when they solve a concrete need.

---

# 69. Technical Risks

## 69.1. Overengineering

**Risk:** backend and database delay portfolio launch.

**Mitigation:**

- static portfolio first;
- demo API developed after core pages;
- backend failure does not affect content.

---

## 69.2. MDX Security

**Risk:** arbitrary components or unsafe content execution.

**Mitigation:**

- local trusted content only;
- controlled MDX component mapping;
- no untrusted remote MDX.

---

## 69.3. Secret Leakage

**Risk:** credentials enter repository or frontend bundle.

**Mitigation:**

- `.env` rules;
- secret scanning;
- `NEXT_PUBLIC_` review;
- Docker image inspection;
- commit review.

---

## 69.4. Demo Abuse

**Risk:** public write endpoints receive spam.

**Mitigation:**

- strict scope;
- rate limits;
- small data limits;
- scheduled reset;
- no file upload;
- monitoring.

---

## 69.5. Contact Spam

**Risk:** form used by bots.

**Mitigation:**

- honeypot;
- timing check;
- rate limiting;
- body limit;
- direct email fallback;
- optional CAPTCHA only if abuse appears.

---

## 69.6. Content and Resume Inconsistency

**Risk:** metrics differ across pages.

**Mitigation:**

- centralized metadata;
- content validation;
- release checklist.

---

## 69.7. VPS Failure

**Risk:** single host becomes unavailable.

**Mitigation:**

- backups;
- documented restore;
- uptime monitoring;
- reproducible Docker deployment.

---

# 70. Development Phases

## Phase 1 — Repository Foundation

- initialize monorepo;
- configure frontend;
- configure TypeScript;
- configure Tailwind;
- create design tokens;
- configure linting and formatting.

## Phase 2 — Content Platform

- configure MDX;
- define schemas;
- implement content loaders;
- validate slugs and relations;
- create sample project.

## Phase 3 — Static Portfolio

- global layout;
- Home;
- Projects;
- project template;
- Code Samples;
- Experience;
- About;
- Resume;
- Contact UI.

## Phase 4 — Backend API

- FastAPI foundation;
- PostgreSQL;
- migrations;
- synthetic seed;
- demo endpoints;
- OpenAPI;
- tests.

## Phase 5 — Contact Delivery

- contact endpoint;
- email provider;
- rate limiting;
- validation;
- frontend integration.

## Phase 6 — Infrastructure

- Dockerfiles;
- Compose;
- host Nginx;
- TLS;
- health checks;
- deployment scripts.

## Phase 7 — Quality

- unit tests;
- E2E tests;
- accessibility;
- security review;
- performance;
- content review.

## Phase 8 — Launch

- domain;
- production deployment;
- final validation;
- monitoring;
- Resume and application integration.

---

# 71. Version 1 Technical Deliverables

Required:

- Next.js website;
- TypeScript strict configuration;
- dark and light themes;
- local MDX content;
- four flagship project routes;
- Code Samples route;
- downloadable Resume;
- FastAPI service;
- PostgreSQL demo database;
- OpenAPI docs;
- contact endpoint;
- Docker Compose;
- host Nginx config;
- HTTPS;
- health checks;
- automated tests for critical flows;
- deployment documentation.

---

# 72. Technical Definition of Done

Architecture is implemented when:

- repository structure follows the approved boundaries;
- frontend and backend build independently;
- project content comes from validated MDX;
- duplicate slugs fail the build;
- core pages render without backend availability;
- Client Components are limited to interactive areas;
- FastAPI exposes only approved public endpoints;
- demo data is synthetic;
- PostgreSQL is not exposed publicly;
- migrations run successfully;
- contact input is validated server-side;
- rate limiting is active;
- secrets are absent from client bundles and repository;
- containers run as non-root where practical;
- web and API have health endpoints;
- Nginx routes web and API correctly;
- HTTPS works;
- static assets use caching;
- error responses do not reveal internals;
- structured logs are available;
- critical frontend and backend tests pass;
- Resume download works;
- production restore procedure is documented;
- portfolio remains usable if demo API is unavailable.

---

# 73. Final Architecture Statement

The portfolio uses a content-first Next.js application for fast, indexable project pages and a separate FastAPI service for safe backend demonstrations and contact delivery.

Core content remains statically available, while the API provides practical evidence of Python, relational data modeling, validation, migrations, testing, and production deployment.

The architecture intentionally avoids unnecessary distributed-system complexity.

Main technical principle:

> Use a simple, reproducible production architecture that demonstrates engineering ability without making the portfolio depend on unnecessary infrastructure.
