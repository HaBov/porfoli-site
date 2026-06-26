# Content and Data Model

## 1. Document Information

**Document:** Content and Data Model
**File:** `10-content-and-data-model.md`
**Project:** Khasandjon Babadzhanov — Software Developer Portfolio
**Version:** 1.0
**Status:** Approved content architecture specification
**Website language:** English
**Documentation language:** Russian

---

## 2. Purpose of This Document

Этот документ определяет структуру данных и контента портфолио.

Он фиксирует:

- основные content entities;
- TypeScript-типы;
- MDX frontmatter schemas;
- project metadata;
- code sample metadata;
- experience data;
- skills taxonomy;
- metrics;
- technologies;
- assets;
- diagrams;
- screenshots;
- related-content relationships;
- confidentiality levels;
- publication states;
- content validation;
- slug rules;
- date handling;
- localization readiness;
- content loading;
- build-time checks;
- consistency rules;
- migration strategy для content schema.

Главная задача документа — сделать контент структурированным, проверяемым и пригодным для повторного использования на разных страницах.

---

# 3. Content Architecture Principles

## 3.1. Single Source of Truth

Каждый факт должен храниться в одном месте.

Например:

- название проекта;
- основной metric;
- technology stack;
- status;
- role;
- dates.

Эти данные не должны вручную дублироваться в:

- Home;
- Projects;
- Project Detail;
- Experience;
- Resume references.

Одинаковый project object должен использоваться во всех представлениях.

---

## 3.2. Structured Metadata and Rich Content

Контент разделяется на два уровня.

### Structured Metadata

Используется для:

- filters;
- sorting;
- cards;
- SEO;
- related content;
- navigation;
- build validation.

### Rich Content

Используется для:

- case studies;
- technical explanations;
- code samples;
- decisions;
- lessons learned;
- diagrams;
- testing sections.

Structured metadata хранится во frontmatter или TypeScript.

Rich content хранится в MDX.

---

## 3.3. Validation Before Rendering

Ошибки контента должны обнаруживаться во время:

- local development;
- tests;
- production build.

Нельзя полагаться только на runtime behavior.

Build должен завершаться ошибкой при:

- duplicate slug;
- missing required field;
- invalid date;
- unknown technology;
- broken related-content reference;
- invalid status;
- published content without required sections;
- missing required asset;
- inconsistent metric.

---

## 3.4. Content Must Be Safe by Default

Каждая сущность должна учитывать:

- confidentiality;
- publication status;
- anonymization;
- asset review;
- code ownership;
- internal identifiers.

Опубликованный контент должен проходить explicit approval.

---

## 3.5. Human-Readable Source

Content files должны оставаться понятными без специальных admin tools.

MDX и TypeScript должны:

- легко читаться;
- легко редактироваться;
- иметь predictable structure;
- хорошо работать с Git history.

---

## 3.6. Stable Identifiers

Relations должны использовать stable IDs или slugs.

Нельзя связывать content entities только по title.

Title может измениться.

Slug и ID должны оставаться стабильными.

---

# 4. Core Content Entities

Основные сущности:

```text
SiteProfile
Project
CodeSample
ExperienceEntry
EducationEntry
SkillGroup
Technology
Metric
Asset
Diagram
Screenshot
TechnicalDecision
ProjectChallenge
ProjectFeature
ContactLink
ResumeDocument
NavigationItem
SEOData
```

---

# 5. Recommended Content Directory

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
├── code/
│   ├── fastapi-service-layer.mdx
│   ├── rbac-permission-check.mdx
│   ├── sqlalchemy-data-model.mdx
│   ├── celery-background-task.mdx
│   ├── pytest-api-workflow.mdx
│   └── typescript-webhook-handler.mdx
│
├── data/
│   ├── profile.ts
│   ├── experience.ts
│   ├── education.ts
│   ├── skills.ts
│   ├── technologies.ts
│   ├── navigation.ts
│   ├── contact-links.ts
│   └── resume.ts
│
├── assets/
│   ├── projects.ts
│   ├── diagrams.ts
│   └── screenshots.ts
│
└── schemas/
    ├── project.schema.ts
    ├── code-sample.schema.ts
    ├── profile.schema.ts
    ├── experience.schema.ts
    ├── technology.schema.ts
    └── asset.schema.ts
```

---

# 6. Shared Primitive Types

```typescript
export type ISODate = `${number}-${number}-${number}`;
export type YearMonth = `${number}-${number}`;
export type Slug = string;
export type ContentId = string;
export type ExternalUrl = `https://${string}`;
```

Эти types улучшают читаемость, но не заменяют runtime validation.

---

# 7. Publication Status

Каждая publishable entity должна иметь status.

```typescript
export type PublicationStatus = "draft" | "review" | "approved" | "published" | "archived";
```

## 7.1. Draft

Контент находится в разработке.

- не отображается в production;
- доступен локально;
- может содержать incomplete sections;
- не добавляется в sitemap.

## 7.2. Review

Контент готов к:

- factual review;
- technical review;
- language review;
- confidentiality review.

Не публикуется автоматически.

## 7.3. Approved

Контент прошел review, но еще не опубликован.

Может использоваться для preview deployment.

## 7.4. Published

Контент доступен публично.

Обязательные требования должны быть полностью выполнены.

## 7.5. Archived

Контент больше не показывается в основных lists, но URL может сохраняться.

Archive не должен автоматически приводить к 404, если страница уже была публичной.

---

# 8. Confidentiality Model

```typescript
export type ConfidentialityLevel = 0 | 1 | 2 | 3;
```

## Level 0 — Public

Разрешено:

- public repository;
- screenshots;
- original source examples;
- live demo;
- architecture.

## Level 1 — Public With Redaction

Разрешено после удаления:

- credentials;
- private identifiers;
- environment details;
- internal values.

## Level 2 — Anonymized Internal Project

Разрешено:

- rewritten code;
- synthetic data;
- simplified architecture;
- anonymized screenshots;
- approved metrics.

## Level 3 — Restricted Summary

Разрешено:

- general problem;
- role;
- high-level result.

Не разрешено:

- technical architecture;
- source examples;
- screenshots;
- detailed internal workflow.

---

## 8.1. Confidentiality Type

```typescript
export type ConfidentialityConfig = {
  level: ConfidentialityLevel;
  repositoryAllowed: boolean;
  screenshotsAllowed: boolean;
  rewrittenCodeAllowed: boolean;
  architectureAllowed: boolean;
  metricsAllowed: boolean;
  publicCompanyNameAllowed: boolean;
  notes?: string;
  reviewedAt?: ISODate;
};
```

---

# 9. Project Status Model

Project business status отличается от publication status.

```typescript
export type ProjectStatus =
  | "internal-production"
  | "production"
  | "deployed"
  | "mvp"
  | "active-development"
  | "maintained"
  | "completed"
  | "demonstration";
```

Display labels должны определяться централизованно.

```typescript
export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  "internal-production": "Internal Production",
  production: "Production",
  deployed: "Deployed",
  mvp: "MVP",
  "active-development": "Active Development",
  maintained: "Maintained",
  completed: "Completed",
  demonstration: "Demonstration Project",
};
```

Нельзя вручную писать разные версии одного status в компонентах.

---

# 10. Project Category Model

```typescript
export type ProjectCategory =
  | "business-application"
  | "backend-platform"
  | "api-integration"
  | "workflow-automation"
  | "security-automation"
  | "data-pipeline"
  | "serverless-application"
  | "production-website"
  | "infrastructure";
```

Display names:

```typescript
export const PROJECT_CATEGORY_LABELS: Record<ProjectCategory, string> = {
  "business-application": "Business Application",
  "backend-platform": "Backend Platform",
  "api-integration": "API Integration",
  "workflow-automation": "Workflow Automation",
  "security-automation": "Security Automation",
  "data-pipeline": "Data Pipeline",
  "serverless-application": "Serverless Application",
  "production-website": "Production Website",
  infrastructure: "Infrastructure",
};
```

Один проект должен иметь:

- одну primary category;
- до двух secondary categories.

---

# 11. Project Tier Model

```typescript
export type ProjectTier = 1 | 2 | 3 | 4;
```

## Tier 1

Flagship case study.

## Tier 2

Supporting case study.

## Tier 3

Project card.

## Tier 4

Backlog или future work.

Tier влияет на:

- required sections;
- Home visibility;
- content depth;
- asset requirements;
- validation rules.

---

# 12. Project Metric Model

```typescript
export type MetricKind = "scale" | "performance" | "business-impact" | "quality" | "coverage";

export type ProjectMetric = {
  id: ContentId;
  value: string;
  label: string;
  context?: string;
  kind: MetricKind;
  featured?: boolean;
  verified: boolean;
  sourceNote?: string;
  displayOrder?: number;
};
```

---

## 12.1. Metric Example

```typescript
const endpointMetric: ProjectMetric = {
  id: "hr-endpoints",
  value: "188+",
  label: "REST API endpoints",
  context: "Across 11 functional modules",
  kind: "scale",
  featured: true,
  verified: true,
  sourceNote: "Counted from backend route inventory",
  displayOrder: 1,
};
```

---

## 12.2. Metric Validation Rules

- `verified` must be `true` for published metrics;
- a project may have only one featured primary metric;
- metric value cannot be empty;
- range formatting must remain consistent;
- approximate numbers must use approved wording;
- percent values require before-and-after evidence;
- duplicate metric IDs are forbidden.

---

## 12.3. Approved Number Formatting

Use:

- `188+`;
- `90K–150K`;
- `1,500`;
- `10–13×`;
- `15–20`;
- `2 years`.

Do not mix:

- `90k`;
- `90 K`;
- `90,000` in one place and `90K` in another without display rule.

Canonical value may be stored separately from display value in future.

---

# 13. Technology Model

Technologies must come from a controlled registry.

```typescript
export type TechnologyCategory =
  | "language"
  | "framework"
  | "database"
  | "orm"
  | "async-processing"
  | "infrastructure"
  | "testing"
  | "integration"
  | "tool"
  | "platform";

export type Technology = {
  id: string;
  name: string;
  shortName?: string;
  category: TechnologyCategory;
  website?: ExternalUrl;
  description?: string;
  featured?: boolean;
  aliases?: string[];
  iconKey?: string;
};
```

---

## 13.1. Technology Registry Example

```typescript
export const technologies: Technology[] = [
  {
    id: "python",
    name: "Python",
    category: "language",
    featured: true,
  },
  {
    id: "fastapi",
    name: "FastAPI",
    category: "framework",
    featured: true,
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "database",
    featured: true,
    aliases: ["Postgres"],
  },
  {
    id: "sqlalchemy",
    name: "SQLAlchemy",
    category: "orm",
  },
];
```

---

## 13.2. Technology Reference Rules

Projects store technology IDs, not display names.

Correct:

```yaml
technologies:
  - python
  - fastapi
  - postgresql
  - sqlalchemy
```

Not recommended:

```yaml
technologies:
  - Python
  - Postgres
  - SQLAlchemy ORM
```

Display name is resolved from registry.

This prevents inconsistent spelling.

---

## 13.3. Unknown Technology Validation

Build fails when content references a technology ID that does not exist.

---

# 14. Project Metadata Type

```typescript
export type ProjectMetadata = {
  id: ContentId;
  title: string;
  publicTitle?: string;
  slug: Slug;
  summary: string;
  shortSummary?: string;

  publicationStatus: PublicationStatus;
  projectStatus: ProjectStatus;
  tier: ProjectTier;

  primaryCategory: ProjectCategory;
  secondaryCategories?: ProjectCategory[];

  role: string;
  teamContext?: string;

  startDate?: YearMonth;
  endDate?: YearMonth;
  ongoing?: boolean;

  featured: boolean;
  priority: number;

  technologies: string[];
  metrics: ProjectMetric[];

  confidentiality: ConfidentialityConfig;

  heroAssetId?: ContentId;
  thumbnailAssetId?: ContentId;
  diagramIds?: ContentId[];
  screenshotIds?: ContentId[];

  relatedCodeSampleIds?: ContentId[];
  relatedProjectIds?: ContentId[];
  relatedExperienceIds?: ContentId[];

  repositoryUrl?: ExternalUrl;
  liveUrl?: ExternalUrl;
  demoUrl?: ExternalUrl;
  apiDocsUrl?: ExternalUrl;

  seo?: SEOData;

  publishedAt?: ISODate;
  updatedAt?: ISODate;
};
```

---

# 15. Full Project Type

```typescript
export type Project = {
  metadata: ProjectMetadata;
  content: {
    executiveSummary: RichContent;
    problem: RichContent;
    usersAndContext?: RichContent;
    contribution: RichContent;
    requirements?: ContentListItem[];
    constraints?: ContentListItem[];
    architecture?: RichContent;
    dataModelOrFlow?: RichContent;
    testing?: RichContent;
    results: RichContent;
    lessons?: RichContent;
    futureImprovements?: ContentListItem[];
    confidentialityNote?: RichContent;
  };
};
```

В реальной MDX implementation rich sections могут определяться headings, но metadata schema должна позволять валидировать required content.

---

# 16. Project Frontmatter Schema

Recommended frontmatter:

```yaml
---
id: "project-internal-hr-platform"
title: "Internal HR Platform"
slug: "internal-hr-platform"

summary: "A multi-module internal platform for employee lifecycle workflows."
shortSummary: "Backend platform for structured HR operations."

publicationStatus: "published"
projectStatus: "internal-production"
tier: 1

primaryCategory: "business-application"
secondaryCategories:
  - "backend-platform"

role: "Backend Developer"
teamContext: "Backend-focused contribution with frontend collaboration."

startDate: "2025-11"
ongoing: true

featured: true
priority: 1

technologies:
  - "python"
  - "fastapi"
  - "postgresql"
  - "sqlalchemy"
  - "redis"
  - "celery"
  - "docker"

metrics:
  - id: "hr-endpoints"
    value: "188+"
    label: "REST API endpoints"
    context: "Across 11 functional modules"
    kind: "scale"
    featured: true
    verified: true

  - id: "hr-smoke-tests"
    value: "15–20"
    label: "Release smoke tests"
    context: "Critical backend workflows"
    kind: "quality"
    verified: true

confidentiality:
  level: 2
  repositoryAllowed: false
  screenshotsAllowed: true
  rewrittenCodeAllowed: true
  architectureAllowed: true
  metricsAllowed: true
  publicCompanyNameAllowed: true
  reviewedAt: "2026-07-01"

heroAssetId: "asset-hr-platform-hero"
thumbnailAssetId: "asset-hr-platform-thumbnail"

diagramIds:
  - "diagram-hr-system-context"
  - "diagram-hr-rbac-flow"

screenshotIds:
  - "screenshot-hr-dashboard"
  - "screenshot-hr-employees"

relatedCodeSampleIds:
  - "code-fastapi-service-layer"
  - "code-rbac-permission-check"
  - "code-celery-background-task"

relatedExperienceIds:
  - "experience-fnf-global"

publishedAt: "2026-07-01"
updatedAt: "2026-07-01"
---
```

---

# 17. Project Frontmatter Validation

Published Tier 1 project must include:

- `id`;
- `title`;
- `slug`;
- `summary`;
- `publicationStatus`;
- `projectStatus`;
- `tier`;
- `primaryCategory`;
- `role`;
- `technologies`;
- at least one metric;
- confidentiality config;
- at least one diagram;
- at least two code sample references;
- `publishedAt`;
- `updatedAt`.

Tier 2 project requires:

- one technical asset;
- at least one code sample or repository;
- one verified result.

Tier 3 project requires only metadata and summary.

---

# 18. Required Project Content Sections

Build-time MDX validation should verify headings for Tier 1.

Required Tier 1 headings:

```text
Executive Summary
The Problem
Users and Business Context
My Role and Contributions
Requirements and Constraints
System Architecture
Data Model
or
Data Flow
Key Features
Technical Decisions
Selected Code
Testing and Validation
Challenges and Trade-offs
Results and Impact
Lessons Learned
Future Improvements
Confidentiality
```

Exact matching can use normalized heading IDs.

---

## 18.1. Flexible Heading Names

Approved equivalents:

```text
The Problem
Problem

System Architecture
Architecture

Results and Impact
Results

My Role and Contributions
My Contribution
```

Validation should support approved aliases without accepting arbitrary titles.

---

# 19. Code Sample Category Model

```typescript
export type CodeSampleCategory =
  | "api-design"
  | "service-layer"
  | "data-modeling"
  | "authorization"
  | "background-processing"
  | "testing"
  | "integration"
  | "infrastructure"
  | "migration";
```

---

# 20. Code Sample Complexity

```typescript
export type CodeSampleComplexity = "fundamental" | "intermediate" | "production-pattern";
```

Display labels:

- Fundamental;
- Intermediate;
- Production Pattern.

Avoid:

- Expert;
- Elite;
- Advanced Architecture.

---

# 21. Code Sample Type

```typescript
export type CodeSampleMetadata = {
  id: ContentId;
  title: string;
  slug: Slug;
  summary: string;

  publicationStatus: PublicationStatus;
  category: CodeSampleCategory;
  complexity: CodeSampleComplexity;

  language: string;
  framework?: string;
  relatedTechnologyIds: string[];

  relatedProjectIds: ContentId[];
  featured: boolean;
  priority: number;

  filename?: string;
  sourcePath?: string;
  lineCount?: number;
  estimatedReadingMinutes?: number;

  portfolioRewritten: boolean;
  confidentialityReviewed: boolean;

  repositoryUrl?: ExternalUrl;
  liveDemoUrl?: ExternalUrl;

  seo?: SEOData;

  publishedAt?: ISODate;
  updatedAt?: ISODate;
};
```

---

# 22. Code Sample Frontmatter Example

```yaml
---
id: "code-rbac-permission-check"
title: "Permission-Based FastAPI Dependency"
slug: "rbac-permission-check"
summary: "A reusable FastAPI dependency for enforcing permission-based access."

publicationStatus: "published"
category: "authorization"
complexity: "production-pattern"

language: "python"
framework: "fastapi"

relatedTechnologyIds:
  - "python"
  - "fastapi"
  - "pydantic"

relatedProjectIds:
  - "project-internal-hr-platform"

featured: true
priority: 1

filename: "permissions.py"
lineCount: 48
estimatedReadingMinutes: 5

portfolioRewritten: true
confidentialityReviewed: true

publishedAt: "2026-07-01"
updatedAt: "2026-07-01"
---
```

---

# 23. Required Code Sample Sections

Published code sample requires:

```text
Context
Problem
Code
How It Works
Design Principles
Error Handling
Testing
Trade-offs
Related Project
```

Optional:

- Alternative Implementation;
- Production Considerations;
- Further Improvements.

---

# 24. Code Language Registry

Code sample language must use controlled IDs.

```typescript
export type CodeLanguage =
  | "python"
  | "typescript"
  | "javascript"
  | "sql"
  | "json"
  | "yaml"
  | "bash"
  | "dockerfile"
  | "nginx"
  | "html"
  | "css";
```

Each ID maps to syntax highlighter grammar.

```typescript
export const CODE_LANGUAGE_LABELS: Record<CodeLanguage, string> = {
  python: "Python",
  typescript: "TypeScript",
  javascript: "JavaScript",
  sql: "SQL",
  json: "JSON",
  yaml: "YAML",
  bash: "Bash",
  dockerfile: "Dockerfile",
  nginx: "Nginx",
  html: "HTML",
  css: "CSS",
};
```

---

# 25. Experience Entry Model

```typescript
export type EmploymentType =
  | "full-time"
  | "part-time"
  | "contract"
  | "internship"
  | "hybrid"
  | "remote";

export type ExperienceEntry = {
  id: ContentId;
  company: string;
  publicCompanyName?: string;
  role: string;
  location: string;
  workMode?: "onsite" | "hybrid" | "remote";

  startDate: YearMonth;
  endDate?: YearMonth;
  current: boolean;

  summary: string;
  contributions: string[];
  transferableSkills?: string[];

  technologyIds?: string[];
  relatedProjectIds?: ContentId[];

  companyUrl?: ExternalUrl;
  displayOrder: number;
};
```

---

# 26. Experience Data Example

```typescript
export const experience: ExperienceEntry[] = [
  {
    id: "experience-fnf-global",
    company: "FNF GLOBAL Inc",
    role: "Backend Developer / System Administrator",
    location: "Tajikistan",
    workMode: "hybrid",
    startDate: "2025-11",
    current: true,
    summary:
      "Developing internal business systems and maintaining integrations and infrastructure supporting daily operations.",
    contributions: [
      "Built backend modules for an internal HR platform.",
      "Developed high-volume API and file-processing integrations.",
      "Automated employee access lifecycle workflows.",
      "Created release smoke-test scripts.",
    ],
    technologyIds: ["python", "fastapi", "postgresql", "redis", "celery", "docker", "linux"],
    relatedProjectIds: [
      "project-internal-hr-platform",
      "project-call-recording-archive",
      "project-access-lifecycle-automation",
      "project-video-delivery-pipeline",
    ],
    displayOrder: 1,
  },
];
```

---

# 27. Experience Validation Rules

- only one entry may have `current: true` unless multiple current roles are intentional;
- current entry must not have `endDate`;
- completed entry must have `endDate`;
- `startDate` cannot be after `endDate`;
- related projects must exist;
- technology IDs must exist;
- role must match approved official title;
- dates must match Resume.

---

# 28. Education Model

```typescript
export type EducationEntry = {
  id: ContentId;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startYear: number;
  endYear: number;
  description?: string;
  displayOrder: number;
};
```

Example:

```typescript
export const education: EducationEntry[] = [
  {
    id: "education-rtsu-applied-informatics",
    institution: "Russian-Tajik Slavonic University",
    degree: "B.Sc.",
    fieldOfStudy: "Applied Informatics",
    location: "Dushanbe, Tajikistan",
    startYear: 2019,
    endYear: 2023,
    displayOrder: 1,
  },
];
```

---

# 29. Language Proficiency Model

```typescript
export type LanguageLevel = "native" | "professional" | "b2" | "b1" | "a2" | "a1";

export type LanguageSkill = {
  id: string;
  language: string;
  level: LanguageLevel;
  label: string;
  displayOrder: number;
};
```

Example:

```typescript
export const languages: LanguageSkill[] = [
  {
    id: "language-tajik",
    language: "Tajik",
    level: "native",
    label: "Native",
    displayOrder: 1,
  },
  {
    id: "language-russian",
    language: "Russian",
    level: "professional",
    label: "Professional working proficiency",
    displayOrder: 2,
  },
  {
    id: "language-english",
    language: "English",
    level: "b2",
    label: "B2",
    displayOrder: 3,
  },
];
```

Не использовать visual progress bars.

---

# 30. Skill Group Model

```typescript
export type SkillGroup = {
  id: ContentId;
  title: string;
  summary: string;
  technologyIds: string[];
  relatedProjectIds?: ContentId[];
  relatedCodeSampleIds?: ContentId[];
  displayOrder: number;
  featured?: boolean;
};
```

---

## 30.1. Skill Groups

Approved groups:

1. Backend Development;
2. Data and Processing;
3. Integrations and Automation;
4. Testing and Reliability;
5. Infrastructure and Deployment;
6. TypeScript and Serverless.

---

## 30.2. Skill Group Example

```typescript
export const skillGroups: SkillGroup[] = [
  {
    id: "skills-backend",
    title: "Backend Development",
    summary:
      "Building typed REST APIs, business logic, authentication, authorization, and modular application workflows.",
    technologyIds: ["python", "fastapi", "django", "pydantic", "sqlalchemy"],
    relatedProjectIds: ["project-internal-hr-platform", "project-multilingual-school-website"],
    relatedCodeSampleIds: ["code-fastapi-service-layer", "code-rbac-permission-check"],
    displayOrder: 1,
    featured: true,
  },
];
```

---

# 31. Site Profile Model

```typescript
export type SiteProfile = {
  fullName: string;
  shortName: string;
  initials: string;

  primaryTitle: string;
  professionalDescriptor: string;

  heroEyebrow: string;
  heroHeading: string;
  heroDescription: string;

  location: string;
  relocationStatus: string;
  availabilityStatus: string;

  email: string;
  phone?: string;

  githubUrl?: ExternalUrl;
  linkedinUrl?: ExternalUrl;
  portfolioUrl?: ExternalUrl;

  aboutShort: string;
  aboutFull: string[];

  currentFocus?: string[];
  currentlyExploring?: string[];

  primaryCTA: CTAConfig;
  secondaryCTA: CTAConfig;
};
```

---

# 32. Site Profile Example

```typescript
export const profile: SiteProfile = {
  fullName: "Khasandjon Babadzhanov",
  shortName: "Khasandjon",
  initials: "KB",

  primaryTitle: "Software Developer",
  professionalDescriptor:
    "Backend-focused Software Developer building business applications, APIs, integrations, and automation.",

  heroEyebrow: "SOFTWARE DEVELOPER · PYTHON · BACKEND SYSTEMS",
  heroHeading: "I build reliable backend systems for real business operations.",
  heroDescription:
    "Backend-focused Software Developer working with Python, PostgreSQL, TypeScript, Docker, and Linux. I design APIs, business applications, integrations, and automated workflows — from requirements and data models to deployment and production validation.",

  location: "Tajikistan",
  relocationStatus: "Open to relocation and international opportunities",
  availabilityStatus: "Open to Software Developer opportunities",

  email: "bobojonovhasanjon@gmail.com",
  phone: "+992 93 733-2012",

  githubUrl: "https://github.com/HaBov",

  aboutShort:
    "Software Developer from Tajikistan with a backend focus and a background in technical support, system analysis, business-process automation, and production infrastructure.",

  aboutFull: ["First paragraph...", "Second paragraph..."],

  currentlyExploring: [
    "Deeper TypeScript",
    "React",
    "CI/CD",
    "Cloud infrastructure",
    "Open-source contribution",
  ],

  primaryCTA: {
    label: "View Projects",
    href: "/projects",
  },

  secondaryCTA: {
    label: "Download Resume",
    href: "/resume",
  },
};
```

---

# 33. CTA Model

```typescript
export type CTAConfig = {
  label: string;
  href: string;
  external?: boolean;
  download?: boolean;
  ariaLabel?: string;
};
```

CTA text must use approved wording.

---

# 34. Contact Link Model

```typescript
export type ContactLinkType = "email" | "github" | "linkedin" | "resume" | "website";

export type ContactLink = {
  id: ContentId;
  type: ContactLinkType;
  label: string;
  value?: string;
  href: string;
  external: boolean;
  enabled: boolean;
  displayOrder: number;
};
```

Disabled links should not render as inactive UI.

If LinkedIn is not ready, it should be absent rather than shown as disabled.

---

# 35. Resume Document Model

```typescript
export type ResumeDocument = {
  id: ContentId;
  title: string;
  filename: string;
  publicPath: string;
  language: "en" | "ru";
  format: "pdf";
  version: string;
  updatedAt: ISODate;
  active: boolean;
  description: string;
};
```

Example:

```typescript
export const activeResume: ResumeDocument = {
  id: "resume-software-developer-en",
  title: "Software Developer Resume",
  filename: "Khasandjon_Babadzhanov_Software_Developer_Resume.pdf",
  publicPath: "/downloads/Khasandjon_Babadzhanov_Software_Developer_Resume.pdf",
  language: "en",
  format: "pdf",
  version: "1.0",
  updatedAt: "2026-07-01",
  active: true,
  description:
    "A concise overview of experience, technical skills, selected projects, education, and language proficiency.",
};
```

Only one general resume should be active per language.

---

# 36. Navigation Model

```typescript
export type NavigationItem = {
  id: string;
  label: string;
  href: string;
  exact?: boolean;
  external?: boolean;
  displayOrder: number;
  mobileLabel?: string;
};
```

Approved primary navigation:

```typescript
export const primaryNavigation: NavigationItem[] = [
  {
    id: "nav-projects",
    label: "Projects",
    href: "/projects",
    displayOrder: 1,
  },
  {
    id: "nav-code",
    label: "Code Samples",
    href: "/code",
    displayOrder: 2,
  },
  {
    id: "nav-experience",
    label: "Experience",
    href: "/experience",
    displayOrder: 3,
  },
  {
    id: "nav-about",
    label: "About",
    href: "/about",
    displayOrder: 4,
  },
  {
    id: "nav-contact",
    label: "Contact",
    href: "/contact",
    displayOrder: 5,
  },
];
```

Resume remains a separate CTA.

---

# 37. Asset Model

```typescript
export type AssetType = "image" | "screenshot" | "diagram" | "video" | "document";

export type AssetReviewStatus = "unreviewed" | "needs-anonymization" | "approved" | "rejected";

export type ProjectAsset = {
  id: ContentId;
  type: AssetType;

  title: string;
  description?: string;
  alt: string;

  src: string;
  width?: number;
  height?: number;
  mimeType?: string;

  projectId?: ContentId;
  codeSampleId?: ContentId;

  reviewStatus: AssetReviewStatus;
  anonymized: boolean;
  syntheticData: boolean;
  containsText: boolean;

  caption?: string;
  credit?: string;

  lightThemeSrc?: string;
  darkThemeSrc?: string;

  createdAt?: ISODate;
  updatedAt?: ISODate;
};
```

---

# 38. Screenshot Model

```typescript
export type Screenshot = ProjectAsset & {
  type: "screenshot";
  screenType: "desktop" | "tablet" | "mobile" | "admin" | "dashboard" | "feature";
  browserFrame: boolean;
  containsPersonalData: boolean;
  approvedForPublicUse: boolean;
};
```

Published screenshot requires:

- `approvedForPublicUse: true`;
- `reviewStatus: "approved"`;
- `containsPersonalData: false`;
- safe alt text;
- correct dimensions.

---

# 39. Diagram Model

```typescript
export type DiagramType =
  | "system-context"
  | "container"
  | "sequence"
  | "data-flow"
  | "state"
  | "permission-flow"
  | "deployment";

export type Diagram = ProjectAsset & {
  type: "diagram";
  diagramType: DiagramType;
  sourceFormat: "mermaid" | "svg" | "react";
  sourcePath?: string;
  textDescription: string;
  legend?: DiagramLegendItem[];
};
```

---

## 39.1. Diagram Legend

```typescript
export type DiagramLegendItem = {
  id: string;
  label: string;
  description?: string;
  symbol: string;
};
```

Meaning must not depend only on color.

---

# 40. SEO Data Model

```typescript
export type SEOData = {
  title?: string;
  description?: string;
  canonicalPath?: string;
  noIndex?: boolean;

  openGraphTitle?: string;
  openGraphDescription?: string;
  openGraphImageId?: ContentId;

  keywords?: string[];
};
```

---

## 40.1. SEO Validation

Published content requires:

- title;
- description;
- canonical path;
- Open Graph fallback;
- valid noIndex behavior.

Description recommended length:

- 120–160 characters.

Keyword list must remain concise and factual.

---

# 41. Technical Decision Model

Technical decisions may live in MDX, but a structured model can support future rendering.

```typescript
export type TechnicalDecision = {
  id: ContentId;
  title: string;
  context: string;
  optionsConsidered?: string[];
  selectedApproach: string;
  reasoning: string;
  tradeoffs?: string[];
  relatedTechnologyIds?: string[];
};
```

---

# 42. Project Challenge Model

```typescript
export type ProjectChallenge = {
  id: ContentId;
  title: string;
  description: string;
  whyItMattered: string;
  approach: string;
  result?: string;
  remainingLimitation?: string;
  status?: "resolved" | "partially-resolved" | "ongoing";
};
```

---

# 43. Project Feature Model

```typescript
export type ProjectFeature = {
  id: ContentId;
  title: string;
  description: string;
  technologyIds?: string[];
  screenshotId?: ContentId;
  displayOrder: number;
};
```

Features should not duplicate project metadata.

---

# 44. Content List Item

```typescript
export type ContentListItem = {
  id?: ContentId;
  title?: string;
  description: string;
  technologyIds?: string[];
};
```

Used for:

- requirements;
- constraints;
- future improvements;
- testing scenarios;
- lessons.

---

# 45. Related Content Model

Relations should be bidirectionally validated.

```typescript
export type RelatedContentReference = {
  type: "project" | "code-sample" | "experience";
  id: ContentId;
  label?: string;
};
```

Example:

```typescript
const relation: RelatedContentReference = {
  type: "code-sample",
  id: "code-rbac-permission-check",
};
```

---

## 45.1. Relation Validation

If a project references a code sample:

- code sample must exist;
- code sample should reference the project;
- unpublished relation should not appear publicly;
- archived content should be handled intentionally.

Build should warn or fail on one-way inconsistent relationships.

---

# 46. Slug Rules

Slug must:

- use lowercase;
- use ASCII characters;
- use hyphens;
- not start or end with a hyphen;
- not include dates;
- not include company-sensitive names;
- remain stable after publication.

Valid:

```text
internal-hr-platform
rbac-permission-check
video-delivery-pipeline
```

Invalid:

```text
Internal_HR_Platform
project-01-final
fnf-hr-secret
myProject
```

---

## 46.1. Slug Pattern

```typescript
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
```

---

## 46.2. Slug Changes

Changing a published slug requires:

- permanent redirect;
- sitemap update;
- canonical update;
- internal link update;
- analytics continuity check.

---

# 47. Content ID Rules

IDs must be globally unique.

Recommended prefixes:

```text
project-
code-
experience-
education-
asset-
diagram-
screenshot-
skills-
resume-
```

Example:

```text
project-internal-hr-platform
code-celery-background-task
diagram-hr-system-context
```

IDs should not be generated from database sequence.

They should remain stable in source control.

---

# 48. Date Model

## 48.1. Project Dates

Use:

```text
YYYY-MM
```

Example:

```text
2025-11
```

## 48.2. Publication Dates

Use:

```text
YYYY-MM-DD
```

## 48.3. Display Formatting

Display formatter converts:

```text
2025-11 → November 2025
```

The content source should not store localized display text.

---

## 48.4. Ongoing Content

Use:

```typescript
ongoing: true;
endDate: undefined;
```

Do not store `"Present"` as date value.

---

# 49. Sorting Rules

## 49.1. Projects

Default sorting:

1. featured;
2. priority ascending;
3. tier ascending;
4. updated date descending.

## 49.2. Experience

Sort by:

1. current role;
2. start date descending.

## 49.3. Code Samples

Sort by:

1. featured;
2. priority;
3. published date descending.

## 49.4. Technologies

Sort by:

- curated order within SkillGroup;
- not alphabetical by default.

---

# 50. Filtering Rules

## Projects Filters

Filter by:

- category;
- technology;
- status;
- tier, internal only.

## Code Filters

Filter by:

- language;
- category;
- related project;
- complexity.

## Published Content Rule

Filters must operate only on public published content.

Draft counts must not appear in production UI.

---

# 51. Search Readiness

Search is not required in Version 1, but data model should support it.

Search index fields may include:

- title;
- summary;
- categories;
- technologies;
- headings;
- project status;
- code language;
- concepts.

Do not index:

- private notes;
- confidentiality review comments;
- source notes for metrics;
- internal asset paths.

---

# 52. Content Loader Architecture

Recommended module structure:

```text
apps/web/src/lib/content/
├── index.ts
├── projects.ts
├── code-samples.ts
├── experience.ts
├── skills.ts
├── technologies.ts
├── assets.ts
├── relations.ts
├── dates.ts
├── slugs.ts
├── validation.ts
└── errors.ts
```

---

# 53. Project Loader API

```typescript
export type ProjectQuery = {
  publicationStatus?: PublicationStatus;
  featured?: boolean;
  category?: ProjectCategory;
  technologyId?: string;
  tier?: ProjectTier;
};

export async function getProjects(query?: ProjectQuery): Promise<ProjectMetadata[]>;

export async function getProjectBySlug(slug: string): Promise<Project | null>;

export async function getFeaturedProjects(): Promise<ProjectMetadata[]>;

export async function getRelatedProjects(projectId: ContentId): Promise<ProjectMetadata[]>;
```

---

# 54. Code Sample Loader API

```typescript
export type CodeSampleQuery = {
  publicationStatus?: PublicationStatus;
  featured?: boolean;
  category?: CodeSampleCategory;
  language?: CodeLanguage;
  projectId?: ContentId;
};

export async function getCodeSamples(query?: CodeSampleQuery): Promise<CodeSampleMetadata[]>;

export async function getCodeSampleBySlug(slug: string): Promise<CodeSample | null>;
```

---

# 55. Content Error Types

```typescript
export class ContentValidationError extends Error {
  constructor(
    message: string,
    public readonly filePath?: string,
    public readonly field?: string,
  ) {
    super(message);
    this.name = "ContentValidationError";
  }
}

export class ContentNotFoundError extends Error {
  constructor(public readonly contentId: string) {
    super(`Content not found: ${contentId}`);
    this.name = "ContentNotFoundError";
  }
}

export class DuplicateSlugError extends Error {
  constructor(public readonly slug: string) {
    super(`Duplicate slug detected: ${slug}`);
    this.name = "DuplicateSlugError";
  }
}
```

Build output should identify:

- file;
- field;
- invalid value;
- expected rule.

---

# 56. Runtime Validation

Recommended schema library:

- Zod or equivalent runtime schema validator.

Example:

```typescript
import { z } from "zod";

export const projectMetricSchema = z.object({
  id: z.string().min(1),
  value: z.string().min(1),
  label: z.string().min(1),
  context: z.string().optional(),
  kind: z.enum(["scale", "performance", "business-impact", "quality", "coverage"]),
  featured: z.boolean().optional(),
  verified: z.boolean(),
  sourceNote: z.string().optional(),
  displayOrder: z.number().int().nonnegative().optional(),
});
```

---

# 57. Project Schema Example

```typescript
export const projectMetadataSchema = z.object({
  id: z.string().startsWith("project-"),
  title: z.string().min(3).max(100),
  publicTitle: z.string().optional(),
  slug: z.string().regex(SLUG_PATTERN),

  summary: z.string().min(30).max(240),
  shortSummary: z.string().max(120).optional(),

  publicationStatus: z.enum(["draft", "review", "approved", "published", "archived"]),

  projectStatus: z.enum([
    "internal-production",
    "production",
    "deployed",
    "mvp",
    "active-development",
    "maintained",
    "completed",
    "demonstration",
  ]),

  tier: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),

  primaryCategory: z.string(),
  secondaryCategories: z.array(z.string()).max(2).optional(),

  role: z.string().min(2).max(80),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  ongoing: z.boolean().optional(),

  featured: z.boolean(),
  priority: z.number().int().nonnegative(),

  technologies: z.array(z.string()).min(1),
  metrics: z.array(projectMetricSchema),

  confidentiality: confidentialitySchema,

  relatedCodeSampleIds: z.array(z.string()).optional(),
  relatedProjectIds: z.array(z.string()).optional(),
  relatedExperienceIds: z.array(z.string()).optional(),

  publishedAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
```

Additional conditional validation should be implemented with `superRefine`.

---

# 58. Conditional Validation Rules

## 58.1. Ongoing Project

If:

```typescript
ongoing === true;
```

Then:

- `endDate` must be absent.

## 58.2. Published Project

If:

```typescript
publicationStatus === "published";
```

Then required:

- publishedAt;
- updatedAt;
- approved confidentiality review;
- verified metrics;
- valid SEO metadata.

## 58.3. Tier 1

Requires:

- at least one diagram;
- at least two code samples;
- at least one metric;
- related experience;
- hero asset or approved design fallback.

## 58.4. Repository URL

Allowed only when:

```typescript
confidentiality.repositoryAllowed === true;
```

## 58.5. Screenshots

Allowed only when:

```typescript
confidentiality.screenshotsAllowed === true;
```

---

# 59. Cross-Entity Validation

Build validation must check:

- every technology reference exists;
- every project relation exists;
- every code sample relation exists;
- every asset ID exists;
- every diagram belongs to correct project;
- every experience project relation is valid;
- every published asset is approved;
- every featured metric is verified;
- only one primary featured metric per project;
- no duplicate IDs;
- no duplicate slugs;
- no broken URLs;
- no unpublished related content rendered publicly.

---

# 60. Metric Consistency Registry

For highly repeated metrics, use a shared registry.

```typescript
export const portfolioMetrics = {
  hrEndpoints: {
    value: "188+",
    label: "REST API endpoints",
    context: "Across 11 functional modules",
  },
  archiveVolume: {
    value: "90K–150K",
    label: "Recordings processed per cycle",
  },
  accessGroups: {
    value: "1,500",
    label: "Corporate groups automated",
  },
  videoGrowth: {
    value: "10–13×",
    label: "Pipeline throughput growth",
  },
} as const;
```

Projects can reference these metrics by ID.

This prevents inconsistency between:

- Home;
- project cards;
- project pages;
- Open Graph content;
- resume-related components.

---

# 61. Content Canonicalization Rules

Canonical spelling:

- FastAPI;
- PostgreSQL;
- SQLAlchemy;
- TypeScript;
- JavaScript;
- Cloudflare Workers;
- Google Drive API;
- RingCentral;
- PeopleForce;
- Docker Compose;
- Nginx;
- Gunicorn;
- Pytest.

Incorrect variants should fail lint or be caught during review:

- Fast API;
- PostgresSQL;
- Type Script;
- Docker-Compose;
- NGinx.

---

# 62. Content Linting

Content linting should check:

- forbidden marketing phrases;
- inconsistent technology names;
- invalid heading order;
- missing alt text;
- raw external URLs in body;
- unapproved words such as `expert` or `senior`;
- duplicated headings;
- overly long title;
- empty paragraphs;
- trailing whitespace;
- broken anchors.

---

## 62.1. Forbidden Claim List

Potentially blocked terms:

```text
world-class
cutting-edge
enterprise-grade
expert
senior engineer
highly scalable
massive scale
best-in-class
revolutionary
```

These words may require explicit manual approval rather than automatic rejection in all contexts.

---

# 63. Confidentiality Linting

Static checks should search for:

- private IP ranges;
- localhost references in public content;
- API key patterns;
- bearer tokens;
- email addresses not on allowlist;
- phone numbers not on allowlist;
- internal domain patterns;
- environment variable values;
- passwords;
- private keys.

Examples of suspicious patterns:

```text
10.x.x.x
192.168.x.x
172.16.x.x
Bearer ey...
-----BEGIN PRIVATE KEY-----
postgresql://user:password@
```

Automated scanning does not replace manual review.

---

# 64. Asset Validation

Each referenced asset must satisfy:

- file exists;
- supported format;
- dimensions present;
- alt text present;
- review approved;
- no forbidden metadata;
- no personal data;
- correct project association.

Build should warn about:

- oversized images;
- unoptimized PNG;
- missing WebP/AVIF version;
- screenshots larger than required;
- diagram with fixed white background.

---

# 65. Image Metadata Rules

Before publication:

- strip EXIF metadata;
- remove geolocation;
- remove device identifiers;
- confirm filename is safe;
- verify no hidden layers contain sensitive text.

---

# 66. Content Relationships

## 66.1. Project to Code Samples

One project can reference multiple samples.

One code sample can reference multiple projects when pattern is genuinely shared.

## 66.2. Project to Experience

Project links to the role under which it was created.

## 66.3. Project to Project

Use for:

- related domain;
- similar architecture;
- next recommended case study.

## 66.4. Skill to Evidence

Every featured skill group should link to:

- at least one project;
- preferably one code sample.

---

# 67. Related Content Scoring

Related project selection can use manual priority.

```typescript
export type RelatedProjectRule = {
  projectId: ContentId;
  relatedProjectId: ContentId;
  score: number;
  reason: "shared-technology" | "shared-domain" | "shared-pattern" | "curated";
};
```

For Version 1 manual curated relations are sufficient.

No recommendation algorithm is required.

---

# 68. Homepage Content Model

Homepage should not hardcode project data.

```typescript
export type HomepageContent = {
  hero: {
    eyebrow: string;
    heading: string;
    description: string;
  };
  featuredProjectIds: ContentId[];
  featuredMetricIds: ContentId[];
  featuredSkillGroupIds: ContentId[];
  featuredCodeSampleIds: ContentId[];
  contactCTA: CTAConfig;
};
```

Example:

```typescript
export const homepageContent: HomepageContent = {
  hero: {
    eyebrow: profile.heroEyebrow,
    heading: profile.heroHeading,
    description: profile.heroDescription,
  },
  featuredProjectIds: [
    "project-internal-hr-platform",
    "project-call-recording-archive",
    "project-access-lifecycle-automation",
    "project-video-delivery-pipeline",
  ],
  featuredMetricIds: [
    "metric-hr-endpoints",
    "metric-archive-volume",
    "metric-access-groups",
    "metric-video-growth",
  ],
  featuredSkillGroupIds: [
    "skills-backend",
    "skills-data",
    "skills-integrations",
    "skills-testing",
    "skills-infrastructure",
    "skills-typescript",
  ],
  featuredCodeSampleIds: [
    "code-fastapi-service-layer",
    "code-rbac-permission-check",
    "code-celery-background-task",
    "code-pytest-api-workflow",
  ],
  contactCTA: {
    label: "Contact Me",
    href: "/contact",
  },
};
```

---

# 69. Contact Form Data Model

Frontend request:

```typescript
export type ContactFormInput = {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;

  sourcePage?: string;
  honeypot?: string;
  formStartedAt: string;
};
```

Response:

```typescript
export type ContactFormResponse =
  | {
      success: true;
      message: string;
      requestId: string;
    }
  | {
      success: false;
      error: {
        code: "VALIDATION_ERROR" | "RATE_LIMITED" | "DELIVERY_FAILED" | "UNKNOWN_ERROR";
        message: string;
        requestId?: string;
        fields?: Record<string, string>;
      };
    };
```

Full message body must not be stored in frontend analytics or logs.

---

# 70. Demo API Data Model

Synthetic demo entities:

```typescript
export type DemoDepartment = {
  id: string;
  name: string;
  code: string;
  active: boolean;
};

export type DemoEmployee = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  departmentId: string;
  status: "active" | "onboarding" | "offboarding";
  createdAt: string;
  updatedAt: string;
};

export type DemoAuditEvent = {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  actor: string;
  timestamp: string;
};
```

All demo identities must be fictional.

---

# 71. Demo Data Rules

Synthetic records must not resemble actual employees too closely.

Use clearly fictional data such as:

```text
Alex Morgan
Jordan Lee
Taylor Smith
Demo Operations
Example Department
```

Avoid:

- current employee names;
- exact real departments if sensitive;
- real email domains;
- real phone numbers.

Use domains reserved for examples:

```text
example.com
example.org
```

---

# 72. Content Versioning

Each published content file should include:

- publishedAt;
- updatedAt;
- optional contentVersion.

```typescript
contentVersion: "1.0";
```

Content version changes when:

- major metric changes;
- architecture significantly updated;
- project status changes;
- substantial code sample update.

Minor typo fixes do not require visible version increment.

---

# 73. Updated Date Rules

Update `updatedAt` when:

- technical content changes;
- status changes;
- metric changes;
- new diagram added;
- code sample changed;
- major wording changes alter meaning.

Do not update date for:

- formatting-only change;
- build tool change;
- invisible metadata cleanup.

---

# 74. Archive Strategy

Archived project:

- removed from main project grid;
- may remain accessible at original URL;
- shows archive notice;
- no longer marked featured;
- excluded from current homepage;
- may remain in historical Experience context.

---

# 75. Draft Preview Rules

Draft content should be available only:

- in local development;
- in authenticated preview;
- or through preview deployment.

Draft route must have:

```text
noindex
```

Draft content must never appear in:

- sitemap;
- project counts;
- production filters;
- related-content cards.

---

# 76. Content Migration Strategy

When schema changes:

1. update TypeScript type;
2. update runtime schema;
3. create migration script if many files are affected;
4. update content files;
5. run validation;
6. update documentation;
7. commit schema and content changes together.

Do not temporarily support multiple ambiguous schema versions without a clear migration plan.

---

# 77. Schema Version

Recommended root configuration:

```typescript
export const CONTENT_SCHEMA_VERSION = 1;
```

Frontmatter may optionally contain:

```yaml
schemaVersion: 1
```

This becomes useful when content volume increases.

---

# 78. Localization Readiness

Version 1 uses English only.

Data model should still avoid storing UI labels directly where possible.

Examples:

- status stores `internal-production`;
- UI resolves `Internal Production`.

Future Russian localization may add:

```text
content/en/
content/ru/
```

or localized fields.

Localization is not part of Version 1.

---

# 79. SEO Content Generation

Project metadata should produce:

- page title;
- meta description;
- Open Graph title;
- Open Graph description;
- canonical URL;
- structured data.

Fallback:

```typescript
function getProjectSEO(project: ProjectMetadata): SEOData {
  return {
    title: project.seo?.title ?? `${project.title} | Khasandjon Babadzhanov`,
    description: project.seo?.description ?? project.summary,
    canonicalPath: project.seo?.canonicalPath ?? `/projects/${project.slug}`,
  };
}
```

---

# 80. Structured Data Mapping

## Person

Generated from SiteProfile.

## CreativeWork

Generated from Project.

## SoftwareSourceCode

Can be generated for public code samples.

## BreadcrumbList

Generated from route and title.

Structured data must not include:

- private company information;
- unverified dates;
- confidential repository URLs.

---

# 81. Sitemap Data

Include only:

- published pages;
- active projects;
- published code samples;
- Resume page;
- Privacy;
- standard static pages.

Exclude:

- API;
- drafts;
- preview routes;
- archived content if intentionally noindex;
- development routes.

---

# 82. Content Build Pipeline

Recommended sequence:

```text
Read static data
→ Parse MDX frontmatter
→ Validate schemas
→ Validate IDs and slugs
→ Validate technology references
→ Validate relations
→ Validate assets
→ Validate confidentiality
→ Validate required headings
→ Generate content indexes
→ Generate routes
→ Build application
```

Any critical failure should stop build.

---

# 83. Generated Content Index

Build may produce a generated index:

```text
.generated/
├── projects.json
├── code-samples.json
├── relations.json
├── search-index.json
└── sitemap-data.json
```

Generated files should not become the primary editable source.

---

# 84. Content Validation Command

Recommended command:

```bash
pnpm content:validate
```

Should perform:

- schema validation;
- relation validation;
- slug validation;
- asset validation;
- required section checks;
- confidentiality checks;
- broken link checks.

---

# 85. Content Report Command

Recommended:

```bash
pnpm content:report
```

Output example:

```text
Projects
--------
Published: 4
Approved: 1
Draft: 2

Code Samples
------------
Published: 6
Draft: 2

Warnings
--------
1 project has no screenshot
2 code samples have no test section
1 asset requires anonymization
```

---

# 86. Missing Content Report

A dedicated report should list:

- missing case-study sections;
- missing code samples;
- missing diagrams;
- unverified metrics;
- unapproved screenshots;
- broken relationships;
- missing SEO description;
- missing updated date.

This helps manage project readiness.

---

# 87. Content Test Strategy

## Unit Tests

Test:

- slug parser;
- date formatter;
- sorting;
- filtering;
- related-content resolver;
- SEO fallback;
- publication filtering.

## Schema Tests

Test:

- valid project;
- missing title;
- duplicate metric ID;
- invalid confidentiality combination;
- published Tier 1 without diagrams;
- ongoing project with end date.

## Integration Tests

Test:

- all content loads;
- all published routes generate;
- related links resolve;
- sitemap includes expected pages;
- draft pages are excluded.

---

# 88. Content Ownership Rules

## Profile Data

Owned by:

- `profile.ts`.

## Experience

Owned by:

- `experience.ts`.

## Project Facts

Owned by:

- project frontmatter.

## Project Narrative

Owned by:

- project MDX.

## Technology Labels

Owned by:

- technology registry.

## Metrics Used Across Pages

Owned by:

- project metadata or shared metric registry.

## Assets

Owned by:

- asset registry.

---

# 89. Avoided Duplication

Do not store the same full text in:

- profile and About page;
- project metadata and project MDX;
- skill group and technology registry;
- Resume page and Experience source.

Instead:

- reusable summary lives in structured data;
- long-form narrative lives in MDX;
- pages compose from shared content.

---

# 90. Content Security Fields

Internal-only fields must never render publicly.

Examples:

```typescript
type InternalContentReview = {
  factualReviewNotes?: string;
  technicalReviewNotes?: string;
  confidentialityReviewNotes?: string;
  sourceEvidence?: string[];
  reviewer?: string;
};
```

Keep review data:

- in separate files;
- or excluded from public bundle.

Do not place internal review notes in public frontmatter if frontend bundles all metadata.

---

# 91. Private Review Directory

Recommended:

```text
content-private/
├── project-reviews/
├── metric-sources/
├── original-screenshots/
└── unpublished-notes/
```

Directory must:

- be excluded from public build;
- preferably be excluded from public repository;
- have clear access restrictions.

---

# 92. Content Performance Rules

Do not send entire project MDX metadata to homepage.

Homepage should receive only:

- title;
- summary;
- metric;
- technologies;
- thumbnail;
- route.

Project body should load only on project page.

Code content should not be included in project-card bundles.

---

# 93. Static Generation Data

`generateStaticParams` uses only published slugs.

```typescript
export async function generateStaticParams() {
  const projects = await getProjects({
    publicationStatus: "published",
  });

  return projects.map((project) => ({
    slug: project.slug,
  }));
}
```

Draft pages must not generate public static routes.

---

# 94. Project Data Example

```typescript
export const exampleProjectMetadata: ProjectMetadata = {
  id: "project-finance-telegram-bot",
  title: "Finance Telegram Bot",
  slug: "finance-telegram-bot",
  summary:
    "A serverless expense-tracking application with Telegram webhook processing, validated input, relational storage, and reporting workflows.",

  publicationStatus: "published",
  projectStatus: "deployed",
  tier: 2,

  primaryCategory: "serverless-application",
  secondaryCategories: ["api-integration"],

  role: "Sole Developer",

  featured: false,
  priority: 5,

  technologies: ["typescript", "hono", "zod", "cloudflare-workers", "cloudflare-d1"],

  metrics: [],

  confidentiality: {
    level: 0,
    repositoryAllowed: true,
    screenshotsAllowed: true,
    rewrittenCodeAllowed: true,
    architectureAllowed: true,
    metricsAllowed: true,
    publicCompanyNameAllowed: true,
    reviewedAt: "2026-07-01",
  },

  relatedCodeSampleIds: ["code-typescript-webhook-handler"],

  relatedProjectIds: ["project-internal-hr-platform"],

  relatedExperienceIds: [],

  repositoryUrl: "https://github.com/HaBov/finance-telegram-bot",

  publishedAt: "2026-07-01",
  updatedAt: "2026-07-01",
};
```

---

# 95. Data Integrity Rules

The following must always remain true:

1. Every ID is globally unique.
2. Every slug is unique within its route type.
3. Every published project has valid confidentiality approval.
4. Every referenced technology exists.
5. Every referenced asset exists.
6. Every related content item exists.
7. Every published metric is verified.
8. Every current experience role has no end date.
9. Every public repository is allowed by confidentiality config.
10. Every screenshot is approved.
11. Every published project has SEO metadata or valid fallback.
12. Every code sample has a related project or documented standalone reason.

---

# 96. Content Review Workflow

```text
Create draft
→ Validate schema
→ Add technical content
→ Add assets
→ Verify metrics
→ Factual review
→ Technical review
→ Confidentiality review
→ English review
→ Accessibility review
→ Approve
→ Publish
```

Publication status should reflect this workflow.

---

# 97. Project Publication Checklist in Data

Optional structured review:

```typescript
export type PublicationChecklist = {
  factualReview: boolean;
  technicalReview: boolean;
  confidentialityReview: boolean;
  languageReview: boolean;
  accessibilityReview: boolean;
  assetReview: boolean;
  linkReview: boolean;
};
```

A published item requires all required values to be `true`.

This data should remain internal-only.

---

# 98. Version 1 Required Content Records

## Projects

- Internal HR Platform;
- Call Recording Archive Pipeline;
- Corporate Access Lifecycle Automation;
- Automated Video Delivery Pipeline;
- Finance Telegram Bot;
- Multilingual School Website.

## Code Samples

- FastAPI Service Layer;
- RBAC Permission Check;
- SQLAlchemy Data Model;
- Celery Background Task;
- Pytest API Workflow;
- TypeScript Webhook Handler.

## Experience

- FNF GLOBAL;
- FOUR IT;
- Nets Solutions;
- Alif Bank.

## Skills

- six approved skill groups.

## Assets

- at least one diagram for every flagship project;
- approved screenshot for HR Platform;
- approved screenshot for Finance Bot;
- approved screenshot for School Website;
- default Open Graph image;
- favicon assets;
- Resume PDF.

---

# 99. Content Model Development Order

## Phase 1 — Shared Registries

1. technology registry;
2. status labels;
3. category labels;
4. code language registry;
5. shared types.

## Phase 2 — Profile Data

1. profile;
2. navigation;
3. contact links;
4. Resume;
5. education;
6. languages.

## Phase 3 — Experience and Skills

1. experience;
2. skill groups;
3. relations to projects.

## Phase 4 — Project Schema

1. project metadata;
2. metrics;
3. confidentiality;
4. assets;
5. MDX validation.

## Phase 5 — Code Sample Schema

1. sample metadata;
2. related projects;
3. code language;
4. required headings.

## Phase 6 — Build Validation

1. duplicate detection;
2. cross-reference validation;
3. asset validation;
4. publication rules;
5. content report.

---

# 100. Risks

## 100.1. Excessive Schema Complexity

**Risk:** слишком много обязательных полей замедлит подготовку контента.

**Mitigation:**

- required fields depend on tier;
- optional fields remain optional;
- Tier 3 uses minimal metadata;
- schema expands only for real need.

---

## 100.2. Metadata and MDX Conflict

**Risk:** summary or result differs between frontmatter and article.

**Mitigation:**

- metadata stores canonical short values;
- MDX expands them;
- repeated metrics reference shared registry;
- review checks consistency.

---

## 100.3. Invalid Relations

**Risk:** project links to removed code sample.

**Mitigation:**

- build-time relation validation;
- no string-based unvalidated links;
- stable IDs.

---

## 100.4. Confidential Fields Enter Public Bundle

**Risk:** internal review notes become accessible in browser.

**Mitigation:**

- separate private review data;
- explicit public metadata selection;
- inspect generated output.

---

## 100.5. Uncontrolled Technology Naming

**Risk:** TypeScript, Typescript and TS appear inconsistently.

**Mitigation:**

- technology IDs;
- registry-based display names;
- content linting.

---

## 100.6. Draft Leakage

**Risk:** unfinished content enters sitemap or related sections.

**Mitigation:**

- production loaders return only published items;
- tests verify exclusion;
- no direct draft static params.

---

# 101. Content Model QA Checklist

## Project

- valid ID;
- valid slug;
- correct status;
- correct tier;
- role verified;
- technologies exist;
- metric verified;
- confidentiality approved;
- related content exists;
- dates valid;
- SEO valid.

## Code Sample

- language valid;
- category valid;
- code reviewed;
- related project exists;
- confidentiality reviewed;
- required sections present.

## Experience

- title correct;
- dates correct;
- company correct;
- projects connected;
- technologies verified.

## Asset

- file exists;
- alt text present;
- anonymized;
- approved;
- dimensions valid;
- no private metadata.

---

# 102. Definition of Done

Content and data model is complete when:

- all core TypeScript types are implemented;
- runtime schemas validate all content;
- technology registry exists;
- status and category registries exist;
- project MDX frontmatter validates;
- code sample frontmatter validates;
- experience data is centralized;
- profile data is centralized;
- Resume metadata is centralized;
- asset registry exists;
- relations are validated;
- duplicate IDs fail the build;
- duplicate slugs fail the build;
- invalid dates fail the build;
- unknown technologies fail the build;
- unverified public metrics fail the build;
- unapproved assets fail the production build;
- draft content is excluded from production;
- published Tier 1 projects require full content;
- content validation command exists;
- content readiness report exists;
- sensitive review information is excluded from public output;
- content can be reused across Home, Projects, Experience and SEO without manual duplication.

---

# 103. Final Data Model Principle

The content architecture must make truthful information easy to reuse and inconsistent information difficult to publish.

Main principle:

> Store project facts once, validate them before build, and reuse them everywhere the portfolio needs evidence.
