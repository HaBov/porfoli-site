# Information Architecture

## 1. Document Information

**Document:** Information Architecture
**File:** `03-information-architecture.md`
**Project:** Khasandjon Babadzhanov — Software Developer Portfolio
**Version:** 1.0
**Status:** Approved foundation draft
**Website language:** English
**Documentation language:** Russian

---

## 2. Purpose of This Document

Этот документ определяет информационную архитектуру персонального портфолио Khasandjon Babadzhanov.

Он фиксирует:

- карту сайта;
- иерархию страниц;
- структуру URL;
- глобальную навигацию;
- содержание каждой страницы;
- связи между разделами;
- пользовательские пути;
- правила внутренних ссылок;
- поведение навигации на desktop и mobile;
- структуру project case studies;
- организацию code samples;
- SEO-иерархию;
- error и empty states;
- границы первой версии сайта.

Документ не описывает визуальный дизайн компонентов. Визуальная система будет определена в последующих UX/UI-документах.

---

## 3. Information Architecture Goals

Информационная архитектура должна решать пять основных задач.

### 3.1. Быстро объяснить профессиональный профиль

Посетитель должен за первые 30–60 секунд понять:

- кто такой Khasandjon;
- какую роль он ищет;
- в чем его техническая специализация;
- какие реальные системы он создавал;
- какие результаты достигнуты;
- где скачать резюме;
- как связаться с кандидатом.

### 3.2. Позволить изучить техническую глубину

Технический специалист должен иметь возможность перейти от краткой карточки проекта к:

- бизнес-контексту;
- архитектуре;
- техническим решениям;
- code samples;
- тестированию;
- ограничениям;
- результатам;
- future improvements.

### 3.3. Компенсировать закрытые репозитории

Структура сайта должна объяснять отсутствие публичного production-кода и предоставлять альтернативные доказательства:

- anonymized code samples;
- architecture diagrams;
- API examples;
- technical decisions;
- measurable results;
- screenshots;
- demo implementations.

### 3.4. Поддерживать разные типы посетителей

Сайт должен быть полезен:

- recruiter;
- hiring manager;
- software engineer;
- technical interviewer;
- international employer;
- потенциальному техническому партнеру.

### 3.5. Сохранять простоту

Количество основных пунктов навигации должно оставаться ограниченным.

Пользователь не должен выбирать между большим количеством похожих разделов.

---

## 4. Primary Site Map

Основная карта сайта первой версии:

```text
/
├── /projects
│   ├── /projects/internal-hr-platform
│   ├── /projects/call-recording-archive
│   ├── /projects/access-lifecycle-automation
│   ├── /projects/video-delivery-pipeline
│   ├── /projects/finance-telegram-bot
│   └── /projects/multilingual-school-website
│
├── /code
│   ├── /code/fastapi-service-layer
│   ├── /code/rbac-permission-check
│   ├── /code/sqlalchemy-data-model
│   ├── /code/celery-background-task
│   ├── /code/pytest-api-workflow
│   ├── /code/typescript-webhook-handler
│   ├── /code/docker-production-setup
│   └── /code/nginx-reverse-proxy
│
├── /experience
├── /about
├── /contact
├── /resume
├── /privacy
├── /404
└── /api
    ├── /api/contact
    └── /api/demo/*
```

`/api` не отображается в основной навигации. Это технический слой для contact form и демонстрационных функций.

---

## 5. Primary Navigation

Основная навигация:

1. Projects
2. Code Samples
3. Experience
4. About
5. Contact
6. Resume

Логотип или имя в левой части навигации ведет на главную страницу.

### Desktop order

```text
Khasandjon Babadzhanov | Projects | Code Samples | Experience | About | Contact | Resume
```

### Mobile order

```text
Home
Projects
Code Samples
Experience
About
Contact
Download Resume
```

На mobile navigation пункт `Home` отображается явно, поскольку логотип может быть менее очевиден.

---

## 6. Navigation Priorities

Пункты навигации имеют разный уровень важности.

### Primary

- Projects
- Code Samples
- Resume

### Secondary

- Experience
- About
- Contact

Главная задача сайта — доказать инженерные навыки. Поэтому Projects и Code Samples располагаются раньше Experience и About.

Resume отображается как отдельная визуально выделенная кнопка.

---

## 7. Global Layout Structure

Каждая основная страница должна использовать общий layout:

```text
Global Header
Main Content
Contextual CTA
Global Footer
```

### Global Header

Содержит:

- имя или персональный wordmark;
- основную навигацию;
- Resume CTA;
- theme switcher;
- mobile menu trigger.

### Main Content

Содержит уникальный контент страницы.

### Contextual CTA

В нижней части страницы располагается CTA, связанный со следующим логичным действием.

Примеры:

- после Projects → View Code Samples;
- после Code Samples → View Experience;
- после About → Contact Me;
- после project case study → View Next Project.

### Global Footer

Содержит:

- имя;
- краткую роль;
- email;
- GitHub;
- Resume;
- основные ссылки;
- technology note;
- текущий год.

---

## 8. Homepage Architecture

**Route:** `/`

Главная страница должна выполнять роль профессионального overview и направлять посетителя к более глубокому контенту.

### 8.1. Section Order

```text
1. Hero
2. Credibility Metrics
3. Featured Projects
4. Technical Focus
5. Professional Journey
6. Code Samples Preview
7. About Preview
8. Contact CTA
9. Footer
```

---

### 8.2. Hero

Содержит:

- professional eyebrow;
- основной heading;
- supporting description;
- location and relocation status;
- View Projects CTA;
- Download Resume CTA;
- Contact Me link;
- optional availability indicator.

Hero не должен содержать:

- длинную биографию;
- полный список технологий;
- фотографию большого размера;
- анимированный terminal;
- GitHub contribution graph;
- более трех CTA.

---

### 8.3. Credibility Metrics

Содержит четыре показателя:

- 188+ REST API endpoints;
- 90K–150K recordings per cycle;
- 1,500 corporate groups;
- 10–13× pipeline throughput.

Каждый показатель должен иметь:

- value;
- label;
- короткий context;
- ссылку на соответствующий project case study.

Метрика должна быть интерактивной карточкой или ссылкой, а не статическим декоративным элементом.

---

### 8.4. Featured Projects

На главной показываются четыре проекта:

1. Internal HR Platform;
2. Call Recording Archive Pipeline;
3. Corporate Access Lifecycle Automation;
4. Automated Video Delivery Pipeline.

Каждая карточка содержит:

- category;
- title;
- one-sentence summary;
- key metric;
- technology list;
- case study link;
- optional architecture preview.

Дополнительная ссылка:

> View All Projects

---

### 8.5. Technical Focus

Раздел группирует навыки по направлениям:

- Backend Development;
- Data and Processing;
- Integrations and Automation;
- Testing and Reliability;
- Infrastructure and Deployment;
- TypeScript and Serverless.

Каждая группа содержит:

- 3–7 технологий;
- короткое объяснение применения;
- ссылки на проекты или code samples.

Раздел не должен выглядеть как бесконечное облако badges.

---

### 8.6. Professional Journey

Краткий timeline:

```text
Technical Support
↓
Business Process Automation
↓
System Analysis
↓
Backend Development
```

Для каждого этапа:

- role;
- company;
- dates;
- one-sentence contribution;
- acquired engineering perspective.

Раздел завершается ссылкой:

> View Full Experience

---

### 8.7. Code Samples Preview

Показывает 3–4 выбранных примера:

- FastAPI service layer;
- RBAC permission check;
- Celery background task;
- Pytest API workflow.

Каждая карточка содержит:

- sample title;
- language;
- related project;
- engineering concept;
- short code preview;
- View Sample link.

---

### 8.8. About Preview

Короткий paragraph о профессиональном пути и подходе.

CTA:

> More About Me

Раздел не должен повторять полный About.

---

### 8.9. Contact CTA

Завершающий блок:

- availability statement;
- short contact message;
- Send an Email;
- View Resume;
- LinkedIn, если профиль подготовлен.

---

## 9. Projects Index Architecture

**Route:** `/projects`

Страница Projects является каталогом всех case studies.

### 9.1. Page Header

Содержит:

- title;
- short explanation;
- confidentiality note;
- number of projects;
- optional category filters.

Recommended copy:

> Projects

> Technical case studies covering backend platforms, integrations, automation, relational data, testing, and production deployment.

---

### 9.2. Project Categories

Основные категории:

- Business Applications;
- Backend Platforms;
- Integrations;
- Automation;
- Data Pipelines;
- Serverless Applications;
- Production Websites.

Один проект может иметь не более двух основных категорий.

---

### 9.3. Filters

Первая версия может включать следующие filters:

- All;
- Backend;
- Integrations;
- Automation;
- TypeScript;
- Infrastructure.

Фильтры не должны изменять URL в первой версии, если это усложняет реализацию.

Допустимый вариант URL в будущем:

```text
/projects?category=backend
```

---

### 9.4. Project Card Content

Обязательные поля:

- title;
- slug;
- category;
- short description;
- role;
- status;
- year;
- key result;
- technologies;
- confidentiality type;
- thumbnail or architecture visual;
- case study URL.

Status options:

- Production;
- Internal Production;
- Deployed;
- Active Development;
- Completed;
- Demonstration Project.

Не использовать:

- Secret Project;
- NDA Project;
- Classified.

---

### 9.5. Project Ordering

Рекомендуемый порядок:

1. Internal HR Platform;
2. Call Recording Archive Pipeline;
3. Corporate Access Lifecycle Automation;
4. Automated Video Delivery Pipeline;
5. Finance Telegram Bot;
6. Multilingual School Website.

Порядок определяется профессиональной ценностью, а не датой создания.

---

## 10. Project Detail Architecture

**Route pattern:** `/projects/[slug]`

Каждый project case study должен использовать единую структуру.

### 10.1. Project Header

Содержит:

- project title;
- category;
- short description;
- role;
- status;
- timeline;
- key technologies;
- key result;
- confidentiality badge;
- optional live demo;
- optional public repository.

Пример:

```text
Internal HR Platform
Business Application · Backend Platform

Role: Backend Developer
Status: Internal Production
Stack: Python, FastAPI, PostgreSQL, SQLAlchemy, Redis, Celery, Docker
Scale: Approximately 188 endpoints across 11 modules
```

---

### 10.2. Project Navigation

На desktop рекомендуется sticky table of contents:

- Overview;
- Problem;
- My Role;
- Requirements;
- Architecture;
- Data Model;
- Key Features;
- Technical Decisions;
- Selected Code;
- Testing;
- Challenges;
- Results;
- Lessons;
- Future Improvements.

На mobile table of contents отображается как collapsible section.

---

### 10.3. Overview

Кратко отвечает:

- что это за система;
- кто ею пользуется;
- какую функцию она выполняет;
- какой результат был достигнут.

Длина: 1–3 абзаца.

---

### 10.4. Problem

Описывает:

- прежний процесс;
- ограничения;
- риски;
- ручные операции;
- причины необходимости новой системы.

Раздел не должен начинаться с технологии.

---

### 10.5. My Role and Contributions

Обязательно указывает:

- что сделал кандидат лично;
- какие части были совместной работой;
- какие решения принимал;
- за какие области отвечал;
- с кем взаимодействовал.

При наличии команды:

```text
Team context
My responsibilities
Collaboration boundaries
```

---

### 10.6. Requirements and Constraints

Возможные элементы:

- business requirements;
- performance constraints;
- security constraints;
- data privacy;
- external API limits;
- deployment environment;
- legacy dependencies;
- timeline;
- team size.

Раздел помогает показать real-world context.

---

### 10.7. Architecture

Содержит:

- high-level diagram;
- component list;
- data flow;
- request lifecycle;
- background processing;
- external services;
- storage;
- deployment boundary.

Диаграмма должна иметь текстовое описание для accessibility.

---

### 10.8. Data Model

Для проектов с relational data:

- key entities;
- relationships;
- ownership boundaries;
- important constraints;
- indexes;
- migration strategy.

Не публиковать полную production schema закрытого проекта.

---

### 10.9. Key Features

Содержит 4–8 основных возможностей.

Для HR Platform:

- authentication;
- RBAC;
- employee lifecycle;
- recruitment;
- onboarding;
- leave management;
- file storage;
- reporting;
- audit logging;
- background jobs.

---

### 10.10. Technical Decisions

Каждое решение оформляется в формате:

```text
Decision
Context
Options Considered
Selected Approach
Reasoning
Trade-offs
```

Примеры решений:

- Redis and Celery for background jobs;
- service-layer separation;
- PostgreSQL relational model;
- object storage for files;
- permission-based authorization;
- scheduled batch processing;
- retry strategy for API integrations.

---

### 10.11. Selected Code

Содержит 2–5 примеров кода.

Каждый пример включает:

- title;
- language;
- file-like label;
- code block;
- explanation;
- related engineering principles;
- confidentiality note;
- link to full Code Sample page.

Ограничение:

- предпочтительно 15–50 строк на inline example;
- длинные примеры переносятся в `/code/[slug]`.

---

### 10.12. Testing and Validation

Содержит:

- what was tested;
- test type;
- critical workflows;
- failure scenarios;
- smoke testing;
- manual validation;
- deployment checks.

При отсутствии unit-test coverage нельзя создавать впечатление полной test automation.

---

### 10.13. Challenges and Trade-offs

Описывает минимум одну реальную сложность:

- API rate limits;
- data consistency;
- failed background jobs;
- permission complexity;
- large file transfers;
- deployment issues;
- migration safety;
- unreliable external services.

Формат:

```text
Challenge
Why It Mattered
Approach
Remaining Limitation
```

---

### 10.14. Results

Содержит:

- measurable outcomes;
- operational improvement;
- user impact;
- reliability improvement;
- reduced manual workflow;
- retained data;
- throughput increase.

Все числа должны совпадать с резюме и другими страницами.

---

### 10.15. Lessons Learned

Короткий раздел:

- чему научил проект;
- какое решение было бы изменено;
- что стало понятнее после production use.

Раздел помогает показать зрелость без завышения уровня.

---

### 10.16. Future Improvements

Содержит только реалистичные улучшения:

- stronger automated testing;
- observability;
- structured retry policies;
- CI/CD;
- performance profiling;
- event-driven boundaries;
- better documentation.

Нельзя создавать впечатление, что текущая система была нерабочей.

---

### 10.17. Project Footer

Содержит:

- previous project;
- next project;
- related code samples;
- View All Projects;
- Contact CTA.

---

## 11. Code Samples Index Architecture

**Route:** `/code`

Цель страницы — предоставить доказательства качества инженерного подхода без публикации production repository.

### 11.1. Page Header

Содержит:

- title;
- explanation;
- confidentiality statement;
- language filters;
- concept filters.

Suggested text:

> Focused examples of API design, business logic, authorization, background processing, testing, and deployment patterns.

---

### 11.2. Code Sample Categories

Основные категории:

- API Design;
- Service Layer;
- Data Modeling;
- Authorization;
- Background Processing;
- Testing;
- Integrations;
- Infrastructure.

---

### 11.3. Language Filters

- All;
- Python;
- TypeScript;
- SQL;
- Docker;
- Nginx.

---

### 11.4. Code Sample Card

Каждая карточка содержит:

- title;
- language;
- category;
- related project;
- short purpose;
- engineering principles;
- reading time;
- View Sample link.

---

## 12. Code Sample Detail Architecture

**Route pattern:** `/code/[slug]`

### 12.1. Sample Header

Содержит:

- title;
- language;
- category;
- related project;
- complexity level;
- purpose;
- confidentiality status.

Complexity labels:

- Fundamental;
- Intermediate;
- Production Pattern.

Не использовать:

- Expert;
- Advanced Architecture;

без объективной необходимости.

---

### 12.2. Required Sections

```text
1. Context
2. Problem
3. Code
4. How It Works
5. Design Principles
6. Error Handling
7. Testing
8. Trade-offs
9. Related Project
```

---

### 12.3. Code Display

Code block должен поддерживать:

- syntax highlighting;
- line numbers;
- copy button;
- filename label;
- highlighted lines;
- horizontal scrolling;
- accessible contrast;
- mobile readability.

---

### 12.4. Related Content

Каждая code sample page должна ссылаться на:

- один project case study;
- 1–3 related samples;
- Code Samples index.

---

## 13. Experience Page Architecture

**Route:** `/experience`

### 13.1. Page Header

Содержит:

- title;
- краткое описание карьерного развития;
- Download Resume CTA.

### 13.2. Career Overview

Короткая схема:

```text
Technical Support
→ Business Process Automation
→ System Analysis
→ Backend Development
```

### 13.3. Experience Timeline

Для каждой позиции:

- company;
- official title;
- dates;
- location;
- employment format;
- role summary;
- key contributions;
- technologies;
- related projects.

### 13.4. Current Role

Получает наибольшую глубину:

- 4–6 key contributions;
- links to relevant projects;
- technology list;
- role context.

### 13.5. Previous Roles

Содержат меньше пунктов и акцентируют transferable skills.

### 13.6. Education

В нижней части:

- university;
- degree;
- field;
- dates;
- location.

### 13.7. Languages

- Tajik — Native;
- Russian — Professional working proficiency;
- English — B2.

### 13.8. Experience Footer CTA

- Download Resume;
- View Projects;
- Contact Me.

---

## 14. About Page Architecture

**Route:** `/about`

### 14.1. Page Header

- title;
- short professional identity;
- optional professional portrait in future.

### 14.2. Professional Story

Структура:

1. current focus;
2. support background;
3. process automation;
4. system analysis;
5. transition to development;
6. current goals.

### 14.3. Engineering Approach

Содержит 4–6 principles:

- understand the process first;
- prefer simple maintainable solutions;
- validate critical workflows;
- document decisions;
- treat deployment as part of development;
- protect confidential data.

### 14.4. What I Work With

Краткие skill groups со ссылками на projects и code samples.

### 14.5. Currently Exploring

- deeper TypeScript;
- automated testing;
- CI/CD;
- cloud infrastructure;
- distributed systems fundamentals;
- open-source contribution.

### 14.6. Outside the Code

Необязательный небольшой блок.

Он может содержать только нейтральную профессиональную информацию:

- language learning;
- technical reading;
- building internal tools;
- learning new systems.

Не следует добавлять лишнюю личную информацию, не связанную с профессиональным образом.

### 14.7. Relocation and Availability

Содержит:

- current location;
- relocation openness;
- international opportunity statement.

### 14.8. About Footer CTA

- View Experience;
- Download Resume;
- Get in Touch.

---

## 15. Contact Page Architecture

**Route:** `/contact`

### 15.1. Page Header

- Get in Touch;
- short availability statement;
- location;
- relocation status.

### 15.2. Direct Contact

Показывается раньше формы:

- email;
- GitHub;
- LinkedIn, когда готов;
- Resume.

Email должен быть кликабельным.

### 15.3. Contact Form

Fields:

- Name;
- Email;
- Company, optional;
- Subject;
- Message.

Hidden fields:

- honeypot;
- form timestamp;
- optional source page.

### 15.4. Validation

- required field messages;
- valid email;
- maximum lengths;
- server-side validation;
- anti-spam measures.

### 15.5. Form States

- idle;
- submitting;
- success;
- validation error;
- server error;
- rate-limited.

### 15.6. Privacy Note

Краткая формулировка:

> Contact details are used only to respond to your message.

---

## 16. Resume Route Architecture

**Route:** `/resume`

`/resume` должен вести на стабильную resume landing page, а не напрямую на файл.

Страница содержит:

- краткое описание;
- current resume version;
- last updated date;
- Download PDF;
- optional View Online;
- Projects link;
- Contact link.

Файл PDF может располагаться по адресу:

```text
/downloads/Khasandjon_Babadzhanov_Software_Developer_Resume.pdf
```

Преимущества отдельной landing page:

- можно обновить файл без изменения публичной ссылки;
- можно отслеживать переходы;
- посетитель получает контекст;
- можно предоставить несколько форматов в будущем.

---

## 17. Privacy Page Architecture

**Route:** `/privacy`

Страница необходима, если используются:

- contact form;
- analytics;
- cookies;
- error monitoring;
- external embeds.

Минимальное содержание:

- какие данные собираются;
- зачем они используются;
- как долго хранятся;
- какие third-party services используются;
- как связаться по вопросам данных.

Если tracking cookies отсутствуют, cookie banner не нужен.

---

## 18. URL Conventions

### 18.1. General Rules

URL должны быть:

- lowercase;
- на английском;
- без пробелов;
- без дат;
- без лишних nesting levels;
- с дефисами между словами;
- стабильными после публикации.

Правильно:

```text
/projects/internal-hr-platform
/code/rbac-permission-check
```

Неправильно:

```text
/projects/InternalHRPlatform
/project?id=12
/my-work/hr_platform_final
```

---

### 18.2. Slug Rules

Slug должен:

- быть понятным человеку;
- отражать проект;
- не включать компанию, если это создает confidentiality risk;
- не включать технологии без необходимости;
- не превышать примерно 3–5 слов.

---

### 18.3. Redirects

При изменении slug необходимо создавать permanent redirect.

Старые ссылки не должны возвращать 404 после публикации.

---

## 19. Breadcrumbs

Breadcrumbs используются на detail pages:

```text
Home / Projects / Internal HR Platform
Home / Code Samples / RBAC Permission Check
```

На Home, Projects, Code Samples, Experience, About и Contact breadcrumbs не нужны.

Breadcrumbs должны иметь structured data.

---

## 20. Internal Linking Strategy

Каждая страница должна быть частью связанной системы.

### Projects link to

- related code samples;
- technologies;
- Experience;
- Contact;
- next project.

### Code Samples link to

- related project;
- related samples;
- engineering concept;
- Contact.

### Experience links to

- projects created during the role;
- Resume;
- About.

### About links to

- Experience;
- Projects;
- Contact.

### Resume links to

- Projects;
- Contact.

Не должно быть orphan pages, на которые нельзя перейти через интерфейс сайта.

---

## 21. Recruiter User Journey

Основной путь:

```text
Homepage
→ Hero
→ Metrics
→ Featured Project
→ Resume
→ Contact
```

Альтернативный путь:

```text
Homepage
→ Experience
→ Resume
→ Contact
```

Требования:

- Resume доступно максимум за один клик;
- Contact доступно максимум за один клик;
- ключевые технологии видны на первой странице;
- relocation status виден без перехода в About.

---

## 22. Hiring Manager User Journey

Основной путь:

```text
Homepage
→ Featured Projects
→ Project Case Study
→ My Role
→ Results
→ Experience
→ Contact
```

Hiring manager должен быстро увидеть:

- business problem;
- candidate contribution;
- project result;
- production context.

---

## 23. Technical Interviewer User Journey

Основной путь:

```text
Homepage
→ Project Case Study
→ Architecture
→ Technical Decisions
→ Selected Code
→ Full Code Sample
→ Testing
→ Challenges
```

Важные требования:

- deep links на section anchors;
- readable code;
- clear diagrams;
- realistic trade-offs;
- related sample navigation.

---

## 24. International Employer User Journey

```text
Homepage
→ Role and Location
→ Experience
→ English Level
→ Projects
→ Resume
→ Contact
```

Информация о relocation не должна быть спрятана только в footer.

---

## 25. Section Anchors

Длинные case studies должны иметь anchor links.

Пример:

```text
/projects/internal-hr-platform#architecture
/projects/internal-hr-platform#selected-code
/projects/internal-hr-platform#testing
```

Anchor names должны быть:

- lowercase;
- concise;
- stable;
- human-readable.

---

## 26. Search

Полноценный поиск не входит в первую версию.

Причины:

- небольшой объем контента;
- clear navigation;
- filters достаточно;
- поиск добавит сложность без существенной ценности.

Search может быть добавлен позже при наличии:

- 15+ projects;
- 30+ code samples;
- technical articles;
- documentation archive.

---

## 27. Tags and Taxonomy

### 27.1. Technology Tags

Примеры:

- Python;
- FastAPI;
- Django;
- PostgreSQL;
- SQLAlchemy;
- Redis;
- Celery;
- TypeScript;
- Docker;
- Linux.

### 27.2. Concept Tags

- REST API;
- RBAC;
- Background Jobs;
- Data Modeling;
- File Processing;
- Webhooks;
- Integrations;
- Testing;
- Deployment.

### 27.3. Rules

- использовать canonical spelling;
- не создавать дубли;
- максимум 5–7 tags на карточке;
- полный список можно показывать внутри detail page;
- tags должны вести к связанным материалам только после реализации соответствующей taxonomy page.

В первой версии tags могут быть визуальными labels без отдельных страниц.

---

## 28. Responsive Navigation

### Desktop

- sticky header;
- visible navigation;
- Resume button;
- theme switcher;
- active page indicator.

### Tablet

- сокращенное spacing;
- navigation остается visible, если помещается;
- Resume сохраняется.

### Mobile

- имя или short wordmark;
- menu trigger;
- slide-over или dropdown menu;
- full-height tap targets;
- close button;
- Escape support;
- body scroll lock;
- keyboard focus trap.

Mobile menu не должен закрывать контактные ссылки без возможности прокрутки.

---

## 29. Active Navigation State

Активный пункт должен определяться по route.

Примеры:

- `/projects` и `/projects/*` активируют `Projects`;
- `/code` и `/code/*` активируют `Code Samples`;
- `/resume` активирует `Resume`.

Active state нельзя передавать только цветом. Требуется дополнительный indicator:

- underline;
- background;
- border;
- dot.

---

## 30. Footer Architecture

Footer разделен на четыре области.

### Identity

- Khasandjon Babadzhanov;
- Software Developer;
- short positioning line.

### Navigation

- Projects;
- Code Samples;
- Experience;
- About;
- Contact.

### Professional Links

- Email;
- GitHub;
- Resume;
- LinkedIn, когда доступен.

### Technical Note

> Built with Next.js, TypeScript, and Tailwind CSS. Deployed with Docker on Linux.

На mobile области располагаются вертикально.

---

## 31. 404 Page

**Route:** `/404`

Содержит:

- clear message;
- short explanation;
- Home CTA;
- Projects CTA;
- optional code-style illustration.

Recommended copy:

> Page Not Found

> The page may have moved or the link may be incorrect.

Buttons:

- Return Home;
- View Projects.

404 не должна быть чрезмерно шуточной или скрывать навигацию.

---

## 32. Error States

### Project Content Error

> This project case study could not be loaded.

CTA:

- Return to Projects;
- Try Again.

### Code Sample Error

> This code sample is currently unavailable.

CTA:

- View Other Samples.

### Contact Error

> The message could not be sent. Please contact me directly by email.

### Resume Error

> The resume file is temporarily unavailable.

CTA:

- Contact Me;
- View Experience.

---

## 33. Empty States

Filters могут возвращать пустой результат.

Текст:

> No projects match the selected filters.

Action:

> Clear Filters

Не использовать blank screen.

---

## 34. Loading States

Для content pages предпочтителен server rendering без длительных loading states.

Loading UI требуется для:

- form submission;
- interactive demo;
- filter transition, если есть задержка;
- dynamic code preview;
- analytics-independent widgets.

Skeleton loading не должен использоваться для статического текста без необходимости.

---

## 35. SEO Information Hierarchy

Каждая страница должна иметь один `h1`.

### Homepage

```text
h1: I build reliable backend systems for real business operations.
h2: Selected Projects
h2: Technical Focus
h2: Experience
h2: Code Samples
h2: About
h2: Get in Touch
```

### Projects Index

```text
h1: Projects
h2: Project title
```

### Project Detail

```text
h1: Project title
h2: Overview
h2: Problem
h2: My Role and Contributions
h2: Architecture
h2: Technical Decisions
h2: Selected Code
h2: Testing and Validation
h2: Results
```

Heading levels нельзя выбирать на основе визуального размера.

---

## 36. Structured Data

Рекомендуемые schema types:

### Homepage

- `Person`;
- `WebSite`.

### Project Detail

- `CreativeWork`;
- `SoftwareApplication`, если уместно.

### Breadcrumbs

- `BreadcrumbList`.

### Resume

- `Person`;
- `ProfilePage`.

Structured data не должно содержать неподтвержденные claims.

---

## 37. Content Ownership

Контент организуется по типам.

### Global Content

- name;
- title;
- email;
- location;
- relocation;
- navigation;
- social links;
- resume URL.

### Project Content

- metadata;
- overview;
- problem;
- contribution;
- architecture;
- code references;
- results;
- confidentiality.

### Code Content

- language;
- category;
- explanation;
- code;
- related project.

### Experience Content

- roles;
- dates;
- descriptions;
- technologies;
- project references.

Эти данные не должны дублироваться вручную в нескольких компонентах.

---

## 38. Content Source Strategy

Рекомендуемая модель:

- TypeScript configuration для global profile data;
- MDX для project case studies;
- MDX для code samples;
- structured TypeScript или JSON для experience;
- static PDF для resume;
- image assets в локальном или object storage.

Пример:

```text
content/
├── projects/
│   ├── internal-hr-platform.mdx
│   ├── call-recording-archive.mdx
│   └── ...
├── code/
│   ├── fastapi-service-layer.mdx
│   └── ...
└── profile/
    ├── experience.ts
    ├── skills.ts
    └── site-config.ts
```

Подробная модель данных будет определена в отдельном документе.

---

## 39. Version 1 Required Routes

Для запуска обязательны:

```text
/
 /projects
 /projects/internal-hr-platform
 /projects/call-recording-archive
 /projects/access-lifecycle-automation
 /projects/video-delivery-pipeline
 /code
 /experience
 /about
 /contact
 /resume
 /privacy
 /404
```

Минимум четыре project case studies должны быть полностью готовы.

Code Samples index может запуститься минимум с шестью samples.

---

## 40. Version 1 Optional Routes

Могут быть добавлены, если не задерживают запуск:

```text
/projects/finance-telegram-bot
/projects/multilingual-school-website
/code/[slug]
```

Если отдельные code detail pages не готовы, первая версия может показывать samples на общей `/code` странице.

---

## 41. Future Routes

Не входят в первую версию:

```text
/articles
/articles/[slug]
/uses
/now
/opensource
/labs
/api-demo
/changelog
```

Они могут появиться после наполнения основного портфолио.

---

## 42. Content Entry Points

Посетитель может попасть не только на Home.

Возможные entry points:

- project link из резюме;
- code sample link из cover letter;
- search engine result;
- shared contact page;
- direct resume link;
- LinkedIn project link.

Поэтому каждая detail page должна самостоятельно содержать:

- имя кандидата;
- role context;
- navigation;
- project context;
- contact path;
- resume access.

Нельзя предполагать, что посетитель уже видел главную страницу.

---

## 43. Page Exit Strategy

Каждая страница должна предлагать следующее действие.

### Homepage

- View Projects.

### Projects Index

- Open Case Study.

### Project Detail

- Related Code Sample;
- Next Project;
- Contact.

### Code Index

- Open Sample;
- View Related Project.

### Experience

- Download Resume;
- View Projects.

### About

- View Experience;
- Contact.

### Contact

- Send Message;
- Download Resume.

### Resume

- View Projects;
- Contact.

---

## 44. Analytics Events

При подключении privacy-conscious analytics рекомендуется отслеживать:

- `view_project`;
- `open_code_sample`;
- `download_resume`;
- `click_email`;
- `submit_contact`;
- `filter_projects`;
- `click_live_demo`;
- `click_github`;
- `navigate_next_project`.

Нельзя отправлять в analytics:

- содержимое contact form;
- email посетителя;
- имя посетителя;
- code copied by the visitor.

---

## 45. Accessibility Requirements for Architecture

Информационная архитектура должна поддерживать:

- skip-to-content link;
- semantic landmarks;
- логичный heading order;
- keyboard navigation;
- descriptive links;
- accessible breadcrumbs;
- form labels;
- error summaries;
- focus management;
- reduced motion;
- readable code blocks.

Ссылки не должны называться только `Click Here`.

Правильно:

- View Internal HR Platform Case Study;
- Download Software Developer Resume.

---

## 46. Architecture Risks

### 46.1. Слишком много разделов

**Риск:** пользователь теряет фокус.

**Решение:** оставить шесть основных пунктов навигации.

### 46.2. Дублирование Projects и Code Samples

**Риск:** посетитель не понимает разницу.

**Решение:**

- Projects объясняют систему целиком;
- Code Samples показывают отдельный engineering pattern.

### 46.3. Слишком длинные project pages

**Риск:** рекрутер не читает техническую глубину.

**Решение:**

- summary и metrics в начале;
- sticky table of contents;
- collapsible secondary details;
- clear scanning hierarchy.

### 46.4. Закрытые проекты воспринимаются как неподтвержденные

**Риск:** отсутствие repository снижает доверие.

**Решение:**

- consistent case-study structure;
- architecture;
- anonymized code;
- screenshots;
- technical decisions;
- measurable results.

### 46.5. Навигация зависит от JavaScript

**Риск:** ухудшение accessibility и reliability.

**Решение:** основные ссылки должны работать как обычные HTML links.

### 46.6. Resume открывается нестабильно

**Риск:** изменение имени файла ломает внешние ссылки.

**Решение:** использовать стабильный route `/resume`.

---

## 47. Information Architecture Decision Principles

При принятии решений использовать следующий порядок приоритетов:

1. Projects before biography.
2. Evidence before claims.
3. Direct access before decorative interaction.
4. Stable URLs before implementation convenience.
5. Recruiter scanning before long-form storytelling.
6. Technical depth must remain available.
7. Every detail page must work as an entry page.
8. Resume and Contact must remain globally accessible.
9. Confidentiality must not reduce clarity.
10. Mobile navigation must preserve all critical actions.

---

## 48. Definition of Done

Информационная архитектура считается реализованной, когда:

- существуют все обязательные routes;
- navigation одинакова на всех страницах;
- Projects и Code Samples имеют четко разные функции;
- минимум четыре case studies используют единую структуру;
- Resume доступно из header и footer;
- Contact доступно из header и footer;
- project pages имеют table of contents;
- detail pages содержат breadcrumbs;
- internal links не ведут на отсутствующие страницы;
- отсутствуют orphan pages;
- mobile menu полностью работоспособно;
- active navigation state корректен;
- все страницы имеют понятное следующее действие;
- URL соответствуют conventions;
- 404 и error states реализованы;
- content hierarchy использует semantic headings;
- каждая страница может работать как самостоятельная entry point;
- структура готова к дальнейшему добавлению проектов и code samples.

---

## 49. Final Architecture Summary

Сайт строится вокруг трех уровней информации.

### Level 1 — Professional Overview

Главная страница быстро показывает:

- специализацию;
- технологии;
- метрики;
- основные проекты;
- опыт;
- relocation;
- Resume и Contact.

### Level 2 — Proof of Experience

Projects и Experience показывают:

- реальные бизнес-задачи;
- роль кандидата;
- систему целиком;
- измеримые результаты.

### Level 3 — Technical Depth

Project Details и Code Samples показывают:

- архитектуру;
- data flow;
- design decisions;
- code;
- testing;
- trade-offs;
- production awareness.

Главная логика сайта:

> Overview → Evidence → Technical Depth → Resume or Contact
