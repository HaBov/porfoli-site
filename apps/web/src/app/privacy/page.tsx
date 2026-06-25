import { StaticPage } from "@/components/layout/static-page";
import {
  BodyText,
  Heading,
} from "@/components/typography/typography";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Privacy",
  description:
    "Privacy information for the Khasandjon Babadzhanov software development portfolio.",
  draft: true,
});

export default function PrivacyPage() {
  return (
    <StaticPage
      description="This page explains what the portfolio currently stores, what it does not collect, and how future contact and analytics features will be documented."
      eyebrow="Data and transparency"
      title="Privacy"
    >
      <section>
        <Heading as="h2" size="subsection">
          Current data processing
        </Heading>

        <BodyText className="mt-4">
          The current static portfolio does not provide user accounts,
          advertising, session replay, cross-site tracking, or an active
          contact submission endpoint.
        </BodyText>
      </section>

      <section>
        <Heading as="h2" size="subsection">
          Theme preference
        </Heading>

        <BodyText className="mt-4">
          The selected light, dark, or system theme preference is stored
          locally in the visitor&apos;s browser. It is not transmitted to
          the portfolio server.
        </BodyText>
      </section>

      <section>
        <Heading as="h2" size="subsection">
          Future changes
        </Heading>

        <BodyText className="mt-4">
          This page will be updated before contact delivery, analytics,
          cookies, or additional third-party services are enabled.
        </BodyText>
      </section>
    </StaticPage>
  );
}
