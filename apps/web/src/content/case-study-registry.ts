import "server-only";

import type { ComponentType } from "react";

import InternalHrOperationsPlatform from "./case-studies/internal-hr-operations-platform.mdx";
import CallRecordingArchivePipeline from "./case-studies/call-recording-archive-pipeline.mdx";
import { CASE_STUDY_SLUGS, type CaseStudySlug } from "./registries/case-study";
import { getProjectBySlug, type ProjectRecord } from "./index";

type CaseStudyEntry = {
  slug: CaseStudySlug;
  project: ProjectRecord;
  Component: ComponentType;
};

function requireProject(slug: CaseStudySlug): ProjectRecord {
  const project = getProjectBySlug(slug);

  if (!project) {
    throw new Error(`Case study references unknown project slug "${slug}".`);
  }

  return project;
}

const caseStudyComponents: Record<CaseStudySlug, ComponentType> = {
  "internal-hr-operations-platform": InternalHrOperationsPlatform,

  "call-recording-archive-pipeline": CallRecordingArchivePipeline,
};

export const caseStudyEntries: CaseStudyEntry[] = CASE_STUDY_SLUGS.map((slug) => ({
  slug,
  project: requireProject(slug),
  Component: caseStudyComponents[slug],
}));

export function getCaseStudyEntry(slug: string): CaseStudyEntry | undefined {
  return caseStudyEntries.find((entry) => entry.slug === slug);
}

export function getCaseStudyStaticParams(): Array<{
  slug: CaseStudySlug;
}> {
  return caseStudyEntries.map(({ slug }) => ({
    slug,
  }));
}

export function getAdjacentCaseStudies(slug: string): {
  previousProject?: ProjectRecord;
  nextProject?: ProjectRecord;
} {
  const index = caseStudyEntries.findIndex((entry) => entry.slug === slug);

  if (index === -1) {
    return {};
  }

  return {
    previousProject: caseStudyEntries[index - 1]?.project,
    nextProject: caseStudyEntries[index + 1]?.project,
  };
}
