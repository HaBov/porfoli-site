import "server-only";

import type { ComponentType } from "react";

import RbacPermissionCheck from "./code-samples/rbac-permission-check.mdx";
import { getCodeSampleBySlug } from "./data/code-samples";
import type { CodeSampleRecord } from "./schemas/code-sample.schema";

const IMPLEMENTED_CODE_SAMPLE_SLUGS = [
  "rbac-permission-check",
] as const;

type ImplementedCodeSampleSlug =
  (typeof IMPLEMENTED_CODE_SAMPLE_SLUGS)[number];

type CodeSampleEntry = {
  slug: ImplementedCodeSampleSlug;
  sample: CodeSampleRecord;
  Component: ComponentType;
};

function requireCodeSample(
  slug: ImplementedCodeSampleSlug,
): CodeSampleRecord {
  const sample = getCodeSampleBySlug(slug);

  if (!sample) {
    throw new Error(
      `Code sample references unknown slug "${slug}".`,
    );
  }

  return sample;
}

const codeSampleComponents: Record<
  ImplementedCodeSampleSlug,
  ComponentType
> = {
  "rbac-permission-check": RbacPermissionCheck,
};

export const codeSampleEntries: CodeSampleEntry[] =
  IMPLEMENTED_CODE_SAMPLE_SLUGS.map((slug) => ({
    slug,
    sample: requireCodeSample(slug),
    Component: codeSampleComponents[slug],
  }));

export function getCodeSampleEntry(
  slug: string,
): CodeSampleEntry | undefined {
  return codeSampleEntries.find(
    (entry) => entry.slug === slug,
  );
}

export function getCodeSampleStaticParams(): Array<{
  slug: ImplementedCodeSampleSlug;
}> {
  return codeSampleEntries.map(({ slug }) => ({
    slug,
  }));
}

export function getAdjacentCodeSamples(
  slug: string,
): {
  previousSample?: CodeSampleRecord;
  nextSample?: CodeSampleRecord;
} {
  const index = codeSampleEntries.findIndex(
    (entry) => entry.slug === slug,
  );

  if (index === -1) {
    return {};
  }

  return {
    previousSample:
      codeSampleEntries[index - 1]?.sample,
    nextSample:
      codeSampleEntries[index + 1]?.sample,
  };
}
