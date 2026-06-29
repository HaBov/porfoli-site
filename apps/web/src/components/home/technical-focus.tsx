import { Braces, Database, Network, ServerCog } from "lucide-react";

import { getFeaturedSkillGroups, getTechnologyById } from "@/content";

const skillIcons = {
  backend: Braces,
  data: Database,
  integration: Network,
  infrastructure: ServerCog,
} as const;

function getTechnologyNames(technologyIds: readonly string[]): string[] {
  return technologyIds
    .map((technologyId) => getTechnologyById(technologyId))
    .filter(
      (technology): technology is NonNullable<ReturnType<typeof getTechnologyById>> =>
        technology !== undefined,
    )
    .map((technology) => technology.name);
}

export function TechnicalFocus() {
  const skillGroups = getFeaturedSkillGroups();

  return (
    <section aria-labelledby="technical-focus-heading" className="border-line border-b">
      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="max-w-3xl">
          <p className="text-accent font-mono text-xs tracking-[0.12em] uppercase">
            Technical focus
          </p>

          <h2
            id="technical-focus-heading"
            className="text-primary mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl"
          >
            Engineering across application logic, data, integrations, and deployment
          </h2>

          <p className="text-secondary mt-5 max-w-2xl text-base leading-8">
            My work starts with the business workflow and continues through data modeling,
            implementation, integration, release validation, and production support.
          </p>
        </div>

        <div className="border-line bg-line mt-10 grid gap-px overflow-hidden rounded-2xl border md:grid-cols-2">
          {skillGroups.map((skillGroup) => {
            const Icon = skillIcons[skillGroup.type as keyof typeof skillIcons];

            const technologyNames = getTechnologyNames(skillGroup.technologyIds);

            return (
              <article key={skillGroup.id} className="bg-surface p-6 sm:p-8">
                {Icon ? (
                  <div className="bg-elevated text-accent flex size-11 items-center justify-center rounded-xl">
                    <Icon aria-hidden="true" className="size-5" />
                  </div>
                ) : null}

                <h3 className="text-primary mt-6 text-xl font-semibold tracking-[-0.02em]">
                  {skillGroup.title}
                </h3>

                <p className="text-secondary mt-3 text-sm leading-7">{skillGroup.description}</p>

                <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                  {technologyNames.map((technologyName) => (
                    <li key={technologyName} className="text-muted font-mono text-xs">
                      {technologyName}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
