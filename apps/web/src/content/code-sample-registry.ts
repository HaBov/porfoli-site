import "server-only";

import type { ComponentType } from "react";

import CeleryBackgroundTask from "./code-samples/celery-background-task.mdx";
import DockerProductionSetup from "./code-samples/docker-production-setup.mdx";
import ExternalApiPagination from "./code-samples/external-api-pagination.mdx";
import FastApiServiceLayer from "./code-samples/fastapi-service-layer.mdx";
import PytestApiWorkflow from "./code-samples/pytest-api-workflow.mdx";
import RbacPermissionCheck from "./code-samples/rbac-permission-check.mdx";
import SqlalchemyDataModel from "./code-samples/sqlalchemy-data-model.mdx";
import TypescriptWebhookHandler from "./code-samples/typescript-webhook-handler.mdx";
import { getCodeSampleBySlug } from "./data/code-samples";
import type { CodeSampleRecord } from "./schemas/code-sample.schema";

const IMPLEMENTED_CODE_SAMPLE_SLUGS = [
  "fastapi-service-layer",
  "rbac-permission-check",
  "sqlalchemy-data-model",
  "celery-background-task",
  "pytest-api-workflow",
  "external-api-pagination",
  "typescript-webhook-handler",
  "docker-production-setup",
] as const;

type ImplementedCodeSampleSlug = (typeof IMPLEMENTED_CODE_SAMPLE_SLUGS)[number];

type CodeSampleEntry = {
  slug: ImplementedCodeSampleSlug;
  sample: CodeSampleRecord;
  Component: ComponentType;
};

function requireCodeSample(slug: ImplementedCodeSampleSlug): CodeSampleRecord {
  const sample = getCodeSampleBySlug(slug);

  if (!sample) {
    throw new Error(`Code sample references unknown slug "${slug}".`);
  }

  return sample;
}

const codeSampleComponents: Record<ImplementedCodeSampleSlug, ComponentType> = {
  "fastapi-service-layer": FastApiServiceLayer,
  "rbac-permission-check": RbacPermissionCheck,
  "sqlalchemy-data-model": SqlalchemyDataModel,
  "celery-background-task": CeleryBackgroundTask,
  "pytest-api-workflow": PytestApiWorkflow,
  "external-api-pagination": ExternalApiPagination,
  "typescript-webhook-handler": TypescriptWebhookHandler,
  "docker-production-setup": DockerProductionSetup,
};

export const codeSampleEntries: CodeSampleEntry[] = IMPLEMENTED_CODE_SAMPLE_SLUGS.map((slug) => ({
  slug,
  sample: requireCodeSample(slug),
  Component: codeSampleComponents[slug],
}));

export function getCodeSampleEntry(slug: string): CodeSampleEntry | undefined {
  return codeSampleEntries.find((entry) => entry.slug === slug);
}

export function getCodeSampleStaticParams(): Array<{
  slug: ImplementedCodeSampleSlug;
}> {
  return codeSampleEntries.map(({ slug }) => ({
    slug,
  }));
}

export function getAdjacentCodeSamples(slug: string): {
  previousSample?: CodeSampleRecord;
  nextSample?: CodeSampleRecord;
} {
  const index = codeSampleEntries.findIndex((entry) => entry.slug === slug);

  if (index === -1) {
    return {};
  }

  return {
    previousSample: codeSampleEntries[index - 1]?.sample,
    nextSample: codeSampleEntries[index + 1]?.sample,
  };
}
