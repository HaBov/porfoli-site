import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectCaseStudyLayout } from "@/components/case-study/project-case-study-layout";
import {
  getAdjacentCaseStudies,
  getCaseStudyEntry,
  getCaseStudyStaticParams,
} from "@/content/case-study-registry";
import { createPageMetadata } from "@/lib/metadata";

type ProjectCaseStudyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getCaseStudyStaticParams();
}

export async function generateMetadata({ params }: ProjectCaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getCaseStudyEntry(slug);

  if (!entry) {
    notFound();
  }

  return createPageMetadata({
    title: entry.project.title,
    description: entry.project.shortSummary,
    draft: entry.project.publicationStatus !== "published",
  });
}

export default async function ProjectCaseStudyPage({ params }: ProjectCaseStudyPageProps) {
  const { slug } = await params;
  const entry = getCaseStudyEntry(slug);

  if (!entry) {
    notFound();
  }

  const { previousProject, nextProject } = getAdjacentCaseStudies(slug);

  const CaseStudyContent = entry.Component;

  return (
    <ProjectCaseStudyLayout
      project={entry.project}
      previousProject={previousProject}
      nextProject={nextProject}
    >
      <CaseStudyContent />
    </ProjectCaseStudyLayout>
  );
}
