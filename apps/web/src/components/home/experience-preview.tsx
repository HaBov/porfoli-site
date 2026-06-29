import { ArrowRight } from "lucide-react";
import Link from "next/link";

import {
  getExperienceEntries,
  WORK_FORMAT_LABELS,
} from "@/content";

export function ExperiencePreview() {
  const experienceEntries = getExperienceEntries();

  return (
    <section
      aria-labelledby="experience-preview-heading"
      className="border-b border-line"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10 lg:py-28">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-accent">
            Professional journey
          </p>

          <h2
            id="experience-preview-heading"
            className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-primary sm:text-4xl"
          >
            From operational support to backend development
          </h2>

          <p className="mt-5 max-w-xl text-base leading-8 text-secondary">
            Technical support and business-process analysis
            shaped how I approach software: understand the
            operational failure first, then build a system that
            remains clear and reliable after deployment.
          </p>

          <Link
            href="/experience"
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            View full experience
            <ArrowRight
              aria-hidden="true"
              className="size-4"
            />
          </Link>
        </div>

        <ol className="grid gap-0">
          {experienceEntries.map((experience, index) => (
            <li
              key={experience.id}
              className="relative border-l border-line pb-9 pl-7 last:pb-0"
            >
              <span
                aria-hidden="true"
                className="absolute -left-[0.34rem] top-1.5 size-2.5 rounded-full border-2 border-background bg-accent"
              />

              <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted">
                {experience.periodLabel} ·{" "}
                {
                  WORK_FORMAT_LABELS[
                    experience.workFormat
                  ]
                }
              </p>

              <h3 className="mt-2 text-lg font-semibold text-primary">
                {experience.publicTitle}
              </h3>

              <p className="mt-1 text-sm font-medium text-accent">
                {experience.publicCompanyName}
              </p>

              <p className="mt-3 text-sm leading-7 text-secondary">
                {experience.timelineSummary}
              </p>

              {index === 0 ? (
                <span className="mt-4 inline-flex rounded-full bg-elevated px-3 py-1 text-xs font-medium text-secondary">
                  Current role
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
