import {
  Braces,
  Database,
  Network,
  ServerCog,
} from "lucide-react";

import {
  getFeaturedSkillGroups,
  getTechnologyById,
} from "@/content";

const skillIcons = {
  backend: Braces,
  data: Database,
  integration: Network,
  infrastructure: ServerCog,
} as const;

function getTechnologyNames(
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
    .map((technology) => technology.name);
}

export function TechnicalFocus() {
  const skillGroups = getFeaturedSkillGroups();

  return (
    <section
      aria-labelledby="technical-focus-heading"
      className="border-b border-line"
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-accent">
            Technical focus
          </p>

          <h2
            id="technical-focus-heading"
            className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-primary sm:text-4xl"
          >
            Engineering across application logic, data,
            integrations, and deployment
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-8 text-secondary">
            My work starts with the business workflow and
            continues through data modeling, implementation,
            integration, release validation, and production
            support.
          </p>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
          {skillGroups.map((skillGroup) => {
            const Icon =
              skillIcons[
                skillGroup.type as keyof typeof skillIcons
              ];

            const technologyNames = getTechnologyNames(
              skillGroup.technologyIds,
            );

            return (
              <article
                key={skillGroup.id}
                className="bg-surface p-6 sm:p-8"
              >
                {Icon ? (
                  <div className="flex size-11 items-center justify-center rounded-xl bg-elevated text-accent">
                    <Icon
                      aria-hidden="true"
                      className="size-5"
                    />
                  </div>
                ) : null}

                <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em] text-primary">
                  {skillGroup.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-secondary">
                  {skillGroup.description}
                </p>

                <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                  {technologyNames.map((technologyName) => (
                    <li
                      key={technologyName}
                      className="font-mono text-xs text-muted"
                    >
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
