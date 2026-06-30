import {
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

import { CodeSampleCard } from "@/components/code/code-sample-card";
import {
  getFeaturedCodeSamples,
  getProjectById,
} from "@/content";

export function CodeSamplesPreview() {
  const samples = getFeaturedCodeSamples()
    .slice(0, 4)
    .map((sample) => {
      const project = getProjectById(
        sample.relatedProjectIds[0],
      );

      return {
        sample,
        relatedProjectTitle:
          project?.title ??
          "Portfolio engineering pattern",
      };
    });

  if (samples.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="code-samples-preview-heading"
      className="border-line border-b"
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-accent font-mono text-xs tracking-[0.12em] uppercase">
              Technical evidence
            </p>

            <h2
              id="code-samples-preview-heading"
              className="text-primary mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl"
            >
              Independently rewritten implementation
              patterns
            </h2>

            <p className="text-secondary mt-5 max-w-2xl text-base leading-8">
              Focused examples of API structure,
              authorization, external integrations, and
              webhook processing, with explanations of
              failure handling, testing, and production
              trade-offs.
            </p>

            <p className="text-muted mt-5 inline-flex items-start gap-2 text-sm leading-6">
              <ShieldCheck
                aria-hidden="true"
                className="text-accent mt-0.5 size-4 shrink-0"
              />

              The examples use synthetic entities and do
              not reproduce proprietary source code,
              credentials, internal identifiers, or
              company-specific rules.
            </p>
          </div>

          <Link
            href="/code"
            className="text-accent focus-visible:ring-accent inline-flex min-h-11 shrink-0 items-center gap-2 rounded-md text-sm font-semibold hover:underline focus-visible:ring-2 focus-visible:outline-none"
          >
            View all code samples

            <ArrowRight
              aria-hidden="true"
              className="size-4"
            />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {samples.map(
            ({
              sample,
              relatedProjectTitle,
            }) => (
              <CodeSampleCard
                key={sample.id}
                sample={sample}
                relatedProjectTitle={
                  relatedProjectTitle
                }
                variant="compact"
                headingLevel="h3"
              />
            ),
          )}
        </div>
      </div>
    </section>
  );
}
