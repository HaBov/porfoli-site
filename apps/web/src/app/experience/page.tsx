import { StaticPage } from "@/components/layout/static-page";
import { BodyText, Heading } from "@/components/typography/typography";
import { experienceEntries, WORK_FORMAT_LABELS } from "@/content";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Experience",
  description:
    "A progression from technical support and business-process analysis to backend development and production automation.",
});

export default function ExperiencePage() {
  return (
    <StaticPage
      description="A progression from technical support and business-process analysis to backend development and production automation."
      eyebrow="Professional journey"
      title="Experience"
    >
      <div className="grid gap-10">
        {experienceEntries.map((experience) => (
          <article
            key={experience.id}
            className="border-line border-b pb-10 last:border-b-0 last:pb-0"
          >
            <p className="text-muted font-mono text-xs tracking-[0.08em] uppercase">
              {experience.periodLabel} · {WORK_FORMAT_LABELS[experience.workFormat]}
            </p>

            <Heading as="h2" className="mt-3" size="subsection">
              {experience.publicTitle}
            </Heading>

            <p className="text-accent mt-1 font-medium">{experience.publicCompanyName}</p>

            <BodyText className="mt-4">{experience.summary}</BodyText>

            <ul className="mt-6 grid gap-3">
              {experience.responsibilities.slice(0, 4).map((responsibility) => (
                <li key={responsibility} className="text-secondary flex gap-3">
                  <span
                    aria-hidden="true"
                    className="bg-accent mt-2 size-1.5 shrink-0 rounded-full"
                  />

                  <span>{responsibility}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </StaticPage>
  );
}
