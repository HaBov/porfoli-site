# Development Roadmap

## 1. Document Information

**Document:** Development Roadmap
**File:** `13-development-roadmap.md`
**Project:** Khasandjon Babadzhanov — Software Developer Portfolio
**Version:** 1.0
**Status:** Approved implementation roadmap
**Website language:** English
**Documentation language:** Russian
**Target deployment:** Linux VPS with Docker Compose and Nginx

---

## 2. Purpose of This Document

Этот документ определяет план разработки профессионального портфолио.

Он фиксирует:

- последовательность реализации;
- этапы разработки;
- зависимости между задачами;
- приоритеты;
- milestones;
- обязательные и optional features;
- критерии завершения каждого этапа;
- content production workflow;
- testing strategy;
- security review;
- deployment process;
- launch procedure;
- post-launch development;
- правила управления scope.

Документ должен использоваться как основной execution plan после завершения проектной документации.

---

# 3. Roadmap Goals

План разработки должен обеспечить:

1. раннее получение работающей версии сайта;
2. отсутствие блокировки запуска из-за optional backend features;
3. последовательное развитие от static portfolio к interactive demo;
4. повторное использование design system;
5. content-first подход;
6. обязательную confidentiality review;
7. возможность регулярно проверять результат;
8. предсказуемый production deployment;
9. минимизацию незавершенных функций;
10. сохранение deployable состояния основной ветки.

---

# 4. Delivery Strategy

Проект реализуется в три крупных релиза.

## Release 1 — Portfolio Foundation

Содержит:

- визуальную систему;
- глобальный layout;
- главную страницу;
- Projects;
- Experience;
- About;
- Contact;
- Resume;
- базовый project template;
- dark и light themes.

Цель:

> Получить полностью работающий профессиональный сайт без зависимости от demo API.

---

## Release 2 — Technical Evidence

Содержит:

- четыре flagship case studies;
- code samples;
- architecture diagrams;
- screenshots;
- filtering;
- table of contents;
- confidentiality notices;
- improved technical SEO.

Цель:

> Превратить сайт из online resume в доказательное техническое портфолио.

---

## Release 3 — Backend Demonstration

Содержит:

- FastAPI demo API;
- PostgreSQL;
- OpenAPI;
- synthetic data;
- demo UI;
- authorization simulation;
- audit events;
- background job demonstration;
- API tests.

Цель:

> Добавить публичное интерактивное доказательство backend-разработки.

---

# 5. Priority Model

Все задачи делятся на четыре уровня.

## P0 — Launch Critical

Без задачи сайт нельзя безопасно запустить.

Примеры:

- global layout;
- Home;
- Projects;
- Resume;
- mobile navigation;
- responsive design;
- confidentiality review;
- HTTPS;
- working production deployment.

---

## P1 — Core Portfolio Value

Сильно влияет на ценность сайта.

Примеры:

- flagship case studies;
- code samples;
- diagrams;
- project metrics;
- Experience;
- Contact form;
- SEO metadata.

---

## P2 — Quality Improvement

Улучшает восприятие, но не блокирует запуск.

Примеры:

- animations;
- advanced filtering;
- interactive diagrams;
- page transitions;
- detailed analytics;
- API explorer.

---

## P3 — Future Enhancement

Не входит в основной запуск.

Примеры:

- blog;
- CMS;
- user accounts;
- multilingual site;
- advanced search;
- recruiter dashboard;
- AI assistant.

---

# 6. Dependency Principles

Основные зависимости:

```text
Documentation
→ Content Model
→ Design Tokens
→ Base Components
→ Global Layout
→ Page Templates
→ Project Content
→ Quality Review
→ Deployment
```

Demo API развивается отдельно:

```text
Static Portfolio
→ Backend Foundation
→ Demo Data
→ Demo Endpoints
→ Demo UI
```

Backend demo не должен блокировать запуск static portfolio.

---

# 7. Development Phases

Roadmap состоит из четырнадцати фаз.

```text
Phase 0   Project Preparation
Phase 1   Repository and Tooling
Phase 2   Design Tokens and Foundations
Phase 3   Global Application Shell
Phase 4   Content and Data Layer
Phase 5   Homepage
Phase 6   Core Static Pages
Phase 7   Project Case Study System
Phase 8   Code Samples System
Phase 9   Content Production
Phase 10  Contact and Resume
Phase 11  Demo API
Phase 12  Quality and Security
Phase 13  Production Deployment
Phase 14  Post-Launch Improvements
```

---

# 8. Phase 0 — Project Preparation

## Objective

Подготовить рабочую среду, утвердить scope и собрать исходные материалы.

## Tasks

### Documentation

- завершить все 14 planning documents;
- проверить отсутствие противоречий;
- утвердить Version 1 scope;
- зафиксировать out-of-scope features.

### Content Inventory

- подтвердить публичные project names;
- проверить project metrics;
- определить official job titles;
- определить confidentiality level каждого проекта;
- собрать Resume;
- собрать screenshots;
- определить доступный code material.

### Infrastructure Preparation

- выбрать domain;
- проверить DNS management;
- подготовить VPS user;
- проверить Docker;
- проверить Nginx;
- подготовить deployment directory.

### Development Environment

- Node.js;
- package manager;
- Python;
- Docker Desktop;
- Git;
- VS Code;
- browser testing tools.

## Deliverables

- approved documentation set;
- project content inventory;
- initial private asset archive;
- development environment ready;
- repository name selected.

## Definition of Done

- scope утвержден;
- список обязательных страниц известен;
- flagship projects выбраны;
- confidential data boundaries определены;
- development tools работают;
- новая реализация может начаться без дополнительных архитектурных решений.

---

# 9. Phase 1 — Repository and Tooling

## Objective

Создать надежную техническую основу проекта.

## Tasks

### Repository

- initialize Git repository;
- create `main` branch;
- configure `.gitignore`;
- add README;
- add documentation directory;
- add contribution and commit rules.

### Frontend

- initialize Next.js App Router project;
- enable TypeScript strict mode;
- configure Tailwind CSS;
- configure path aliases;
- configure ESLint;
- configure Prettier;
- configure import sorting;
- configure environment validation.

### Backend Skeleton

Создать только базовую структуру:

- FastAPI application folder;
- `pyproject.toml`;
- test directory;
- Dockerfile placeholder;
- no demo functionality yet.

### Monorepo

Create:

```text
apps/web
apps/api
content
docs
infrastructure
```

### Package Commands

Recommended commands:

```text
dev
build
lint
typecheck
test
content:validate
format
```

### Git Hooks

Optional but recommended:

- formatting;
- type checking;
- secret scan;
- content validation.

## Deliverables

- repository builds;
- frontend starts locally;
- backend skeleton imports successfully;
- linting and formatting configured;
- initial commit created.

## Definition of Done

- `main` is clean;
- `pnpm build` or selected equivalent passes;
- TypeScript strict mode enabled;
- no committed secrets;
- repository structure matches architecture document;
- README contains local setup instructions.

---

# 10. Phase 2 — Design Tokens and Foundations

## Objective

Реализовать visual foundation до разработки полноценных страниц.

## Tasks

### Theme Tokens

Implement:

- background;
- surfaces;
- text;
- borders;
- accent;
- semantic colors;
- radius;
- spacing;
- shadows.

### Themes

- light theme;
- dark theme;
- system preference;
- stored user preference;
- prevent theme flash.

### Fonts

- Inter;
- JetBrains Mono;
- optimized loading;
- selected weights.

### Typography

Implement:

- display;
- page title;
- section heading;
- subsection heading;
- body;
- small body;
- label;
- code typography.

### Layout Primitives

- `PageContainer`;
- `ContentContainer`;
- `Section`;
- `SectionHeader`;
- `ArticleLayout`;
- `Stack`, if needed.

### Core UI

- Button;
- IconButton;
- Badge;
- Card;
- Separator;
- Callout;
- Input;
- Textarea.

### Accessibility Foundation

- focus ring;
- skip link;
- reduced motion;
- semantic colors;
- contrast check.

## Deliverables

- visual foundation route or component showcase;
- both themes working;
- typography sample;
- component states documented.

## Definition of Done

- no hardcoded repeated colors;
- tokens used centrally;
- themes pass visual review;
- body text readable;
- buttons have all states;
- focus visible;
- 320px layout supported;
- 200% zoom does not break foundation components.

---

# 11. Phase 3 — Global Application Shell

## Objective

Создать единый каркас всех страниц.

## Tasks

### Root Layout

- metadata defaults;
- fonts;
- theme provider;
- body styles;
- skip link;
- header;
- footer;
- main content landmark.

### Header

- full name or KB mark;
- desktop navigation;
- mobile menu;
- Resume CTA;
- theme switcher;
- active route state.

### Mobile Navigation

- dialog;
- focus trap;
- Escape close;
- scroll lock;
- large tap targets;
- close after route change.

### Footer

- identity;
- navigation;
- email;
- GitHub;
- Resume;
- stack note;
- copyright.

### Global Pages

- `not-found.tsx`;
- `error.tsx`;
- `global-error.tsx`.

### Global Metadata

- site name;
- title template;
- description;
- canonical base;
- default Open Graph image.

## Deliverables

- reusable shell;
- responsive navigation;
- footer;
- error and 404 pages.

## Definition of Done

- navigation works on desktop and mobile;
- keyboard navigation complete;
- active route visible;
- Resume accessible globally;
- header and footer consistent;
- no page-level horizontal overflow;
- theme switch works from every route.

---

# 12. Phase 4 — Content and Data Layer

## Objective

Создать централизованную, validated content architecture.

## Tasks

### Registries

Create:

- project statuses;
- project categories;
- technologies;
- code languages;
- skill groups;
- contact links.

### Profile Data

Create:

- name;
- title;
- hero copy;
- location;
- relocation status;
- email;
- About summaries.

### Experience Data

- FNF GLOBAL;
- FOUR IT;
- Nets Solutions;
- Alif Bank;
- education;
- language proficiency.

### Project Schema

Implement:

- metadata schema;
- metric schema;
- confidentiality schema;
- asset references;
- related content.

### Code Sample Schema

Implement:

- language;
- category;
- complexity;
- related projects;
- publication status.

### MDX

- configure MDX;
- create component mapping;
- support code blocks;
- support callouts;
- support diagrams;
- support technical decisions.

### Validation

- duplicate IDs;
- duplicate slugs;
- unknown technologies;
- broken relations;
- missing assets;
- invalid dates;
- publication rules.

### Reporting

Implement:

```text
content:validate
content:report
```

## Deliverables

- content loaders;
- validated metadata;
- sample project MDX;
- sample code MDX;
- content report.

## Definition of Done

- invalid content fails build;
- Home can consume profile data;
- project cards can consume shared metadata;
- drafts excluded from production;
- no project facts duplicated manually;
- related content resolves correctly.

---

# 13. Phase 5 — Homepage

## Objective

Создать основную hiring-oriented страницу.

## Section Order

1. Hero;
2. Credibility Metrics;
3. Featured Projects;
4. Technical Focus;
5. Professional Journey;
6. Code Samples Preview;
7. About Preview;
8. Contact CTA.

## Tasks

### Hero

- eyebrow;
- heading;
- description;
- location;
- relocation;
- View Projects;
- Download Resume;
- Contact Me;
- technical profile panel.

### Metrics

- 188+ endpoints;
- 90K–150K recordings;
- 1,500 groups;
- 10–13× throughput.

### Projects

- four flagship cards;
- metric;
- status;
- stack;
- case-study link.

### Technical Focus

- six skill groups;
- evidence links.

### Experience Preview

- concise timeline;
- full Experience CTA.

### Code Preview

- four initial sample cards.

### Contact CTA

- direct email;
- Resume.

## Responsive Work

- split hero desktop;
- stacked hero mobile;
- project grid;
- metric grid;
- readable tablet behavior.

## Deliverables

- complete homepage;
- final English copy;
- mobile design;
- metadata;
- OG preview.

## Definition of Done

- professional role understood above the fold;
- relocation visible;
- projects accessible;
- metrics linked;
- Resume one click away;
- Contact one click away;
- mobile content parity maintained;
- performance acceptable;
- no placeholder content.

---

# 14. Phase 6 — Core Static Pages

## Objective

Реализовать все основные informational pages.

## Projects Index

Tasks:

- page header;
- confidentiality note;
- project grid;
- filters;
- empty state;
- Code Samples CTA.

## Experience

Tasks:

- career progression;
- detailed current role;
- previous experience;
- education;
- languages;
- project links;
- Resume CTA.

## About

Tasks:

- professional story;
- engineering principles;
- skill evidence;
- currently exploring;
- relocation;
- Contact CTA.

## Resume

Tasks:

- resume metadata;
- download card;
- stable PDF path;
- Experience and Project links;
- error fallback.

## Privacy

Tasks:

- actual data-processing explanation;
- contact form data;
- analytics;
- cookies;
- retention;
- contact method.

## 404

Tasks:

- message;
- Home CTA;
- Projects CTA.

## Deliverables

- all static core pages;
- consistent metadata;
- internal linking.

## Definition of Done

- all routes available;
- dates match Resume;
- official titles consistent;
- no dead-end pages;
- page hierarchy semantic;
- all pages work without demo API.

---

# 15. Phase 7 — Project Case Study System

## Objective

Создать единый system для detailed project pages.

## Tasks

### Project Header

- title;
- category;
- summary;
- role;
- status;
- dates;
- technologies;
- metric;
- confidentiality.

### Table of Contents

- desktop sticky;
- mobile disclosure;
- active section;
- anchors.

### Content Components

- MetricCard;
- TechnicalDecision;
- ProjectFeature;
- ChallengeCard;
- ResultComparison;
- ConfidentialityNote;
- DiagramContainer;
- MediaFrame.

### Related Content

- related code;
- related experience;
- next project;
- previous project.

### Project Template

Implement required sections:

- summary;
- problem;
- users;
- role;
- constraints;
- architecture;
- data model or flow;
- features;
- decisions;
- code;
- testing;
- challenges;
- results;
- lessons;
- future improvements.

### First Template Validation

Use:

> Internal HR Platform

as the first fully implemented project.

## Deliverables

- reusable project route;
- working TOC;
- diagrams;
- code integration;
- related navigation.

## Definition of Done

- adding a project requires mainly MDX and metadata;
- project understood within two minutes;
- contribution explicit;
- architecture readable;
- code works on mobile;
- confidentiality visible;
- internal links valid.

---

# 16. Phase 8 — Code Samples System

## Objective

Создать отдельный technical evidence library.

## Tasks

### Code Index

- header;
- confidentiality statement;
- language filter;
- category filter;
- featured sample;
- sample grid.

### Code Detail

- context;
- problem;
- code;
- explanation;
- design principles;
- errors;
- testing;
- trade-offs;
- production considerations;
- related project.

### Code Viewer

- syntax highlighting;
- filename;
- line numbers;
- copy button;
- highlighted lines;
- horizontal scrolling;
- both themes.

### Initial Samples

1. FastAPI Service Layer;
2. RBAC Permission Check;
3. SQLAlchemy Data Model;
4. Celery Background Task;
5. Pytest Workflow;
6. External API Pagination;
7. TypeScript Webhook Handler;
8. Docker Production Setup.

## Deliverables

- `/code`;
- reusable code detail route;
- at least six published samples;
- related-project links.

## Definition of Done

- code readable at 320px;
- copy button works;
- sample includes context and tests;
- rewritten notice visible;
- no proprietary source;
- syntax highlighting does not require excessive client JavaScript.

---

# 17. Phase 9 — Content Production

## Objective

Заполнить portfolio реальными approved materials.

## Project Order

1. Internal HR Platform;
2. Finance Telegram Bot;
3. Call Recording Archive Pipeline;
4. Corporate Access Lifecycle Automation;
5. Automated Video Delivery Pipeline;
6. Multilingual School Website.

---

## 17.1. Internal HR Platform

Required:

- full case study;
- architecture diagram;
- RBAC diagram;
- deployment diagram;
- anonymized screenshots;
- at least four code samples;
- smoke testing section;
- contribution clarification.

---

## 17.2. Finance Telegram Bot

Required:

- public repository review;
- webhook diagram;
- D1 data model;
- screenshots;
- TypeScript sample;
- deployment explanation.

---

## 17.3. Recording Archive

Required:

- retention problem;
- data-flow diagram;
- pagination sample;
- retry and idempotency explanation;
- verified volume metrics.

---

## 17.4. Access Automation

Required:

- onboarding flow;
- offboarding flow;
- simplified access rules;
- security context;
- audit explanation.

---

## 17.5. Video Pipeline

Required:

- before-and-after metric;
- processing pipeline;
- file metadata flow;
- retry model;
- limitations.

---

## 17.6. School Website

Required:

- Django architecture;
- multilingual model;
- migrations;
- deployment;
- approved public screenshots.

---

## Content Review Per Project

Each project passes:

- factual review;
- technical review;
- English review;
- confidentiality review;
- visual review;
- link review.

## Deliverables

- four complete flagship case studies;
- two supporting projects;
- approved assets;
- consistent metrics.

## Definition of Done

- no placeholder sections;
- all claims verified;
- personal contribution clear;
- code anonymized;
- screenshots safe;
- project status accurate;
- all pages connected to related content.

---

# 18. Phase 10 — Contact and Resume

## Objective

Завершить hiring conversion paths.

## Resume Tasks

- finalize ATS resume;
- export PDF;
- verify metadata;
- remove tracked changes;
- stable public filename;
- test mobile download;
- update Resume page.

## Direct Contact

- display professional email;
- GitHub;
- LinkedIn when ready;
- location;
- relocation.

## Contact Form Frontend

- Name;
- Email;
- Company;
- Subject;
- Message;
- validation;
- loading;
- success;
- error;
- direct email fallback.

## Contact Backend

May initially use:

- FastAPI endpoint;
- SMTP or email provider;
- server-side validation;
- honeypot;
- rate limit;
- request ID.

## Privacy

- update Privacy page;
- confirm retention;
- exclude message body from logs.

## Deliverables

- working Resume flow;
- working contact form;
- email fallback;
- privacy disclosure.

## Definition of Done

- Resume downloads successfully;
- contact form delivers message;
- error preserves user input;
- spam protection active;
- no contact message stored unnecessarily;
- recruiter can reach candidate without form.

---

# 19. Phase 11 — Demo API

## Objective

Добавить безопасную интерактивную backend demonstration.

## Backend Foundation

- FastAPI app;
- configuration;
- structured errors;
- request IDs;
- health endpoints;
- OpenAPI metadata.

## Database

- PostgreSQL;
- SQLAlchemy;
- Alembic;
- departments;
- employees;
- audit events;
- jobs;
- synthetic seed.

## Endpoints

### Departments

- list;
- get;
- create;
- update.

### Employees

- list;
- get;
- create;
- update;
- deactivate.

### Audit

- list events.

### Jobs

- create;
- poll status.

## Safety

- synthetic data only;
- role simulation clearly labeled;
- rate limits;
- body limits;
- page-size limit;
- daily reset;
- no public reset endpoint;
- no uploads.

## Testing

- service tests;
- repository tests;
- API tests;
- permission tests;
- validation tests;
- migration tests;
- OpenAPI tests.

## UI Integration

- predefined API explorer;
- role selector;
- request form;
- response viewer;
- unavailable state.

## Deliverables

- working API;
- OpenAPI;
- synthetic dataset;
- demo UI;
- public technical documentation.

## Definition of Done

- migrations work on empty database;
- seed deterministic;
- endpoints return consistent models;
- permission simulation works;
- API cannot access company systems;
- rate limits active;
- database not public;
- static site unaffected when API is offline.

---

# 20. Phase 12 — Quality and Security

## Objective

Подготовить сайт к production release.

## Functional Testing

Test:

- all navigation;
- project filters;
- code filters;
- TOC;
- theme switch;
- mobile menu;
- Resume;
- contact;
- project navigation;
- 404;
- external links.

## Responsive Testing

Widths:

- 320px;
- 375px;
- 390px;
- 768px;
- 1024px;
- 1280px;
- 1440px.

## Browser Testing

- Chrome;
- Edge;
- Firefox;
- Safari where available;
- mobile browser behavior.

## Accessibility

- keyboard;
- focus;
- heading order;
- form labels;
- error associations;
- screen-reader basics;
- reduced motion;
- 200% zoom;
- contrast.

## Performance

- image optimization;
- font loading;
- bundle review;
- client-component review;
- third-party script review;
- layout shift review.

## Security

- secret scan;
- Git history review;
- screenshot review;
- CSP;
- security headers;
- TLS;
- database exposure;
- rate limiting;
- request limits;
- log review.

## SEO

- titles;
- descriptions;
- canonical URLs;
- Open Graph;
- sitemap;
- robots;
- structured data;
- broken links.

## Content

- metrics;
- dates;
- job titles;
- technology names;
- relocation text;
- grammar;
- confidentiality.

## Deliverables

- release candidate;
- QA report;
- fixed critical issues;
- launch checklist.

## Definition of Done

- no P0 issues;
- no known confidentiality leak;
- critical flows pass;
- mobile usable;
- production build clean;
- security review approved;
- content approved;
- deployment rollback prepared.

---

# 21. Phase 13 — Production Deployment

## Objective

Опубликовать первую стабильную production version.

## Server Preparation

- dedicated deployment user;
- Docker installed;
- firewall configured;
- Nginx installed;
- application directory prepared;
- environment file protected.

## DNS

- domain points to VPS;
- canonical host selected;
- optional `www` redirect.

## Docker

- build production images;
- run migrations;
- start containers;
- confirm health.

## Nginx

- proxy web;
- proxy API;
- static caching;
- body limits;
- rate limits;
- security headers.

## TLS

- certificate;
- automatic renewal;
- HTTP redirect;
- mixed-content test.

## Verification

- Home;
- Projects;
- flagship project;
- Code Sample;
- Experience;
- About;
- Resume download;
- Contact;
- API docs;
- health checks;
- mobile access.

## Monitoring

- uptime;
- certificate expiry;
- disk;
- container status;
- API errors.

## Deliverables

- public production website;
- working domain;
- HTTPS;
- deployment documentation;
- rollback instructions.

## Definition of Done

- public domain works;
- HTTPS enforced;
- site survives container restart;
- database internal only;
- Resume works;
- contact works;
- logs clean;
- health checks pass;
- rollback path tested or documented.

---

# 22. Phase 14 — Post-Launch Improvements

## Objective

Улучшать сайт на основе реального использования и job applications.

## Priority Improvements

### Content

- adapt project ordering for vacancies;
- improve unclear case studies;
- add missing diagrams;
- add new verified metrics;
- update Resume.

### Public Technical Evidence

- publish Finance Bot repository;
- create Odoo module;
- add open-source contribution;
- add more tested code samples.

### Infrastructure

- CI/CD;
- automated backup verification;
- error monitoring;
- uptime alerts.

### UX

- refine filters;
- improve project scanning;
- improve code annotations;
- add print styling.

### SEO

- monitor indexing;
- improve project descriptions;
- add structured-data refinements.

## Optional Future Features

- technical articles;
- `/uses`;
- open-source section;
- project changelog;
- multilingual content;
- public API repository;
- interactive architecture diagrams.

---

# 23. Milestones

## Milestone 1 — Foundation Ready

Includes:

- repository;
- Next.js;
- tooling;
- design tokens;
- themes;
- base components.

Exit criteria:

- clean production build;
- components work in both themes.

---

## Milestone 2 — Application Shell Ready

Includes:

- header;
- footer;
- navigation;
- mobile menu;
- error pages.

Exit criteria:

- all placeholder routes share one shell;
- keyboard navigation works.

---

## Milestone 3 — Static Portfolio Alpha

Includes:

- Home;
- Projects;
- Experience;
- About;
- Resume;
- Contact layout.

Exit criteria:

- entire professional story can be reviewed locally.

---

## Milestone 4 — Case Study Beta

Includes:

- Internal HR Platform;
- project template;
- diagrams;
- code blocks;
- table of contents.

Exit criteria:

- one project fully demonstrates intended quality.

---

## Milestone 5 — Portfolio Content Complete

Includes:

- four flagship projects;
- two supporting projects;
- six or more code samples.

Exit criteria:

- no placeholder project content remains.

---

## Milestone 6 — Production Candidate

Includes:

- contact delivery;
- security;
- accessibility;
- responsive QA;
- SEO;
- deployment configuration.

Exit criteria:

- all P0 launch checks pass.

---

## Milestone 7 — Public Launch

Includes:

- domain;
- HTTPS;
- production deployment;
- monitoring;
- Resume links updated.

Exit criteria:

- website ready to include in job applications.

---

## Milestone 8 — Demo API Release

Includes:

- FastAPI;
- PostgreSQL;
- OpenAPI;
- synthetic data;
- demo UI.

Exit criteria:

- interactive backend evidence publicly available.

---

# 24. Recommended Implementation Order

Strict page implementation order:

```text
1. Design tokens
2. Layout primitives
3. Header and footer
4. Homepage
5. Projects index
6. Internal HR Platform detail
7. Project template refinement
8. Experience
9. About
10. Resume
11. Contact
12. Code Samples index
13. Code sample detail
14. Remaining project pages
15. Privacy and 404
16. Demo API
17. Final QA
18. Deployment
```

---

# 25. Task Tracking Structure

Recommended board columns:

```text
Backlog
Ready
In Progress
Review
Blocked
Done
```

## Issue Categories

- Foundation;
- Component;
- Page;
- Content;
- Asset;
- Backend;
- Infrastructure;
- Testing;
- Security;
- SEO;
- Bug.

## Issue Template

```text
Title:
Category:
Priority:
Description:
Dependencies:
Acceptance Criteria:
Affected Routes:
Responsive Requirements:
Accessibility Requirements:
Security Considerations:
```

---

# 26. Branch Strategy

Recommended:

```text
main
feature/*
fix/*
content/*
infrastructure/*
```

Examples:

```text
feature/homepage-hero
feature/project-case-study-layout
content/internal-hr-platform
fix/mobile-navigation-focus
infrastructure/nginx-production
```

---

# 27. Pull Request Requirements

Each pull request should include:

- summary;
- screenshots;
- affected routes;
- testing performed;
- mobile behavior;
- accessibility notes;
- security notes;
- content source;
- remaining limitations.

PR should not combine unrelated large changes.

---

# 28. Commit Strategy

Commits should represent logical completed changes.

Good examples:

```text
Add portfolio design tokens and theme variables
Build responsive header and mobile navigation
Create validated project content schema
Add Internal HR Platform case study structure
Implement contact form server validation
Configure production Nginx reverse proxy
```

Avoid:

```text
fix
update
changes
final
more work
```

---

# 29. Definition of Ready

A task can move to `Ready` when:

- purpose is clear;
- dependencies resolved;
- design spec exists;
- content available;
- acceptance criteria defined;
- security concerns understood;
- no unanswered blocking decision.

---

# 30. Definition of Done for Development Tasks

A task is complete when:

- implementation matches specification;
- types pass;
- lint passes;
- tests pass;
- desktop reviewed;
- mobile reviewed;
- dark theme reviewed;
- light theme reviewed;
- keyboard behavior checked;
- content approved;
- no secrets or confidential data;
- documentation updated where needed.

---

# 31. Page Completion Checklist

Every page must have:

- approved copy;
- one `h1`;
- metadata;
- canonical URL;
- responsive design;
- keyboard access;
- dark and light themes;
- empty/error state where relevant;
- next action;
- internal links;
- mobile test;
- confidentiality review where relevant.

---

# 32. Component Completion Checklist

Every component must have:

- clear purpose;
- typed props;
- required variants;
- all states;
- semantic HTML;
- focus state;
- responsive behavior;
- theme support;
- long-content handling;
- usage example.

---

# 33. Content Completion Checklist

Every published project must have:

- public title;
- summary;
- role;
- status;
- dates;
- stack;
- metric;
- problem;
- contribution;
- architecture;
- technical decisions;
- code;
- testing;
- challenge;
- result;
- confidentiality note;
- related content.

---

# 34. Testing Gates

## Before Merge

Required:

- lint;
- type check;
- unit tests;
- content validation;
- build.

## Before Release Candidate

Required:

- E2E;
- accessibility scan;
- link validation;
- security scan;
- production build;
- Docker build.

## Before Production

Required:

- migration validation;
- backup;
- health checks;
- deployment smoke tests;
- contact test;
- Resume test.

---

# 35. Release Gates

A release is blocked by:

- broken production build;
- leaked secret;
- unreviewed screenshot;
- incorrect Resume;
- broken navigation;
- inaccessible Contact;
- invalid metrics;
- public database port;
- missing HTTPS;
- P0 accessibility issue;
- raw error stack;
- missing mobile navigation.

A release is not blocked by:

- optional animation;
- missing API explorer;
- missing blog;
- missing search;
- unavailable advanced diagram interaction.

---

# 36. Scope Control

Before adding a feature, ask:

1. Does it help a recruiter understand the candidate?
2. Does it provide new technical evidence?
3. Is it required for launch?
4. Can the same value be delivered more simply?
5. Does it introduce security or maintenance cost?
6. Does it delay flagship project content?

If the feature does not provide clear hiring value, it should remain in backlog.

---

# 37. Avoided Scope

Do not add before launch:

- complex CMS;
- admin dashboard;
- account system;
- social feed;
- chat assistant;
- animated 3D scene;
- recommendation engine;
- complex blog system;
- Kubernetes deployment;
- multiple backend services;
- custom analytics platform;
- real-time notifications.

---

# 38. Risk Register

## Risk 1 — Content Takes Longer Than UI

**Impact:** визуально готовый сайт остается пустым.

**Response:**

- produce Internal HR Platform content early;
- use real content during component development;
- do not rely on lorem ipsum;
- track missing content separately.

---

## Risk 2 — Confidentiality Review Blocks Projects

**Impact:** flagship pages cannot be published.

**Response:**

- use synthetic screenshots;
- rewrite code;
- simplify diagrams;
- prepare supporting public projects.

---

## Risk 3 — Demo API Delays Launch

**Impact:** portfolio remains unpublished.

**Response:**

- deploy static website first;
- demo API is Release 3;
- maintain direct email fallback.

---

## Risk 4 — Excessive Visual Complexity

**Impact:** development slows and technical content becomes secondary.

**Response:**

- enforce restrained visual direction;
- avoid custom animation until static pages complete;
- use reusable components.

---

## Risk 5 — Inconsistent Metrics

**Impact:** credibility decreases.

**Response:**

- centralized metadata;
- verified metrics;
- content validation;
- Resume comparison.

---

## Risk 6 — Public Repository Exposes Sensitive History

**Impact:** credentials or private code leak.

**Response:**

- keep repository private initially;
- review full history before publication;
- create clean public repository if necessary.

---

## Risk 7 — VPS Changes Affect Other Applications

**Impact:** existing services become unavailable.

**Response:**

- host-level Nginx routing plan;
- separate Compose project;
- unique ports;
- backups;
- test configuration before reload.

---

# 39. Change Management

Changes to approved scope should document:

- proposed change;
- reason;
- affected documents;
- affected components;
- development cost;
- security impact;
- release impact.

Major changes require roadmap revision.

Examples:

- adding CMS;
- changing framework;
- making repository public;
- adding authentication;
- changing deployment environment.

---

# 40. Content Update Workflow After Launch

```text
Update content source
→ Run validation
→ Review facts
→ Review confidentiality
→ Preview locally
→ Merge
→ Deploy
→ Verify public route
```

Do not edit generated production files manually.

---

# 41. Resume Update Workflow

Whenever Resume changes:

1. update source document;
2. verify project metrics;
3. export PDF;
4. check PDF metadata;
5. replace stable public file;
6. update `updatedAt`;
7. test download;
8. verify external application links.

---

# 42. New Project Workflow

To add a new project:

1. add content inventory record;
2. assign tier;
3. assign confidentiality;
4. create metadata;
5. prepare narrative;
6. create diagrams;
7. prepare code samples;
8. prepare screenshots;
9. validate content;
10. review security;
11. publish;
12. connect related content.

A new project should not automatically appear as featured.

---

# 43. New Code Sample Workflow

1. identify one engineering concept;
2. select related project;
3. independently rewrite code;
4. add test;
5. explain trade-offs;
6. run syntax and type checks;
7. review confidentiality;
8. create MDX;
9. add metadata;
10. publish and link.

---

# 44. Deployment Workflow

Recommended manual Version 1 workflow:

```text
Review main
→ Pull latest commit
→ Run tests
→ Build Docker images
→ Back up data
→ Run migrations
→ Start services
→ Run health checks
→ Run public smoke tests
```

---

# 45. Deployment Smoke Tests

Required:

- Home returns 200;
- Projects returns 200;
- flagship project returns 200;
- Code Samples returns 200;
- Resume downloads;
- Contact page loads;
- contact form sends;
- API health returns expected status;
- unknown route returns custom 404;
- HTTPS redirect works;
- canonical host works.

---

# 46. Rollback Conditions

Rollback when:

- Home unavailable;
- navigation broken;
- Resume unavailable;
- Contact crashes;
- migration fails;
- high error rate;
- secret accidentally exposed;
- database cannot start;
- existing VPS applications affected.

---

# 47. Post-Deployment Review

Within the same release process:

- inspect Nginx logs;
- inspect container logs;
- inspect health status;
- test mobile;
- test external network;
- inspect headers;
- test Resume;
- verify no draft content;
- verify sitemap.

---

# 48. Success Metrics

Portfolio success can be evaluated through:

## Technical

- successful deployment;
- strong performance;
- accessibility;
- stable contact delivery;
- no confidentiality incidents.

## Content

- four flagship case studies;
- six or more code samples;
- verified metrics;
- consistent Resume.

## Hiring

- portfolio link included in applications;
- project pages opened;
- Resume downloads;
- recruiter replies;
- technical interview discussions referencing projects.

Analytics should not be treated as the only indicator of quality.

---

# 49. Initial Release Scope

## Must Have

- Home;
- Projects;
- four flagship case studies;
- Code Samples;
- six code sample pages;
- Experience;
- About;
- Contact;
- Resume;
- Privacy;
- 404;
- dark and light themes;
- responsive navigation;
- SEO;
- HTTPS;
- confidentiality review.

## Should Have

- contact form;
- architecture diagrams;
- project filters;
- code filters;
- public Finance Bot link;
- analytics.

## Could Have

- Demo API;
- API explorer;
- advanced animations;
- interactive diagrams;
- CI/CD.

## Will Not Have

- CMS;
- authentication;
- blog;
- user accounts;
- file upload;
- multilingual site;
- recruiter dashboard.

---

# 50. Recommended First Development Sprint

The first implementation sprint should complete:

1. repository initialization;
2. Next.js setup;
3. Tailwind and design tokens;
4. themes;
5. PageContainer;
6. Section;
7. Button;
8. Badge;
9. Card;
10. Header;
11. mobile navigation;
12. Footer;
13. empty page routes;
14. production build validation.

Expected result:

> A complete responsive application shell with no final project content yet, ready for page implementation.

---

# 51. Recommended Second Development Sprint

Tasks:

1. content registries;
2. profile data;
3. experience data;
4. project schema;
5. MDX setup;
6. content validation;
7. first project metadata;
8. Home hero;
9. metrics;
10. featured project cards.

Expected result:

> A working homepage powered by structured content.

---

# 52. Recommended Third Development Sprint

Tasks:

1. Projects index;
2. project detail template;
3. table of contents;
4. code blocks;
5. diagram container;
6. technical decisions;
7. confidentiality note;
8. Internal HR Platform initial case study.

Expected result:

> One complete flagship case study proving the entire portfolio pattern.

---

# 53. Recommended Fourth Development Sprint

Tasks:

1. Experience;
2. About;
3. Resume;
4. Contact;
5. Privacy;
6. 404;
7. responsive QA;
8. metadata.

Expected result:

> Complete static portfolio alpha.

---

# 54. Recommended Fifth Development Sprint

Tasks:

1. remaining flagship projects;
2. Finance Bot;
3. School Website;
4. Code Samples index;
5. code sample pages;
6. asset review;
7. English review.

Expected result:

> Content-complete portfolio beta.

---

# 55. Recommended Sixth Development Sprint

Tasks:

1. tests;
2. accessibility;
3. SEO;
4. security;
5. Docker;
6. Nginx;
7. TLS;
8. production deployment.

Expected result:

> Public Version 1 release.

---

# 56. Recommended Seventh Development Sprint

Tasks:

1. FastAPI foundation;
2. PostgreSQL;
3. migrations;
4. demo data;
5. departments;
6. employees;
7. audit events;
8. OpenAPI.

Expected result:

> Working Backend Patterns Demo API.

---

# 57. Recommended Eighth Development Sprint

Tasks:

1. role simulation;
2. rate limits;
3. jobs;
4. idempotency;
5. demo UI;
6. API tests;
7. deployment;
8. documentation.

Expected result:

> Public interactive backend demonstration.

---

# 58. Roadmap Maintenance

Update this document when:

- scope changes;
- architecture changes;
- milestone order changes;
- deployment approach changes;
- major risks appear;
- launch requirements change.

Do not update the roadmap for every small implementation detail.

Daily work belongs in issue tracking.

---

# 59. Final Launch Definition

Version 1 is considered launched when:

- production domain is public;
- Home accurately presents the candidate;
- four flagship projects are published;
- code evidence is available;
- Experience and About are complete;
- Resume is current;
- Contact works;
- mobile experience is complete;
- accessibility baseline passes;
- security review passes;
- confidential data is absent;
- HTTPS works;
- monitoring is active;
- portfolio link is ready for job applications.

---

# 60. Final Roadmap Principle

The portfolio should be released as soon as it provides credible evidence of professional ability.

Optional complexity must not delay the primary goal.

Main execution principle:

> Build the content foundation first, prove one complete case study, launch the static portfolio, and add interactive backend demonstrations only after the core hiring experience is complete.
