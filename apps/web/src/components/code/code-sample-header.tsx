import { ArrowLeft, CheckCircle2, FileCode2, LockKeyhole } from "lucide-react";
import Link from "next/link";

import {
  CODE_LANGUAGE_LABELS,
  CODE_SAMPLE_CATEGORY_LABELS,
  CODE_SAMPLE_COMPLEXITY_LABELS,
  getProjectById,
  getTechnologyById,
  type CodeSampleRecord,
} from "@/content";

type CodeSampleHeaderProps = {
  sample: CodeSampleRecord;
};

export function CodeSampleHeader({ sample }: CodeSampleHeaderProps) {
  const project = getProjectById(sample.relatedProjectIds[0]);

  const technologies = sample.relatedTechnologyIds
    .map((technologyId) => getTechnologyById(technologyId))
    .filter(
      (technology): technology is NonNullable<ReturnType<typeof getTechnologyById>> =>
        technology !== undefined,
    );

  return (
    <header className="border-line border-b">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <Link
          href="/code"
          className="text-secondary hover:text-foreground focus-visible:ring-accent inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to Code Samples
        </Link>

        <div className="mt-9 max-w-5xl">
          <div className="flex flex-wrap gap-2">
            <span className="bg-accent-muted text-accent rounded-full px-3 py-1 font-mono text-xs tracking-[0.08em] uppercase">
              {CODE_LANGUAGE_LABELS[sample.language]}
            </span>

            <span className="border-line text-muted rounded-full border px-3 py-1 text-xs">
              {CODE_SAMPLE_CATEGORY_LABELS[sample.category]}
            </span>

            <span className="border-line text-muted rounded-full border px-3 py-1 text-xs">
              {CODE_SAMPLE_COMPLEXITY_LABELS[sample.complexity]}
            </span>

            <span className="border-line text-muted inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs">
              <LockKeyhole aria-hidden="true" className="size-3.5" />
              Independently rewritten
            </span>
          </div>

          <p className="text-muted mt-7 font-mono text-xs tracking-[0.12em] uppercase">
            {sample.framework ?? CODE_LANGUAGE_LABELS[sample.language]} · {sample.filename}
          </p>

          <h1 className="text-foreground mt-4 text-4xl font-semibold tracking-[-0.045em] text-balance sm:text-5xl lg:text-6xl">
            {sample.title}
          </h1>

          <p className="text-secondary mt-6 max-w-4xl text-lg leading-8">{sample.summary}</p>
        </div>

        <dl className="border-line bg-line mt-10 grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-surface p-5">
            <dt className="text-muted text-xs">Related project</dt>

            <dd className="text-foreground mt-2 text-sm font-semibold">
              {project?.title ?? "Portfolio engineering pattern"}
            </dd>
          </div>

          <div className="bg-surface p-5">
            <dt className="text-muted text-xs">Main file</dt>

            <dd className="text-foreground mt-2 inline-flex items-center gap-2 font-mono text-sm">
              <FileCode2 aria-hidden="true" className="text-accent size-4 shrink-0" />

              <span className="break-all">{sample.filename}</span>
            </dd>
          </div>

          <div className="bg-surface p-5">
            <dt className="text-muted text-xs">Code size</dt>

            <dd className="text-foreground mt-2 text-sm font-semibold">
              {sample.lineCount} lines · {sample.estimatedReadingMinutes} min read
            </dd>
          </div>

          <div className="bg-surface p-5">
            <dt className="text-muted text-xs">Review status</dt>

            <dd className="text-foreground mt-2 inline-flex items-center gap-2 text-sm font-semibold">
              <CheckCircle2 aria-hidden="true" className="text-success size-4" />
              Confidentiality reviewed
            </dd>
          </div>
        </dl>

        {technologies.length > 0 ? (
          <div className="mt-8 flex flex-wrap gap-2" aria-label="Technologies used in this sample">
            {technologies.map((technology) => (
              <span
                key={technology.id}
                className="border-line text-secondary rounded-full border px-3 py-1.5 text-xs"
              >
                {technology.name}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </header>
  );
}
