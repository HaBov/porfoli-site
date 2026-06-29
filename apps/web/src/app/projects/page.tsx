import { ConfidentialityNotice } from "@/components/projects/confidentiality-notice";
import { ProjectQuickNavigation } from "@/components/projects/project-quick-navigation";
import { ProjectsExplorer } from "@/components/projects/projects-explorer";
import { getFeaturedProjects, getVersionOneProjects } from "@/content";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Projects",
  description:
    "Technical case studies covering backend platforms, API integrations, workflow automation, relational data, validation, and Linux deployment.",
  draft: true,
});

export default function ProjectsPage() {
  const projects = getVersionOneProjects();
  const featuredProjects = getFeaturedProjects();

  return (
    <main id="main-content">
      <section className="border-line border-b">
        <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <div className="max-w-4xl">
            <p className="text-accent font-mono text-xs font-medium tracking-[0.16em] uppercase">
              Technical portfolio
            </p>

            <h1 className="text-primary mt-5 text-4xl font-semibold tracking-[-0.04em] text-balance sm:text-5xl lg:text-6xl">
              Projects built around real business operations
            </h1>

            <p className="text-secondary mt-6 max-w-3xl text-base leading-8 sm:text-lg">
              Backend platforms, API integrations, serverless workflows, and production web
              applications developed to solve operational problems involving data, access,
              reporting, retention, and process reliability.
            </p>

            <dl className="border-line bg-line mt-9 grid max-w-2xl gap-px overflow-hidden rounded-2xl border sm:grid-cols-3">
              <div className="bg-surface p-5">
                <dt className="text-muted text-xs tracking-[0.08em] uppercase">Projects</dt>

                <dd className="text-primary mt-2 text-2xl font-semibold">{projects.length}</dd>
              </div>

              <div className="bg-surface p-5">
                <dt className="text-muted text-xs tracking-[0.08em] uppercase">Flagship</dt>

                <dd className="text-primary mt-2 text-2xl font-semibold">
                  {featuredProjects.length}
                </dd>
              </div>

              <div className="bg-surface p-5">
                <dt className="text-muted text-xs tracking-[0.08em] uppercase">Production</dt>

                <dd className="text-primary mt-2 text-2xl font-semibold">
                  {
                    projects.filter((project) =>
                      ["production", "internal-production", "deployed"].includes(
                        project.projectStatus,
                      ),
                    ).length
                  }
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <ConfidentialityNotice />
            <ProjectQuickNavigation />
          </div>
        </div>
      </section>

      <ProjectsExplorer projects={projects} />
    </main>
  );
}
