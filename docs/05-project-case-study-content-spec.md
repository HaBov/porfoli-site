# Project Case Study Content Specification

## 1. Document Information

**Document:** Project Case Study Content Specification
**File:** `05-project-case-study-content-spec.md`
**Project:** Khasandjon Babadzhanov — Software Developer Portfolio
**Version:** 1.0
**Status:** Approved content standard
**Website language:** English
**Documentation language:** Russian

---

## 2. Purpose of This Document

Этот документ определяет единый стандарт написания и оформления project case studies.

Он устанавливает:

- обязательную структуру страниц проектов;
- правила подготовки текста;
- объем каждого раздела;
- требования к архитектурным схемам;
- формат описания личного вклада;
- правила демонстрации закрытых проектов;
- требования к code samples;
- структуру technical decisions;
- формат testing, challenges и results;
- правила использования метрик;
- критерии публикации;
- единый шаблон данных проекта.

Все flagship и supporting projects должны использовать этот стандарт.

---

## 3. Main Objective of a Case Study

Страница проекта должна доказать, что кандидат умеет:

1. понимать бизнес-проблему;
2. формализовать требования;
3. проектировать техническое решение;
4. реализовывать backend-компоненты;
5. работать с данными и внешними сервисами;
6. обрабатывать ошибки;
7. тестировать критические процессы;
8. развертывать и поддерживать систему;
9. оценивать результат;
10. объяснять ограничения и trade-offs.

Case study не должен быть обычным списком технологий.

Он должен отвечать на четыре главных вопроса:

- What problem had to be solved?
- What did Khasandjon personally build?
- How was the system designed?
- What measurable or operational result was achieved?

---

## 4. Case Study Types

### 4.1. Flagship Case Study

Используется для главных проектов.

Обязательные требования:

- полная project page;
- 12–16 содержательных разделов;
- минимум одна architecture diagram;
- минимум два code samples;
- минимум одна подтвержденная метрика;
- личный вклад;
- testing section;
- challenges and trade-offs;
- future improvements;
- confidentiality review.

Примеры:

- Internal HR Platform;
- Call Recording Archive Pipeline;
- Corporate Access Lifecycle Automation;
- Automated Video Delivery Pipeline.

---

### 4.2. Supporting Case Study

Используется для дополнительных проектов.

Требования:

- отдельная project page;
- сокращенная структура;
- одна схема или технический visual;
- минимум один code sample;
- business context;
- личный вклад;
- результат;
- lessons learned.

Примеры:

- Finance Telegram Bot;
- Multilingual School Website.

---

### 4.3. Project Card

Используется для проектов без полноценной страницы.

Содержит:

- название;
- category;
- краткое описание;
- технологии;
- роль;
- статус;
- один результат;
- optional link.

Project card не должен создавать впечатление, что подробный case study существует, если страница еще не подготовлена.

---

## 5. Standard Page Structure

Flagship case study должен использовать следующий порядок.

```text
1. Project Header
2. Executive Summary
3. Key Metrics
4. Problem
5. Users and Business Context
6. My Role and Contributions
7. Requirements and Constraints
8. System Architecture
9. Data Model or Data Flow
10. Key Features
11. Technical Decisions
12. Selected Code
13. Testing and Validation
14. Challenges and Trade-offs
15. Results and Impact
16. Lessons Learned
17. Future Improvements
18. Confidentiality Note
19. Related Content
20. Next Project CTA
```

Supporting case study может объединять некоторые разделы:

```text
1. Project Header
2. Overview
3. Problem
4. My Role
5. Architecture
6. Implementation
7. Selected Code
8. Result
9. Lessons Learned
10. Related Content
```

---

# 6. Project Header Specification

## 6.1. Required Fields

Project header должен содержать:

- project name;
- one-sentence description;
- category;
- role;
- status;
- timeframe;
- technology stack;
- primary metric;
- confidentiality status;
- public demo or repository, если доступно.

---

## 6.2. Project Name

Название должно быть:

- коротким;
- понятным;
- профессиональным;
- безопасным для публикации;
- не зависящим от внутреннего company terminology.

Пример:

> Internal HR Platform

Не использовать:

> FNF Internal HR Super App

---

## 6.3. One-Sentence Description

Описание должно отвечать:

- что это;
- для кого;
- какой процесс поддерживает.

Рекомендуемая длина:

- 15–30 слов.

Пример:

> A multi-module internal platform for managing recruitment, onboarding, employees, leave, access, documents, reporting, and offboarding workflows.

---

## 6.4. Category

Допустимо использовать не более двух категорий.

Примеры:

- Business Application;
- Backend Platform;
- API Integration;
- Workflow Automation;
- Data Pipeline;
- Security Automation;
- Serverless Application;
- Production Website.

---

## 6.5. Role

Роль должна отражать реальный вклад.

Примеры:

- Backend Developer;
- Software Developer;
- Integration Developer;
- Backend and Deployment Support;
- Sole Developer.

Не использовать:

- Lead Developer;
- Software Architect;
- Product Owner;

если это не подтверждено.

---

## 6.6. Status

Допустимые значения:

- Internal Production;
- Production;
- Deployed;
- MVP;
- Active Development;
- Maintained;
- Completed;
- Demonstration Project.

---

## 6.7. Timeframe

Использовать формат:

> November 2025 – Present

или:

> 2026

Если точные даты публикация не требует, допускается год.

---

## 6.8. Technology Stack

Показывать только ключевые технологии.

Рекомендуемый максимум в header:

- 6–8 технологий.

Полный stack можно показать ниже.

Пример:

> Python · FastAPI · PostgreSQL · SQLAlchemy · Redis · Celery · Docker

---

## 6.9. Primary Metric

В header используется одна наиболее сильная метрика.

Пример:

> Approximately 188 REST endpoints across 11 functional modules

Дополнительные показатели располагаются в Key Metrics.

---

# 7. Executive Summary

## 7.1. Purpose

Executive Summary должен дать полное базовое понимание проекта без чтения всей страницы.

Он отвечает:

- что было создано;
- почему это было нужно;
- что сделал кандидат;
- какой результат получен.

---

## 7.2. Length

Рекомендуемый объем:

- 80–150 слов;
- 2–3 коротких абзаца.

---

## 7.3. Recommended Structure

### Paragraph 1

- system purpose;
- target users;
- business workflow.

### Paragraph 2

- technical approach;
- personal contribution.

### Paragraph 3

- measurable result or current status.

---

## 7.4. Example Structure

```text
The project is an internal HR platform designed to replace fragmented employee-management workflows with a centralized application.

My work focused on backend modules, data models, REST APIs, authorization, background jobs, file storage, migrations, testing, and deployment-related tasks.

The platform includes approximately 188 endpoints across 11 modules and supports the core employee lifecycle from recruitment and onboarding to access management and offboarding.
```

---

# 8. Key Metrics

## 8.1. Purpose

Метрики должны быстро показать масштаб и эффект проекта.

---

## 8.2. Recommended Count

- flagship project: 2–4 metrics;
- supporting project: 1–3 metrics.

---

## 8.3. Metric Structure

Каждая metric card содержит:

- value;
- label;
- context.

Пример:

**188+**
REST API endpoints
Across 11 HR workflow modules

---

## 8.4. Accepted Metric Types

### Scale

- endpoint count;
- module count;
- file count;
- number of groups;
- number of users;
- storage volume.

### Performance

- throughput;
- processing duration;
- response time;
- batch size.

### Business Result

- retention period;
- manual steps removed;
- process coverage;
- reduced security risk.

### Quality

- smoke-test count;
- test coverage;
- deployment frequency;
- failure rate.

---

## 8.5. Metric Rules

Нельзя:

- округлять число в большую сторону без объяснения;
- использовать приблизительные цифры как точные;
- смешивать разные временные периоды;
- заявлять процент улучшения без исходного значения;
- повторять одну метрику под разными формулировками.

Если число приблизительное:

- использовать `approximately`;
- использовать диапазон;
- использовать символ `~` только в компактном UI.

---

# 9. Problem Section

## 9.1. Purpose

Раздел должен объяснить, почему проект был необходим.

Он описывает процесс до разработки системы.

---

## 9.2. Required Questions

- What was the previous workflow?
- What was inefficient or risky?
- Who experienced the problem?
- What happened if the issue was not solved?
- Why was an automated or centralized system needed?

---

## 9.3. Recommended Length

- 100–250 слов.

---

## 9.4. Preferred Structure

1. Previous process.
2. Primary limitation.
3. Operational or security risk.
4. Need for change.

---

## 9.5. Example

> Employee information, onboarding steps, access requests, documents, and offboarding activities were managed across disconnected tools and manual processes. This made it difficult to maintain consistent status information, apply access rules, and track the complete employee lifecycle.
>
> The company needed a centralized system that could represent these workflows as structured data and provide role-based access to different HR and operational users.

---

## 9.6. What to Avoid

Не начинать с:

> I used FastAPI and PostgreSQL to build...

Сначала должна быть описана проблема, а не stack.

---

# 10. Users and Business Context

## 10.1. Required Information

По возможности указать:

- primary users;
- departments;
- user roles;
- workflow frequency;
- operational importance;
- relevant business constraints.

---

## 10.2. Example User Groups

- HR administrators;
- managers;
- employees;
- system administrators;
- fleet team;
- dispatch team;
- finance users.

---

## 10.3. Privacy Rule

Для закрытых проектов не использовать:

- реальные имена;
- email;
- internal titles, если они confidential;
- данные клиентов.

---

# 11. My Role and Contributions

## 11.1. Importance

Это один из самых важных разделов.

Он должен четко отделять личный вклад от работы команды.

---

## 11.2. Required Structure

### Role

Краткое название роли.

### Team Context

- team size;
- backend/frontend separation;
- stakeholders;
- collaboration model.

### Personal Contributions

Конкретные компоненты и решения.

### Collaboration

Какие части создавались совместно.

---

## 11.3. Recommended Format

Короткий вводный paragraph и 4–8 bullets.

---

## 11.4. Example

> I worked primarily on backend design and implementation while coordinating requirements with operational stakeholders and integrating the API with the frontend application.

- Designed REST endpoints and data models.
- Implemented authentication and RBAC.
- Added background processing with Redis and Celery.
- Created migrations with Alembic.
- Implemented file-storage workflows.
- Prepared smoke-test scripts.
- Supported Docker and Linux deployment.

---

## 11.5. Contribution Language

Использовать:

- Designed;
- Built;
- Implemented;
- Integrated;
- Modeled;
- Automated;
- Tested;
- Deployed;
- Maintained;
- Documented.

Не использовать:

- Helped;
- Was involved;
- Worked on various tasks;
- Participated in development.

---

## 11.6. Shared Ownership

Если работа выполнялась совместно, писать прямо:

> The frontend was developed collaboratively by another contributor, while my primary responsibility was the backend API and deployment environment.

Не создавать впечатление индивидуальной разработки, если это не так.

---

# 12. Requirements and Constraints

## 12.1. Purpose

Показать, что проект создавался не в идеальных условиях и учитывал реальные ограничения.

---

## 12.2. Requirement Categories

### Functional Requirements

Что система должна делать.

### Non-Functional Requirements

- security;
- reliability;
- maintainability;
- performance;
- auditability;
- accessibility;
- deployment requirements.

### Operational Constraints

- available infrastructure;
- limited team size;
- existing services;
- API limits;
- data privacy;
- manual approval requirements.

---

## 12.3. Recommended Format

3–8 cards или bullets.

Пример:

- Support role-based access across multiple modules.
- Run long operations outside the request-response cycle.
- Preserve an audit trail for sensitive changes.
- Store files outside the relational database.
- Deploy using the existing Linux VPS infrastructure.

---

# 13. System Architecture

## 13.1. Required Components

Каждый flagship project должен содержать:

- high-level diagram;
- textual explanation;
- component responsibilities;
- primary data flow.

---

## 13.2. Architecture Description Questions

- Where does a request or event originate?
- Which service receives it?
- Where is validation performed?
- Where is business logic located?
- Where is data stored?
- Which operations are asynchronous?
- Which external services are called?
- How are errors handled?
- Where is the system deployed?

---

## 13.3. Diagram Levels

### Level 1 — System Context

Показывает:

- users;
- main application;
- external systems.

### Level 2 — Container Diagram

Показывает:

- frontend;
- backend;
- database;
- Redis;
- workers;
- object storage;
- external APIs.

### Level 3 — Sequence or Flow Diagram

Показывает отдельный workflow.

---

## 13.4. Diagram Rules

Диаграмма не должна:

- раскрывать IP addresses;
- показывать credentials;
- содержать избыточные внутренние компоненты;
- использовать реальные employee data;
- создавать ложное впечатление microservices.

---

## 13.5. Architecture Explanation Format

После диаграммы необходимо объяснить:

1. Entry point.
2. Validation.
3. Business logic.
4. Persistence.
5. Async processing.
6. External integrations.
7. Response or output.
8. Failure handling.

---

# 14. Data Model or Data Flow

## 14.1. When to Use Data Model

Используется для:

- HR Platform;
- Finance Bot;
- School Website;
- Truck Claim Platform.

---

## 14.2. When to Use Data Flow

Используется для:

- Recording Archive;
- Video Pipeline;
- Access Automation.

---

## 14.3. Data Model Requirements

Показывать:

- key entities;
- relationships;
- important constraints;
- status fields;
- ownership;
- audit fields.

---

## 14.4. Data Model Safety

Для закрытых проектов:

- использовать упрощенную schema;
- не показывать полный production model;
- менять sensitive field names;
- исключать личные данные.

---

## 14.5. Data Flow Format

Пример:

```text
External API
→ Metadata retrieval
→ Validation
→ Processing record
→ File download
→ Storage upload
→ Completion state
→ Audit log
```

---

# 15. Key Features

## 15.1. Purpose

Показать функциональные возможности системы без перечисления каждого endpoint.

---

## 15.2. Recommended Count

- flagship: 5–10 features;
- supporting: 3–6 features.

---

## 15.3. Feature Card Structure

- feature title;
- one-sentence explanation;
- related technology;
- optional project screenshot.

---

## 15.4. Example

**Role-Based Access Control**

> Permissions are checked at the API boundary and connected to application roles and module-level actions.

---

## 15.5. Feature Selection

Показывать функции, которые подтверждают:

- engineering depth;
- business value;
- relevant technologies.

Не включать простые функции только для увеличения количества.

---

# 16. Technical Decisions

## 16.1. Purpose

Этот раздел должен показать инженерное мышление, а не только конечный stack.

---

## 16.2. Required Decision Format

Каждое решение оформляется одинаково.

### Decision

Что было выбрано.

### Context

Почему решение было необходимо.

### Options Considered

Какие альтернативы существовали.

### Selected Approach

Что было реализовано.

### Reasoning

Почему выбран этот подход.

### Trade-offs

Какие ограничения остались.

---

## 16.3. Example

### Move long-running operations to Celery

**Context**

Some workflows required file processing or multiple external API calls and could not reliably complete during a normal HTTP request.

**Options considered**

- execute synchronously;
- use framework background tasks;
- use Redis and Celery workers.

**Selected approach**

Redis and Celery were used for persistent background jobs.

**Reasoning**

This separated long-running work from request handling and allowed retries and worker-based execution.

**Trade-offs**

The solution introduced additional infrastructure and required monitoring worker and queue health.

---

## 16.4. Recommended Count

- flagship: 3–6 decisions;
- supporting: 1–3 decisions.

---

## 16.5. Good Decision Topics

- PostgreSQL vs document storage;
- service layer;
- Celery background jobs;
- RBAC model;
- file storage strategy;
- idempotent processing;
- retry policy;
- batch size;
- webhook design;
- serverless deployment;
- database migration strategy.

---

# 17. Selected Code

## 17.1. Purpose

Code samples должны подтверждать навыки, но не превращать страницу проекта в repository browser.

---

## 17.2. Required Code Sample Structure

Каждый пример включает:

1. title;
2. context;
3. code block;
4. explanation;
5. engineering principles;
6. testing note;
7. confidentiality note;
8. link to full sample, если есть.

---

## 17.3. Recommended Length

### Inline Sample

- 15–50 lines.

### Dedicated Sample Page

- 30–120 lines.

Если пример длиннее, его необходимо разделить.

---

## 17.4. Code Quality Requirements

Код должен:

- быть синтаксически корректным;
- использовать type hints;
- иметь ясные names;
- включать error handling, где уместно;
- не содержать secrets;
- не содержать production URLs;
- не содержать proprietary business logic;
- быть достаточно полным для понимания;
- не содержать лишнего boilerplate.

---

## 17.5. Code Sample Categories

### API

- FastAPI endpoint;
- request validation;
- response model.

### Business Logic

- service method;
- workflow handler.

### Data

- SQLAlchemy model;
- repository;
- query;
- migration.

### Authorization

- permission check;
- RBAC dependency.

### Background Processing

- Celery task;
- retry logic;
- idempotency.

### Testing

- Pytest integration test;
- smoke-test scenario.

### Infrastructure

- Docker Compose;
- Nginx;
- environment configuration.

---

## 17.6. Code Explanation Structure

После code block:

### What the code does

Краткое описание.

### Why it is structured this way

Объяснение архитектурного решения.

### Important details

- validation;
- permissions;
- transactions;
- errors;
- types;
- retries.

### Production considerations

Что потребуется в полном production implementation.

---

## 17.7. Confidentiality Statement

Для закрытых проектов:

> This sample was independently rewritten for the portfolio and represents the engineering pattern without reproducing proprietary source code.

---

# 18. Testing and Validation

## 18.1. Purpose

Показать, как проверялась работоспособность системы.

---

## 18.2. Testing Categories

- unit testing;
- integration testing;
- API testing;
- smoke testing;
- migration testing;
- manual workflow validation;
- deployment validation;
- failure simulation.

---

## 18.3. Required Questions

- Which workflows were critical?
- What was automated?
- What was tested manually?
- Which failure cases were checked?
- How was a release validated?
- What was not covered?

---

## 18.4. Recommended Format

### Test Strategy

Общий подход.

### Critical Scenarios

3–8 scenarios.

### Example Test

Один test snippet.

### Limitations

Честно описать, чего пока нет.

---

## 18.5. Example Critical Scenarios

- unauthorized user cannot access restricted endpoint;
- employee cannot be created with invalid department;
- repeated background job does not duplicate output;
- failed external API request is retried;
- migration applies to a populated database;
- invalid webhook payload is rejected;
- missing file is handled without corrupting processing state.

---

## 18.6. Honest Testing Language

Использовать:

> The release process included 15–20 smoke-test scripts for critical workflows.

Не использовать:

> The system was fully tested.

---

# 19. Challenges and Trade-offs

## 19.1. Purpose

Показать реальную сложность проекта и зрелость мышления.

---

## 19.2. Required Structure

### Challenge

Что было сложно.

### Why It Mattered

Какой риск создавался.

### Approach

Что было сделано.

### Result

Что удалось улучшить.

### Remaining Limitation

Что не решено полностью.

---

## 19.3. Recommended Count

- flagship: 2–4 challenges;
- supporting: 1–2 challenges.

---

## 19.4. Suitable Challenges

- unreliable external APIs;
- rate limits;
- partial failures;
- duplicate processing;
- long-running tasks;
- permission complexity;
- migration safety;
- data consistency;
- large file transfers;
- limited infrastructure;
- unclear requirements;
- deployment issues.

---

## 19.5. What Not to Use

Не использовать искусственные challenges:

- learning the programming language;
- setting up the project folder;
- choosing button colors;
- installing dependencies.

Исключение — если это действительно привело к важному engineering decision.

---

# 20. Results and Impact

## 20.1. Result Types

### Technical Result

- completed platform;
- improved throughput;
- automated processing;
- safer access management;
- structured data;
- reliable deployment.

### Business Result

- reduced manual work;
- extended retention;
- improved process visibility;
- reduced access risk;
- faster delivery;
- centralized workflow.

### Learning Result

- deeper understanding of async processing;
- better migration discipline;
- improved API design.

Learning result не должен заменять business result для production project.

---

## 20.2. Recommended Structure

1. Primary measurable result.
2. Operational value.
3. Current status.
4. Remaining limitation.

---

## 20.3. Before-and-After Format

Для подходящих проектов:

| Before               | After                       |
| -------------------- | --------------------------- |
| Manual processing    | Automated workflow          |
| 90-day retention     | 2-year retention            |
| ~150 videos/week     | 1,500–2,000 videos/week     |
| Manual group removal | Automated access revocation |

---

## 20.4. Result Language

Использовать:

> Increased weekly throughput from approximately 150 to 1,500–2,000 videos.

Не использовать:

> Dramatically improved efficiency.

---

# 21. Lessons Learned

## 21.1. Purpose

Показать способность анализировать собственную работу.

---

## 21.2. Recommended Content

- important technical lesson;
- process lesson;
- mistake or limitation;
- how future decisions changed.

---

## 21.3. Length

- 80–180 слов;
- или 3–5 bullets.

---

## 21.4. Example

> The project reinforced the importance of idempotency in integration workflows. A retry mechanism is not sufficient if repeated processing can create duplicate files or messages. Processing state and external identifiers must be designed before scaling the workflow.

---

# 22. Future Improvements

## 22.1. Purpose

Показать реалистичное понимание того, как систему можно развивать.

---

## 22.2. Suitable Improvements

- improved automated testing;
- structured observability;
- metrics dashboards;
- CI/CD;
- retry policies;
- dead-letter queues;
- performance profiling;
- database indexes;
- clearer module boundaries;
- stronger documentation;
- public demo environment.

---

## 22.3. Rules

Future improvements не должны:

- обесценивать текущую версию;
- создавать впечатление, что система небезопасна;
- обещать работу, которая не планируется;
- включать технологии только ради trend appeal.

---

# 23. Confidentiality Note

## 23.1. Standard Project-Level Note

> This project was developed for internal company use. The architecture, examples, and screenshots shown here were simplified or anonymized to protect proprietary business logic, credentials, employee information, and internal infrastructure details.

---

## 23.2. Standard Code-Level Note

> This code sample was independently rewritten for the portfolio and does not reproduce proprietary source code.

---

## 23.3. Public Project Note

Для публичного проекта:

> The repository and deployment details are available through the links above. Secrets and production data are not included.

---

# 24. Related Content

Каждый case study должен ссылаться на:

- 1–4 related code samples;
- related experience role;
- one next project;
- Projects index;
- Contact or Resume.

---

## 24.1. Example

### Related Code Samples

- FastAPI Service Layer;
- RBAC Permission Check;
- Celery Background Task;
- Pytest API Workflow.

### Related Experience

> Backend Developer / System Administrator — FNF GLOBAL

---

# 25. Project CTA

## 25.1. End-of-Page Actions

Основные:

- View Next Project;
- Explore Code Samples;
- View All Projects;
- Contact Me.

---

## 25.2. CTA Selection

Для flagship project:

> Explore Related Code Samples

Для public project:

> View Repository

Для deployed project:

> Open Live Project

Для последней страницы:

> Get in Touch

---

# 26. Content Length Guidelines

| Section                  | Recommended Length |
| ------------------------ | -----------------: |
| Project description      |        15–30 words |
| Executive Summary        |       80–150 words |
| Problem                  |      100–250 words |
| Users and Context        |       50–120 words |
| My Role                  |      100–250 words |
| Requirements             |        3–8 bullets |
| Architecture explanation |      150–350 words |
| Data Model               |      100–250 words |
| Key Features             |         4–10 cards |
| Technical Decision       | 100–250 words each |
| Code explanation         |  80–200 words each |
| Testing                  |      120–300 words |
| Challenge                | 100–220 words each |
| Results                  |       80–180 words |
| Lessons Learned          |       80–180 words |
| Future Improvements      |        3–6 bullets |

Полная flagship page обычно содержит:

- 1,500–3,000 слов;
- 1–3 diagrams;
- 2–5 code samples;
- 2–4 metrics.

---

# 27. Writing Style

## 27.1. General Style

Текст должен быть:

- direct;
- technical;
- professional;
- evidence-based;
- readable;
- honest.

---

## 27.2. Sentence Structure

Предпочтительно:

- короткие и средние предложения;
- одна идея на предложение;
- активный залог;
- точные глаголы.

---

## 27.3. First Person

Допустимо использовать `I` в:

- My Role;
- Lessons Learned;
- Technical Decisions;
- Future Improvements.

Пример:

> I separated long-running jobs from API requests using Celery workers.

---

## 27.4. Avoid Marketing Language

Не использовать:

- revolutionary;
- cutting-edge;
- highly scalable;
- enterprise-grade;
- seamless;
- world-class;
- innovative;
- best-in-class.

---

## 27.5. Avoid Unverified Scale Claims

Не использовать:

- high-load;
- massive scale;
- millions of requests;
- distributed architecture;

без данных.

---

# 28. Project Metadata Specification

Каждый project file должен иметь metadata.

Пример:

```yaml
title: "Internal HR Platform"
slug: "internal-hr-platform"
summary: "A multi-module platform for employee lifecycle workflows."
category:
  - "Business Application"
  - "Backend Platform"
status: "Internal Production"
role: "Backend Developer"
startDate: "2025-11"
endDate: null
featured: true
priority: 1
confidentialityLevel: 2

technologies:
  - "Python"
  - "FastAPI"
  - "PostgreSQL"
  - "SQLAlchemy"
  - "Redis"
  - "Celery"
  - "Docker"

metrics:
  - value: "188+"
    label: "REST API endpoints"
    context: "Across 11 functional modules"

relatedCode:
  - "fastapi-service-layer"
  - "rbac-permission-check"
  - "celery-background-task"

repositoryUrl: null
liveUrl: null
```

---

# 29. Project Content Data Model

Рекомендуемая структура.

```typescript
type ProjectCaseStudy = {
  title: string;
  slug: string;
  summary: string;
  categories: string[];
  status: ProjectStatus;
  role: string;
  timeframe: {
    start: string;
    end?: string;
  };
  featured: boolean;
  confidentialityLevel: 0 | 1 | 2 | 3;
  technologies: string[];
  metrics: ProjectMetric[];

  overview: RichContent;
  problem: RichContent;
  users?: RichContent;
  contribution: RichContent;
  requirements?: ContentItem[];
  constraints?: ContentItem[];

  architecture?: ArchitectureAsset[];
  dataModel?: RichContent;
  features?: ProjectFeature[];
  decisions?: TechnicalDecision[];
  codeSamples?: CodeSampleReference[];
  testing?: RichContent;
  challenges?: ProjectChallenge[];
  results: RichContent;
  lessons?: RichContent;
  futureImprovements?: ContentItem[];

  screenshots?: ProjectAsset[];
  relatedProjects?: string[];
  relatedExperience?: string[];
  repositoryUrl?: string;
  liveUrl?: string;
};
```

---

# 30. Screenshot Specification

Каждый screenshot должен иметь:

- title;
- description;
- alt text;
- project reference;
- anonymization status;
- source;
- display size;
- light/dark compatibility.

Пример:

```yaml
title: "Employee Directory"
alt: "An anonymized employee directory with filters and status labels."
anonymized: true
containsDemoData: true
```

---

# 31. Diagram Specification

Каждая диаграмма содержит:

- diagram title;
- diagram type;
- short introduction;
- visual;
- text description;
- component legend;
- confidentiality status.

Пример типов:

- System Context;
- Container Architecture;
- Sequence Flow;
- Data Flow;
- Permission Flow;
- Deployment Diagram.

---

# 32. Code Sample Reference Specification

Пример:

```yaml
title: "Permission-Based FastAPI Dependency"
slug: "rbac-permission-check"
language: "Python"
category: "Authorization"
relatedProject: "internal-hr-platform"
portfolioRewritten: true
confidentialityReviewed: true
```

---

# 33. Flagship Project Quality Standard

Flagship page готова, если посетитель может определить:

- зачем был нужен проект;
- кто им пользовался;
- личный вклад кандидата;
- ключевые компоненты;
- data flow;
- основные технические решения;
- пример качества кода;
- способ тестирования;
- главную сложность;
- результат;
- ограничения;
- будущие улучшения.

---

# 34. Supporting Project Quality Standard

Supporting project готов, если содержит:

- понятный overview;
- одну реальную проблему;
- личный вклад;
- stack;
- одну схему или screenshot;
- один code sample;
- результат;
- lessons learned;
- links.

---

# 35. Case Study Review Process

Каждая страница проходит пять проверок.

## 35.1. Factual Review

Проверить:

- даты;
- числа;
- технологии;
- названия;
- статус;
- личный вклад.

## 35.2. Technical Review

Проверить:

- корректность архитектуры;
- код;
- terminology;
- database model;
- error handling;
- testing claims.

## 35.3. Confidentiality Review

Проверить:

- secrets;
- internal URLs;
- identities;
- screenshots;
- code ownership;
- infrastructure.

## 35.4. Language Review

Проверить:

- English grammar;
- tone;
- terminology consistency;
- tense;
- repetition.

## 35.5. UX Review

Проверить:

- scannability;
- heading hierarchy;
- diagram readability;
- code overflow;
- mobile layout;
- CTA.

---

# 36. Case Study Validation Questions

Перед публикацией необходимо ответить:

1. Понятна ли проблема без знания компании?
2. Понятно ли, что сделал кандидат лично?
3. Есть ли подтверждение главного технического навыка?
4. Есть ли доказательство результата?
5. Объяснены ли архитектурные решения?
6. Показан ли хотя бы один реальный challenge?
7. Код безопасен для публикации?
8. Числа совпадают с резюме?
9. Страница понятна рекрутеру?
10. Страница достаточно глубока для инженера?
11. Можно ли просмотреть главное за две минуты?
12. Есть ли логичное следующее действие?

---

# 37. Anti-Patterns

## 37.1. Technology Dump

Плохо:

> Python, FastAPI, PostgreSQL, Redis, Celery, Docker, Nginx, GitHub, Linux.

Хорошо:

> Celery workers handled long-running file and reporting tasks outside the request-response cycle, while Redis provided the task queue.

---

## 37.2. Unclear Ownership

Плохо:

> We built an HR platform.

Хорошо:

> I implemented backend modules, REST endpoints, RBAC, migrations, background jobs, and smoke-test workflows. Frontend development was handled collaboratively by another contributor.

---

## 37.3. Feature List Without Context

Плохо:

> Login, employees, reports, leave, documents.

Хорошо:

> The platform centralized employee lifecycle workflows that had previously been handled across disconnected tools and manual records.

---

## 37.4. Fake Complexity

Плохо:

> A highly scalable distributed microservices architecture.

Хорошо:

> A modular FastAPI application with PostgreSQL, Redis, Celery workers, object storage, and Docker-based deployment.

---

## 37.5. No Limitations

Проект без challenges и limitations выглядит недостоверно.

---

## 37.6. Excessively Long Code

Case study не должен содержать целые source files без объяснений.

---

# 38. Standard Flagship Template

```markdown
---
title:
slug:
summary:
categories:
status:
role:
timeframe:
featured:
confidentialityLevel:
technologies:
metrics:
relatedCode:
repositoryUrl:
liveUrl:
---

# Project Name

Short project description.

## Executive Summary

What was built, why it was needed, personal contribution, and result.

## Key Metrics

Metric cards.

## The Problem

Previous workflow, limitation, risk, and need for change.

## Users and Business Context

Who used the system and why it mattered.

## My Role and Contributions

Team context and specific personal work.

## Requirements and Constraints

Functional, technical, operational, and security constraints.

## System Architecture

Diagram and architecture explanation.

## Data Model or Data Flow

Key entities, relationships, or processing stages.

## Key Features

Important functionality.

## Technical Decisions

### Decision 1

Context, options, approach, reasoning, and trade-offs.

### Decision 2

Context, options, approach, reasoning, and trade-offs.

## Selected Code

### Sample 1

Context, code, explanation, testing, and confidentiality.

### Sample 2

Context, code, explanation, testing, and confidentiality.

## Testing and Validation

Testing strategy, scenarios, sample, and limitations.

## Challenges and Trade-offs

### Challenge 1

Problem, approach, result, and remaining limitation.

## Results and Impact

Measured and operational results.

## Lessons Learned

Technical and process lessons.

## Future Improvements

Realistic next improvements.

## Confidentiality

Project confidentiality statement.

## Related Content

Code samples, experience, and projects.
```

---

# 39. Standard Supporting Template

```markdown
---
title:
slug:
summary:
categories:
status:
role:
timeframe:
featured: false
confidentialityLevel:
technologies:
---

# Project Name

## Overview

Project purpose and main result.

## Problem

What needed to be solved.

## My Role

Specific contribution.

## Implementation

Architecture, data, and important features.

## Selected Code

One focused code example.

## Result

Technical and business outcome.

## Lessons Learned

Key lessons.

## Related Content

Related projects and samples.
```

---

# 40. Project-Specific Emphasis

## Internal HR Platform

Emphasize:

- modular business application;
- REST APIs;
- PostgreSQL;
- RBAC;
- background processing;
- migrations;
- testing;
- deployment.

## Call Recording Archive

Emphasize:

- API pagination;
- file processing;
- idempotency;
- retries;
- retention;
- high volume.

## Access Lifecycle Automation

Emphasize:

- onboarding/offboarding;
- rule evaluation;
- security risk;
- idempotent membership changes;
- audit events.

## Video Delivery Pipeline

Emphasize:

- throughput;
- file-processing stages;
- external services;
- background processing;
- failure recovery.

## Finance Telegram Bot

Emphasize:

- TypeScript;
- webhook request lifecycle;
- validation;
- D1 relational storage;
- serverless deployment.

## School Website

Emphasize:

- Django models;
- migrations;
- multilingual content;
- admin workflows;
- Nginx/Gunicorn deployment.

---

# 41. Definition of Done

Документ считается реализованным, когда:

- все project pages используют единый template;
- header содержит обязательные metadata;
- flagship projects имеют полный case study;
- supporting projects имеют сокращенный case study;
- личный вклад отделен от командного;
- метрики проверены;
- архитектура объяснена текстом;
- diagrams доступны и безопасны;
- code samples переписаны и проверены;
- testing claims соответствуют фактам;
- challenges не являются искусственными;
- результаты сформулированы конкретно;
- confidentiality note присутствует;
- каждая страница имеет related content;
- CTA ведут на существующие страницы;
- content проходит factual, technical, confidentiality, language и UX review.

---

# 42. Final Content Principle

Каждая страница проекта должна последовательно вести посетителя по следующей логике:

> Problem → Context → Contribution → Architecture → Decisions → Code → Testing → Challenges → Result

Case study считается сильным не тогда, когда содержит больше технологий, а тогда, когда ясно показывает, как реальная проблема была преобразована в техническое решение и какой вклад кандидат внес в этот результат.
