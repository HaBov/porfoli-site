import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CodeSampleLayout } from "@/components/code/code-sample-layout";
import {
  getAdjacentCodeSamples,
  getCodeSampleEntry,
  getCodeSampleStaticParams,
} from "@/content/code-sample-registry";
import { createPageMetadata } from "@/lib/metadata";

type CodeSamplePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getCodeSampleStaticParams();
}

export async function generateMetadata({
  params,
}: CodeSamplePageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getCodeSampleEntry(slug);

  if (!entry) {
    notFound();
  }

  return createPageMetadata({
    title: entry.sample.title,
    description: entry.sample.summary,
    draft:
      entry.sample.publicationStatus !== "published",
  });
}

export default async function CodeSamplePage({
  params,
}: CodeSamplePageProps) {
  const { slug } = await params;
  const entry = getCodeSampleEntry(slug);

  if (!entry) {
    notFound();
  }

  const {
    previousSample,
    nextSample,
  } = getAdjacentCodeSamples(slug);

  const SampleContent = entry.Component;

  return (
    <CodeSampleLayout
      sample={entry.sample}
      previousSample={previousSample}
      nextSample={nextSample}
    >
      <SampleContent />
    </CodeSampleLayout>
  );
}
