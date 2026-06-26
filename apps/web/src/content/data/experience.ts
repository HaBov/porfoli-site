import { z } from "zod";

import { experienceListSchema, type ExperienceRecord } from "../schemas/experience.schema";

const experienceInput = [
  {
    id: "experience-fnf-global",

    company: "FNF GLOBAL Inc",
    publicCompanyName: "FNF GLOBAL",

    officialTitle: "Python Backend Developer",
    publicTitle: "Python Backend Developer",

    location: "Tajikistan",
    workFormat: "hybrid",

    startDate: "2025-11",
    ongoing: true,
    periodLabel: "November 2025 – Present",

    summary:
      "I build internal business applications and operational automation for HR, access management, communications, reporting, and fleet workflows. My work covers requirements analysis, relational data modeling, API development, external integrations, release validation, and Linux-based deployment.",

    responsibilities: [
      "Build and maintain internal software for HR and operational workflows.",
      "Translate business requirements into data models, APIs, interfaces, and automation.",
      "Develop Python and TypeScript integrations with external services.",
      "Maintain deployment environments using Docker Compose, Linux, and Nginx.",
      "Validate critical workflows through release smoke scripts and operational testing.",
      "Investigate live integration failures and improve retry, logging, and error-handling behavior.",
    ],

    resumeBullets: [
      "Independently developed and deployed a full-stack internal HR operations platform with more than 200 REST API operations across 12 modules using Python, FastAPI, PostgreSQL, SQLAlchemy, Alembic, Next.js, TypeScript, Docker Compose, Redis, and Nginx.",
      "Implemented authentication, permission-based access control, employee-lifecycle workflows, recruitment, onboarding, leave, documents, audit logging, reporting, and offboarding.",
      "Created 24 Alembic revisions and 17 release smoke-test scripts supporting schema evolution and validation of critical workflows.",
      "Developed a RingCentral-to-Google Drive workflow that archives approximately 90,000–150,000 recording files per 90-day cycle.",
      "Automated employee access workflows across approximately 1,500 corporate Telegram groups.",
      "Built a fleet-safety media workflow that increased weekly delivery from approximately 150 to 1,500–2,000 videos.",
    ],

    timelineSummary:
      "Building internal business applications, API integrations, access automation, reporting workflows, and Linux-deployed systems.",

    technologyIds: [
      "python",
      "typescript",
      "javascript",
      "sql",
      "fastapi",
      "nextjs",
      "react",
      "postgresql",
      "cloudflare-d1",
      "sqlalchemy",
      "pydantic",
      "alembic",
      "redis",
      "docker",
      "docker-compose",
      "linux",
      "nginx",
      "uvicorn",
      "cloudflare-workers",
      "cloudflare-kv",
      "ringcentral-api",
      "google-drive-api",
      "telegram-bot-api",
      "motive-api",
      "git",
    ],

    relatedProjectIds: [
      "project-internal-hr-platform",
      "project-call-recording-archive",
      "project-access-lifecycle-automation",
      "project-fleet-safety-media",
      "project-employee-check-in-bot",
    ],

    confidentialityLevel: 2,
    companyPublicationAllowed: true,
    verificationStatus: "owner-confirmed",

    featured: true,
    displayOrder: 1,
  },
  {
    id: "experience-four-it",

    company: "FOUR IT",
    publicCompanyName: "FOUR IT",

    officialTitle: "System Analyst",
    publicTitle: "System Analyst",

    location: "Moscow, Russia",
    workFormat: "remote",

    startDate: "2024-05",
    endDate: "2024-09",
    ongoing: false,
    periodLabel: "May 2024 – September 2024",

    summary:
      "Analyzed client operations and converted business requirements into technical specifications, workflow scenarios, CRM configurations, and integration tasks while coordinating between business stakeholders and implementation teams.",

    responsibilities: [
      "Gathered and structured client requirements for CRM and business-process automation projects.",
      "Converted operational needs into technical specifications, implementation scenarios, and integration tasks.",
      "Configured and supported Bitrix24 workflows and connected third-party services.",
      "Coordinated between business stakeholders and technical implementation teams.",
    ],

    resumeBullets: [
      "Gathered and structured client requirements for CRM and business-process automation projects.",
      "Converted operational needs into technical specifications, implementation scenarios, and integration tasks.",
      "Configured Bitrix24 workflows and supported connected third-party services.",
      "Coordinated between business stakeholders and technical implementation teams.",
    ],

    timelineSummary:
      "Translated operational requirements into CRM workflows, specifications, and integration scenarios.",

    technologyIds: ["bitrix24"],
    relatedProjectIds: [],

    confidentialityLevel: 1,
    companyPublicationAllowed: true,
    verificationStatus: "document-supported",

    featured: true,
    displayOrder: 2,
  },
  {
    id: "experience-nets-solutions",

    company: "Nets Solutions",
    publicCompanyName: "Nets Solutions",

    officialTitle: "Business Process & CRM Automation Manager",
    publicTitle: "Business Process Automation Specialist",

    location: "Dushanbe, Tajikistan",
    workFormat: "onsite",

    startDate: "2023-05",
    endDate: "2024-05",
    ongoing: false,
    periodLabel: "May 2023 – May 2024",

    summary:
      "Worked directly with clients to understand operational processes and convert them into structured CRM workflows, automation rules, and third-party integration tasks.",

    responsibilities: [
      "Scoped and delivered Bitrix24-based CRM and process-automation workflows.",
      "Translated ambiguous business requirements into structured implementation rules.",
      "Configured third-party integrations and supported ongoing workflow maintenance.",
      "Worked with stakeholders to validate behavior and resolve implementation gaps.",
    ],

    resumeBullets: [
      "Scoped and delivered Bitrix24-based CRM and process-automation workflows for client operations.",
      "Translated ambiguous business requirements into structured rules and implementation tasks.",
      "Configured third-party integrations and supported ongoing workflow maintenance.",
      "Worked directly with stakeholders to validate process behavior and resolve implementation gaps.",
    ],

    timelineSummary:
      "Business-process and CRM automation work that strengthened requirements analysis and workflow design skills.",

    technologyIds: ["bitrix24"],
    relatedProjectIds: [],

    confidentialityLevel: 1,
    companyPublicationAllowed: true,
    verificationStatus: "document-supported",

    featured: true,
    displayOrder: 3,
  },
  {
    id: "experience-alif-bank",

    company: "Alif Bank",
    publicCompanyName: "Alif Bank",

    officialTitle: "Technical Support Specialist",
    publicTitle: "Technical Support Specialist",

    location: "Tajikistan",
    workFormat: "onsite",

    startDate: "2021-07",
    endDate: "2023-03",
    ongoing: false,
    periodLabel: "July 2021 – March 2023",

    summary:
      "Supported customer-facing banking operations by investigating technical issues, resolving first- and second-line incidents, and documenting repeatable troubleshooting steps.",

    responsibilities: [
      "Diagnosed and resolved first- and second-line technical issues for customer-facing banking operations.",
      "Worked within service expectations and escalated incidents with clear reproduction details.",
      "Documented repeatable troubleshooting steps and common failure patterns.",
      "Communicated technical problems and recovery steps to users.",
    ],

    resumeBullets: [
      "Diagnosed and resolved first- and second-line technical issues for customer-facing banking operations.",
      "Escalated incidents with clear reproduction details and operational context.",
      "Documented repeatable troubleshooting steps and common failure patterns.",
      "Developed practical experience in user communication, incident analysis, and operational reliability.",
    ],

    timelineSummary:
      "Technical support experience that established a foundation in troubleshooting, production incidents, and user-facing reliability.",

    technologyIds: [],
    relatedProjectIds: [],

    confidentialityLevel: 1,
    companyPublicationAllowed: true,
    verificationStatus: "document-supported",

    featured: true,
    displayOrder: 4,
  },
] satisfies z.input<typeof experienceListSchema>;

export const experienceEntries: ExperienceRecord[] = experienceListSchema.parse(experienceInput);

export function getExperienceEntries(): ExperienceRecord[] {
  return [...experienceEntries].sort((left, right) => left.displayOrder - right.displayOrder);
}

export function getCurrentExperience(): ExperienceRecord | undefined {
  return experienceEntries.find((experience) => experience.ongoing);
}
