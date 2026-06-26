import { z } from "zod";

import { skillGroupListSchema, type SkillGroup } from "../schemas/skill-group.schema";

const skillGroupsInput = [
  {
    id: "skill-backend-engineering",
    title: "Backend Engineering",
    shortTitle: "Backend",

    type: "backend",

    description:
      "Designing modular REST APIs, validated application boundaries, relational workflows, authorization rules, and maintainable service logic.",

    technologyIds: ["python", "fastapi", "sqlalchemy", "pydantic", "alembic", "postgresql"],

    featured: true,
    displayOrder: 1,
  },
  {
    id: "skill-data-persistence",
    title: "Data and Persistence",
    shortTitle: "Data",

    type: "data",

    description:
      "Modeling relational data, managing schema evolution, writing operational queries, and selecting appropriate persistence for application workflows.",

    technologyIds: ["postgresql", "sql", "sqlalchemy", "alembic", "cloudflare-d1", "redis"],

    featured: true,
    displayOrder: 2,
  },
  {
    id: "skill-api-integrations",
    title: "APIs and Integrations",
    shortTitle: "Integrations",

    type: "integration",

    description:
      "Connecting external services through authenticated APIs, pagination, webhook processing, retries, rate-limit handling, and normalized data flows.",

    technologyIds: [
      "ringcentral-api",
      "google-drive-api",
      "telegram-bot-api",
      "motive-api",
      "cloudflare-workers",
    ],

    featured: true,
    displayOrder: 3,
  },
  {
    id: "skill-infrastructure-deployment",
    title: "Infrastructure and Deployment",
    shortTitle: "Infrastructure",

    type: "infrastructure",

    description:
      "Packaging and deploying applications with containers, Linux services, reverse proxies, production runtimes, logs, and repeatable release workflows.",

    technologyIds: ["docker", "docker-compose", "linux", "nginx", "uvicorn", "gunicorn", "git"],

    featured: true,
    displayOrder: 4,
  },
  {
    id: "skill-serverless-applications",
    title: "Serverless Applications",
    shortTitle: "Serverless",

    type: "serverless",

    description:
      "Building lightweight webhook-driven applications and Telegram workflows using typed validation, relational serverless storage, and event processing.",

    technologyIds: [
      "typescript",
      "javascript",
      "hono",
      "zod",
      "cloudflare-workers",
      "cloudflare-d1",
      "cloudflare-kv",
    ],

    featured: false,
    displayOrder: 5,
  },
  {
    id: "skill-web-applications",
    title: "Web Applications",
    shortTitle: "Web",

    type: "web",

    description:
      "Developing and maintaining full-stack web applications with server-rendered interfaces, API integration, administrative workflows, and production deployment.",

    technologyIds: ["nextjs", "react", "typescript", "django", "python"],

    featured: false,
    displayOrder: 6,
  },
] satisfies z.input<typeof skillGroupListSchema>;

export const skillGroups: SkillGroup[] = skillGroupListSchema.parse(skillGroupsInput);

export function getSkillGroups(): SkillGroup[] {
  return [...skillGroups].sort((left, right) => left.displayOrder - right.displayOrder);
}

export function getFeaturedSkillGroups(): SkillGroup[] {
  return getSkillGroups().filter((skillGroup) => skillGroup.featured);
}
