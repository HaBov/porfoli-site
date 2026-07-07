import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { CodeSampleHeader } from "@/components/code/code-sample-header";
import { CodeSampleNavigation } from "@/components/code/code-sample-navigation";
import { getProjectById, type CodeSampleRecord } from "@/content";

type CodeSampleLayoutProps = {
  sample: CodeSampleRecord;
  previousSample?: CodeSampleRecord;
  nextSample?: CodeSampleRecord;
  children: ReactNode;
};

const sections = [
  ["context", "Context"],
  ["problem", "Problem"],
  ["code", "Code"],
  ["how-it-works", "How It Works"],
  ["design-principles", "Design Principles"],
  ["error-handling", "Error Handling"],
  ["testing", "Testing"],
  ["trade-offs", "Trade-offs"],
  ["production-considerations", "Production Considerations"],
  ["confidentiality", "Confidentiality"],
] as const;

export function CodeSampleLayout({
  sample,
  previousSample,
  nextSample,
  children,
}: CodeSampleLayoutProps) {
  const project = getProjectById(sample.relatedProjectIds[0]);

  return (
    <main id="main-content">
      <CodeSampleHeader sample={sample} />

      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:px-10 lg:py-20">
        <aside className="hidden lg:block">
          <nav aria-label="Code sample sections" className="sticky top-28">
            <p className="text-muted font-mono text-xs tracking-[0.1em] uppercase">On this page</p>

            <ol className="mt-4 grid gap-1">
              {sections.map(([id, label]) => (
                <li key={id}>
                  <Link
                    href={`#${id}`}
                    className="text-secondary hover:bg-elevated hover:text-foreground focus-visible:ring-accent block rounded-md px-3 py-2 text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <article className="min-w-0">
          <details className="border-line bg-surface mb-10 rounded-xl border p-4 lg:hidden">
            <summary className="text-foreground cursor-pointer font-semibold">On this page</summary>

            <ol className="mt-4 grid gap-1">
              {sections.map(([id, label]) => (
                <li key={id}>
                  <Link
                    href={`#${id}`}
                    className="text-secondary hover:text-foreground focus-visible:ring-accent block min-h-11 rounded-md px-2 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ol>
          </details>

          <div className="grid gap-12">{children}</div>

          {project ? (
            <section className="border-line bg-surface mt-16 rounded-2xl border p-6 sm:p-8">
              <p className="text-accent font-mono text-xs tracking-[0.1em] uppercase">
                Related project
              </p>

              <h2 className="text-foreground mt-3 text-2xl font-semibold tracking-[-0.03em]">
                {project.title}
              </h2>

              <p className="text-secondary mt-4 max-w-2xl text-sm leading-7">
                {project.shortSummary}
              </p>

              <Link
                href={`/projects/${project.slug}`}
                className="text-accent focus-visible:ring-accent mt-5 inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-semibold focus-visible:ring-2 focus-visible:outline-none"
              >
                View related case study
                <ExternalLink aria-hidden="true" className="size-4" />
              </Link>
            </section>
          ) : null}

          <section className="border-line bg-surface mt-16 rounded-2xl border p-6 sm:p-8">
            <p className="text-accent font-mono text-xs tracking-[0.1em] uppercase">Contact</p>

            <h2 className="text-foreground mt-3 text-2xl font-semibold tracking-[-0.03em]">
              Discuss backend implementation patterns
            </h2>

            <p className="text-secondary mt-4 max-w-2xl text-sm leading-7">
              I am open to Software Developer opportunities involving Python, APIs, relational data,
              integrations, automation, and production deployment.
            </p>

            <Link
              href="/contact"
              className="bg-accent text-page focus-visible:ring-accent mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold focus-visible:ring-2 focus-visible:outline-none"
            >
              Contact Me
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </section>

          <div className="mt-12">
            <CodeSampleNavigation previousSample={previousSample} nextSample={nextSample} />
          </div>
        </article>
      </div>
    </main>
  );
}
