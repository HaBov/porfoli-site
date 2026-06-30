import {
  ArrowRight,
  Code2,
} from "lucide-react";
import Link from "next/link";

import { CodeSampleCard } from "@/components/code/code-sample-card";
import type { CodeSampleRecord } from "@/content";

type RelatedCodeSamplesProps = {
  projectTitle: string;
  samples: CodeSampleRecord[];
};

export function RelatedCodeSamples({
  projectTitle,
  samples,
}: RelatedCodeSamplesProps) {
  if (samples.length === 0) {
    return null;
  }

  return (
    <section
      id="related-code-samples"
      aria-labelledby="related-code-samples-heading"
      className="border-line mt-16 scroll-mt-28 border-t pt-16"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-accent inline-flex items-center gap-2 font-mono text-xs tracking-[0.1em] uppercase">
            <Code2
              aria-hidden="true"
              className="size-4"
            />

            Related implementation
          </p>

          <h2
            id="related-code-samples-heading"
            className="text-primary mt-3 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl"
          >
            Code Samples
          </h2>

          <p className="text-secondary mt-4 max-w-2xl text-sm leading-7">
            Independently rewritten examples of the
            engineering patterns discussed in this case
            study.
          </p>
        </div>

        <Link
          href="/code"
          className="text-accent focus-visible:ring-accent inline-flex min-h-11 shrink-0 items-center gap-2 rounded-md text-sm font-semibold hover:underline focus-visible:ring-2 focus-visible:outline-none"
        >
          Browse all samples

          <ArrowRight
            aria-hidden="true"
            className="size-4"
          />
        </Link>
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-2">
        {samples.map((sample) => (
          <CodeSampleCard
            key={sample.id}
            sample={sample}
            relatedProjectTitle={projectTitle}
            variant="compact"
            headingLevel="h3"
          />
        ))}
      </div>
    </section>
  );
}
