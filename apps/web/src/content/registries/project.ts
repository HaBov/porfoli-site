export const PROJECT_STATUS_LABELS = {
  "internal-production": "Internal Production",
  production: "Production",
  deployed: "Deployed",
  mvp: "MVP",
  "active-development": "Active Development",
  maintained: "Maintained",
  completed: "Completed",
  demonstration: "Demonstration Project",
} as const;

export type ProjectStatus = keyof typeof PROJECT_STATUS_LABELS;

export const PROJECT_STATUSES = Object.keys(PROJECT_STATUS_LABELS) as ProjectStatus[];

export const PROJECT_CATEGORY_LABELS = {
  "business-application": "Business Application",
  "backend-platform": "Backend Platform",
  "api-integration": "API Integration",
  "workflow-automation": "Workflow Automation",
  "security-automation": "Security Automation",
  "data-pipeline": "Data Pipeline",
  "serverless-application": "Serverless Application",
  "production-website": "Production Website",
  infrastructure: "Infrastructure",
} as const;

export type ProjectCategory = keyof typeof PROJECT_CATEGORY_LABELS;

export const PROJECT_CATEGORIES = Object.keys(PROJECT_CATEGORY_LABELS) as ProjectCategory[];

export const PROJECT_TIER_LABELS = {
  1: "Flagship Case Study",
  2: "Supporting Case Study",
  3: "Project Card",
  4: "Internal Backlog",
} as const;

export type ProjectTier = keyof typeof PROJECT_TIER_LABELS;
