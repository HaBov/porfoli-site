import { z } from "zod";

import { projectListSchema, type ProjectRecord } from "../schemas/project.schema";

const projectsInput = [
  {
    id: "project-internal-hr-platform",
    title: "Internal HR Operations Platform",
    slug: "internal-hr-operations-platform",

    summary:
      "A full-stack internal platform supporting recruitment, onboarding, employee management, leave, access, documents, reporting, audit, and offboarding workflows.",

    shortSummary: "A multi-module platform for structured HR and employee-lifecycle operations.",

    publicationStatus: "review",
    projectStatus: "internal-production",
    tier: 1,

    primaryCategory: "business-application",
    secondaryCategories: ["backend-platform"],

    role: "Python Backend Developer",
    teamContext:
      "Developed independently across backend and frontend with requirements and workflow feedback from internal operational stakeholders.",

    timeframeLabel: "November 2025 – Present",
    startDate: "2025-11",
    ongoing: true,

    featured: true,
    versionOne: true,
    priority: 1,

    technologyIds: [
      "python",
      "typescript",
      "sql",
      "fastapi",
      "nextjs",
      "react",
      "postgresql",
      "sqlalchemy",
      "pydantic",
      "alembic",
      "redis",
      "docker",
      "docker-compose",
      "linux",
      "nginx",
      "uvicorn",
      "git",
    ],

    metricIds: [
      "metric-hr-api-operations",
      "metric-hr-modules",
      "metric-hr-migrations",
      "metric-hr-smoke-tests",
    ],

    relatedExperienceIds: ["experience-fnf-global"],

    keyFeatures: [
      "Authentication and permission-based access control",
      "Organization and employee management",
      "Recruitment and candidate workflows",
      "Onboarding and offboarding",
      "Leave and attendance workflows",
      "Document handling",
      "Audit logging and reporting",
      "Relational schema migrations",
      "Docker Compose deployment",
    ],

    resultSummary:
      "The platform was deployed for internal company use and now provides a centralized foundation for multiple HR and employee-lifecycle workflows.",

    confidentiality: {
      level: 2,

      companyNameAllowed: true,
      repositoryAllowed: false,
      screenshotsAllowed: true,
      rewrittenCodeAllowed: true,
      architectureAllowed: true,
      metricsAllowed: true,

      syntheticDataRequired: true,

      publicNotice:
        "This internal project is presented through simplified architecture, synthetic data, approved metrics, and independently rewritten code samples. Proprietary source code and employee information are excluded.",
    },
  },
  {
    id: "project-call-recording-archive",
    title: "Call Recording Archive Pipeline",
    slug: "call-recording-archive-pipeline",

    summary:
      "An automated Python workflow that transfers high-volume call-recording files from RingCentral to organized long-term storage in Google Drive.",

    shortSummary:
      "A high-volume API and file-processing workflow for long-term recording retention.",

    publicationStatus: "review",
    projectStatus: "production",
    tier: 1,

    primaryCategory: "api-integration",
    secondaryCategories: ["data-pipeline", "workflow-automation"],

    role: "Integration Developer",
    teamContext:
      "Developed as an internal automation workflow for operational recording retention and storage management.",

    timeframeLabel: "Production workflow",

    featured: true,
    versionOne: true,
    priority: 2,

    technologyIds: ["python", "ringcentral-api", "google-drive-api", "git"],

    metricIds: ["metric-archive-volume", "metric-archive-retention"],

    relatedExperienceIds: ["experience-fnf-global"],

    keyFeatures: [
      "OAuth token refresh",
      "Paginated recording retrieval",
      "Batch and multithreaded processing",
      "Rate-limit handling",
      "Retry and cooldown behavior",
      "Duplicate-file prevention",
      "Organized cloud storage",
      "Operational report generation",
    ],

    resultSummary:
      "The workflow archives approximately 90,000–150,000 recording files per 90-day cycle and extends the available retention workflow from approximately 90 days to two years.",

    confidentiality: {
      level: 2,

      companyNameAllowed: true,
      repositoryAllowed: false,
      screenshotsAllowed: true,
      rewrittenCodeAllowed: true,
      architectureAllowed: true,
      metricsAllowed: true,

      syntheticDataRequired: true,

      publicNotice:
        "The case study uses synthetic recording metadata and independently rewritten integration examples. Real phone numbers, account identifiers, credentials, logs, and storage identifiers are excluded.",
    },
  },
  {
    id: "project-access-lifecycle-automation",
    title: "Corporate Access Lifecycle Automation",
    slug: "corporate-access-lifecycle-automation",

    summary:
      "A serverless workflow that supports employee onboarding and offboarding across a large network of corporate Telegram groups.",

    shortSummary: "Security-oriented automation for employee group-access onboarding and removal.",

    publicationStatus: "review",
    projectStatus: "production",
    tier: 1,

    primaryCategory: "security-automation",
    secondaryCategories: ["api-integration", "workflow-automation"],

    role: "Automation Developer",
    teamContext:
      "Developed as an internal workflow for trusted administrators and employee access management.",

    timeframeLabel: "Production workflow",

    featured: true,
    versionOne: true,
    priority: 3,

    technologyIds: [
      "javascript",
      "sql",
      "cloudflare-workers",
      "cloudflare-d1",
      "telegram-bot-api",
      "git",
    ],

    metricIds: ["metric-access-groups"],

    relatedExperienceIds: ["experience-fnf-global"],

    keyFeatures: [
      "Trusted-administrator approval flow",
      "Employee profile and access state",
      "Managed-group discovery",
      "Role-based assignment policies",
      "One-time invite links",
      "Membership tracking",
      "Access-removal workflows",
      "Audit and error records",
    ],

    resultSummary:
      "The system reduced manual access administration and supported more consistent onboarding and offboarding across approximately 1,500 corporate groups.",

    confidentiality: {
      level: 2,

      companyNameAllowed: true,
      repositoryAllowed: false,
      screenshotsAllowed: true,
      rewrittenCodeAllowed: true,
      architectureAllowed: true,
      metricsAllowed: true,

      syntheticDataRequired: true,

      publicNotice:
        "The public case study uses generic departments, roles, groups, and synthetic identities. Real group IDs, employee records, invite links, organizational mappings, and access policies are excluded.",
    },
  },
  {
    id: "project-fleet-safety-media",
    title: "Fleet Safety Media Delivery Pipeline",
    slug: "fleet-safety-media-delivery-pipeline",

    summary:
      "A serverless webhook pipeline that normalizes fleet-safety events and delivers relevant video or image evidence to operational Telegram channels.",

    shortSummary:
      "A webhook-driven media pipeline connecting fleet-safety events with operational teams.",

    publicationStatus: "review",
    projectStatus: "production",
    tier: 1,

    primaryCategory: "workflow-automation",
    secondaryCategories: ["api-integration", "data-pipeline"],

    role: "Integration Developer",
    teamContext:
      "Developed as an internal automation workflow for fleet, dispatch, and safety operations.",

    timeframeLabel: "Production workflow",

    featured: true,
    versionOne: true,
    priority: 4,

    technologyIds: [
      "javascript",
      "cloudflare-workers",
      "cloudflare-kv",
      "telegram-bot-api",
      "motive-api",
      "git",
    ],

    metricIds: ["metric-fleet-throughput", "metric-fleet-growth"],

    relatedExperienceIds: ["experience-fnf-global"],

    keyFeatures: [
      "Webhook payload processing",
      "Multiple event-shape normalization",
      "Driver and vehicle metadata extraction",
      "Event classification",
      "Video-first media delivery",
      "Image fallback",
      "Telegram fan-out",
      "Aggregate operational analytics",
    ],

    resultSummary:
      "The workflow increased approximate weekly media delivery from 150 videos to 1,500–2,000 videos, representing roughly 10–13× throughput growth.",

    confidentiality: {
      level: 2,

      companyNameAllowed: true,
      repositoryAllowed: false,
      screenshotsAllowed: true,
      rewrittenCodeAllowed: true,
      architectureAllowed: true,
      metricsAllowed: true,

      syntheticDataRequired: true,

      publicNotice:
        "The public implementation uses synthetic events and generated media metadata. Real driver names, vehicle numbers, locations, coordinates, event identifiers, footage, and private channels are excluded.",
    },
  },
  {
    id: "project-employee-check-in-bot",
    title: "Employee Check-in Reporting Bot",
    slug: "employee-check-in-reporting-bot",

    summary:
      "A Telegram-based attendance workflow for employee check-in, check-out, active-session tracking, and reporting-period summaries.",

    shortSummary: "A serverless attendance-capture and worked-hours reporting workflow.",

    publicationStatus: "draft",
    projectStatus: "deployed",
    tier: 2,

    primaryCategory: "serverless-application",
    secondaryCategories: ["workflow-automation"],

    role: "Developer",
    teamContext: "Developed as an internal reporting workflow for employees and administrators.",

    timeframeLabel: "Internal deployed workflow",

    featured: false,
    versionOne: true,
    priority: 7,

    technologyIds: [
      "python",
      "sql",
      "cloudflare-workers",
      "cloudflare-d1",
      "telegram-bot-api",
      "git",
    ],

    metricIds: [],

    relatedExperienceIds: ["experience-fnf-global"],

    keyFeatures: [
      "Employee check-in and check-out",
      "Open-session tracking",
      "Duplicate-session prevention",
      "Action cooldown",
      "Reporting periods",
      "Individual worked-hours reports",
      "Timezone-aware processing",
    ],

    resultSummary:
      "The workflow replaced manual attendance capture with a structured Telegram-based process and generated reusable worked-hours reports.",

    confidentiality: {
      level: 2,

      companyNameAllowed: true,
      repositoryAllowed: false,
      screenshotsAllowed: true,
      rewrittenCodeAllowed: true,
      architectureAllowed: true,
      metricsAllowed: false,

      syntheticDataRequired: true,

      publicNotice:
        "The project is presented with fictional employee identities and independently rewritten workflow examples. Internal employee records and operational integrations are excluded.",
    },
  },
  {
    id: "project-finance-telegram-bot",
    title: "Finance Telegram Bot",
    slug: "finance-telegram-bot",

    summary:
      "A serverless Telegram application for structured expense capture, validated command processing, relational persistence, and financial reporting.",

    shortSummary:
      "A serverless expense-tracking and reporting application built around Telegram workflows.",

    publicationStatus: "draft",
    projectStatus: "active-development",
    tier: 4,

    primaryCategory: "serverless-application",
    secondaryCategories: ["business-application"],

    role: "Software Developer",
    teamContext:
      "Developed as a corporate internal application; the original repository and internal operational data are not public.",

    timeframeLabel: "Active development · 2026",

    featured: false,
    versionOne: false,
    priority: 5,

    technologyIds: [
      "typescript",
      "sql",
      "hono",
      "zod",
      "cloudflare-workers",
      "cloudflare-d1",
      "telegram-bot-api",
      "git",
    ],

    metricIds: [],

    relatedExperienceIds: ["experience-fnf-global"],

    keyFeatures: [
      "Telegram webhook processing",
      "Strict payload validation",
      "Command routing",
      "Expense persistence",
      "Relational reporting",
      "Safe handling of unsupported messages",
      "Serverless deployment",
    ],

    resultSummary:
      "The project remains in active development and is intentionally excluded from the public portfolio until its core workflows, validation, testing, and deployment are complete.",

    confidentiality: {
      level: 2,

      companyNameAllowed: true,
      repositoryAllowed: false,
      screenshotsAllowed: true,
      rewrittenCodeAllowed: true,
      architectureAllowed: true,
      metricsAllowed: false,

      syntheticDataRequired: true,

      publicNotice:
        "The original application is an internal corporate project. The portfolio uses synthetic financial data and independently rewritten code samples without company-specific rules or identifiers.",
    },
  },
  {
    id: "project-multilingual-school-website",
    title: "Multilingual School Website",
    slug: "multilingual-school-website",

    summary:
      "A production Django website with multilingual content, database-managed sections, admissions documents, media handling, and Linux deployment.",

    shortSummary:
      "A multilingual production website maintained through model, migration, admin, and deployment changes.",

    publicationStatus: "review",
    projectStatus: "production",
    tier: 2,

    primaryCategory: "production-website",
    secondaryCategories: ["business-application"],

    role: "Django Developer and Deployment Support",
    teamContext:
      "Maintained and extended an existing production website, including database models, admin workflows, translations, migrations, documents, and deployment-related changes.",

    timeframeLabel: "2026",

    featured: false,
    versionOne: true,
    priority: 6,

    technologyIds: ["python", "django", "postgresql", "linux", "nginx", "gunicorn", "git"],

    metricIds: [],

    relatedExperienceIds: [],

    keyFeatures: [
      "Multilingual content",
      "Database-managed page sections",
      "Administrative content workflows",
      "Admissions documents",
      "Static and media handling",
      "Database migrations",
      "Gunicorn and Nginx deployment",
    ],

    resultSummary:
      "The website remained available in production while receiving new content structures, database changes, administrative improvements, and deployment updates.",

    confidentiality: {
      level: 1,

      companyNameAllowed: true,
      repositoryAllowed: false,
      screenshotsAllowed: true,
      rewrittenCodeAllowed: true,
      architectureAllowed: true,
      metricsAllowed: true,

      syntheticDataRequired: false,

      publicNotice:
        "The production website and approved public pages may be shown. Private administration details, credentials, server configuration values, and unpublished content are excluded.",
    },

    liveUrl: "https://pulatov-school.tj/",
  },
] satisfies z.input<typeof projectListSchema>;

export const projects: ProjectRecord[] = projectListSchema.parse(projectsInput);

export function getProjects(): ProjectRecord[] {
  return [...projects].sort((left, right) => left.priority - right.priority);
}

export function getVersionOneProjects(): ProjectRecord[] {
  return getProjects().filter((project) => project.versionOne);
}

export function getFeaturedProjects(): ProjectRecord[] {
  return getProjects().filter((project) => project.featured && project.versionOne);
}

export function getProjectById(id: string): ProjectRecord | undefined {
  return projects.find((project) => project.id === id);
}

export function getProjectBySlug(slug: string): ProjectRecord | undefined {
  return projects.find((project) => project.slug === slug);
}
