import { StaticPage } from "@/components/layout/static-page";
import {
  BodyText,
  Heading,
} from "@/components/typography/typography";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Experience",
  description:
    "A progression from technical support and business-process analysis to backend development and production automation.",
  draft: true,
});

const careerStages = [
  "Technical support and incident investigation",
  "Business-process analysis and automation",
  "System integration and production operations",
  "Backend development and internal platforms",
] as const;

export default function ExperiencePage() {
  return (
    <StaticPage
      description="A progression from technical support and business-process analysis to backend development and production automation."
      eyebrow="Professional journey"
      title="Experience"
    >
      <div>
        <Heading as="h2" size="subsection">
          Career progression
        </Heading>

        <BodyText className="mt-4">
          The final experience timeline will connect each role to
          specific engineering skills, systems, projects, and measurable
          outcomes.
        </BodyText>

        <ol className="mt-6 grid gap-3">
          {careerStages.map((stage, index) => (
            <li
              key={stage}
              className="flex gap-4 rounded-[var(--radius-md)] border border-line bg-surface p-4"
            >
              <span
                aria-hidden="true"
                className="font-mono text-sm text-accent"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="text-secondary">{stage}</span>
            </li>
          ))}
        </ol>
      </div>
    </StaticPage>
  );
}
