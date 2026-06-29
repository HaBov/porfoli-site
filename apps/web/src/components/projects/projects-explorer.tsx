"use client";

import { useMemo, useState } from "react";

import { ProjectCard } from "@/components/projects/project-card";
import type { ProjectRecord } from "@/content";
import { cn } from "@/lib/cn";

type ProjectFilter = "all" | "flagship" | "supporting";

type ProjectsExplorerProps = {
  projects: ProjectRecord[];
};

const filters: Array<{
  id: ProjectFilter;
  label: string;
}> = [
  {
    id: "all",
    label: "All projects",
  },
  {
    id: "flagship",
    label: "Flagship",
  },
  {
    id: "supporting",
    label: "Supporting",
  },
];

function matchesFilter(project: ProjectRecord, filter: ProjectFilter): boolean {
  if (filter === "flagship") {
    return project.tier === 1;
  }

  if (filter === "supporting") {
    return project.tier === 2;
  }

  return true;
}

export function ProjectsExplorer({ projects }: ProjectsExplorerProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");

  const visibleProjects = useMemo(
    () => projects.filter((project) => matchesFilter(project, activeFilter)),
    [activeFilter, projects],
  );

  const counts = useMemo(
    () => ({
      all: projects.length,
      flagship: projects.filter((project) => project.tier === 1).length,
      supporting: projects.filter((project) => project.tier === 2).length,
    }),
    [projects],
  );

  return (
    <section aria-labelledby="project-list-heading" className="border-line border-t">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-accent font-mono text-xs tracking-[0.12em] uppercase">
              Project inventory
            </p>

            <h2
              id="project-list-heading"
              className="text-primary mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl"
            >
              Selected systems and applications
            </h2>

            <p className="text-secondary mt-4 max-w-2xl text-base leading-8">
              Filter the portfolio by case-study depth. Flagship projects contain the strongest
              architecture, integration, and measurable operational evidence.
            </p>
          </div>

          <div aria-label="Filter projects" className="flex flex-wrap gap-2" role="group">
            {filters.map((filter) => {
              const selected = activeFilter === filter.id;

              return (
                <button
                  key={filter.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveFilter(filter.id)}
                  className={cn(
                    "focus-visible:ring-accent min-h-11 rounded-lg border px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none",
                    selected
                      ? "border-accent bg-accent text-background"
                      : "border-line bg-surface text-secondary hover:bg-elevated hover:text-primary",
                  )}
                >
                  {filter.label}
                  <span aria-hidden="true" className="ml-2 font-mono text-xs opacity-75">
                    {counts[filter.id]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <p aria-live="polite" className="text-muted mt-7 text-sm">
          Showing {visibleProjects.length} of {projects.length} projects.
        </p>

        {visibleProjects.length > 0 ? (
          <div className="mt-8 grid gap-6">
            {visibleProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="border-line bg-surface mt-8 rounded-2xl border p-8 text-center">
            <h3 className="text-primary text-xl font-semibold">
              No projects match the selected filters
            </h3>

            <p className="text-secondary mt-3 text-sm leading-7">
              Clear the active filter to return to the complete project list.
            </p>

            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className="bg-accent text-background focus-visible:ring-accent mt-6 min-h-11 rounded-lg px-5 py-2 text-sm font-semibold focus-visible:ring-2 focus-visible:outline-none"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
