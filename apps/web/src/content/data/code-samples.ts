import {
  codeSampleListSchema,
  type CodeSampleRecord,
} from "../schemas/code-sample.schema";

const codeSamplesInput = [
  {
    id: "code-fastapi-service-layer",
    title: "FastAPI Service Layer",
    slug: "fastapi-service-layer",
    summary:
      "A typed FastAPI workflow that keeps request parsing, business rules, repository access, and transaction ownership in separate layers.",
    publicationStatus: "published",
    category: "service-layer",
    complexity: "production-pattern",
    language: "python",
    framework: "FastAPI",
    relatedTechnologyIds: [
      "python",
      "fastapi",
      "pydantic",
      "sqlalchemy",
      "postgresql",
    ],
    relatedProjectIds: [
      "project-internal-hr-platform",
    ],
    featured: true,
    priority: 1,
    filename: "app/services/employees.py",
    lineCount: 116,
    estimatedReadingMinutes: 8,
    portfolioRewritten: true,
    confidentialityReviewed: true,
    publishedAt: "2026-06-29",
    updatedAt: "2026-06-29",
  },
  {
    id: "code-rbac-permission-check",
    title: "Permission-Based FastAPI Dependency",
    slug: "rbac-permission-check",
    summary:
      "A reusable authorization dependency that resolves the authenticated actor, checks explicit permissions, and keeps route handlers free of duplicated access logic.",
    publicationStatus: "published",
    category: "authorization",
    complexity: "production-pattern",
    language: "python",
    framework: "FastAPI",
    relatedTechnologyIds: [
      "python",
      "fastapi",
      "pydantic",
    ],
    relatedProjectIds: [
      "project-internal-hr-platform",
      "project-access-lifecycle-automation",
    ],
    featured: true,
    priority: 2,
    filename: "app/api/dependencies/permissions.py",
    lineCount: 84,
    estimatedReadingMinutes: 7,
    portfolioRewritten: true,
    confidentialityReviewed: true,
    publishedAt: "2026-06-29",
    updatedAt: "2026-06-29",
  },
  {
    id: "code-sqlalchemy-data-model",
    title: "SQLAlchemy Employee Data Model",
    slug: "sqlalchemy-data-model",
    summary:
      "A compact SQLAlchemy 2.0 model showing typed mappings, lifecycle status, relational ownership, indexes, constraints, and audit timestamps.",
    publicationStatus: "published",
    category: "data-modeling",
    complexity: "production-pattern",
    language: "python",
    framework: "SQLAlchemy 2.0",
    relatedTechnologyIds: [
      "python",
      "sqlalchemy",
      "postgresql",
    ],
    relatedProjectIds: [
      "project-internal-hr-platform",
    ],
    featured: false,
    priority: 3,
    filename: "app/models/employee.py",
    lineCount: 89,
    estimatedReadingMinutes: 7,
    portfolioRewritten: true,
    confidentialityReviewed: true,
    publishedAt: "2026-06-29",
    updatedAt: "2026-06-29",
  },
  {
    id: "code-celery-background-task",
    title: "Retriable Celery Background Task",
    slug: "celery-background-task",
    summary:
      "An idempotent background task with bounded retries, explicit status transitions, structured context, and terminal failure handling.",
    publicationStatus: "published",
    category: "background-processing",
    complexity: "production-pattern",
    language: "python",
    framework: "Celery",
    relatedTechnologyIds: [
      "python",
      "celery",
      "redis",
      "sqlalchemy",
    ],
    relatedProjectIds: [
      "project-call-recording-archive",
    ],
    featured: false,
    priority: 4,
    filename: "app/tasks/archive_items.py",
    lineCount: 78,
    estimatedReadingMinutes: 8,
    portfolioRewritten: true,
    confidentialityReviewed: true,
    publishedAt: "2026-06-29",
    updatedAt: "2026-06-29",
  },
  {
    id: "code-pytest-api-workflow",
    title: "Pytest API Workflow Test",
    slug: "pytest-api-workflow",
    summary:
      "An asynchronous API test covering authenticated creation, permission denial, response validation, and direct database verification.",
    publicationStatus: "published",
    category: "testing",
    complexity: "intermediate",
    language: "python",
    framework: "Pytest",
    relatedTechnologyIds: [
      "python",
      "fastapi",
      "pytest",
      "sqlalchemy",
    ],
    relatedProjectIds: [
      "project-internal-hr-platform",
    ],
    featured: false,
    priority: 5,
    filename: "tests/api/test_employees.py",
    lineCount: 67,
    estimatedReadingMinutes: 7,
    portfolioRewritten: true,
    confidentialityReviewed: true,
    publishedAt: "2026-06-29",
    updatedAt: "2026-06-29",
  },
  {
    id: "code-external-api-pagination",
    title: "Paginated External API Iterator",
    slug: "external-api-pagination",
    summary:
      "A defensive asynchronous iterator for continuation-token APIs with typed responses, rate-limit backoff, bounded retries, and loop protection.",
    publicationStatus: "published",
    category: "integration",
    complexity: "production-pattern",
    language: "python",
    framework: "HTTP API",
    relatedTechnologyIds: [
      "python",
      "ringcentral-api",
    ],
    relatedProjectIds: [
      "project-call-recording-archive",
    ],
    featured: true,
    priority: 6,
    filename: "app/integrations/recordings.py",
    lineCount: 114,
    estimatedReadingMinutes: 8,
    portfolioRewritten: true,
    confidentialityReviewed: true,
    publishedAt: "2026-06-29",
    updatedAt: "2026-06-29",
  },
  {
    id: "code-typescript-webhook-handler",
    title: "Validated TypeScript Webhook Handler",
    slug: "typescript-webhook-handler",
    summary:
      "A Cloudflare Worker webhook boundary using Hono and Zod to validate unknown Telegram updates before dispatching commands and persistence operations.",
    publicationStatus: "published",
    category: "api-design",
    complexity: "production-pattern",
    language: "typescript",
    framework: "Hono",
    relatedTechnologyIds: [
      "typescript",
      "hono",
      "zod",
      "cloudflare-workers",
      "cloudflare-d1",
      "telegram-bot-api",
    ],
    relatedProjectIds: [
      "project-access-lifecycle-automation",
      "project-fleet-safety-media",
    ],
    featured: true,
    priority: 7,
    filename: "src/routes/telegram-webhook.ts",
    lineCount: 123,
    estimatedReadingMinutes: 8,
    portfolioRewritten: true,
    confidentialityReviewed: true,
    publishedAt: "2026-06-29",
    updatedAt: "2026-06-29",
  },
  {
    id: "code-docker-production-setup",
    title: "Docker Production Service Configuration",
    slug: "docker-production-setup",
    summary:
      "A production-oriented Docker and Compose setup with a non-root runtime, health checks, internal networking, bounded service exposure, and explicit startup dependencies.",
    publicationStatus: "published",
    category: "infrastructure",
    complexity: "production-pattern",
    language: "yaml",
    framework: "Docker Compose",
    relatedTechnologyIds: [
      "docker",
      "docker-compose",
      "linux",
      "nginx",
      "postgresql",
      "redis",
    ],
    relatedProjectIds: [
      "project-internal-hr-platform",
    ],
    featured: false,
    priority: 8,
    filename: "compose.production.yaml",
    lineCount: 100,
    estimatedReadingMinutes: 7,
    portfolioRewritten: true,
    confidentialityReviewed: true,
    publishedAt: "2026-06-29",
    updatedAt: "2026-06-29",
  },
] satisfies CodeSampleRecord[];

export const codeSamples =
  codeSampleListSchema.parse(codeSamplesInput);

export function getCodeSamples(): CodeSampleRecord[] {
  return [...codeSamples].sort(
    (left, right) => left.priority - right.priority,
  );
}

export function getPublishedCodeSamples(): CodeSampleRecord[] {
  return getCodeSamples().filter(
    (sample) =>
      sample.publicationStatus === "published",
  );
}

export function getFeaturedCodeSamples(): CodeSampleRecord[] {
  return getPublishedCodeSamples().filter(
    (sample) => sample.featured,
  );
}

export function getCodeSampleById(
  id: string,
): CodeSampleRecord | undefined {
  return codeSamples.find(
    (sample) => sample.id === id,
  );
}

export function getCodeSampleBySlug(
  slug: string,
): CodeSampleRecord | undefined {
  return codeSamples.find(
    (sample) => sample.slug === slug,
  );
}

export function getCodeSamplesForProject(
  projectId: string,
): CodeSampleRecord[] {
  return getPublishedCodeSamples().filter(
    (sample) =>
      sample.relatedProjectIds.includes(projectId),
  );
}
