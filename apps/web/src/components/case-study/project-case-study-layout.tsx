import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { ProjectCaseStudyHeader } from "@/components/case-study/project-case-study-header";
import { ProjectCaseStudyNavigation } from "@/components/case-study/project-case-study-navigation";
import type { ProjectRecord } from "@/content";

type ProjectCaseStudyLayoutProps = {
  project: ProjectRecord;
  previousProject?: ProjectRecord;
  nextProject?: ProjectRecord;
  children: ReactNode;
};

const sections = [
  ["executive-summary", "Executive Summary"],
  ["problem", "Problem"],
  ["business-context", "Business Context"],
  ["role-contributions", "Role and Contributions"],
  ["requirements-constraints", "Requirements"],
  ["architecture", "Architecture"],
  ["data-model", "Data Model"],
  ["features", "Key Features"],
  ["technical-decisions", "Technical Decisions"],
  ["selected-code", "Selected Code"],
  ["testing", "Testing"],
  ["challenges", "Challenges"],
  ["results", "Results"],
  ["lessons", "Lessons Learned"],
  ["future-improvements", "Future Improvements"],
  ["confidentiality", "Confidentiality"],
] as const;

export function ProjectCaseStudyLayout({
  project,
  previousProject,
  nextProject,
  children,
}: ProjectCaseStudyLayoutProps) {
  return (
    <main id="main-content">
      <ProjectCaseStudyHeader project={project} />

      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:px-10 lg:py-20">
        <aside className="hidden lg:block">
          <nav aria-label="Case study sections" className="sticky top-28">
            <p className="text-muted font-mono text-xs tracking-[0.1em] uppercase">On this page</p>

            <ol className="mt-4 grid gap-1">
              {sections.map(([id, label]) => (
                <li key={id}>
                  <Link
                    href={`#${id}`}
                    className="text-secondary hover:bg-elevated hover:text-primary focus-visible:ring-accent block rounded-md px-3 py-2 text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <article className="min-w-0">
          <div className="grid gap-12">{children}</div>

          <div className="border-line bg-surface mt-16 rounded-2xl border p-6 sm:p-8">
            <p className="text-accent font-mono text-xs tracking-[0.1em] uppercase">Contact</p>

            <h2 className="text-primary mt-3 text-2xl font-semibold tracking-[-0.03em]">
              Discuss backend systems and integrations
            </h2>

            <p className="text-secondary mt-4 max-w-2xl text-sm leading-7">
              I am open to Software Developer opportunities, international remote work, relocation,
              and technical collaboration.
            </p>

            <Link
              href="/contact"
              className="bg-accent text-background focus-visible:ring-accent mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold focus-visible:ring-2 focus-visible:outline-none"
            >
              Contact Me
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>

          <div className="mt-12">
            <ProjectCaseStudyNavigation
              previousProject={previousProject}
              nextProject={nextProject}
            />
          </div>
        </article>
      </div>
    </main>
  );
}
