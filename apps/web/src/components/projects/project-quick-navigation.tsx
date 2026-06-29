import { ArrowDown } from "lucide-react";
import Link from "next/link";

import { getFeaturedProjects } from "@/content";

export function ProjectQuickNavigation() {
  const featuredProjects = getFeaturedProjects();

  return (
    <nav
      aria-labelledby="featured-project-navigation-heading"
      className="border-line bg-surface rounded-2xl border p-6 sm:p-8"
    >
      <div className="flex items-center gap-3">
        <ArrowDown aria-hidden="true" className="text-accent size-5" />

        <h2
          id="featured-project-navigation-heading"
          className="text-primary text-base font-semibold"
        >
          Jump to a flagship project
        </h2>
      </div>

      <ol className="mt-5 grid gap-2 sm:grid-cols-2">
        {featuredProjects.map((project, index) => (
          <li key={project.id}>
            <Link
              href={`#${project.slug}`}
              className="text-secondary hover:border-line hover:bg-elevated hover:text-primary focus-visible:ring-accent flex min-h-12 items-center gap-3 rounded-lg border border-transparent px-3 py-2 text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
            >
              <span className="text-accent font-mono text-xs">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span>{project.title}</span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
