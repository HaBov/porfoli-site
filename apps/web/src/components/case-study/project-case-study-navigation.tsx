import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import type { ProjectRecord } from "@/content";

type ProjectCaseStudyNavigationProps = {
  previousProject?: ProjectRecord;
  nextProject?: ProjectRecord;
};

export function ProjectCaseStudyNavigation({
  previousProject,
  nextProject,
}: ProjectCaseStudyNavigationProps) {
  if (!previousProject && !nextProject) {
    return (
      <div className="border-line border-t pt-10">
        <Link
          href="/projects"
          className="text-accent focus-visible:ring-accent inline-flex min-h-11 items-center gap-2 text-sm font-semibold hover:underline focus-visible:ring-2 focus-visible:outline-none"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Return to all projects
        </Link>
      </div>
    );
  }

  return (
    <nav
      aria-label="Case study navigation"
      className="border-line grid gap-4 border-t pt-10 sm:grid-cols-2"
    >
      {previousProject ? (
        <Link
          href={`/projects/${previousProject.slug}`}
          className="border-line bg-surface hover:bg-elevated focus-visible:ring-accent rounded-xl border p-5 transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
          <span className="text-muted inline-flex items-center gap-2 text-xs tracking-[0.08em] uppercase">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Previous
          </span>

          <span className="text-primary mt-2 block font-semibold">{previousProject.title}</span>
        </Link>
      ) : (
        <div />
      )}

      {nextProject ? (
        <Link
          href={`/projects/${nextProject.slug}`}
          className="border-line bg-surface hover:bg-elevated focus-visible:ring-accent rounded-xl border p-5 text-right transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
          <span className="text-muted inline-flex items-center gap-2 text-xs tracking-[0.08em] uppercase">
            Next
            <ArrowRight aria-hidden="true" className="size-4" />
          </span>

          <span className="text-primary mt-2 block font-semibold">{nextProject.title}</span>
        </Link>
      ) : null}
    </nav>
  );
}
