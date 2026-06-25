# Content Inventory and Project Selection

## 1. Document Information

**Document:** Content Inventory and Project Selection
**File:** `04-content-inventory-and-project-selection.md`
**Project:** Khasandjon Babadzhanov — Software Developer Portfolio
**Version:** 1.0
**Status:** Working content baseline
**Website language:** English
**Documentation language:** Russian

---

## 2. Purpose of This Document

Этот документ определяет:

- полный список проектов и профессиональных материалов;
- приоритет проектов для портфолио;
- какие проекты должны быть представлены как полноценные case studies;
- какие проекты должны использоваться как supporting projects;
- какие проекты пока не готовы к публикации;
- доступные доказательства по каждому проекту;
- недостающие данные;
- требования к screenshots, diagrams и code samples;
- уровень конфиденциальности;
- критерии готовности проекта к публикации;
- порядок подготовки проектного контента.

Документ является источником истины для наполнения страниц:

- Home;
- Projects;
- Project Details;
- Code Samples;
- Experience;
- About;
- Resume.

---

## 3. Content Strategy

Портфолио не должно содержать все выполненные задачи в одинаковом объеме.

Каждый проект должен выполнять конкретную функцию:

1. доказать основной технический навык;
2. показать масштаб или сложность;
3. продемонстрировать business impact;
4. показать личный вклад;
5. добавить новое доказательство, которого нет в других проектах.

Если два проекта доказывают почти одинаковые навыки, один из них должен получить меньший приоритет.

Основной принцип отбора:

> A smaller number of detailed and credible case studies is more valuable than a large collection of shallow project cards.

---

## 4. Project Selection Criteria

Каждый проект оценивается по следующим критериям.

### 4.1. Technical Relevance

Насколько проект подтверждает востребованные навыки:

- Python;
- backend development;
- PostgreSQL;
- API design;
- integrations;
- business applications;
- background processing;
- testing;
- Docker;
- Linux;
- TypeScript.

### 4.2. Engineering Depth

Насколько проект позволяет показать:

- архитектуру;
- data model;
- service boundaries;
- permission model;
- error handling;
- async processing;
- testing;
- deployment;
- trade-offs.

### 4.3. Business Impact

Можно ли объяснить:

- какую проблему решал проект;
- кто им пользовался;
- какой процесс был улучшен;
- какое ручное действие устранено;
- какой измеримый результат достигнут.

### 4.4. Personal Contribution

Можно ли точно определить:

- что сделал Khasandjon;
- какие решения он принимал;
- какая часть была реализована лично;
- какие части выполнялись совместно;
- где проходили границы ответственности.

### 4.5. Evidence Availability

Доступны ли:

- screenshots;
- architecture diagrams;
- code patterns;
- metrics;
- deployment details;
- test examples;
- public demo;
- repository;
- live URL.

### 4.6. Confidentiality Risk

Можно ли безопасно представить проект без раскрытия:

- proprietary code;
- employee data;
- client data;
- internal URLs;
- credentials;
- security-sensitive infrastructure;
- business secrets.

### 4.7. Differentiation

Добавляет ли проект новый тип доказательства или повторяет уже показанные навыки.

---

## 5. Project Priority Levels

Все проекты разделяются на четыре уровня.

### Tier 1 — Flagship Case Studies

Главные проекты портфолио.

Требуют:

- отдельную detail page;
- полную структуру case study;
- architecture diagram;
- минимум 2 code samples;
- конкретные метрики;
- описание личного вклада;
- testing section;
- challenges and trade-offs.

### Tier 2 — Supporting Case Studies

Сильные проекты, дополняющие основные.

Требуют:

- отдельную project page;
- сокращенную архитектуру;
- минимум 1 code sample или technical artifact;
- бизнес-контекст;
- результат.

### Tier 3 — Project Cards

Проекты, которые показываются в каталоге, но пока не получают подробную страницу.

Требуют:

- название;
- краткое описание;
- технологии;
- роль;
- статус;
- один результат;
- optional screenshot.

### Tier 4 — Future or Internal Backlog

Проекты, которые пока не должны публиковаться.

Причины:

- недостаточно информации;
- проект не завершен;
- нет понятного личного вклада;
- высокий confidentiality risk;
- слабое качество текущей реализации;
- проект повторяет более сильный case study.

---

## 6. Selected Project Portfolio

### Tier 1 — Flagship Case Studies

1. Internal HR Platform
2. Call Recording Archive Pipeline
3. Corporate Access Lifecycle Automation
4. Automated Video Delivery Pipeline

### Tier 2 — Supporting Case Studies

5. Finance Telegram Bot
6. Multilingual School Website
7. Truck Claim Platform

### Tier 3 — Project Cards

8. Attendance Tracking Integration
9. CRM and Business Process Automation
10. Finance Bot Extensions
11. HR Platform Infrastructure and Deployment

### Tier 4 — Future Backlog

12. Odoo Demonstration Module
13. Open-Source Contribution
14. React Portfolio Components
15. Additional Public API Project

---

# 7. Project Inventory

## 7.1. Internal HR Platform

### Classification

**Tier:** 1
**Priority:** Highest
**Type:** Internal business application
**Status:** MVP / active internal development
**Confidentiality:** High
**Primary role:** Backend Developer
**Primary portfolio function:** Main proof of backend engineering capability

### Project Summary

Внутренняя HR-платформа для управления основными процессами жизненного цикла сотрудников.

Система включает:

- authentication;
- role-based access control;
- employee management;
- recruitment;
- onboarding;
- leave management;
- access management;
- offboarding;
- document workflows;
- reporting;
- audit logging;
- background jobs;
- file storage.

### Confirmed Technologies

- Python;
- FastAPI;
- PostgreSQL;
- SQLAlchemy 2.0;
- Pydantic v2;
- Alembic;
- Redis;
- Celery;
- Docker;
- Nginx;
- Linux;
- S3-compatible storage;
- Pytest;
- REST APIs.

### Confirmed Metrics

- approximately 188 REST endpoints;
- 11 functional modules;
- 15–20 smoke-test scripts per release;
- deployable MVP;
- frontend integration;
- Linux/VPS deployment.

### Skills Demonstrated

- backend architecture;
- REST API design;
- relational data modeling;
- authentication;
- authorization;
- RBAC;
- async processing;
- database migrations;
- file storage;
- audit logs;
- testing;
- Docker;
- deployment;
- requirements analysis;
- frontend-backend collaboration.

### Strongest Portfolio Value

Этот проект лучше всего показывает способность создавать сложное business application, а не отдельный script или integration.

### Required Case Study Sections

- platform overview;
- original HR workflow;
- business requirements;
- module structure;
- personal contribution;
- high-level architecture;
- request lifecycle;
- authentication flow;
- RBAC model;
- employee data model;
- background jobs;
- file storage;
- audit logging;
- database migrations;
- testing;
- deployment;
- challenges;
- results;
- future improvements.

### Recommended Architecture Diagrams

1. High-level system architecture.
2. Request lifecycle.
3. Background job flow.
4. RBAC permission flow.
5. Employee lifecycle module map.
6. Deployment architecture.

### Recommended Code Samples

1. FastAPI endpoint with dependencies.
2. Service-layer method.
3. SQLAlchemy model and relationship.
4. Permission dependency.
5. Celery task.
6. Pytest API test.
7. Alembic migration.
8. Docker Compose service fragment.

### Available Evidence

- confirmed stack;
- confirmed endpoint count;
- confirmed module count;
- production/deployment experience;
- project repository exists privately;
- development history;
- frontend screenshots may be available;
- documentation already exists for UX/UI redesign;
- deployment configuration exists;
- smoke-test scripts exist.

### Missing Information

- exact number of users;
- current production status;
- exact personal contribution percentage;
- team size;
- list of endpoints by module;
- response-time or performance metrics;
- database size;
- number of database tables;
- test coverage;
- frontend screenshots approved for publication;
- architecture diagrams;
- anonymized API response examples;
- exact deployment topology;
- monitoring and logging setup.

### Publication Risks

- employee personal data;
- internal company names;
- private repository code;
- server addresses;
- production credentials;
- security rules;
- internal workflow details.

### Required Anonymization

- replace real employee data with demo data;
- remove company-specific identifiers;
- simplify permissions;
- rewrite code independently;
- replace internal domains;
- remove secrets;
- avoid full database schema publication.

### Publication Readiness

**Current estimate:** 65%

### Required Before Publication

- architecture diagram;
- approved screenshots;
- anonymized code samples;
- clear statement of personal contribution;
- exact module inventory;
- security review;
- metrics consistency review.

---

## 7.2. Call Recording Archive Pipeline

### Classification

**Tier:** 1
**Priority:** Very high
**Type:** API integration and file-processing pipeline
**Status:** Production workflow
**Confidentiality:** High
**Primary role:** Developer / Integration Engineer
**Primary portfolio function:** Show scale, integrations, automation and compliance value

### Project Summary

Автоматизированная система переноса call recordings из RingCentral в Google Drive или другое долгосрочное хранилище.

Основная задача:

- получать записи;
- обрабатывать metadata;
- загружать файлы;
- организовывать хранение;
- поддерживать retention workflow;
- уменьшить риск удаления записей после стандартного срока хранения.

### Confirmed Technologies

- Python;
- RingCentral API;
- Google Drive API;
- REST APIs;
- scheduled processing;
- file transfer;
- authentication tokens;
- cloud storage.

### Confirmed Metrics

- 90,000–150,000 recordings per 90-day cycle;
- retention increased from 90 days to 2 years.

### Skills Demonstrated

- external API integration;
- high-volume file processing;
- pagination;
- batching;
- scheduled jobs;
- file naming;
- metadata handling;
- retries;
- rate-limit awareness;
- storage organization;
- operational automation.

### Strongest Portfolio Value

Проект показывает измеримый масштаб и понятную business value.

### Required Case Study Sections

- original retention limitation;
- compliance and operational context;
- workflow before automation;
- system architecture;
- API authentication;
- recording discovery;
- batch processing;
- file transfer;
- storage organization;
- duplicate prevention;
- retries and failures;
- observability;
- metrics;
- result.

### Recommended Architecture Diagrams

1. RingCentral-to-storage data flow.
2. Scheduled batch lifecycle.
3. File processing state machine.
4. Retry and failure flow.

### Recommended Code Samples

1. API pagination iterator.
2. Recording metadata model.
3. Idempotent file-processing function.
4. Retry wrapper.
5. Batch scheduler.
6. structured logging example.

### Available Evidence

- confirmed volume;
- confirmed retention improvement;
- integration endpoints known;
- workflow used operationally;
- business reason clearly defined.

### Missing Information

- exact runtime of one cycle;
- average file size;
- total storage volume;
- rate limits;
- retry behavior;
- duplicate-detection strategy;
- storage folder structure;
- monitoring;
- failure rate;
- manual time saved;
- exact scheduler technology;
- whether processing is synchronous or asynchronous;
- whether resumable uploads were used.

### Publication Risks

- call metadata;
- phone numbers;
- account IDs;
- file names;
- internal retention policies;
- API credentials;
- storage folder identifiers.

### Required Anonymization

- synthetic recording metadata;
- generic storage names;
- fake file identifiers;
- simplified API response;
- rewritten integration code.

### Publication Readiness

**Current estimate:** 60%

### Required Before Publication

- confirm processing architecture;
- define failure handling;
- create synthetic metadata;
- create architecture diagram;
- write 2–3 safe code samples;
- verify exact metric wording.

---

## 7.3. Corporate Access Lifecycle Automation

### Classification

**Tier:** 1
**Priority:** Very high
**Type:** Security-oriented workflow automation
**Status:** Production workflow
**Confidentiality:** High
**Primary role:** Developer / Automation Engineer
**Primary portfolio function:** Show authorization thinking, lifecycle automation and risk reduction

### Project Summary

Система автоматизирует предоставление и удаление доступа сотрудников в корпоративных Telegram-группах.

Она поддерживает:

- onboarding;
- role-based group assignment;
- offboarding;
- access revocation;
- auditability;
- synchronization with employee status.

### Confirmed Technologies

- Python;
- Telegram API;
- automation scripts or bot workflows;
- employee status data;
- scheduled or event-driven processing.

### Confirmed Metrics

- approximately 1,500 corporate Telegram groups;
- removed manual onboarding/offboarding work;
- reduced risk of former employees retaining access.

### Skills Demonstrated

- lifecycle automation;
- access management;
- security thinking;
- external API integration;
- rule-based processing;
- large-scale group mapping;
- audit logging;
- idempotency;
- error handling.

### Strongest Portfolio Value

Проект демонстрирует решение реальной security и operational problem.

### Required Case Study Sections

- original access-management process;
- security risk;
- employee lifecycle events;
- group assignment rules;
- system architecture;
- data model;
- onboarding flow;
- offboarding flow;
- error cases;
- audit trail;
- permission boundaries;
- results.

### Recommended Architecture Diagrams

1. Employee lifecycle event flow.
2. Group access rule engine.
3. Offboarding sequence.
4. Audit log flow.

### Recommended Code Samples

1. access rule evaluator;
2. onboarding service;
3. offboarding service;
4. idempotent membership update;
5. audit event model;
6. failed-operation retry handler.

### Available Evidence

- confirmed group scale;
- confirmed business problem;
- confirmed security gap;
- operational use;
- clear before-and-after workflow.

### Missing Information

- source of employee data;
- exact onboarding trigger;
- exact offboarding trigger;
- rule format;
- number of employees processed;
- audit-log implementation;
- failure handling;
- partial failure strategy;
- API limitations;
- whether manual approval exists;
- execution frequency;
- processing duration.

### Publication Risks

- group names;
- employee identities;
- internal organizational structure;
- access rules;
- Telegram session credentials;
- administrative permissions.

### Required Anonymization

- replace group names with departments;
- synthetic employee identities;
- simplified rules;
- omit admin authentication details;
- do not expose session-handling configuration.

### Publication Readiness

**Current estimate:** 55%

### Required Before Publication

- clarify architecture;
- document trigger model;
- create access-rule example;
- define failure behavior;
- create anonymized screenshots or visual workflow;
- prepare security note.

---

## 7.4. Automated Video Delivery Pipeline

### Classification

**Tier:** 1
**Priority:** High
**Type:** Media integration and automation pipeline
**Status:** Production workflow
**Confidentiality:** Medium to high
**Primary role:** Developer / Integration Engineer
**Primary portfolio function:** Show throughput improvement and cross-service automation

### Project Summary

Автоматизированный pipeline для передачи operational video files между Motive, Cloudflare и Telegram.

### Confirmed Technologies

- Python;
- Motive API or source system;
- Cloudflare;
- Telegram;
- file processing;
- API integration;
- background or scheduled processing.

### Confirmed Metrics

- throughput increased from approximately 150 videos per week;
- to approximately 1,500–2,000 videos per week;
- 10–13× increase.

### Skills Demonstrated

- API integration;
- media processing;
- data transfer;
- pipeline architecture;
- throughput improvement;
- background processing;
- batching;
- error recovery;
- operational automation.

### Strongest Portfolio Value

Проект имеет наиболее наглядный before-and-after показатель.

### Required Case Study Sections

- original manual bottleneck;
- source and destination systems;
- pipeline overview;
- data flow;
- file metadata;
- processing stages;
- batching;
- failure handling;
- throughput constraints;
- result;
- remaining limitations.

### Recommended Architecture Diagrams

1. End-to-end pipeline.
2. Processing stage sequence.
3. Retry and recovery model.
4. Throughput before and after.

### Recommended Code Samples

1. file-processing pipeline;
2. validation step;
3. upload adapter interface;
4. retry mechanism;
5. batch-processing loop;
6. processing result model.

### Available Evidence

- confirmed original throughput;
- confirmed improved throughput;
- known connected systems;
- known operational teams;
- known removal of manual bottleneck.

### Missing Information

- average video size;
- processing duration;
- concurrency model;
- Cloudflare product used;
- storage architecture;
- Telegram delivery mechanism;
- rate limits;
- failure rate;
- retry mechanism;
- queue implementation;
- duplicate handling.

### Publication Risks

- video content;
- driver or vehicle data;
- fleet information;
- internal Telegram destinations;
- source URLs;
- security tokens.

### Required Anonymization

- use generated sample video metadata;
- remove fleet identifiers;
- omit real chat IDs;
- show mock file names;
- rewrite integration code.

### Publication Readiness

**Current estimate:** 55%

### Required Before Publication

- clarify Cloudflare component;
- document concurrency model;
- define exact processing stages;
- create safe visual assets;
- write 2 code samples.

---

## 7.5. Finance Telegram Bot

### Classification

**Tier:** 2
**Priority:** High
**Type:** Public or reproducible serverless application
**Status:** Deployed
**Confidentiality:** Low
**Primary role:** Sole Developer
**Primary portfolio function:** Public proof of TypeScript, serverless development and independent ownership

### Project Summary

Telegram bot for expense tracking and financial summaries.

### Confirmed Technologies

- TypeScript;
- Hono;
- Zod;
- Cloudflare Workers;
- Cloudflare D1;
- Telegram webhooks;
- relational storage;
- Wrangler.

### Confirmed Features

- webhook ingestion;
- Telegram message processing;
- input validation;
- expense storage;
- reports;
- Cloudflare deployment.

### Skills Demonstrated

- TypeScript;
- serverless architecture;
- webhook processing;
- validation;
- relational data;
- deployment;
- configuration;
- API integration.

### Strongest Portfolio Value

Проект можно представить с меньшими confidentiality restrictions и использовать как реальное публичное technical proof.

### Required Case Study Sections

- product purpose;
- bot interaction flow;
- webhook architecture;
- validation;
- database schema;
- command handling;
- error handling;
- Cloudflare deployment;
- lessons learned.

### Recommended Architecture Diagrams

1. Telegram-to-Worker request flow.
2. D1 data model.
3. Command-processing flow.

### Recommended Code Samples

1. webhook handler;
2. Zod schema;
3. command router;
4. D1 repository;
5. error response;
6. Wrangler configuration.

### Available Evidence

- existing source code;
- deployed Worker;
- GitHub repository may be available;
- known stack;
- known deployment workflow;
- typecheck history;
- webhook configuration.

### Missing Information

- current live status;
- safe public demo method;
- screenshots;
- final feature list;
- database schema;
- tests;
- current README quality;
- whether repository should become public;
- number of users;
- current reporting functionality.

### Publication Risks

- bot token;
- webhook secret;
- private user data;
- production database records.

### Required Anonymization

- remove `.env`;
- use demo bot screenshots;
- synthetic expenses;
- confirm repository secret scanning.

### Publication Readiness

**Current estimate:** 75%

### Required Before Publication

- improve README;
- add architecture diagram;
- add screenshots;
- confirm deployment URL;
- add setup instructions;
- add tests or validation examples;
- perform secret scan.

---

## 7.6. Multilingual School Website

### Classification

**Tier:** 2
**Priority:** Medium
**Type:** Production web application
**Status:** Production
**Confidentiality:** Medium
**Primary role:** Backend and Deployment Support
**Primary portfolio function:** Show Django, migrations, production maintenance and Linux deployment

### Project Summary

Многоязычный production website для школы с database-driven content, файлами, административной панелью и серверным deployment.

### Confirmed Technologies

- Python;
- Django;
- PostgreSQL;
- Nginx;
- Gunicorn;
- Linux;
- modeltranslation;
- Django admin;
- static and media files.

### Confirmed Work

- model changes;
- database migrations;
- admin configuration;
- multilingual content;
- production deployment;
- static and media handling.

### Skills Demonstrated

- Django;
- relational models;
- migrations;
- admin customization;
- production maintenance;
- Nginx;
- Gunicorn;
- Linux;
- multilingual content.

### Strongest Portfolio Value

Дополняет FastAPI-проекты и показывает опыт с traditional web framework.

### Required Case Study Sections

- website purpose;
- content structure;
- multilingual model;
- admin workflows;
- migration changes;
- file handling;
- deployment;
- maintenance process.

### Recommended Architecture Diagrams

1. Django deployment architecture.
2. Content and translation model.
3. Request flow through Nginx and Gunicorn.

### Recommended Code Samples

1. Django model;
2. migration;
3. translated model configuration;
4. admin configuration;
5. Nginx server block;
6. Gunicorn service example.

### Available Evidence

- live production site;
- known domain;
- project code may exist;
- migration history;
- admin changes;
- deployment configuration.

### Missing Information

- exact personal contribution boundaries;
- original vs modified code;
- website traffic;
- list of features;
- performance data;
- screenshots approved for use;
- production architecture details;
- repository publication status.

### Publication Risks

- client-owned code;
- admin interface;
- production settings;
- credentials;
- private media.

### Required Anonymization

- exclude settings and secrets;
- show only approved public pages;
- rewrite configuration examples;
- avoid client data.

### Publication Readiness

**Current estimate:** 70%

### Required Before Publication

- clarify role;
- select screenshots;
- prepare one safe code sample;
- confirm permission to reference domain;
- document deployment.

---

## 7.7. Truck Claim Platform

### Classification

**Tier:** 2
**Priority:** Medium
**Type:** Full-stack business application
**Status:** Active development
**Confidentiality:** Medium
**Primary role:** Backend Developer / Project Contributor
**Primary portfolio function:** Show domain modeling, Docker Compose and multi-service architecture

### Project Summary

Platform for managing truck-related claims, documents, users and workflows.

### Confirmed Technologies

- Python;
- FastAPI;
- PostgreSQL;
- Redis;
- MinIO;
- Docker Compose;
- Alembic;
- async SQLAlchemy;
- authentication;
- file storage.

### Skills Demonstrated

- backend APIs;
- multi-service local environment;
- relational modeling;
- object storage;
- migrations;
- async database access;
- debugging;
- deployment preparation.

### Strongest Portfolio Value

Показывает еще один business application, но должен отличаться от HR Platform конкретной domain model и workflow.

### Available Evidence

- GitHub repository exists;
- Docker Compose configuration;
- backend structure;
- migration history;
- environment configuration;
- debugging history.

### Missing Information

- current completion state;
- personal contribution;
- feature list;
- user roles;
- claim workflow;
- production status;
- screenshots;
- test suite;
- live demo;
- final architecture.

### Publication Risks

- unfinished features;
- potentially low code quality in incomplete areas;
- unclear authorship;
- duplicated value with HR Platform.

### Publication Readiness

**Current estimate:** 45%

### Decision

Не включать в первую волну detailed case studies.

Добавить после:

- stabilization;
- code cleanup;
- README;
- tests;
- clear contribution statement;
- live demo or screenshots.

---

## 7.8. Attendance Tracking Integration

### Classification

**Tier:** 3
**Priority:** Medium
**Type:** HR integration
**Status:** Production workflow
**Confidentiality:** High
**Primary role:** Developer / Integration Engineer

### Confirmed Context

- Telegram-based attendance tracking;
- PeopleForce integration;
- 50–60 employees;
- check-in and check-out capture;
- monthly worked-hours reporting.

### Portfolio Value

Показывает:

- HR integrations;
- webhook or bot workflows;
- reporting;
- employee data;
- time calculations.

### Risk

Проект может пересекаться с HR Platform и Access Lifecycle Automation.

### Decision

В первой версии представить как:

- supporting project card;
- related integration inside HR Platform;
- optional future case study.

### Publication Readiness

**Current estimate:** 40%

---

## 7.9. CRM and Business Process Automation

### Classification

**Tier:** 3
**Priority:** Medium
**Type:** System analysis and automation
**Status:** Completed professional work
**Confidentiality:** Medium to high

### Confirmed Context

- Bitrix24;
- requirements analysis;
- CRM workflows;
- third-party integrations;
- client process automation;
- implementation scenarios.

### Portfolio Value

Показывает происхождение business-analysis skills.

### Limitation

Недостаточно технических деталей для отдельного engineering case study.

### Decision

Показывать в:

- Experience;
- professional journey;
- About;
- optional mini case study.

### Publication Readiness

**Current estimate:** 35%

---

## 7.10. HR Platform Infrastructure and Deployment

### Classification

**Tier:** 3
**Priority:** Medium
**Type:** Infrastructure case
**Status:** Deployed
**Confidentiality:** High

### Confirmed Context

- Docker Compose;
- Nginx;
- PostgreSQL;
- frontend;
- backend;
- migrations;
- VPS deployment;
- backup;
- Hostinger;
- Linux.

### Portfolio Value

Можно использовать как отдельный technical section внутри HR Platform:

- production deployment;
- backup workflow;
- restore process;
- reverse proxy;
- migration process.

### Decision

Не делать отдельный project case study в первой версии.

Создать:

- dedicated architecture section;
- Docker code sample;
- Nginx sample;
- deployment diagram.

---

# 8. Future Portfolio Projects

## 8.1. Odoo Demonstration Module

### Purpose

Создать публичный проект, специально релевантный Odoo и business application development.

### Possible Scope

- employee equipment requests;
- leave approval extension;
- document tracking;
- simple fleet workflow;
- recruitment pipeline extension.

### Required Features

- Python;
- Odoo models;
- XML views;
- access rights;
- business rules;
- tests;
- README;
- screenshots;
- Docker setup.

### Portfolio Value

Закроет текущий пробел:

- Odoo Framework;
- XML;
- module structure;
- open-source style repository.

### Priority

High after launch of portfolio MVP.

---

## 8.2. Open-Source Contribution

### Purpose

Создать подтвержденный публичный contribution.

### Acceptable Contribution Types

- documentation fix;
- bug reproduction;
- test improvement;
- small bug fix;
- type annotation;
- issue investigation;
- example improvement.

### Publication Requirement

Добавлять на сайт только после:

- открытого pull request;
- понятного contribution;
- желательно принятого merge.

---

# 9. Homepage Project Selection

На главной странице должны отображаться четыре проекта.

## 9.1. Selected Featured Projects

1. Internal HR Platform
2. Call Recording Archive Pipeline
3. Corporate Access Lifecycle Automation
4. Automated Video Delivery Pipeline

### Reasons

Эти проекты вместе показывают:

- complex backend system;
- high-volume integration;
- security automation;
- measurable throughput improvement.

Они не дублируют друг друга и создают полное представление о текущем профессиональном профиле.

---

## 9.2. Secondary Homepage Mentions

В коротком разделе `More Projects` можно показать:

- Finance Telegram Bot;
- Multilingual School Website.

Truck Claim Platform не должен показываться на Home до повышения качества и завершенности.

---

# 10. Required Version 1 Content

Для запуска портфолио необходимо подготовить:

## Flagship Case Studies

- Internal HR Platform;
- Call Recording Archive Pipeline;
- Corporate Access Lifecycle Automation;
- Automated Video Delivery Pipeline.

## Supporting Project Pages

- Finance Telegram Bot;
- Multilingual School Website.

## Code Samples

Минимум шесть:

1. FastAPI endpoint and service layer;
2. RBAC permission check;
3. SQLAlchemy relational model;
4. Celery background task;
5. Pytest workflow test;
6. TypeScript webhook handler.

## Supporting Technical Samples

Желательно добавить:

7. Docker Compose production fragment;
8. Nginx reverse proxy;
9. Alembic migration;
10. API pagination and retry logic.

---

# 11. Content Asset Types

Для каждого flagship project необходимо собрать следующие материалы.

## 11.1. Text Content

- one-sentence summary;
- full overview;
- problem statement;
- business context;
- users;
- personal contribution;
- requirements;
- constraints;
- architecture explanation;
- features;
- technical decisions;
- code explanations;
- testing;
- challenges;
- results;
- lessons learned;
- future improvements.

## 11.2. Visual Content

- hero project visual;
- architecture diagram;
- workflow diagram;
- anonymized screenshot;
- data-flow diagram;
- metric visualization;
- optional timeline.

## 11.3. Technical Evidence

- code sample;
- test sample;
- API request;
- API response;
- data model;
- migration;
- infrastructure fragment;
- deployment description.

## 11.4. Proof of Result

- metric;
- before-and-after description;
- workflow reduction;
- scale;
- screenshot;
- production status;
- user count where known.

---

# 12. Screenshot Requirements

Screenshots должны:

- использовать demo data;
- не содержать employee names;
- не содержать phone numbers;
- не показывать email addresses;
- не показывать credentials;
- не показывать internal URLs;
- не показывать browser bookmarks;
- не показывать debug panels;
- не показывать private chat IDs;
- иметь единый desktop frame;
- быть читаемыми на сайте;
- иметь alt text.

### Recommended Screenshot Set

#### HR Platform

- dashboard;
- employees directory;
- recruitment;
- onboarding;
- role management;
- report page.

#### Finance Bot

- expense entry;
- validation;
- report;
- Cloudflare deployment overview without secrets.

#### School Website

- homepage;
- multilingual page;
- admin workflow only if safe;
- production page.

---

# 13. Architecture Diagram Requirements

Диаграммы должны:

- показывать только необходимые компоненты;
- использовать одинаковые symbols;
- иметь legend при необходимости;
- не раскрывать internal IPs;
- не показывать реальные secret names;
- быть понятны без устного объяснения;
- иметь текстовое описание;
- корректно работать в light и dark themes.

### Diagram Types

- system context;
- container architecture;
- request sequence;
- background job flow;
- data flow;
- permission flow;
- deployment topology.

### Diagram Format

Предпочтительные варианты:

- Mermaid for maintainability;
- SVG for final polished visuals;
- React-based diagram where interaction adds value.

---

# 14. Code Sample Requirements

Каждый code sample должен быть:

- написан или переписан специально для портфолио;
- отделен от proprietary source;
- синтаксически корректен;
- понятен без полного repository;
- типизирован;
- снабжен объяснением;
- ограничен одной инженерной идеей;
- проверен на secrets;
- связан с конкретным проектом.

### Required Metadata

- title;
- slug;
- language;
- category;
- related project;
- purpose;
- context;
- code;
- explanation;
- design principles;
- error handling;
- testing;
- trade-offs;
- confidentiality status.

### Code Sample Length

- inline project sample: 15–50 lines;
- detail sample: 30–120 lines;
- полный demo repository: без жесткого ограничения.

---

# 15. Confidentiality Classification

Каждый проект получает один уровень.

## Level 0 — Public

Можно публиковать:

- repository;
- screenshots;
- live demo;
- architecture;
- code.

Пример:

- Finance Telegram Bot после secret review.

## Level 1 — Public With Minor Redaction

Можно показывать большую часть проекта после удаления:

- credentials;
- private data;
- internal URLs.

Пример:

- Multilingual School Website.

## Level 2 — Anonymized Internal Project

Можно показывать:

- rewritten code;
- simplified architecture;
- synthetic data;
- non-confidential metrics.

Примеры:

- HR Platform;
- Recording Archive;
- Video Pipeline.

## Level 3 — Restricted

Можно показывать только:

- general problem;
- personal role;
- high-level outcome.

Проекты Level 3 не должны иметь detailed code examples.

---

# 16. Confidentiality Matrix

| Project                | Level | Repository           | Screenshots  | Rewritten Code    | Architecture | Metrics |
| ---------------------- | ----: | -------------------- | ------------ | ----------------- | ------------ | ------- |
| Internal HR Platform   |     2 | No                   | Anonymized   | Yes               | Simplified   | Yes     |
| Recording Archive      |     2 | No                   | Limited      | Yes               | Simplified   | Yes     |
| Access Automation      |     2 | No                   | Limited      | Yes               | Simplified   | Yes     |
| Video Pipeline         |     2 | No                   | Limited      | Yes               | Simplified   | Yes     |
| Finance Telegram Bot   |   0–1 | Possible             | Yes          | Original possible | Yes          | Limited |
| School Website         |     1 | Permission-dependent | Public pages | Yes               | Yes          | Limited |
| Truck Claim Platform   |   0–1 | Existing             | Yes          | Yes               | Yes          | Not yet |
| Attendance Integration |     2 | No                   | Limited      | Yes               | Simplified   | Yes     |

---

# 17. Content Readiness Scoring

Готовность оценивается по пяти блокам.

| Area                      | Weight |
| ------------------------- | -----: |
| Business context          |    20% |
| Technical details         |    25% |
| Personal contribution     |    20% |
| Evidence and assets       |    20% |
| Confidentiality clearance |    15% |

### Readiness Levels

- 85–100%: ready to publish;
- 70–84%: minor work required;
- 50–69%: substantial content work required;
- below 50%: backlog.

### Current Estimates

| Project                 | Readiness |
| ----------------------- | --------: |
| Internal HR Platform    |       65% |
| Finance Telegram Bot    |       75% |
| School Website          |       70% |
| Recording Archive       |       60% |
| Access Automation       |       55% |
| Video Delivery Pipeline |       55% |
| Truck Claim Platform    |       45% |
| Attendance Integration  |       40% |
| CRM Automation          |       35% |

---

# 18. Missing Information Backlog

## 18.1. Cross-Project Questions

Для каждого проекта необходимо определить:

- project dates;
- current status;
- team size;
- exact personal role;
- personal contribution;
- intended users;
- number of users;
- production status;
- deployment environment;
- main technical challenge;
- failure scenarios;
- tests;
- business result;
- what would be improved.

## 18.2. Metrics Questions

Нужно по возможности уточнить:

- time saved;
- manual steps removed;
- processing duration;
- failure reduction;
- request volume;
- data volume;
- user count;
- deployment frequency;
- number of modules;
- number of tables;
- storage volume;
- average batch size.

Метрики нельзя придумывать. Если точные данные неизвестны, используются честные qualitative results.

## 18.3. Team Questions

Для каждого проекта:

- кто участвовал;
- кто отвечал за frontend;
- кто отвечал за backend;
- кто определял requirements;
- кто делал deployment;
- какие части реализованы лично;
- где требовалось согласование.

---

# 19. Content Collection Template

Для каждого проекта необходимо заполнить следующий шаблон.

```text
Project name:
Alternative public name:
Project type:
Company or context:
Dates:
Status:
Confidentiality level:

Problem:
Users:
Previous workflow:
Business risk:

My role:
Team size:
Personal contributions:
Collaboration:

Technologies:
Architecture:
Database:
External services:
Background jobs:
Deployment:

Main features:
Main challenge:
Failure scenarios:
Testing:
Security considerations:

Metrics:
Business result:
Technical result:

Available screenshots:
Available diagrams:
Available code:
Available tests:
Available links:

Information that must be anonymized:
Information that cannot be published:

Lessons learned:
Future improvements:
```

---

# 20. Content Production Order

Контент должен создаваться в следующем порядке.

## Phase 1 — Foundation

1. Confirm project names.
2. Confirm metrics.
3. Confirm personal contributions.
4. Assign confidentiality levels.
5. Select screenshots.
6. Identify code samples.

## Phase 2 — Flagship Projects

1. Internal HR Platform;
2. Call Recording Archive;
3. Access Lifecycle Automation;
4. Video Delivery Pipeline.

## Phase 3 — Supporting Projects

1. Finance Telegram Bot;
2. School Website;
3. Truck Claim Platform after stabilization.

## Phase 4 — Code Samples

1. FastAPI;
2. RBAC;
3. SQLAlchemy;
4. Celery;
5. Pytest;
6. TypeScript webhook;
7. Docker;
8. Nginx.

## Phase 5 — Validation

1. technical review;
2. English language review;
3. confidentiality review;
4. metric consistency check;
5. screenshot review;
6. code secret scan.

---

# 21. Project Naming Rules

Публичные названия должны быть:

- понятными;
- профессиональными;
- не зависящими от внутреннего company terminology;
- безопасными;
- стабильными.

### Approved Public Names

- Internal HR Platform;
- Call Recording Archive Pipeline;
- Corporate Access Lifecycle Automation;
- Automated Video Delivery Pipeline;
- Finance Telegram Bot;
- Multilingual School Website;
- Truck Claim Platform;
- Attendance Tracking Integration.

### Names to Avoid

- FNF HR;
- Internal Secret HR;
- RingCentral Downloader Script;
- Telegram Groups Bot;
- Video Bot;
- My Finance Project;
- School Site Work;
- Claim App Final.

---

# 22. Project Status Labels

Допустимые статусы:

- Internal Production;
- Production;
- Deployed;
- Active Development;
- MVP;
- Completed;
- Demonstration Project;
- Maintained.

Каждый проект должен иметь один основной статус.

### Recommended Statuses

- Internal HR Platform — MVP / Internal Production, после уточнения;
- Recording Archive — Production;
- Access Automation — Production;
- Video Pipeline — Production;
- Finance Telegram Bot — Deployed;
- School Website — Production;
- Truck Claim Platform — Active Development.

---

# 23. Personal Contribution Rules

Каждый project page должен четко разделять:

### What I Built

Конкретные функции и компоненты.

### What I Designed

Architecture, data model, workflow или integration decisions.

### What I Maintained

Deployment, migrations, production operations.

### What Was Collaborative

Frontend, requirements, business validation или shared development.

Нельзя создавать впечатление, что проект полностью выполнен одним человеком, если это не подтверждено.

---

# 24. Project Evidence Hierarchy

Доказательства располагаются по силе.

1. Live public application.
2. Public repository.
3. Working demo.
4. Architecture plus code plus screenshots.
5. Code sample plus test.
6. Screenshot plus technical explanation.
7. Metric plus process description.
8. Technology list without evidence.

Для закрытых проектов целью является уровень 4:

> Architecture plus anonymized code plus approved screenshots.

---

# 25. Portfolio Balance

Итоговый набор проектов должен сохранять баланс.

## Business Applications

- Internal HR Platform;
- Truck Claim Platform.

## Integrations

- Recording Archive;
- Attendance Integration.

## Security and Access

- Access Lifecycle Automation.

## Data and Media Pipelines

- Video Delivery Pipeline.

## Public TypeScript Project

- Finance Telegram Bot.

## Traditional Web Application

- School Website.

Это предотвращает впечатление, что кандидат умеет создавать только Telegram bots или только internal scripts.

---

# 26. Technologies Coverage

| Technology / Skill  | Primary Evidence                                  |
| ------------------- | ------------------------------------------------- |
| Python              | HR Platform, Recording Archive, Access Automation |
| FastAPI             | HR Platform, Truck Claim                          |
| Django              | School Website                                    |
| PostgreSQL          | HR Platform, School Website, Truck Claim          |
| SQLAlchemy          | HR Platform, Truck Claim                          |
| Redis               | HR Platform                                       |
| Celery              | HR Platform                                       |
| REST APIs           | HR Platform, integrations                         |
| TypeScript          | Finance Telegram Bot                              |
| Cloudflare Workers  | Finance Telegram Bot                              |
| Docker              | HR Platform, Truck Claim                          |
| Linux               | HR Platform, School Website                       |
| Nginx               | HR Platform, School Website                       |
| Pytest              | HR Platform                                       |
| RBAC                | HR Platform                                       |
| File Processing     | Recording Archive, Video Pipeline                 |
| Webhooks            | Finance Bot, integrations                         |
| System Analysis     | HR Platform, CRM work                             |
| Business Automation | Access, Attendance, CRM                           |
| Deployment          | HR Platform, Finance Bot, School Website          |

---

# 27. Skills Without Sufficient Evidence

Следующие навыки нельзя выделять как сильные до появления дополнительных доказательств:

- React;
- advanced frontend development;
- AWS;
- Kubernetes;
- microservices;
- Terraform;
- advanced CI/CD;
- distributed systems;
- machine learning;
- Odoo Framework;
- OWL;
- XML-based Odoo views;
- performance engineering;
- formal security engineering;
- open-source contribution.

Они могут быть представлены в `Currently Exploring`, только если изучение действительно продолжается.

---

# 28. Content Risks

## 28.1. Too Many Internal Projects

**Risk:** портфолио выглядит неподтвержденным.

**Mitigation:**

- добавить public Finance Bot;
- добавить live School Website;
- создать Odoo demo module;
- подготовить public code samples;
- в будущем сделать open-source contribution.

## 28.2. Repetitive Automation Projects

**Risk:** проекты выглядят как похожие scripts.

**Mitigation:**

Для каждого проекта показать разную инженерную тему:

- Recording Archive — volume and idempotency;
- Access Automation — lifecycle and security;
- Video Pipeline — throughput and media processing;
- Attendance — time calculations and reporting.

## 28.3. Inflated Ownership

**Risk:** recruiter questions credibility.

**Mitigation:**

- clear team context;
- exact personal contribution;
- collaborative sections;
- official job titles.

## 28.4. Metrics Without Context

**Risk:** числа выглядят рекламными.

**Mitigation:**

Каждую метрику связать с:

- source workflow;
- time period;
- technical mechanism;
- business result.

## 28.5. Sensitive Screenshots

**Risk:** accidental disclosure.

**Mitigation:**

- use demo database;
- crop browser chrome;
- remove names;
- security review;
- image metadata cleanup.

---

# 29. Minimum Content Required Before Development

Разработка UI может начаться раньше полного контента, но до создания project pages необходимо иметь:

- finalized public project name;
- one-sentence summary;
- primary metric;
- stack;
- status;
- role;
- confidentiality level;
- project category;
- initial architecture outline.

Для полноценного case study необходимо дополнительно:

- problem;
- contribution;
- architecture;
- 2 code samples;
- testing;
- challenge;
- result;
- future improvements;
- at least one visual asset.

---

# 30. Content Responsibilities

## Khasandjon Provides

- factual project details;
- screenshots;
- source patterns;
- confirmation of personal contribution;
- metrics;
- team context;
- confidentiality boundaries;
- technical decisions;
- deployment details.

## Documentation Process Produces

- public project names;
- structured case studies;
- rewritten English content;
- architecture diagrams;
- anonymized examples;
- code explanations;
- consistent metadata;
- project card copy.

## Technical Review Validates

- code correctness;
- architectural accuracy;
- security;
- consistency;
- no invented claims.

---

# 31. Version 1 Content Scope

## Must Have

- 4 flagship case studies;
- 2 supporting project pages;
- 6 code samples;
- 4 homepage metrics;
- Experience timeline;
- About content;
- Resume;
- Contact content;
- confidentiality note.

## Should Have

- architecture diagram for every flagship;
- screenshots for HR Platform;
- screenshot for Finance Bot;
- screenshot for School Website;
- related code links;
- project filtering.

## Could Have

- interactive API demo;
- live Finance Bot demo;
- animated diagrams;
- detailed Truck Claim page;
- Odoo demo module.

## Not Required for Launch

- blog;
- 10+ project pages;
- full source publication;
- advanced CMS;
- full multilingual content;
- AI assistant.

---

# 32. Project Completion Checklist

Проект считается готовым к публикации, если:

- public name approved;
- status confirmed;
- dates confirmed;
- personal role confirmed;
- team context documented;
- problem clearly explained;
- architecture documented;
- technologies verified;
- results verified;
- code samples reviewed;
- screenshots anonymized;
- metrics consistent;
- confidentiality review passed;
- English copy reviewed;
- metadata prepared;
- related links work;
- mobile presentation tested.

---

# 33. Recommended First Content Task

Первым полностью подготовить:

> Internal HR Platform

Причины:

- это сильнейший проект;
- он определяет структуру остальных case studies;
- содержит самый широкий набор технологий;
- связан с текущей ролью;
- имеет measurable scope;
- позволяет создать несколько code samples;
- будет центральным проектом Home и Projects.

После него:

1. Finance Telegram Bot;
2. Call Recording Archive;
3. Access Lifecycle Automation;
4. Video Delivery Pipeline;
5. School Website.

Finance Telegram Bot рекомендуется подготовить вторым, поскольку он имеет меньше confidentiality limitations и поможет проверить работу project template на публичном проекте.

---

# 34. Immediate Information Required

Для продолжения разработки контента необходимо отдельно собрать ответы по Internal HR Platform:

1. Какая часть backend была реализована лично?
2. Сколько человек участвовало в проекте?
3. Кто разрабатывал frontend?
4. Платформа уже используется сотрудниками или пока является MVP?
5. Сколько пользователей или потенциальных пользователей?
6. Какие 11 модулей входят в систему?
7. Какие модули реализованы наиболее полно?
8. Сколько database tables?
9. Как устроен RBAC?
10. Какие background jobs используются?
11. Где хранятся файлы?
12. Какие smoke tests написаны?
13. Как выполняется deployment?
14. Какие screenshots можно безопасно показать?
15. Какой технический challenge был самым сложным?
16. Что было бы улучшено в следующей версии?

Эти ответы потребуются для документа `05-project-case-study-content-spec.md` и последующего написания первого case study.

---

# 35. Definition of Done

Документ считается реализованным, когда:

- все известные проекты внесены в inventory;
- каждому проекту назначен tier;
- определены flagship projects;
- определены supporting projects;
- определены confidentiality levels;
- утверждены публичные названия;
- для каждого проекта определены available evidence;
- зафиксированы missing data;
- выбран минимальный набор Version 1;
- определены required screenshots;
- определены required diagrams;
- определены code samples;
- технологии связаны с конкретными проектами;
- проекты без достаточных доказательств не используются как главные;
- создан порядок производства контента;
- установлены критерии публикации;
- определен первый проект для глубокой проработки.

---

# 36. Final Selection Summary

Первая версия портфолио строится вокруг шести проектов.

## Four Flagship Case Studies

1. Internal HR Platform
2. Call Recording Archive Pipeline
3. Corporate Access Lifecycle Automation
4. Automated Video Delivery Pipeline

## Two Supporting Projects

5. Finance Telegram Bot
6. Multilingual School Website

Этот набор показывает:

- complex backend application;
- PostgreSQL and ORM;
- API integration;
- security automation;
- high-volume processing;
- measurable throughput improvement;
- TypeScript and serverless deployment;
- Django and Linux production maintenance.

Главный принцип наполнения:

> Every project must prove a distinct engineering capability through context, contribution, architecture, code, and result.
