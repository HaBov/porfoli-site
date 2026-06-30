export const CODE_SAMPLE_SLUGS = [
  "fastapi-service-layer",
  "rbac-permission-check",
  "sqlalchemy-data-model",
  "celery-background-task",
  "pytest-api-workflow",
  "external-api-pagination",
  "typescript-webhook-handler",
  "docker-production-setup",
] as const;

export type CodeSampleSlug =
  (typeof CODE_SAMPLE_SLUGS)[number];

export function hasCodeSample(
  slug: string,
): slug is CodeSampleSlug {
  return CODE_SAMPLE_SLUGS.includes(
    slug as CodeSampleSlug,
  );
}
