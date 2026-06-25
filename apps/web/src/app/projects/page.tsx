import { StaticPage } from "@/components/layout/static-page";
import { Callout } from "@/components/ui/callout";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Projects",
  description:
    "Technical case studies covering backend platforms, integrations, automation, relational data, testing, and production deployment.",
  draft: true,
});

export default function ProjectsPage() {
  return (
    <StaticPage
      description="Technical case studies covering backend platforms, integrations, automation, relational data, testing, and production deployment."
      eyebrow="Selected work"
      title="Projects"
    >
      <Callout title="Confidentiality and technical evidence">
        Some projects were developed for internal company use and
        cannot be published as complete repositories. The final case
        studies will use anonymized architecture, independently
        rewritten code samples, synthetic data, and approved metrics.
      </Callout>
    </StaticPage>
  );
}
