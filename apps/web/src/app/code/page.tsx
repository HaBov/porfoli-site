import { ArrowRight, LockKeyhole } from "lucide-react";
import Link from "next/link";

import {
  CodeSamplesExplorer,
  type CodeSampleExplorerItem,
} from "@/components/code/code-samples-explorer";
import { getProjectById, getPublishedCodeSamples } from "@/content";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Code Samples",
  description:
    "Independently rewritten examples of API design, authorization, relational modeling, background processing, testing, integrations, and deployment patterns.",
});

export default function CodeSamplesPage() {
  const items: CodeSampleExplorerItem[] = getPublishedCodeSamples().map((sample) => {
    const relatedProject = getProjectById(sample.relatedProjectIds[0]);

    return {
      sample,
      relatedProjectTitle: relatedProject?.title ?? "Portfolio engineering pattern",
    };
  });

  return (
    <main id="main-content">
      <header className="border-line border-b">
        <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <p className="text-accent font-mono text-xs tracking-[0.12em] uppercase">
            Technical evidence
          </p>

          <h1 className="text-primary mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.045em] text-balance sm:text-5xl lg:text-6xl">
            Code Samples
          </h1>

          <p className="text-secondary mt-6 max-w-3xl text-lg leading-8">
            Focused examples of API design, authorization, data modeling, background processing,
            testing, integrations, and production deployment. Each sample includes code, failure
            behavior, tests, trade-offs, and operational considerations.
          </p>

          <aside className="border-line bg-elevated mt-8 max-w-4xl rounded-2xl border p-5 sm:p-6">
            <div className="flex gap-4">
              <div className="bg-surface text-accent flex size-10 shrink-0 items-center justify-center rounded-xl">
                <LockKeyhole aria-hidden="true" className="size-5" />
              </div>

              <div>
                <h2 className="text-primary font-semibold">Independently rewritten examples</h2>

                <p className="text-secondary mt-2 text-sm leading-7">
                  These examples were written specifically for this portfolio. They demonstrate
                  engineering patterns without reproducing proprietary source code, internal
                  identifiers, credentials, production data, or company-specific business rules.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </header>

      <CodeSamplesExplorer items={items} />

      <section className="border-line border-t py-16 sm:py-20">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>
            <p className="text-accent font-mono text-xs tracking-[0.1em] uppercase">
              System context
            </p>

            <h2 className="text-primary mt-3 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              See where these patterns are used
            </h2>

            <p className="text-secondary mt-3 max-w-2xl text-sm leading-7">
              Project case studies connect the implementation patterns to architecture, constraints,
              testing, and measurable operational outcomes.
            </p>
          </div>

          <Link
            href="/projects"
            className="bg-accent text-background hover:bg-accent-hover focus-visible:ring-accent inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            View Projects
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
