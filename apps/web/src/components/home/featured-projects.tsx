import { ArrowRight, LockKeyhole } from "lucide-react";
import Link from "next/link";

import {
  getFeaturedProjects,
  getProjectMetrics,
  getTechnologyById,
  PROJECT_STATUS_LABELS,
} from "@/content";

function getProjectTechnologyNames(
  technologyIds: readonly string[],
): string[] {
  return technologyIds
    .map((technologyId) =>
      getTechnologyById(technologyId),
    )
    .filter(
      (
        technology,
      ): technology is NonNullable<
        ReturnType<typeof getTechnologyById>
      > => technology !== undefined,
    )
    .slice(0, 6)
    .map((technology) => technology.name);
}

export function FeaturedProjects() {
  const projects = getFeaturedProjects();

  return (
    <section
      aria-labelledby="featured-projects-heading"
      className="border-b border-line"
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-accent">
              Featured work
            </p>

            <h2
              id="featured-projects-heading"
              className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-primary sm:text-4xl"
            >
              Backend systems built around real operational
              constraints
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-8 text-secondary">
              Internal applications and automation workflows
              presented through approved metrics, simplified
              architecture, synthetic data, and independently
              rewritten code samples.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            View all projects
            <ArrowRight
              aria-hidden="true"
              className="size-4"
            />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {projects.map((project) => {
            const metrics = getProjectMetrics(project.id);
            const featuredMetric =
              metrics.find((metric) => metric.featured) ??
              metrics[0];

            const technologyNames =
              getProjectTechnologyNames(
                project.technologyIds,
              );

            return (
              <article
                key={project.id}
                className="group flex min-h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-transform duration-200 hover:-translate-y-1 sm:p-8"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full border border-line bg-elevated px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted">
                    {
                      PROJECT_STATUS_LABELS[
                        project.projectStatus
                      ]
                    }
                  </span>

                  {project.confidentiality.level >= 2 ? (
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                      <LockKeyhole
                        aria-hidden="true"
                        className="size-3.5"
                      />
                      Anonymized case study
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-6 text-2xl font-semibold tracking-[-0.025em] text-primary">
                  {project.title}
                </h3>

                <p className="mt-4 text-base leading-7 text-secondary">
                  {project.shortSummary}
                </p>

                {featuredMetric ? (
                  <div className="mt-6 border-l-2 border-accent pl-4">
                    <p className="text-2xl font-semibold tracking-[-0.025em] text-primary">
                      {featuredMetric.value}
                    </p>

                    <p className="mt-1 text-sm text-secondary">
                      {featuredMetric.label}
                    </p>
                  </div>
                ) : null}

                <ul
                  aria-label={`${project.title} technologies`}
                  className="mt-7 flex flex-wrap gap-2"
                >
                  {technologyNames.map((technologyName) => (
                    <li
                      key={technologyName}
                      className="rounded-md bg-elevated px-2.5 py-1 font-mono text-xs text-muted"
                    >
                      {technologyName}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <Link
                    href={`/projects#${project.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-accent group-hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    Review project
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4"
                    />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
