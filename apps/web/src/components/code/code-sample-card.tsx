import {
  ArrowUpRight,
  Braces,
  Clock3,
} from "lucide-react";
import Link from "next/link";

import {
  CODE_LANGUAGE_LABELS,
  CODE_SAMPLE_CATEGORY_LABELS,
  CODE_SAMPLE_COMPLEXITY_LABELS,
  type CodeSampleRecord,
} from "@/content";
import { cn } from "@/lib/cn";

type CodeSampleCardProps = {
  sample: CodeSampleRecord;
  relatedProjectTitle: string;
  variant?: "featured" | "standard" | "compact";
};

export function CodeSampleCard({
  sample,
  relatedProjectTitle,
  variant = "standard",
}: CodeSampleCardProps) {
  return (
    <article
      className={cn(
        "border-line bg-surface group relative overflow-hidden rounded-2xl border transition-colors hover:bg-elevated",
        variant === "featured"
          ? "p-7 sm:p-9"
          : variant === "compact"
            ? "p-5"
            : "p-6",
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="bg-accent-muted text-accent rounded-full px-3 py-1 font-mono text-xs tracking-[0.06em] uppercase">
          {CODE_LANGUAGE_LABELS[sample.language]}
        </span>

        <span className="border-line text-muted rounded-full border px-3 py-1 text-xs">
          {CODE_SAMPLE_CATEGORY_LABELS[sample.category]}
        </span>
      </div>

      <h2
        className={cn(
          "text-primary mt-5 font-semibold tracking-[-0.03em]",
          variant === "featured"
            ? "text-3xl sm:text-4xl"
            : "text-xl sm:text-2xl",
        )}
      >
        <Link
          href={`/code/${sample.slug}`}
          className="focus-visible:ring-accent rounded-sm focus-visible:ring-2 focus-visible:outline-none"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0"
          />

          {sample.title}
        </Link>
      </h2>

      <p className="text-secondary mt-4 text-sm leading-7 sm:text-base">
        {sample.summary}
      </p>

      <dl className="border-line mt-6 grid gap-3 border-t pt-5 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-muted text-xs">
            Related project
          </dt>

          <dd className="text-primary mt-1 font-medium">
            {relatedProjectTitle}
          </dd>
        </div>

        <div>
          <dt className="text-muted text-xs">
            Pattern level
          </dt>

          <dd className="text-primary mt-1 font-medium">
            {
              CODE_SAMPLE_COMPLEXITY_LABELS[
                sample.complexity
              ]
            }
          </dd>
        </div>
      </dl>

      <div className="text-muted mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
        <span className="inline-flex items-center gap-1.5">
          <Braces
            aria-hidden="true"
            className="size-4"
          />

          {sample.lineCount} lines
        </span>

        <span className="inline-flex items-center gap-1.5">
          <Clock3
            aria-hidden="true"
            className="size-4"
          />

          {sample.estimatedReadingMinutes} min read
        </span>

        <span className="text-accent ml-auto inline-flex items-center gap-1.5 font-semibold">
          View sample

          <ArrowUpRight
            aria-hidden="true"
            className="size-4"
          />
        </span>
      </div>
    </article>
  );
}
