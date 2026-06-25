# Page-by-Page UX Specification

## 1. Document Information

**Document:** Page-by-Page UX Specification
**File:** `08-page-by-page-ux-specification.md`
**Project:** Khasandjon Babadzhanov — Software Developer Portfolio
**Version:** 1.0
**Status:** Approved UX specification
**Website language:** English
**Documentation language:** Russian

---

## 2. Purpose of This Document

Этот документ определяет пользовательский опыт для каждой страницы портфолио.

Он фиксирует:

- назначение каждой страницы;
- целевую аудиторию;
- основные пользовательские задачи;
- порядок секций;
- содержание каждого блока;
- CTA;
- desktop, tablet и mobile behavior;
- loading, empty и error states;
- accessibility requirements;
- interaction rules;
- SEO hierarchy;
- критерии завершения страницы.

Документ используется как прямое руководство при разработке интерфейса.

---

# 3. Global UX Principles

## 3.1. Projects Before Biography

Сайт должен сначала показывать выполненную работу, а затем биографию.

Главный пользовательский путь:

> Professional identity → Projects → Technical evidence → Resume or Contact

---

## 3.2. Evidence Before Claims

Любое сильное утверждение должно быть связано с:

- project case study;
- metric;
- code sample;
- architecture diagram;
- production result.

---

## 3.3. Progressive Disclosure

Контент раскрывается постепенно.

### First level

Краткое понимание:

- кто кандидат;
- что он умеет;
- какие системы создавал.

### Second level

Подробности:

- проблема;
- роль;
- технологии;
- результат.

### Third level

Техническая глубина:

- архитектура;
- code samples;
- testing;
- trade-offs.

---

## 3.4. One Primary Action Per Section

Каждая секция должна иметь один основной CTA.

Пример:

- Hero → View Projects;
- Featured Projects → View All Projects;
- Experience Preview → View Full Experience;
- Contact CTA → Send an Email.

---

## 3.5. No Dead Ends

Каждая страница должна предлагать следующее действие.

Пользователь не должен доходить до конца страницы без:

- related content;
- next project;
- Resume;
- Contact.

---

## 3.6. Mobile Content Parity

Mobile-версия должна содержать тот же важный контент, что и desktop.

Нельзя скрывать на mobile:

- основные метрики;
- role;
- project results;
- code explanations;
- contact details;
- Resume.

---

# 4. Global Page Frame

Все страницы используют единый page frame.

```text
Skip Link
Global Header
Main Content
Contextual CTA
Global Footer
```

## 4.1. Skip Link

Первый focusable элемент:

> Skip to main content

Ссылка видна при keyboard focus.

---

## 4.2. Header

Содержит:

- logo или name;
- Projects;
- Code Samples;
- Experience;
- About;
- Contact;
- Resume;
- theme switcher;
- mobile navigation trigger.

---

## 4.3. Main Content

Каждая страница имеет:

- один `h1`;
- понятную intro section;
- semantic landmarks;
- логичную heading hierarchy.

---

## 4.4. Contextual CTA

Размещается перед footer.

Содержание зависит от страницы.

---

## 4.5. Footer

Должен быть одинаковым на всех страницах.

---

# 5. Homepage UX Specification

**Route:** `/`

## 5.1. Page Purpose

Главная страница должна за 30–60 секунд объяснить:

- кто такой Khasandjon;
- какой у него профиль;
- какие технологии он использует;
- какие реальные системы создавал;
- какие результаты достигнуты;
- как изучить проекты;
- как скачать резюме;
- как связаться.

---

## 5.2. Primary Audiences

- technical recruiter;
- hiring manager;
- engineering manager;
- software engineer;
- international employer.

---

## 5.3. Primary User Tasks

1. Понять специализацию кандидата.
2. Просмотреть ключевые проекты.
3. Увидеть подтвержденные результаты.
4. Перейти к техническим деталям.
5. Скачать резюме.
6. Найти контактные данные.

---

## 5.4. Section Order

```text
1. Hero
2. Credibility Metrics
3. Featured Projects
4. Technical Focus
5. Professional Journey
6. Code Samples Preview
7. About Preview
8. Contact CTA
```

---

## 5.5. Hero Section

### Content

**Eyebrow**

> SOFTWARE DEVELOPER · PYTHON · BACKEND SYSTEMS

**Heading**

> I build reliable backend systems for real business operations.

**Description**

> Backend-focused Software Developer working with Python, PostgreSQL, TypeScript, Docker, and Linux. I design APIs, business applications, integrations, and automated workflows — from requirements and data models to deployment and production validation.

**Location**

> Based in Tajikistan · Open to relocation and international opportunities

### Actions

Primary:

> View Projects

Secondary:

> Download Resume

Tertiary:

> Contact Me

### Supporting Visual

Technical profile panel:

```text
role          Software Developer
focus         Backend systems
stack         Python / PostgreSQL / TypeScript
location      Tajikistan
availability  Open to relocation
```

### Desktop Layout

- two columns;
- text 55–60%;
- profile panel 40–45%;
- hero vertically centered;
- heading remains dominant.

### Mobile Layout

- one column;
- hero text first;
- actions stack or wrap;
- profile panel below actions;
- no fixed height;
- no content clipped below viewport.

### Interaction

- View Projects scrolls or navigates to `/projects`;
- Download Resume opens `/resume`;
- Contact Me opens `/contact`;
- no typing animation;
- no auto-playing effects.

### Accessibility

- hero heading is page `h1`;
- location is readable text;
- status dot not used alone;
- CTA order matches reading order.

---

## 5.6. Credibility Metrics Section

### Purpose

Показать доказательства масштаба до длинного чтения.

### Content

1. `188+` REST API endpoints
2. `90K–150K` recordings per cycle
3. `1,500` corporate groups automated
4. `10–13×` pipeline throughput growth

### Behavior

Каждая metric card ведет к соответствующему case study.

### Desktop

- four-column grid.

### Tablet

- two columns.

### Mobile

- one или two columns;
- context remains visible;
- no horizontal carousel.

### UX Rules

- no animated count-up by default;
- values remain understandable without hover;
- cards use descriptive links.

---

## 5.7. Featured Projects Section

### Heading

> Selected Projects

### Description

> Real systems presented through technical case studies, architecture decisions, anonymized code samples, and measurable outcomes.

### Projects

1. Internal HR Platform;
2. Call Recording Archive Pipeline;
3. Corporate Access Lifecycle Automation;
4. Automated Video Delivery Pipeline.

### Card Content

- category;
- title;
- short description;
- metric;
- stack;
- status;
- View Case Study.

### Layout

Desktop:

- first project may span two columns;
- remaining projects use balanced grid.

Mobile:

- one card per row;
- visual appears after title and summary;
- technology badges may wrap.

### CTA

> View All Projects

---

## 5.8. Technical Focus Section

### Purpose

Показать не просто список технологий, а области их применения.

### Skill Groups

- Backend Development;
- Data and Processing;
- Integrations and Automation;
- Testing and Reliability;
- Infrastructure and Deployment;
- TypeScript and Serverless.

### Each Group Includes

- title;
- one-sentence description;
- technology badges;
- links to related project or code sample.

### Layout

Desktop:

- two or three columns.

Mobile:

- one column;
- cards remain concise.

### Anti-Pattern

Не использовать progress bars, percentages или star ratings.

---

## 5.9. Professional Journey Section

### Heading

> Experience

### Supporting Text

> A progression from technical support and business-process analysis to backend development and production automation.

### Timeline

1. Alif Bank;
2. Nets Solutions;
3. FOUR IT;
4. FNF GLOBAL.

### Each Item

- dates;
- role;
- company;
- one-sentence contribution;
- one transferable skill.

### CTA

> View Full Experience

### Mobile

- vertical ordered list;
- dates above title;
- no alternating left-right layout.

---

## 5.10. Code Samples Preview

### Heading

> Code Samples

### Description

> Focused examples of API design, authorization, background processing, testing, and deployment patterns.

### Featured Samples

- FastAPI Service Layer;
- RBAC Permission Check;
- Celery Background Task;
- Pytest API Workflow.

### Card Content

- title;
- language;
- category;
- related project;
- short preview;
- View Sample.

### CTA

> Explore All Code Samples

---

## 5.11. About Preview

### Content

Краткий approved About paragraph.

### Purpose

Показать, почему background в support, system analysis и automation усиливает software development profile.

### CTA

> More About Me

---

## 5.12. Contact CTA

### Heading

> Get in Touch

### Text

> I am open to Software Developer opportunities, technical collaborations, and conversations about backend systems, integrations, and business applications.

### Actions

Primary:

> Send an Email

Secondary:

> Download Resume

---

## 5.13. Homepage Success Criteria

Страница считается готовой, если:

- role понятна без прокрутки;
- основные технологии видны в hero;
- relocation status виден;
- четыре flagship projects доступны;
- четыре метрики связаны с проектами;
- Resume доступно за один клик;
- Contact доступно за один клик;
- нет длинных необработанных paragraphs;
- mobile version сохраняет весь основной контент;
- Lighthouse и accessibility targets соблюдены.

---

# 6. Projects Index UX Specification

**Route:** `/projects`

## 6.1. Page Purpose

Предоставить полный каталог проектов и помочь посетителю выбрать нужный case study.

---

## 6.2. Primary Tasks

1. Просмотреть все проекты.
2. Отфильтровать их по направлению.
3. Сравнить роль, результат и stack.
4. Открыть подробный case study.

---

## 6.3. Page Structure

```text
1. Page Header
2. Confidentiality Explanation
3. Filter Bar
4. Featured Project
5. Project Grid
6. More Work / Backlog Note
7. Code Samples CTA
```

---

## 6.4. Page Header

**H1**

> Projects

**Description**

> Technical case studies covering backend platforms, integrations, automation, relational data, testing, and production deployment.

Дополнительно:

- project count;
- short indication of internal and public projects.

---

## 6.5. Confidentiality Explanation

Краткий callout:

> Some projects were developed for internal company use and cannot be published as complete repositories. The case studies use anonymized architecture, independently rewritten code samples, and non-confidential implementation details.

Callout не должен занимать доминирующее положение.

---

## 6.6. Filter Bar

### Options

- All;
- Backend;
- Integrations;
- Automation;
- TypeScript;
- Infrastructure.

### Behavior

- All selected by default;
- selected state visible;
- count updates;
- no full page reload;
- filters keyboard accessible;
- empty state available.

### Mobile

- horizontal wrapping или accessible select;
- не использовать forced horizontal carousel.

---

## 6.7. Featured Project

Internal HR Platform отображается первым и получает более крупную карточку.

Содержит:

- title;
- purpose;
- key metric;
- status;
- primary stack;
- architecture preview;
- View Case Study.

---

## 6.8. Project Grid

Порядок:

1. Internal HR Platform;
2. Call Recording Archive;
3. Access Lifecycle Automation;
4. Video Delivery Pipeline;
5. Finance Telegram Bot;
6. Multilingual School Website.

### Card Behavior

- card fully accessible as link;
- no nested conflicting links;
- status visible;
- metric remains readable;
- visual optional.

---

## 6.9. Empty State

> No projects match the selected filters.

Action:

> Clear Filters

---

## 6.10. Bottom CTA

> Looking for implementation details?

Action:

> Explore Code Samples

---

## 6.11. Projects Page Success Criteria

- project differences are clear;
- internal and public status understandable;
- filters work without ambiguity;
- no card depends on image;
- all case-study links valid;
- project order matches portfolio priority;
- no unfinished project presented as production-ready.

---

# 7. Project Detail UX Specification

**Route:** `/projects/[slug]`

## 7.1. Page Purpose

Доказать технические навыки через один реальный проект.

---

## 7.2. Primary Tasks

1. Быстро понять проект.
2. Увидеть личный вклад.
3. Изучить архитектуру.
4. Просмотреть code samples.
5. Проверить testing и challenges.
6. Перейти к related project или Contact.

---

## 7.3. Page Structure

```text
1. Breadcrumbs
2. Project Header
3. Executive Summary
4. Key Metrics
5. Sticky Table of Contents
6. Problem
7. Users and Business Context
8. My Role and Contributions
9. Requirements and Constraints
10. Architecture
11. Data Model or Data Flow
12. Key Features
13. Technical Decisions
14. Selected Code
15. Testing and Validation
16. Challenges and Trade-offs
17. Results and Impact
18. Lessons Learned
19. Future Improvements
20. Confidentiality Note
21. Related Content
22. Previous / Next Project
23. Contact CTA
```

---

## 7.4. Breadcrumbs

Example:

> Home / Projects / Internal HR Platform

Mobile may truncate Home but must keep current context.

---

## 7.5. Project Header

### Content

- category;
- title;
- summary;
- role;
- status;
- timeframe;
- technologies;
- primary metric;
- repository/live demo when available;
- confidentiality status.

### Desktop

- content left;
- metadata panel right.

### Mobile

- metadata becomes stacked definition list;
- CTA buttons full width where useful;
- technology badges wrap.

---

## 7.6. Executive Summary

Placed directly after header.

Must be understandable without reading the rest of the page.

---

## 7.7. Key Metrics

2–4 metrics.

Metrics appear before long article content.

---

## 7.8. Table of Contents

### Desktop

- sticky left sidebar;
- active section;
- anchor navigation.

### Mobile

- collapsible block;
- current section label;
- remains in document flow.

### Rules

- no horizontal overlay over content;
- active state not color-only;
- anchor focus visible.

---

## 7.9. Problem Section

Should be readable for a non-technical recruiter.

Use:

- short paragraphs;
- before-state;
- operational risk;
- callout if necessary.

---

## 7.10. My Role Section

Must appear before architecture.

Reason:

Посетитель должен сначала понять ownership, а затем оценивать technical depth.

Include:

- role;
- team context;
- responsibilities;
- collaboration boundaries.

---

## 7.11. Architecture Section

### Content

- diagram;
- explanation;
- component responsibilities;
- request or data flow.

### Interaction

Optional:

- zoom;
- fullscreen;
- diagram legend.

### Mobile

- diagram scrolls or scales inside container;
- text alternative remains visible;
- no page-level overflow.

---

## 7.12. Technical Decisions Section

Use repeated editorial blocks.

Each decision visible without mandatory expansion.

Mobile may collapse secondary details, but title and chosen approach remain visible.

---

## 7.13. Selected Code Section

Each code sample includes:

- context;
- filename;
- language;
- highlighted lines;
- explanation;
- confidentiality note;
- link to full sample.

### Interaction

- copy code;
- horizontal scroll;
- line highlight;
- no live code execution unless explicitly safe.

---

## 7.14. Testing Section

Must distinguish:

- automated tests;
- smoke tests;
- manual validation;
- missing coverage.

Avoid visual claim of complete test coverage.

---

## 7.15. Challenges Section

Challenges presented as structured cards or subsections.

At least one remaining limitation should be acknowledged when relevant.

---

## 7.16. Results Section

Primary result should be visually emphasized.

Optional before/after comparison.

---

## 7.17. Confidentiality Note

Located near end and optionally near first code sample.

Must use neutral informational style.

---

## 7.18. Related Content

Include:

- related code samples;
- related experience;
- similar project.

---

## 7.19. Previous / Next Navigation

Two clear cards.

Mobile stacks vertically.

---

## 7.20. Contact CTA

Example:

> Interested in discussing this project or a similar backend problem?

Actions:

- Contact Me;
- Download Resume.

---

## 7.21. Project Detail Success Criteria

- project understood within two minutes;
- personal contribution explicit;
- architecture readable;
- at least two technical proof points;
- code works on mobile;
- confidentiality clear;
- metrics consistent with resume;
- next action obvious;
- page remains navigable without JavaScript except optional enhancements.

---

# 8. Code Samples Index UX Specification

**Route:** `/code`

## 8.1. Page Purpose

Предоставить компактные технические доказательства без необходимости открывать production repository.

---

## 8.2. Primary Tasks

1. Найти sample по языку или concept.
2. Просмотреть короткий code preview.
3. Открыть полное объяснение.
4. Перейти к related project.

---

## 8.3. Page Structure

```text
1. Page Header
2. Code Confidentiality Note
3. Language Filters
4. Concept Filters
5. Featured Code Sample
6. Code Sample Grid
7. Projects CTA
```

---

## 8.4. Header

**H1**

> Code Samples

**Description**

> Focused examples of API design, business logic, authorization, background processing, testing, and deployment patterns.

---

## 8.5. Confidentiality Note

> These examples were independently written for this portfolio and do not reproduce proprietary source code.

---

## 8.6. Filters

### Language

- All;
- Python;
- TypeScript;
- SQL;
- Docker;
- Nginx.

### Concept

- API Design;
- Authorization;
- Data Modeling;
- Background Jobs;
- Testing;
- Infrastructure.

Only one filter group must be visible as primary. Secondary group may be optional to avoid complexity.

---

## 8.7. Featured Sample

Recommended:

> Permission-Based FastAPI Dependency

Shows:

- Python;
- FastAPI;
- RBAC;
- related HR Platform;
- short preview;
- explanation.

---

## 8.8. Sample Grid

Initial samples:

1. FastAPI Service Layer;
2. RBAC Permission Check;
3. SQLAlchemy Data Model;
4. Celery Background Task;
5. Pytest API Workflow;
6. TypeScript Webhook Handler;
7. Docker Production Setup;
8. Nginx Reverse Proxy.

---

## 8.9. Code Sample Card

Must remain understandable even if syntax highlighting fails.

---

## 8.10. Bottom CTA

> See how these patterns were used in complete systems.

Action:

> View Projects

---

# 9. Code Sample Detail UX Specification

**Route:** `/code/[slug]`

## 9.1. Page Structure

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
11. Related Project
12. Related Samples
```

---

## 9.2. Sample Header

Contains:

- title;
- language;
- category;
- related project;
- complexity;
- confidentiality status;
- reading time.

---

## 9.3. Code Placement

Primary code appears early.

Do not require the user to scroll through long background before seeing code.

Recommended order:

- short context;
- code;
- explanation.

---

## 9.4. Copy Interaction

After copy:

> Copied

Screen reader live announcement required.

---

## 9.5. Related Project

Strong visual block:

> Used in the Internal HR Platform case study

Action:

> View Project

---

## 9.6. Success Criteria

- code readable at 320px;
- no page horizontal overflow;
- sample has clear context;
- code is not presented without explanation;
- related project visible;
- rewritten-code notice present where required.

---

# 10. Experience Page UX Specification

**Route:** `/experience`

## 10.1. Page Purpose

Показать профессиональное развитие и переносимые навыки.

---

## 10.2. Page Structure

```text
1. Page Header
2. Career Progression Summary
3. Current Role
4. Previous Experience Timeline
5. Education
6. Languages
7. Resume CTA
8. Projects CTA
```

---

## 10.3. Header

**H1**

> Experience

**Description**

> A progression from technical support and business-process analysis to backend development and production automation.

Actions:

- Download Resume;
- View Projects.

---

## 10.4. Career Progression Summary

Visual sequence:

```text
Technical Support
→ Business Process Automation
→ System Analysis
→ Backend Development
```

Must also be represented in text.

---

## 10.5. Current Role

FNF GLOBAL receives the most space.

Include:

- official title;
- dates;
- summary;
- 4–6 contributions;
- technologies;
- related project links.

---

## 10.6. Previous Roles

Each includes:

- role;
- company;
- dates;
- location;
- 1–3 contributions;
- transferable skill.

---

## 10.7. Education

Compact block.

Include:

- degree;
- university;
- location;
- dates.

---

## 10.8. Languages

Use text labels, not progress indicators.

---

## 10.9. Bottom CTA

> View the systems behind this experience.

Action:

> Explore Projects

---

## 10.10. Success Criteria

- career transition appears logical;
- official titles remain unchanged;
- current development work dominates;
- previous roles support current profile;
- dates consistent with resume;
- page not overloaded with old support tasks.

---

# 11. About Page UX Specification

**Route:** `/about`

## 11.1. Page Purpose

Объяснить профессиональную историю, инженерный подход и карьерное направление.

---

## 11.2. Page Structure

```text
1. Page Header
2. Professional Story
3. Engineering Approach
4. What I Work With
5. Currently Exploring
6. Location and Relocation
7. Contact CTA
```

---

## 11.3. Header

**H1**

> About Me

Short description:

> Software Developer from Tajikistan focused on backend systems, business applications, integrations, and production automation.

Optional portrait:

- small or medium;
- not dominant;
- no image required for launch.

---

## 11.4. Professional Story

Use approved About narrative.

Break into 4–5 readable paragraphs.

Avoid resume bullets.

---

## 11.5. Engineering Approach

Recommended principles:

1. Understand the workflow before designing the software.
2. Prefer clear and maintainable solutions.
3. Treat deployment as part of development.
4. Validate the workflows carrying the highest risk.
5. Document decisions and limitations.
6. Protect confidential data.

Each principle includes one short explanation.

---

## 11.6. What I Work With

Skill groups with evidence links.

Example:

> Backend Development
> Python, FastAPI, Django, REST APIs
> Related: Internal HR Platform

---

## 11.7. Currently Exploring

Can include:

- deeper TypeScript;
- React;
- CI/CD;
- cloud infrastructure;
- distributed systems fundamentals;
- open-source contribution.

Must be visually separated from confirmed production skills.

---

## 11.8. Location and Relocation

Text:

> Based in Tajikistan · Open to relocation and international opportunities

Optional additional note:

> Visa sponsorship may be required depending on the destination.

The sponsorship sentence should be used only if strategically desired.

---

## 11.9. Bottom CTA

> Interested in working together?

Actions:

- Get in Touch;
- Download Resume.

---

# 12. Contact Page UX Specification

**Route:** `/contact`

## 12.1. Page Purpose

Предоставить простой и надежный способ связи.

---

## 12.2. Page Structure

```text
1. Page Header
2. Direct Contact Details
3. Contact Form
4. Availability and Location
5. Resume Link
6. Privacy Note
```

---

## 12.3. Header

**H1**

> Get in Touch

**Description**

> I am open to Software Developer opportunities, technical collaborations, and conversations about backend systems, integrations, and business applications.

---

## 12.4. Direct Contact

Displayed before form.

Include:

- email;
- GitHub;
- Resume;
- LinkedIn when ready.

Email must be visible as text, not icon-only.

---

## 12.5. Contact Form

### Fields

- Name;
- Email;
- Company, optional;
- Subject;
- Message.

### Required Labels

Use visible labels.

### Validation

Client and server side.

### Submission States

#### Idle

> Send Message

#### Loading

> Sending...

#### Success

> Thanks for reaching out. Your message has been received.

#### Validation Error

Specific field message.

#### Server Error

> The message could not be sent. Please contact me directly by email.

#### Rate Limit

> Too many messages were submitted. Please try again later or use email.

---

## 12.6. Form UX Rules

- preserve user input after recoverable error;
- focus first invalid field;
- show error summary when multiple fields fail;
- no unnecessary CAPTCHA in first version;
- use honeypot and rate limit;
- submit button remains stable in width.

---

## 12.7. Privacy Note

> Contact details are used only to respond to your message.

Link:

> Privacy

---

## 12.8. Success Criteria

- direct email available without form;
- form fully keyboard accessible;
- server-side validation present;
- spam protection present;
- no sensitive data logged unnecessarily;
- success and failure states clear.

---

# 13. Resume Page UX Specification

**Route:** `/resume`

## 13.1. Page Purpose

Предоставить стабильную точку доступа к актуальному резюме.

---

## 13.2. Page Structure

```text
1. Page Header
2. Resume Summary
3. Last Updated
4. Download Action
5. Online Experience Links
6. Contact CTA
```

---

## 13.3. Header

**H1**

> Resume

Description:

> A concise overview of my experience, technical skills, selected projects, education, and language proficiency.

---

## 13.4. Resume Card

Content:

- filename;
- format;
- last updated;
- language;
- Download PDF;
- View Experience;
- View Projects.

Recommended filename:

> Khasandjon_Babadzhanov_Software_Developer_Resume.pdf

---

## 13.5. Download Behavior

- download starts from stable URL;
- file opens correctly on mobile;
- PDF metadata correct;
- no version-specific URL exposed as main link.

---

## 13.6. Error State

> The resume file is temporarily unavailable.

Actions:

- View Experience;
- Contact Me.

---

# 14. Privacy Page UX Specification

**Route:** `/privacy`

## 14.1. Page Purpose

Прозрачно объяснить обработку данных.

---

## 14.2. Required Sections

- information collected;
- contact form data;
- analytics;
- cookies;
- third-party services;
- retention;
- user rights;
- contact details;
- last updated date.

---

## 14.3. UX Rules

- plain language;
- no unnecessary legal jargon;
- narrow reading width;
- headings and lists;
- no misleading consent UI;
- no cookie banner if non-essential cookies are not used.

---

# 15. 404 Page UX Specification

**Route:** `/404`

## 15.1. Content

**Heading**

> Page Not Found

**Description**

> The page may have moved or the link may be incorrect.

Actions:

- Return Home;
- View Projects.

---

## 15.2. Visual

Optional subtle code-style illustration.

Do not use:

- joke that obscures the error;
- auto-redirect;
- hidden navigation;
- raw server error.

---

# 16. Global Loading UX

## 16.1. Static Pages

Should use server rendering and not show full-page loading UI.

---

## 16.2. Allowed Loading States

- contact form;
- interactive API demo;
- lazy diagram;
- dynamic filtering with remote data;
- resume download state only if necessary.

---

## 16.3. Rules

- never block navigation with loader;
- do not use artificial delay;
- preserve layout dimensions;
- announce async state when appropriate.

---

# 17. Global Error UX

Error messages must:

- explain what failed;
- avoid technical stack traces;
- offer recovery action;
- preserve user work where possible;
- provide direct email fallback for contact errors.

---

# 18. Empty State UX

Required for:

- project filters;
- code filters;
- missing related content;
- unavailable search in future.

Structure:

- clear title;
- short explanation;
- recovery action.

---

# 19. Responsive UX Rules

## 19.1. Desktop

- full navigation;
- sticky project TOC;
- multi-column cards;
- expanded diagrams;
- split hero.

---

## 19.2. Tablet

- reduced columns;
- compact navigation;
- hero may remain split if space allows;
- project metadata wraps.

---

## 19.3. Mobile

- one-column reading flow;
- no fixed sidebars;
- menu via dialog;
- code scroll inside block;
- buttons remain reachable;
- metrics use one or two columns;
- diagrams scale or scroll;
- contact fields full width;
- sticky elements do not consume excessive height.

---

## 19.4. Minimum Width

Site must function at:

> 320px

No page-level horizontal overflow allowed.

---

# 20. Keyboard Navigation Requirements

Required tab order:

1. Skip link;
2. Header identity;
3. Navigation;
4. Theme control;
5. Resume;
6. Main content actions;
7. Page content;
8. Footer.

Other requirements:

- mobile menu focus trap;
- Escape closes overlays;
- focus restored to trigger;
- anchor navigation moves focus meaningfully;
- copy buttons keyboard accessible.

---

# 21. Screen Reader Requirements

- one `h1` per page;
- semantic sections;
- descriptive link labels;
- current navigation announced;
- status not color-only;
- diagrams have text descriptions;
- form errors associated with fields;
- copied status announced;
- decorative images use empty alt.

---

# 22. Motion and Feedback

## Allowed

- short fade;
- small card translation;
- button feedback;
- menu transition;
- filter state change;
- active TOC indicator.

## Prohibited

- typing hero;
- automatic carousel;
- continuous background animation;
- forced smooth scrolling;
- page transition delaying content;
- hover-dependent information.

Reduced motion must disable non-essential movement.

---

# 23. CTA Consistency

Approved labels:

- View Projects;
- View All Projects;
- View Case Study;
- Explore Code Samples;
- View Sample;
- View Experience;
- Download Resume;
- Contact Me;
- Send an Email;
- Send Message;
- Return Home;
- Clear Filters.

Avoid inconsistent alternatives such as:

- Learn More;
- Discover;
- Check It Out;
- Explore Now;
- See Details;

unless a specific context requires them.

---

# 24. Page Analytics Events

Recommended events:

## Homepage

- `hero_view_projects`;
- `hero_download_resume`;
- `hero_contact`;
- `metric_project_open`;
- `featured_project_open`.

## Projects

- `project_filter`;
- `project_open`.

## Project Detail

- `project_code_open`;
- `project_next`;
- `project_contact`.

## Code

- `code_filter`;
- `code_sample_open`;
- `code_copy`.

## Contact

- `contact_email_click`;
- `contact_submit`;
- `contact_success`;
- `contact_error`.

## Resume

- `resume_download`.

No personal form data should be sent to analytics.

---

# 25. Page-Level SEO Structure

## Homepage

- one primary `h1`;
- project and skill sections as `h2`;
- project names as `h3`.

## Projects

- `h1` Projects;
- project names as `h2`.

## Project Detail

- project title as `h1`;
- main sections as `h2`;
- decisions and code samples as `h3`.

## Code Index

- `h1` Code Samples;
- sample titles as `h2`.

## Experience

- `h1` Experience;
- company or role sections as `h2`.

## About

- `h1` About Me;
- principles and focus areas as `h2`.

---

# 26. Cross-Page Consistency Rules

The following must remain identical everywhere:

- project names;
- project metrics;
- role titles;
- company names;
- technology spelling;
- relocation wording;
- Resume filename;
- contact email;
- status labels;
- confidentiality wording.

---

# 27. Page QA Checklist

Each page must pass:

## Content

- correct title;
- no placeholder copy;
- no unsupported claims;
- links valid;
- metrics consistent.

## UX

- primary task clear;
- primary CTA visible;
- next action available;
- no dead end;
- mobile reading order correct.

## Accessibility

- heading hierarchy;
- keyboard support;
- focus visible;
- contrast;
- labels;
- alt text.

## Technical

- no console error;
- no layout shift;
- no horizontal overflow;
- correct metadata;
- correct canonical URL.

## Privacy

- no confidential data;
- no internal URLs;
- no credentials;
- screenshots anonymized.

---

# 28. Page Development Order

Recommended order:

1. Global page frame;
2. Homepage;
3. Projects index;
4. Project detail template;
5. Code samples index;
6. Code sample detail;
7. Experience;
8. About;
9. Contact;
10. Resume;
11. Privacy;
12. 404;
13. global states and polish.

---

# 29. Version 1 Required Pages

Mandatory:

- Home;
- Projects;
- four flagship project details;
- Code Samples;
- Experience;
- About;
- Contact;
- Resume;
- Privacy;
- 404.

Recommended:

- six individual code sample pages;
- Finance Telegram Bot project page;
- School Website project page.

---

# 30. Page Definition of Done

A page is complete when:

- purpose is fulfilled;
- content is approved;
- desktop design implemented;
- tablet design implemented;
- mobile design implemented;
- keyboard navigation tested;
- screen reader basics tested;
- dark and light themes tested;
- loading/error states implemented where needed;
- metadata complete;
- analytics event names assigned;
- confidentiality review passed;
- links verified;
- performance reviewed.

---

# 31. Final UX Flow

The site should guide a visitor through this sequence:

```text
Understand the candidate
→ See credible results
→ Select a project
→ Verify technical depth
→ Review experience
→ Download the resume
→ Make contact
```

The main UX principle:

> Every page must help the visitor move from professional claim to technical evidence and from technical evidence to a clear hiring action.
