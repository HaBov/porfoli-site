import { ExternalLink, LockKeyhole, ServerCog } from "lucide-react";

import {
  getProjectMetrics,
  getTechnologyById,
  PROJECT_CATEGORY_LABELS,
  PROJECT_STATUS_LABELS,
  PROJECT_TIER_LABELS,
  type ProjectRecord,
} from "@/content";

type ProjectCardProps = {
  project: ProjectRecord;
};

function getTechnologyNames(technologyIds: readonly string[]): string[] {
  return technologyIds
    .map((technologyId) => getTechnologyById(technologyId))
    .filter(
      (technology): technology is NonNullable<ReturnType<typeof getTechnologyById>> =>
        technology !== undefined,
    )
    .map((technology) => technology.name);
}

export function ProjectCard({ project }: ProjectCardProps) {
  const metrics = getProjectMetrics(project.id);
  const technologyNames = getTechnologyNames(project.technologyIds);

  const categoryLabels = [
    PROJECT_CATEGORY_LABELS[project.primaryCategory],
    ...project.secondaryCategories.map((category) => PROJECT_CATEGORY_LABELS[category]),
  ];

  return (
    <article
      id={project.slug}
      className="border-line bg-surface scroll-mt-28 rounded-2xl border p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="bg-elevated text-accent rounded-full px-3 py-1 font-mono text-[0.7rem] tracking-[0.08em] uppercase">
          {PROJECT_TIER_LABELS[project.tier]}
        </span>

        <span className="border-line text-muted rounded-full border px-3 py-1 text-xs">
          {PROJECT_STATUS_LABELS[project.projectStatus]}
        </span>

        {project.confidentiality.level >= 2 ? (
          <span className="border-line text-muted inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs">
            <LockKeyhole aria-hidden="true" className="size-3.5" />
            Anonymized
          </span>
        ) : null}
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div>
          <p className="text-muted font-mono text-xs tracking-[0.1em] uppercase">
            {project.timeframeLabel}
          </p>

          <h2 className="text-primary mt-3 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
            {project.title}
          </h2>

          <p className="text-accent mt-3 text-sm font-medium">{project.role}</p>

          <p className="text-secondary mt-5 max-w-3xl text-base leading-8">{project.summary}</p>

          <div className="mt-6">
            <h3 className="text-primary text-sm font-semibold">Main capabilities</h3>

            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {project.keyFeatures.slice(0, 8).map((feature) => (
                <li key={feature} className="text-secondary flex gap-3 text-sm leading-6">
                  <span
                    aria-hidden="true"
                    className="bg-accent mt-2 size-1.5 shrink-0 rounded-full"
                  />

                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="grid content-start gap-5">
          {metrics.length > 0 ? (
            <dl className="grid gap-3">
              {metrics.slice(0, 3).map((metric) => (
                <div key={metric.id} className="bg-elevated rounded-xl p-4">
                  <dt className="text-muted text-xs leading-5">{metric.label}</dt>

                  <dd className="text-primary mt-1 text-2xl font-semibold tracking-[-0.03em]">
                    {metric.value}
                  </dd>

                  {metric.context ? (
                    <p className="text-muted mt-2 text-xs leading-5">{metric.context}</p>
                  ) : null}
                </div>
              ))}
            </dl>
          ) : null}

          <div>
            <p className="text-muted text-xs font-semibold tracking-[0.08em] uppercase">
              Categories
            </p>

            <ul className="mt-3 flex flex-wrap gap-2">
              {categoryLabels.map((category) => (
                <li
                  key={category}
                  className="border-line text-secondary rounded-md border px-2.5 py-1 text-xs"
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <div className="border-line mt-8 border-t pt-7">
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <div className="flex items-center gap-2">
              <ServerCog aria-hidden="true" className="text-accent size-4" />

              <h3 className="text-primary text-sm font-semibold">Result</h3>
            </div>

            <p className="text-secondary mt-3 max-w-3xl text-sm leading-7">
              {project.resultSummary}
            </p>

            <ul aria-label={`${project.title} technologies`} className="mt-5 flex flex-wrap gap-2">
              {technologyNames.slice(0, 8).map((name) => (
                <li
                  key={name}
                  className="bg-elevated text-muted rounded-md px-2.5 py-1 font-mono text-xs"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="border-line text-primary hover:bg-elevated focus-visible:ring-accent inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none"
            >
              Visit live website
              <ExternalLink aria-hidden="true" className="size-4" />
            </a>
          ) : null}
        </div>
      </div>

      {project.confidentiality.level >= 2 ? (
        <p className="border-line text-muted mt-7 border-t pt-5 text-xs leading-6">
          {project.confidentiality.publicNotice}
        </p>
      ) : null}
    </article>
  );
}
