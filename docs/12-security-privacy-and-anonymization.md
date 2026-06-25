# Security, Privacy, and Anonymization

## 1. Document Information

**Document:** Security, Privacy, and Anonymization
**File:** `12-security-privacy-and-anonymization.md`
**Project:** Khasandjon Babadzhanov — Software Developer Portfolio
**Version:** 1.0
**Status:** Approved security baseline
**Website language:** English
**Documentation language:** Russian
**Data classification:** Public portfolio with anonymized internal-project evidence

---

## 2. Purpose of This Document

Этот документ определяет требования безопасности, конфиденциальности и анонимизации для портфолио.

Он фиксирует:

- threat model;
- public и private data boundaries;
- правила публикации внутренних проектов;
- confidentiality classification;
- code anonymization;
- screenshot anonymization;
- diagram anonymization;
- synthetic data policy;
- secret management;
- secret scanning;
- repository security;
- frontend security;
- backend API security;
- contact form privacy;
- logging;
- analytics;
- database security;
- Docker и VPS security;
- Nginx и HTTP headers;
- incident response;
- security review process;
- pre-launch checklist;
- критерии готовности.

Главная цель:

> Demonstrate real engineering experience without exposing proprietary code, personal data, credentials, or internal infrastructure.

---

# 3. Security Objectives

Портфолио должно обеспечивать пять основных свойств.

## 3.1. Confidentiality

Сайт не должен раскрывать:

- private source code;
- credentials;
- internal systems;
- employee data;
- customer data;
- private business rules;
- security-sensitive infrastructure details.

---

## 3.2. Integrity

Опубликованный контент должен быть:

- фактически корректным;
- защищенным от несанкционированного изменения;
- согласованным с Resume;
- проверенным перед deployment;
- восстановимым через version control.

---

## 3.3. Availability

Основные страницы должны оставаться доступными независимо от состояния demo API.

Критический контент:

- Home;
- Projects;
- Project Case Studies;
- Code Samples;
- Experience;
- Resume;
- Contact details.

---

## 3.4. Privacy

Сайт должен собирать минимально необходимый объем данных посетителей.

Не должны собираться без необходимости:

- precise location;
- browsing history outside portfolio;
- contact-form typing behavior;
- visitor identity;
- full IP retention;
- advertising profiles;
- fingerprinting data.

---

## 3.5. Transparency

Посетителю должно быть понятно:

- какие проекты anonymized;
- какие code samples rewritten;
- что demo API использует synthetic data;
- какие данные собирает contact form;
- используются ли analytics;
- как связаться по вопросам privacy.

---

# 4. Security Scope

## 4.1. In Scope

- Next.js frontend;
- MDX content;
- public assets;
- Resume;
- FastAPI demo API;
- contact form;
- PostgreSQL demo database;
- Docker containers;
- Docker Compose;
- host-level Nginx;
- Linux VPS;
- domain and TLS;
- repository;
- CI/CD;
- backup files;
- logs;
- analytics;
- project screenshots;
- architecture diagrams;
- code samples.

---

## 4.2. Out of Scope

Следующие системы не должны быть связаны с portfolio environment:

- company production systems;
- company HR database;
- RingCentral production account;
- Google Drive production storage;
- Telegram corporate sessions;
- Motive production account;
- PeopleForce production account;
- private company repositories;
- company VPN;
- company email credentials;
- private customer data.

---

# 5. Trust Boundaries

Основные trust boundaries:

```text
Public Visitor
    │
    ▼
Internet
    │
    ▼
Nginx / TLS Boundary
    ├── Next.js Public Web
    └── FastAPI Public API
             │
             ▼
       Internal Docker Network
             │
             ▼
       Demo PostgreSQL
```

Separate private boundary:

```text
Developer Workstation
    ├── Original screenshots
    ├── Private review notes
    ├── Production reference code
    └── Secrets
```

Private source materials не должны автоматически попадать в public repository или build context.

---

# 6. Threat Actors

## 6.1. Opportunistic Automated Scanners

Цели:

- найти exposed services;
- найти default credentials;
- найти vulnerable dependencies;
- отправить spam;
- обнаружить leaked secrets.

---

## 6.2. Malicious Visitor

Цели:

- abuse demo API;
- create excessive records;
- perform injection;
- bypass role restrictions;
- extract server details;
- trigger resource exhaustion.

---

## 6.3. Spam Bot

Цели:

- массово отправлять contact form;
- использовать email infrastructure;
- размещать malicious links;
- перегружать logs.

---

## 6.4. Accidental Insider Disclosure

Наиболее реалистичный риск:

- случайная публикация private screenshot;
- copied production code;
- real employee name;
- internal URL;
- API token;
- database credential;
- repository history containing secrets.

---

## 6.5. Compromised Dependency

Риск:

- malicious package;
- vulnerable framework;
- compromised container image;
- outdated dependency.

---

## 6.6. VPS Compromise

Риск:

- exposed SSH;
- weak password;
- unpatched OS;
- public database port;
- stolen environment files;
- malicious container.

---

# 7. Primary Threat Scenarios

## Scenario 1 — Secret Committed to Git

Пример:

- SMTP password;
- database password;
- API token;
- production `.env`.

Impact:

- service compromise;
- spam;
- data exposure;
- unauthorized access.

Controls:

- `.gitignore`;
- secret scanning;
- pre-commit checks;
- code review;
- immediate rotation procedure.

---

## Scenario 2 — Sensitive Screenshot Published

Пример:

- employee name;
- personal email;
- internal domain;
- company dashboard data.

Impact:

- privacy violation;
- company confidentiality breach;
- reputational damage.

Controls:

- synthetic demo environment;
- screenshot review;
- metadata stripping;
- asset approval status;
- manual zoom inspection.

---

## Scenario 3 — Proprietary Code Copied Into Portfolio

Impact:

- intellectual-property disclosure;
- exposure of security design;
- employment risk.

Controls:

- independent rewrite;
- generic entities;
- no direct file copying;
- code ownership review;
- confidentiality note.

---

## Scenario 4 — Demo API Abuse

Пример:

- automated record creation;
- request flooding;
- oversized payloads.

Impact:

- resource exhaustion;
- database growth;
- service downtime.

Controls:

- rate limits;
- body limits;
- limited endpoints;
- data reset;
- bounded page size;
- monitoring.

---

## Scenario 5 — Contact Form Spam

Impact:

- inbox flooding;
- email-provider blocking;
- increased cost.

Controls:

- honeypot;
- minimum submission time;
- rate limit;
- body limit;
- optional CAPTCHA only after observed abuse.

---

## Scenario 6 — Database Exposed Publicly

Impact:

- unauthorized reads and writes;
- database destruction;
- credential attacks.

Controls:

- no public port;
- internal Docker network;
- application user;
- firewall;
- strong credentials.

---

## Scenario 7 — XSS Through Content or Contact Data

Impact:

- visitor session compromise;
- malicious redirect;
- page defacement.

Controls:

- trusted local MDX only;
- no arbitrary remote MDX;
- no raw rendering of form data;
- output escaping;
- CSP;
- sanitized email templates.

---

# 8. Data Classification

Все данные разделяются на четыре категории.

## 8.1. Public

Разрешено публиковать:

- professional profile;
- approved project summaries;
- verified metrics;
- rewritten code;
- public repository links;
- synthetic API data;
- approved screenshots;
- Resume;
- business contact email.

---

## 8.2. Internal Working Data

Не должно попадать в production build:

- content review notes;
- draft project facts;
- metric evidence;
- raw source screenshots;
- technical investigation notes;
- draft diagrams;
- private deployment notes.

---

## 8.3. Confidential

Запрещено публиковать:

- company source code;
- internal API contracts;
- employee information;
- private customer information;
- company credentials;
- internal domains;
- IP addresses;
- database schema containing sensitive entities;
- exact permission matrix;
- internal operational secrets.

---

## 8.4. Secret

Никогда не хранить в public content или repository:

- passwords;
- API keys;
- private keys;
- access tokens;
- session cookies;
- database URLs with credentials;
- SMTP credentials;
- SSH keys;
- webhook secrets.

---

# 9. Confidentiality Levels

Используются уровни из content model.

## Level 0 — Public

Можно публиковать:

- repository;
- code;
- screenshots;
- architecture;
- live demo.

---

## Level 1 — Public With Redaction

Требуется удалить:

- environment details;
- private values;
- credentials;
- internal identifiers.

---

## Level 2 — Anonymized Internal Project

Разрешено:

- simplified architecture;
- rewritten code;
- synthetic screenshots;
- approved metrics;
- general workflow.

---

## Level 3 — Restricted Summary

Разрешено только:

- general project purpose;
- role;
- broad result.

---

# 10. Project Publication Decision Matrix

Перед подготовкой case study необходимо определить:

| Question                          | Required Decision          |
| --------------------------------- | -------------------------- |
| Can the company name be public?   | Yes / No                   |
| Can project purpose be described? | Yes / Limited / No         |
| Can metrics be published?         | Yes / Approximate / No     |
| Can screenshots be shown?         | Original / Anonymized / No |
| Can architecture be shown?        | Full / Simplified / No     |
| Can code be shown?                | Public / Rewritten / No    |
| Can external services be named?   | Yes / Generic only         |
| Can deployment topology be shown? | Simplified / No            |

Если любой ответ неизвестен, использовать более строгий вариант.

---

# 11. Confidentiality Review Workflow

```text
Select project
→ Assign confidentiality level
→ Identify sensitive elements
→ Prepare rewritten content
→ Prepare synthetic assets
→ Run automated scans
→ Perform manual review
→ Approve for publication
```

Review должен выполняться повторно при существенном изменении project page.

---

# 12. Code Anonymization Policy

## 12.1. Independent Rewrite

Portfolio code должен быть написан заново на основе общего engineering pattern.

Нельзя:

- копировать production file;
- менять только названия variables;
- удалять несколько строк и публиковать остаток;
- сохранять company-specific structure.

---

## 12.2. Entity Replacement

Примеры:

```text
RealEmployeeRecord → DemoEmployee
InternalDepartment → DemoDepartment
CompanyAccessRule → PermissionRule
CorporateRecording → ArchiveItem
```

---

## 12.3. Business Rule Simplification

Точные internal rules заменяются generic logic.

Пример:

Вместо полной company permission matrix:

```text
viewer
manager
admin
```

---

## 12.4. Identifier Replacement

Удалить или заменить:

- tenant IDs;
- user IDs;
- chat IDs;
- bucket names;
- account numbers;
- folder IDs;
- company codes.

---

## 12.5. Error Message Review

Production error messages могут содержать:

- entity names;
- internal processes;
- private IDs.

Они должны быть переписаны.

---

## 12.6. Code Path Review

Не использовать реальные internal paths:

```text
/app/fnf/hr/private/...
```

Использовать generic paths:

```text
app/services/employees.py
```

---

# 13. Code Publication Checklist

Перед публикацией code sample:

- code written independently;
- no copied comments;
- no internal class names;
- no company-specific entities;
- no credentials;
- no private endpoints;
- no real identifiers;
- no internal log messages;
- no exact security rules;
- syntax valid;
- tests pass;
- confidentiality note included.

---

# 14. Screenshot Anonymization Policy

## 14.1. Preferred Method

Лучший вариант:

> Generate screenshots from a dedicated demo database using synthetic data.

Это безопаснее ручного размытия production screenshot.

---

## 14.2. Data That Must Be Replaced

- names;
- email addresses;
- phone numbers;
- addresses;
- profile photos;
- employee IDs;
- salary information;
- department names if sensitive;
- document names;
- customer names;
- company identifiers;
- timestamps tied to real incidents.

---

## 14.3. Interface Details to Remove

- internal domain;
- IP address;
- browser bookmarks;
- account avatar;
- notification content;
- debug toolbar;
- error stack;
- environment label;
- server name;
- browser history suggestions.

---

## 14.4. Metadata Removal

Before publication:

- remove EXIF;
- remove geolocation;
- remove device information;
- remove author metadata;
- verify exported layers;
- verify hidden text.

---

## 14.5. Redaction Quality

Do not rely only on blur.

Blurred text may sometimes remain identifiable.

Preferred methods:

- replace data at source;
- cover with solid shape;
- crop;
- recreate screenshot with demo data.

---

## 14.6. Screenshot Approval Fields

Published screenshot requires:

```text
reviewStatus = approved
anonymized = true
syntheticData = true
containsPersonalData = false
approvedForPublicUse = true
```

---

# 15. Screenshot Manual Review

Review at:

- normal size;
- 200% zoom;
- dark display;
- light display;
- full-resolution file;
- browser frame.

Check edges and cropped areas.

---

# 16. Architecture Diagram Anonymization

Diagrams must not show:

- internal IPs;
- server hostnames;
- database names;
- bucket names;
- private domains;
- exact network topology;
- credentials;
- production account IDs;
- detailed security boundaries that create unnecessary risk.

Use generic labels:

```text
Web Application
API Service
PostgreSQL
Background Worker
Object Storage
External API
```

---

# 17. Diagram Accuracy Rule

Anonymization must not make diagram misleading.

Допустимо:

- simplify;
- combine internal components;
- rename services;
- remove irrelevant integrations.

Нельзя:

- claim microservices if project is modular monolith;
- invent queues that did not exist;
- add technologies only for appearance;
- hide a limitation while making an architectural claim.

---

# 18. Synthetic Data Policy

Synthetic data must:

- be fictional;
- not derive directly from real employee records;
- use reserved example domains;
- avoid real phone numbers;
- avoid real addresses;
- include realistic formats;
- be safe for screenshots and API responses;
- reset regularly.

---

## 18.1. Approved Email Domains

- example.com;
- example.org;
- example.net.

---

## 18.2. Approved Example Names

Use neutral fictional names such as:

- Jordan Lee;
- Alex Morgan;
- Taylor Smith;
- Casey Brown.

Do not use current employee names.

---

## 18.3. Phone Numbers

Prefer not to include phone numbers.

Если required:

- use explicitly fictional formats;
- do not use random numbers that may belong to real people.

---

## 18.4. Address Data

Avoid precise addresses.

Use:

- Demo City;
- Example Region;
- fictional location labels.

---

# 19. Synthetic Data Generation

Recommended seed generation must be:

- deterministic;
- version-controlled;
- repeatable;
- limited in size;
- independent from production exports.

Never generate demo data by:

- copying production database;
- masking only some fields;
- exporting real data and renaming columns.

---

# 20. Contact Form Privacy

## 20.1. Collected Fields

- name;
- email;
- company, optional;
- subject;
- message.

---

## 20.2. Purpose

Data is used only to:

- receive the inquiry;
- respond to the sender;
- investigate delivery failure.

---

## 20.3. Data Minimization

Do not request:

- phone number;
- home address;
- date of birth;
- government ID;
- CV upload;
- password;
- account registration.

---

## 20.4. Retention

Recommended:

- email message retained according to normal mailbox policy;
- application logs do not retain message body;
- temporary delivery metadata removed after a limited period;
- no marketing database.

---

## 20.5. Contact Form Notice

Suggested text:

> Contact details are used only to respond to your message. Please do not submit sensitive personal or confidential company information.

---

## 20.6. Contact Logging

Do not log:

- full name;
- full email;
- company;
- subject;
- message body.

Permitted metadata:

- timestamp;
- delivery status;
- request ID;
- route;
- error category.

---

# 21. Contact Spam Controls

Use layered protection:

1. honeypot;
2. minimum completion time;
3. maximum completion age;
4. per-client rate limit;
5. request body limit;
6. server-side validation;
7. email-domain validation only where justified;
8. optional CAPTCHA after observed abuse.

Do not add CAPTCHA before it is necessary if it harms accessibility.

---

# 22. Analytics Privacy

## 22.1. Allowed Analytics

Preferred metrics:

- page views;
- project opens;
- Resume downloads;
- outbound link clicks;
- code sample views;
- contact success.

---

## 22.2. Prohibited Analytics

Do not collect:

- form field values;
- message content;
- copied code;
- exact mouse movement;
- session replay;
- keystroke tracking;
- advertising identifiers;
- cross-site tracking.

---

## 22.3. IP Handling

Where possible:

- avoid persistent IP storage;
- anonymize or truncate IP;
- do not expose IP in application dashboard unnecessarily.

---

## 22.4. Cookie Strategy

If analytics does not require non-essential cookies:

- no cookie banner is needed.

If non-essential cookies are introduced:

- consent must be obtained before setting them;
- Privacy page must be updated.

---

# 23. Privacy Page Requirements

Privacy page must explain:

- what data is collected;
- contact form processing;
- analytics;
- cookies;
- logs;
- third-party providers;
- retention;
- security measures;
- contact method;
- last updated date.

Text should be plain and specific.

Avoid generic legal text that does not match actual behavior.

---

# 24. Secret Management

## 24.1. Secret Locations

Production secrets may exist only in:

- restricted VPS environment file;
- CI secret store;
- secure password manager;
- protected deployment system.

---

## 24.2. Forbidden Locations

Secrets must not exist in:

- Git repository;
- MDX;
- TypeScript source;
- browser bundle;
- screenshots;
- Dockerfile;
- Compose committed values;
- README;
- logs;
- OpenAPI examples.

---

## 24.3. Environment Files

Commit:

```text
.env.example
```

Do not commit:

```text
.env
.env.local
.env.production
.env.test.local
```

---

## 24.4. File Permissions

Production environment file:

- readable only by deployment user;
- not world-readable;
- excluded from web roots;
- backed up securely.

---

## 24.5. Secret Naming

Use clear variable names:

```text
DATABASE_URL
SMTP_PASSWORD
CONTACT_RECIPIENT
```

Do not store multiple values in undocumented generic variables.

---

# 25. Secret Rotation

Rotate secrets when:

- accidentally committed;
- exposed in logs;
- shared in screenshot;
- team access changes;
- provider compromise suspected;
- backup security is uncertain.

Deleting the secret from the latest commit is not enough.

The secret must be revoked or rotated.

---

# 26. Secret Leak Response

If a secret is discovered:

1. Disable or rotate the secret.
2. Remove it from active files.
3. Check service logs.
4. Inspect repository history.
5. Remove from history if necessary.
6. Redeploy with new credentials.
7. Review where the leak occurred.
8. Add preventive control.
9. Document incident.

Do not postpone rotation until repository history cleanup is complete.

---

# 27. Secret Scanning

Secret scanning should run:

- before commit;
- in CI;
- before public repository release;
- before production deployment;
- during periodic review.

Scan:

- repository;
- Git history;
- Docker build context;
- generated frontend assets;
- screenshots where applicable;
- configuration archives.

---

# 28. Repository Security

## 28.1. Branch Protection

For public or production repository:

- protect `main`;
- require checks before merge;
- prevent force push;
- require review for sensitive infrastructure changes where practical.

---

## 28.2. Dependency Files

Commit lockfiles.

Do not allow dependency versions to float unpredictably.

---

## 28.3. Private Assets

Use:

```text
private-assets/
content-private/
backups/
```

Add them to `.gitignore`.

---

## 28.4. Git History Review

Before making repository public:

- inspect all commits;
- search deleted files;
- search old `.env`;
- search tokens;
- inspect original screenshots;
- inspect branches and tags.

---

# 29. Dependency Security

## 29.1. Frontend

Review:

- Next.js;
- React;
- MDX packages;
- syntax highlighter;
- diagram tools;
- form dependencies;
- analytics scripts.

---

## 29.2. Backend

Review:

- FastAPI;
- Pydantic;
- SQLAlchemy;
- Alembic;
- PostgreSQL driver;
- email client;
- rate-limit library.

---

## 29.3. Containers

Use:

- official base images;
- pinned major or digest strategy where appropriate;
- minimal runtime images;
- regular rebuilds;
- vulnerability scanning.

---

## 29.4. Dependency Update Policy

- critical security patch: highest priority;
- high severity: review and patch promptly;
- routine updates: scheduled;
- major upgrades: separate testing branch.

---

# 30. Frontend Security

## 30.1. Trusted Content

MDX is loaded only from trusted local files.

Do not execute remote untrusted MDX.

---

## 30.2. HTML Rendering

Avoid raw HTML.

If raw HTML is required:

- sanitize it;
- restrict allowed elements;
- review at build time.

---

## 30.3. User Content

Contact-form content must never be rendered on public pages.

---

## 30.4. External Links

For links opening new tabs:

```text
rel="noopener noreferrer"
```

Do not open every external link in a new tab automatically.

---

## 30.5. Downloaded Files

Resume and public documents must:

- use safe filenames;
- have correct content type;
- not contain hidden metadata;
- not contain comments or tracked changes.

---

# 31. Content Security Policy

CSP should restrict content to required sources.

Policy categories:

- `default-src`;
- `script-src`;
- `style-src`;
- `img-src`;
- `font-src`;
- `connect-src`;
- `frame-src`;
- `object-src`;
- `base-uri`;
- `form-action`;
- `frame-ancestors`.

---

## 31.1. CSP Principles

- avoid broad `*`;
- avoid unnecessary `unsafe-eval`;
- minimize `unsafe-inline`;
- allow only configured analytics;
- allow API requests only to same origin;
- disallow plugins and object content;
- restrict form submissions.

---

## 31.2. CSP Deployment

Recommended process:

1. define intended policy;
2. test in report-only mode;
3. inspect violations;
4. fix legitimate requirements;
5. enable enforcement;
6. monitor after deployment.

---

# 32. Security Headers

Recommended headers:

```text
Strict-Transport-Security
Content-Security-Policy
X-Content-Type-Options
Referrer-Policy
Permissions-Policy
Cross-Origin-Opener-Policy
Cross-Origin-Resource-Policy
```

Frame protection should be enforced through CSP `frame-ancestors`.

---

## 32.1. X-Content-Type-Options

```text
nosniff
```

---

## 32.2. Referrer Policy

Recommended:

```text
strict-origin-when-cross-origin
```

---

## 32.3. Permissions Policy

Disable browser capabilities not used by the site, such as:

- camera;
- microphone;
- geolocation;
- payment;
- USB;
- accelerometer.

---

## 32.4. HSTS

Enable only after HTTPS works reliably.

Recommended behavior:

- include subdomains only if all subdomains support HTTPS;
- preload only after deliberate review.

---

# 33. Backend Input Validation

All public inputs must have:

- type validation;
- length limits;
- enum validation;
- normalization;
- allowed-character checks where appropriate;
- database constraint support.

Never trust client-side validation alone.

---

# 34. Injection Protection

## 34.1. SQL Injection

Use:

- SQLAlchemy expressions;
- parameterized statements;
- allowlisted sort fields;
- validated filters.

Do not concatenate raw query input into SQL.

---

## 34.2. Command Injection

Public API must not execute:

- arbitrary shell commands;
- user-provided file paths;
- arbitrary task names.

---

## 34.3. Header Injection

Contact form values must not be inserted directly into email headers.

Email subject and reply-to must be validated and normalized.

---

## 34.4. Template Injection

User input must be passed as data, not as executable template content.

---

# 35. API Authorization Demonstration

`X-Demo-Role` is a simulated role selector.

It must be documented as:

- demonstration only;
- not authentication;
- not suitable for production authorization.

The demo must not claim:

- secure login;
- identity verification;
- real RBAC security.

---

# 36. API Abuse Protection

Controls:

- rate limits;
- pagination limits;
- body limits;
- strict endpoint allowlist;
- no uploads;
- no arbitrary filters;
- temporary data;
- daily reset;
- bounded background jobs;
- database constraints;
- timeouts.

---

# 37. Error Security

Public errors must not expose:

- stack trace;
- SQL query;
- file path;
- environment variable;
- hostname;
- container name;
- library version details;
- database exception text.

Use generic messages and request IDs.

---

# 38. Request IDs

Request IDs may be public.

They must:

- contain no user data;
- have limited length;
- be generated safely;
- appear in logs and safe error responses.

Do not trust arbitrarily long incoming request IDs.

---

# 39. Rate Limiting

Initial policy:

| Endpoint Type | Suggested Limit |
| ------------- | --------------: |
| Public reads  |       60/minute |
| Demo writes   |       10/minute |
| Demo jobs     |        3/minute |
| Contact form  |          3/hour |

Limits should be adjusted based on observed use.

---

# 40. Database Security

## 40.1. Network

PostgreSQL must:

- remain inside Docker network;
- not bind to public interface;
- not be reachable from Internet.

---

## 40.2. Credentials

Use:

- dedicated database user;
- strong password;
- separate migration privileges where practical;
- no default credentials.

---

## 40.3. Permissions

Application database user should have only required permissions.

Do not use PostgreSQL superuser for normal application queries.

---

## 40.4. Data Scope

Database stores only:

- synthetic demo data;
- job state;
- safe audit events;
- minimal contact delivery metadata if necessary.

---

## 40.5. Backups

Demo database backup is lower priority because data is reproducible.

Backups must still avoid containing:

- contact message bodies;
- production company data;
- credentials.

---

# 41. Audit Event Privacy

Audit events may store:

- generic actor role;
- entity type;
- entity ID;
- action;
- safe metadata.

Do not store:

- visitor IP;
- browser fingerprint;
- full email;
- contact content;
- sensitive request body.

---

# 42. Docker Security

## 42.1. Non-Root Containers

Web and API containers should run as non-root where practical.

---

## 42.2. Minimal Images

Runtime images should exclude:

- compilers;
- package managers where unnecessary;
- development tools;
- source assets not needed at runtime;
- private files.

---

## 42.3. Build Context

Use `.dockerignore`.

Exclude:

```text
.git
.env*
private-assets
content-private
backups
node_modules
test artifacts
local database files
```

Preserve `.env.example` only where required for documentation, not runtime.

---

## 42.4. Container Capabilities

Do not add privileged mode.

Do not mount Docker socket into application containers.

---

## 42.5. Filesystem

Use read-only filesystem where practical.

Provide writable temporary locations only when required.

---

## 42.6. Ports

Bind web and API upstream ports only to localhost.

Example:

```text
127.0.0.1:3100
127.0.0.1:8100
```

Database port remains unexposed.

---

# 43. Docker Compose Security

Do not store real secrets directly in committed Compose files.

Use:

- environment references;
- protected environment files;
- secret management if introduced later.

Networks:

- isolate database;
- avoid unnecessary service connectivity.

---

# 44. Nginx Security

Nginx must:

- redirect HTTP to HTTPS;
- restrict request sizes;
- add security headers;
- apply rate limiting;
- hide unnecessary server information;
- proxy only approved routes;
- deny access to hidden files;
- deny accidental backup files;
- prevent directory listing.

---

## 44.1. Files to Block

Requests for files such as:

```text
.env
.git
*.bak
*.sql
*.tar
*.gz
docker-compose.yml
compose.yaml
```

must not expose local files.

Correct deployment layout should keep these files outside web root, with Nginx denial as defense in depth.

---

# 45. TLS Requirements

- valid certificate;
- automatic renewal;
- HTTP redirect;
- no mixed content;
- modern TLS configuration;
- renewal monitoring;
- canonical host redirect.

---

# 46. VPS Security

## 46.1. SSH

Recommended:

- key-based authentication;
- disable password authentication after validation;
- disable direct root login where practical;
- restrict users;
- protect private keys.

---

## 46.2. Firewall

Allow only required public ports:

```text
22
80
443
```

SSH port may be restricted by source if operationally practical.

Do not expose:

- PostgreSQL;
- Redis;
- application upstream ports.

---

## 46.3. Updates

Maintain:

- OS security updates;
- Docker updates;
- Nginx updates;
- certificate tooling.

---

## 46.4. Service User

Deploy application under a dedicated non-root user.

---

## 46.5. File Permissions

Protect:

- `.env.production`;
- backup archives;
- SSH keys;
- Nginx certificate files;
- deployment scripts.

---

## 46.6. Brute-Force Protection

Optional controls:

- fail2ban;
- provider firewall;
- SSH connection limits;
- logs and alerts.

---

# 47. Backup Security

Backups may contain:

- environment configuration;
- database;
- repository;
- server configuration.

Controls:

- restricted permissions;
- encryption when transferred;
- no public download location;
- retention policy;
- tested restore;
- deletion of old unnecessary archives.

---

# 48. Resume Privacy Review

Resume must be checked for:

- correct email;
- intentional phone publication;
- no exact home address;
- no passport data;
- no date of birth unless explicitly required;
- no hidden Word comments;
- no tracked changes;
- safe PDF metadata;
- no application-specific private notes.

Recommended location display:

> Tajikistan

not a precise residential address.

---

# 49. Public Contact Information

Recommended public information:

- professional email;
- GitHub;
- LinkedIn when ready;
- country;
- relocation status.

Optional:

- phone number.

Publishing phone number should be a deliberate choice because it can increase spam.

---

# 50. Email Address Protection

Do not make email difficult for legitimate recruiters to access.

Email should remain readable and clickable.

Spam protection should be applied at mail-provider level instead of hiding email through unusable obfuscation.

---

# 51. Logging Security

## 51.1. Allowed Log Fields

- timestamp;
- severity;
- service;
- route;
- method;
- status;
- duration;
- request ID;
- safe error code.

---

## 51.2. Prohibited Log Fields

- password;
- database URL;
- SMTP password;
- API token;
- authorization header;
- cookie;
- contact message;
- full request body;
- real personal data.

---

## 51.3. Log Retention

Keep logs only as long as operationally necessary.

Suggested starting point:

- application logs: 14–30 days;
- security logs: based on storage and incident needs;
- debug logs: disabled in production.

---

## 51.4. Log Access

Only deployment administrator should access production logs.

Logs must not be downloadable from public site.

---

# 52. Error Monitoring Privacy

If external error monitoring is introduced:

- scrub request bodies;
- scrub headers;
- disable contact message capture;
- mask email;
- review data region and retention;
- document provider on Privacy page where required.

---

# 53. OpenAPI Security

OpenAPI must not expose:

- internal server URLs;
- private schema fields;
- contact provider details;
- database structure beyond public resources;
- real authorization design;
- production credentials.

Use synthetic examples.

---

# 54. API Documentation Notice

Public docs should include:

> This API uses synthetic demonstration data. It is isolated from internal company systems and does not represent a production authentication mechanism.

---

# 55. Security of Downloadable Files

Public downloads must:

- use fixed allowed paths;
- not accept arbitrary file names;
- have correct MIME type;
- use safe content disposition;
- exclude private files;
- be scanned before publication.

Do not build a generic file-download endpoint for Version 1.

---

# 56. File Upload Policy

Public file upload is not permitted in Version 1.

Reasons:

- unnecessary attack surface;
- malware risk;
- storage abuse;
- privacy complexity;
- no portfolio requirement.

---

# 57. Admin Interface Policy

No public admin panel in Version 1.

Content is managed through repository and deployment workflow.

This avoids:

- login;
- password handling;
- session security;
- admin attack surface;
- authorization complexity.

---

# 58. Authentication Policy

The site does not require visitor accounts.

Do not add:

- signup;
- login;
- password reset;
- social authentication;
- recruiter account.

Private preview can use infrastructure-level access if ever required.

---

# 59. CI/CD Security

## 59.1. Secrets

CI secrets must be:

- scoped;
- masked;
- accessible only to deployment jobs;
- rotated when access changes.

---

## 59.2. Pull Requests

Untrusted pull-request code must not automatically receive production secrets.

---

## 59.3. Deployment

Deployment should use:

- limited SSH key;
- dedicated deployment user;
- explicit target directory;
- controlled commands.

---

## 59.4. Build Artifacts

Review that build artifacts do not include:

- `.env`;
- source maps exposing sensitive code where not needed;
- private content;
- original screenshots;
- internal notes.

---

# 60. Source Maps

Source maps may improve debugging, but public exposure should be deliberate.

Rules:

- do not include secrets regardless of source-map decision;
- private server source maps should remain non-public;
- review client bundle contents;
- use external monitoring only with privacy controls.

---

# 61. Public Bundle Inspection

Before launch inspect:

- JavaScript bundles;
- generated HTML;
- JSON data;
- source maps;
- Open Graph metadata;
- sitemap;
- robots file.

Search for:

- email addresses;
- phone numbers;
- internal domains;
- environment values;
- private project names;
- hidden draft content.

---

# 62. Draft Content Security

Draft content must not appear in:

- production routes;
- generated static data;
- sitemap;
- search index;
- related-content lists;
- browser bundle.

Do not rely only on hiding links.

---

# 63. Private Content Directory

Recommended:

```text
content-private/
private-assets/
security-review/
backups/
```

These paths must be:

- excluded from public build;
- excluded from public repository;
- reviewed in `.gitignore`;
- excluded from Docker build context.

---

# 64. Third-Party Services

Every third-party service must be reviewed for:

- data sent;
- data retention;
- cookies;
- scripts;
- permissions;
- security history;
- privacy impact;
- necessity.

Possible services:

- email provider;
- analytics;
- error monitoring;
- DNS/CDN provider;
- uptime monitoring.

Do not add a service only for decoration or convenience.

---

# 65. External Embeds

Avoid third-party embeds where possible.

Examples:

- embedded GitHub cards;
- social widgets;
- video platforms;
- external analytics dashboards.

Risks:

- tracking;
- performance;
- CSP complexity;
- layout instability.

Prefer static links or locally hosted previews.

---

# 66. Social Preview Security

Open Graph images must not contain:

- confidential screenshots;
- internal URLs;
- personal phone number;
- hidden project details;
- unverified metrics.

Use a dedicated safe image.

---

# 67. Search Engine Exposure

Robots and sitemap must include only intended public pages.

Noindex:

- previews;
- drafts;
- development routes;
- component showcase;
- internal reports;
- API debug endpoints.

---

# 68. Development Routes

Routes such as:

```text
/dev/components
/dev/content-report
/debug
```

must:

- be disabled in production;
- or protected;
- or excluded from production build.

---

# 69. Health Endpoint Privacy

Health endpoints may expose:

- service status;
- generic dependency state.

They must not expose:

- database host;
- database name;
- credentials;
- environment variables;
- internal version inventory;
- server filesystem.

---

# 70. Error Pages

Public error pages must not include:

- stack trace;
- request headers;
- environment name;
- server path;
- container information.

---

# 71. Security Testing

## 71.1. Static Checks

- type checking;
- linting;
- secret scanning;
- dependency scanning;
- Dockerfile linting;
- content confidentiality linting.

---

## 71.2. Dynamic Checks

Test:

- invalid inputs;
- oversized body;
- rate limit;
- unauthorized demo role;
- injection strings;
- unknown routes;
- malformed JSON;
- invalid content type;
- repeated idempotency key.

---

## 71.3. Manual Checks

- view page source;
- inspect network requests;
- inspect JavaScript bundle;
- inspect headers;
- verify database port;
- inspect screenshots;
- inspect PDF metadata;
- inspect OpenAPI.

---

# 72. Security Header Verification

Verify with:

- browser developer tools;
- command-line HTTP response inspection;
- security header testing service where appropriate.

Do not assume headers work because they exist in configuration file.

---

# 73. TLS Verification

Check:

- canonical host;
- certificate chain;
- expiry;
- automatic renewal;
- HTTP redirect;
- no old insecure endpoint;
- no mixed-content warning.

---

# 74. Firewall Verification

From an external network verify that only intended services respond.

Expected public services:

- HTTP;
- HTTPS;
- SSH if permitted.

Expected closed:

- PostgreSQL;
- Redis;
- Next.js upstream;
- FastAPI upstream.

---

# 75. Contact Form Security Tests

Test:

- empty fields;
- invalid email;
- oversized message;
- HTML content;
- script tags;
- newline injection;
- honeypot filled;
- submission too fast;
- repeated requests;
- mail-provider failure.

---

# 76. Demo API Security Tests

Test:

- missing role;
- invalid role;
- viewer write attempt;
- invalid sort;
- oversized page size;
- unknown filter;
- SQL injection strings;
- duplicate records;
- repeated job request;
- malformed UUID;
- invalid content type;
- request flooding.

---

# 77. Content Security Tests

Search generated site for:

- internal domains;
- private IPs;
- `Bearer`;
- `password`;
- `secret`;
- `.env`;
- private email domains;
- production bucket names;
- original company-specific entity names.

False positives should be reviewed, not blindly ignored.

---

# 78. Security Incident Categories

## Low

- broken security header;
- excessive log detail without sensitive content;
- outdated non-critical package.

## Medium

- public debug route;
- weak rate limit;
- draft page indexed;
- synthetic data not resetting.

## High

- private screenshot;
- internal URL disclosure;
- database public port;
- personal data in logs.

## Critical

- active credential exposed;
- private key exposed;
- proprietary source published;
- production company data published;
- unauthorized server access.

---

# 79. Incident Response Procedure

```text
Detect
→ Contain
→ Revoke access or remove content
→ Preserve relevant logs
→ Assess impact
→ Fix root cause
→ Redeploy
→ Verify
→ Document
```

For critical disclosure:

- take affected content offline immediately;
- rotate credentials;
- notify relevant owner where necessary;
- do not wait for full investigation before containment.

---

# 80. Security Contact

Privacy page or security notice may provide:

> For security or privacy concerns related to this website, contact the portfolio owner using the email listed on the Contact page.

A separate security email is optional.

---

# 81. Security Review Roles

For a solo project, responsibilities remain explicit.

## Content Owner

- verifies facts;
- approves metrics;
- checks company confidentiality.

## Developer

- implements controls;
- reviews code;
- manages deployment.

## Security Reviewer

Can be the same person, but uses a separate checklist and review pass.

The same work should not be considered reviewed immediately after creation without a second deliberate inspection.

---

# 82. Pre-Publication Content Review

Every project must pass:

- factual review;
- ownership review;
- confidentiality review;
- code review;
- screenshot review;
- diagram review;
- metadata review;
- generated-page review.

---

# 83. Pre-Launch Security Checklist

## Repository

- no committed `.env`;
- Git history scanned;
- secrets scanned;
- private assets excluded;
- lockfiles committed;
- README contains no credentials.

## Content

- project facts approved;
- metrics verified;
- code rewritten;
- screenshots synthetic;
- diagrams simplified;
- drafts excluded.

## Frontend

- CSP enabled;
- security headers enabled;
- no unsafe raw HTML;
- source bundle inspected;
- external links reviewed.

## API

- validation enabled;
- errors safe;
- rate limits active;
- body limits active;
- demo roles clearly labeled;
- OpenAPI safe.

## Database

- no public port;
- non-superuser application account;
- synthetic data only;
- reset verified.

## Infrastructure

- HTTPS works;
- firewall active;
- SSH secured;
- containers non-root where practical;
- backups protected;
- logs restricted.

## Privacy

- Privacy page accurate;
- analytics behavior documented;
- contact retention defined;
- no unnecessary cookies;
- direct contact available.

---

# 84. Production Security Checklist

After deployment:

- inspect public headers;
- inspect certificate;
- test HTTP redirect;
- test CSP;
- test contact rate limit;
- test API rate limit;
- confirm database inaccessible externally;
- confirm upstream ports inaccessible externally;
- inspect logs for secrets;
- verify backups;
- verify restore documentation;
- run dependency and container scan;
- verify draft exclusion.

---

# 85. Periodic Security Maintenance

## Monthly

- review dependency alerts;
- review VPS updates;
- inspect disk usage;
- inspect service errors;
- verify backup completion.

## Quarterly

- rescan Git history;
- review third-party services;
- review Privacy page;
- test restore;
- review access keys;
- inspect public assets.

## Before Every Major Release

- run secret scan;
- run content confidentiality review;
- review generated bundle;
- verify security headers;
- test contact and API abuse controls.

---

# 86. Security Documentation

Maintain:

```text
docs/security/
├── threat-model.md
├── incident-response.md
├── deployment-security.md
├── asset-review-checklist.md
└── secret-rotation.md
```

This document can remain the main policy for Version 1. Separate files may be added when implementation begins.

---

# 87. Security Exceptions

Any exception must document:

- control being bypassed;
- reason;
- risk;
- temporary mitigation;
- owner;
- expiration date.

Example:

> CSP remains report-only during analytics integration testing until July 15, 2026.

Permanent undocumented exceptions are not allowed.

---

# 88. Privacy-by-Design Decisions

Approved decisions:

- no user accounts;
- no public uploads;
- no advertising;
- no session replay;
- no company production integration;
- no full contact message storage in database;
- no unnecessary cookies;
- no precise visitor tracking;
- synthetic demo data only;
- static content independent of API.

---

# 89. Security-by-Design Decisions

Approved decisions:

- same-origin API;
- database internal only;
- strict content validation;
- local trusted MDX;
- small public API surface;
- bounded inputs;
- no arbitrary API explorer URLs;
- daily demo reset;
- non-root deployment;
- host-level TLS and routing;
- stable public download paths.

---

# 90. Controls Not Required for Version 1

Not required because relevant features are absent:

- password hashing;
- MFA;
- account recovery;
- session revocation;
- OAuth;
- refresh tokens;
- user consent dashboard;
- file malware scanner;
- complex WAF;
- Kubernetes network policy;
- secrets vault.

They must be added only if the corresponding feature is introduced.

---

# 91. Security Anti-Patterns

Do not:

- publish blurred production data;
- commit `.env` and remove it later;
- reuse company credentials;
- expose database port temporarily;
- use wildcard CORS;
- use permissive CSP without review;
- log all request bodies;
- show raw exceptions;
- call `X-Demo-Role` authentication;
- store contact form content indefinitely;
- create public reset endpoint;
- use production data for demo;
- publish screenshots before review;
- expose server control panels publicly without protection;
- rely only on frontend validation.

---

# 92. Security Acceptance Criteria

Security baseline is accepted when:

- no confidential company data is public;
- all internal code samples are independently rewritten;
- all screenshots use synthetic data;
- all published assets are approved;
- no active secrets exist in Git;
- production environment files are protected;
- database is internal-only;
- contact data collection is minimal;
- logs exclude message content;
- rate limiting is active;
- request limits are active;
- CSP and security headers are deployed;
- HTTPS is enforced;
- demo role is labeled as simulation;
- OpenAPI contains synthetic examples only;
- draft content is excluded;
- public bundle has been inspected;
- backup and restore process is documented;
- incident response process exists.

---

# 93. Definition of Done

Документ считается реализованным, когда:

- threat model reviewed;
- all data categories assigned;
- every project has confidentiality level;
- code anonymization workflow is enforced;
- screenshot approval workflow exists;
- diagram anonymization rules are followed;
- synthetic data generator is independent from production data;
- secret scanning runs locally and in CI;
- private directories are excluded from Git and Docker;
- production secrets are stored outside repository;
- contact form collects only necessary data;
- privacy notice matches real processing;
- analytics does not capture personal form data;
- frontend does not render untrusted HTML;
- backend validates every public request;
- API errors do not expose internals;
- rate and body limits are configured;
- database is not public;
- Nginx adds approved headers;
- VPS firewall exposes only required ports;
- SSH uses secure access;
- logs and backups have restricted access;
- public repository review is completed before publication;
- security checklist passes before launch.

---

# 94. Final Security Principle

The portfolio must demonstrate technical depth without transferring the risk of internal systems into a public environment.

The safest evidence is:

- independently rewritten code;
- synthetic data;
- simplified but accurate architecture;
- verified non-confidential metrics;
- approved screenshots;
- transparent limitations.

Main principle:

> Publish the engineering pattern, not the proprietary implementation.
