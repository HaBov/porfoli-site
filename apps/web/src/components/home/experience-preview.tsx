import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { getExperienceEntries, WORK_FORMAT_LABELS } from "@/content";

export function ExperiencePreview() {
  const experienceEntries = getExperienceEntries();

  return (
    <section aria-labelledby="experience-preview-heading" className="border-line border-b">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10 lg:py-28">
        <div>
          <p className="text-accent font-mono text-xs tracking-[0.12em] uppercase">
            Professional journey
          </p>

          <h2
            id="experience-preview-heading"
            className="text-primary mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl"
          >
            From operational support to backend development
          </h2>

          <p className="text-secondary mt-5 max-w-xl text-base leading-8">
            Technical support and business-process analysis shaped how I approach software:
            understand the operational failure first, then build a system that remains clear and
            reliable after deployment.
          </p>

          <Link
            href="/experience"
            className="text-accent focus-visible:ring-accent mt-7 inline-flex items-center gap-2 text-sm font-semibold hover:underline focus-visible:ring-2 focus-visible:outline-none"
          >
            View full experience
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <ol className="grid gap-0">
          {experienceEntries.map((experience, index) => (
            <li key={experience.id} className="border-line relative border-l pb-9 pl-7 last:pb-0">
              <span
                aria-hidden="true"
                className="border-background bg-accent absolute top-1.5 -left-[0.34rem] size-2.5 rounded-full border-2"
              />

              <p className="text-muted font-mono text-xs tracking-[0.08em] uppercase">
                {experience.periodLabel} · {WORK_FORMAT_LABELS[experience.workFormat]}
              </p>

              <h3 className="text-primary mt-2 text-lg font-semibold">{experience.publicTitle}</h3>

              <p className="text-accent mt-1 text-sm font-medium">{experience.publicCompanyName}</p>

              <p className="text-secondary mt-3 text-sm leading-7">{experience.timelineSummary}</p>

              {index === 0 ? (
                <span className="bg-elevated text-secondary mt-4 inline-flex rounded-full px-3 py-1 text-xs font-medium">
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
