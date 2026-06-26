export const CODE_LANGUAGE_LABELS = {
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
} as const;

export type CodeLanguage = keyof typeof CODE_LANGUAGE_LABELS;

export const CODE_LANGUAGES = Object.keys(CODE_LANGUAGE_LABELS) as CodeLanguage[];

export const CODE_SAMPLE_CATEGORY_LABELS = {
  "api-design": "API Design",
  "service-layer": "Service Layer",
  "data-modeling": "Data Modeling",
  authorization: "Authorization",
  "background-processing": "Background Processing",
  testing: "Testing",
  integration: "Integration",
  infrastructure: "Infrastructure",
  migration: "Database Migration",
} as const;

export type CodeSampleCategory = keyof typeof CODE_SAMPLE_CATEGORY_LABELS;

export const CODE_SAMPLE_COMPLEXITY_LABELS = {
  fundamental: "Fundamental",
  intermediate: "Intermediate",
  "production-pattern": "Production Pattern",
} as const;

export type CodeSampleComplexity = keyof typeof CODE_SAMPLE_COMPLEXITY_LABELS;
