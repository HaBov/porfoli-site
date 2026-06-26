export const SKILL_GROUP_TYPES = [
  "backend",
  "data",
  "integration",
  "infrastructure",
  "serverless",
  "web",
] as const;

export type SkillGroupType = (typeof SKILL_GROUP_TYPES)[number];

export const SKILL_GROUP_TYPE_LABELS: Record<SkillGroupType, string> = {
  backend: "Backend Engineering",
  data: "Data and Persistence",
  integration: "APIs and Integrations",
  infrastructure: "Infrastructure and Deployment",
  serverless: "Serverless Applications",
  web: "Web Applications",
};
