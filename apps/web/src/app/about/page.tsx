import { StaticPage } from "@/components/layout/static-page";
import { BodyText } from "@/components/typography/typography";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "About Me",
  description:
    "Backend-focused Software Developer from Tajikistan with experience in business systems, automation, integrations, Docker, and Linux.",
  draft: true,
});

export default function AboutPage() {
  return (
    <StaticPage
      description="My background combines software development, technical support, system analysis, automation, and production infrastructure."
      eyebrow="Professional background"
      title="About Me"
    >
      <BodyText>
        I am a backend-focused Software Developer from Tajikistan,
        working primarily with Python, PostgreSQL, APIs, automation,
        Docker, and Linux.
      </BodyText>

      <BodyText>
        My earlier experience in technical support and business-process
        analysis helps me understand both how systems are built and how
        they affect the people who use, operate, and maintain them.
      </BodyText>
    </StaticPage>
  );
}
