import { StaticPage } from "@/components/layout/static-page";
import { BodyText } from "@/components/typography/typography";
import { Callout } from "@/components/ui/callout";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact Khasandjon Babadzhanov about Software Developer opportunities, backend systems, integrations, and business applications.",
  draft: true,
});

export default function ContactPage() {
  return (
    <StaticPage
      description="I am open to Software Developer opportunities, technical collaborations, and conversations about backend systems, integrations, and business applications."
      eyebrow="Get in touch"
      title="Contact"
    >
      <BodyText>
        The final page will provide a verified direct contact method and an accessible form with
        server-side validation, rate limiting, privacy controls, and a reliable email fallback.
      </BodyText>

      <Callout title="No data is currently submitted">
        The contact form has not been enabled yet. This development scaffold does not collect or
        transmit visitor information.
      </Callout>
    </StaticPage>
  );
}
