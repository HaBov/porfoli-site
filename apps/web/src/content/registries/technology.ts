export const TECHNOLOGY_CATEGORIES = [
  "language",
  "framework",
  "library",
  "database",
  "orm",
  "validation",
  "migration",
  "infrastructure",
  "runtime",
  "platform",
  "integration",
  "testing",
  "tool",
  "storage",
] as const;

export type TechnologyCategory = (typeof TECHNOLOGY_CATEGORIES)[number];

export const TECHNOLOGY_CATEGORY_LABELS: Record<TechnologyCategory, string> = {
  language: "Language",
  framework: "Framework",
  library: "Library",
  database: "Database",
  orm: "ORM",
  validation: "Validation",
  migration: "Migration",
  infrastructure: "Infrastructure",
  runtime: "Runtime",
  platform: "Platform",
  integration: "Integration",
  testing: "Testing",
  tool: "Tool",
  storage: "Storage",
};

export const TECHNOLOGY_EVIDENCE_LEVELS = [
  "extensive",
  "production",
  "project",
  "familiarity",
  "insufficient",
] as const;

export type TechnologyEvidenceLevel = (typeof TECHNOLOGY_EVIDENCE_LEVELS)[number];

export const TECHNOLOGY_VISIBILITIES = [
  "headline",
  "secondary",
  "project-only",
  "experience-only",
  "excluded",
] as const;

export type TechnologyVisibility = (typeof TECHNOLOGY_VISIBILITIES)[number];
