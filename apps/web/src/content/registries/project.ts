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

export const PROJECT_TIERS = [1, 2, 3, 4] as const;

export type ProjectTier = (typeof PROJECT_TIERS)[number];

export const PROJECT_TIER_LABELS: Record<ProjectTier, string> = {
  1: "Flagship Case Study",
  2: "Supporting Case Study",
  3: "Project Card",
  4: "Internal Backlog",
};

export const CONFIDENTIALITY_LEVELS = [0, 1, 2, 3] as const;

export type ConfidentialityLevel = (typeof CONFIDENTIALITY_LEVELS)[number];

export const CONFIDENTIALITY_LEVEL_LABELS: Record<ConfidentialityLevel, string> = {
  0: "Public",
  1: "Public with Redaction",
  2: "Anonymized Internal Project",
  3: "Restricted Summary",
};

export const METRIC_KINDS = [
  "scale",
  "performance",
  "business-impact",
  "quality",
  "coverage",
] as const;

export type MetricKind = (typeof METRIC_KINDS)[number];

export const METRIC_KIND_LABELS: Record<MetricKind, string> = {
  scale: "Scale",
  performance: "Performance",
  "business-impact": "Business Impact",
  quality: "Quality",
  coverage: "Coverage",
};
