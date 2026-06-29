import { ArrowLeft, LockKeyhole } from "lucide-react";
import Link from "next/link";

import {
  getProjectMetrics,
  getTechnologyById,
  PROJECT_CATEGORY_LABELS,
  PROJECT_STATUS_LABELS,
  type ProjectRecord,
} from "@/content";

type ProjectCaseStudyHeaderProps = {
  project: ProjectRecord;
};

export function ProjectCaseStudyHeader({ project }: ProjectCaseStudyHeaderProps) {
  const metrics = getProjectMetrics(project.id);

  const technologies = project.technologyIds
    .map((technologyId) => getTechnologyById(technologyId))
    .filter(
      (technology): technology is NonNullable<ReturnType<typeof getTechnologyById>> =>
        technology !== undefined,
    );

  return (
    <header className="border-line border-b">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <Link
          href="/projects"
          className="text-secondary hover:text-primary focus-visible:ring-accent inline-flex min-h-11 items-center gap-2 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to Projects
        </Link>

        <div className="mt-9 max-w-5xl">
          <div className="flex flex-wrap gap-2">
            <span className="bg-elevated text-accent rounded-full px-3 py-1 font-mono text-xs tracking-[0.08em] uppercase">
              {PROJECT_CATEGORY_LABELS[project.primaryCategory]}
            </span>

            <span className="border-line text-muted rounded-full border px-3 py-1 text-xs">
              {PROJECT_STATUS_LABELS[project.projectStatus]}
            </span>

            {project.confidentiality.level >= 2 ? (
              <span className="border-line text-muted inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs">
                <LockKeyhole aria-hidden="true" className="size-3.5" />
                Anonymized case study
              </span>
            ) : null}
          </div>

          <p className="text-muted mt-7 font-mono text-xs tracking-[0.12em] uppercase">
            {project.timeframeLabel} · {project.role}
          </p>

          <h1 className="text-primary mt-4 text-4xl font-semibold tracking-[-0.045em] text-balance sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>

          <p className="text-secondary mt-6 max-w-4xl text-lg leading-8">{project.summary}</p>
        </div>

        {metrics.length > 0 ? (
          <dl className="border-line bg-line mt-10 grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <div key={metric.id} className="bg-surface p-5 sm:p-6">
                <dt className="text-muted text-xs leading-5">{metric.label}</dt>

                <dd className="text-primary mt-2 text-2xl font-semibold tracking-[-0.03em]">
                  {metric.value}
                </dd>

                {metric.context ? (
                  <p className="text-muted mt-2 text-xs leading-5">{metric.context}</p>
                ) : null}
              </div>
            ))}
          </dl>
        ) : null}

        <div className="mt-8">
          <p className="text-muted text-xs font-semibold tracking-[0.08em] uppercase">Technology</p>

          <ul className="mt-3 flex flex-wrap gap-2">
            {technologies.map((technology) => (
              <li
                key={technology.id}
                className="bg-elevated text-secondary rounded-md px-2.5 py-1 font-mono text-xs"
              >
                {technology.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
