import { ArrowRight, LockKeyhole } from "lucide-react";
import Link from "next/link";

import {
  getFeaturedProjects,
  getProjectMetrics,
  getTechnologyById,
  PROJECT_STATUS_LABELS,
} from "@/content";

function getProjectTechnologyNames(technologyIds: readonly string[]): string[] {
  return technologyIds
    .map((technologyId) => getTechnologyById(technologyId))
    .filter(
      (technology): technology is NonNullable<ReturnType<typeof getTechnologyById>> =>
        technology !== undefined,
    )
    .slice(0, 6)
    .map((technology) => technology.name);
}

export function FeaturedProjects() {
  const projects = getFeaturedProjects();

  return (
    <section aria-labelledby="featured-projects-heading" className="border-line border-b">
      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="text-accent font-mono text-xs tracking-[0.12em] uppercase">
              Featured work
            </p>

            <h2
              id="featured-projects-heading"
              className="text-primary mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl"
            >
              Backend systems built around real operational constraints
            </h2>

            <p className="text-secondary mt-5 max-w-2xl text-base leading-8">
              Internal applications and automation workflows presented through approved metrics,
              simplified architecture, synthetic data, and independently rewritten code samples.
            </p>
          </div>

          <Link
            href="/projects"
            className="text-accent focus-visible:ring-accent inline-flex shrink-0 items-center gap-2 text-sm font-semibold hover:underline focus-visible:ring-2 focus-visible:outline-none"
          >
            View all projects
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {projects.map((project) => {
            const metrics = getProjectMetrics(project.id);
            const featuredMetric = metrics.find((metric) => metric.featured) ?? metrics[0];

            const technologyNames = getProjectTechnologyNames(project.technologyIds);

            return (
              <article
                key={project.id}
                className="group border-line bg-surface flex min-h-full flex-col rounded-2xl border p-6 transition-transform duration-200 hover:-translate-y-1 sm:p-8"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="border-line bg-elevated text-muted rounded-full border px-3 py-1 font-mono text-[0.7rem] tracking-[0.08em] uppercase">
                    {PROJECT_STATUS_LABELS[project.projectStatus]}
                  </span>

                  {project.confidentiality.level >= 2 ? (
                    <span className="text-muted inline-flex items-center gap-1.5 text-xs">
                      <LockKeyhole aria-hidden="true" className="size-3.5" />
                      Anonymized case study
                    </span>
                  ) : null}
                </div>

                <h3 className="text-primary mt-6 text-2xl font-semibold tracking-[-0.025em]">
                  {project.title}
                </h3>

                <p className="text-secondary mt-4 text-base leading-7">{project.shortSummary}</p>

                {featuredMetric ? (
                  <div className="border-accent mt-6 border-l-2 pl-4">
                    <p className="text-primary text-2xl font-semibold tracking-[-0.025em]">
                      {featuredMetric.value}
                    </p>

                    <p className="text-secondary mt-1 text-sm">{featuredMetric.label}</p>
                  </div>
                ) : null}

                <ul
                  aria-label={`${project.title} technologies`}
                  className="mt-7 flex flex-wrap gap-2"
                >
                  {technologyNames.map((technologyName) => (
                    <li
                      key={technologyName}
                      className="bg-elevated text-muted rounded-md px-2.5 py-1 font-mono text-xs"
                    >
                      {technologyName}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <Link
                    href={`/projects#${project.slug}`}
                    className="text-accent focus-visible:ring-accent inline-flex items-center gap-2 text-sm font-semibold group-hover:underline focus-visible:ring-2 focus-visible:outline-none"
                  >
                    Review project
                    <ArrowRight aria-hidden="true" className="size-4" />
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
