import {
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

import type { CodeSampleRecord } from "@/content";

type CodeSampleNavigationProps = {
  previousSample?: CodeSampleRecord;
  nextSample?: CodeSampleRecord;
};

export function CodeSampleNavigation({
  previousSample,
  nextSample,
}: CodeSampleNavigationProps) {
  if (!previousSample && !nextSample) {
    return (
      <div className="border-line border-t pt-10">
        <Link
          href="/code"
          className="text-accent focus-visible:ring-accent inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-semibold hover:underline focus-visible:ring-2 focus-visible:outline-none"
        >
          <ArrowLeft
            aria-hidden="true"
            className="size-4"
          />

          Return to all code samples
        </Link>
      </div>
    );
  }

  return (
    <nav
      aria-label="Code sample navigation"
      className="border-line grid gap-4 border-t pt-10 sm:grid-cols-2"
    >
      {previousSample ? (
        <Link
          href={`/code/${previousSample.slug}`}
          className="border-line bg-surface hover:bg-elevated focus-visible:ring-accent rounded-xl border p-5 transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
          <span className="text-muted inline-flex items-center gap-2 text-xs tracking-[0.08em] uppercase">
            <ArrowLeft
              aria-hidden="true"
              className="size-4"
            />

            Previous sample
          </span>

          <span className="text-foreground mt-2 block font-semibold">
            {previousSample.title}
          </span>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}

      {nextSample ? (
        <Link
          href={`/code/${nextSample.slug}`}
          className="border-line bg-surface hover:bg-elevated focus-visible:ring-accent rounded-xl border p-5 text-right transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
          <span className="text-muted inline-flex items-center justify-end gap-2 text-xs tracking-[0.08em] uppercase">
            Next sample

            <ArrowRight
              aria-hidden="true"
              className="size-4"
            />
          </span>

          <span className="text-foreground mt-2 block font-semibold">
            {nextSample.title}
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
