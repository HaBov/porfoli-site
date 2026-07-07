import { StaticPage } from "@/components/layout/static-page";
import { BodyText, Heading } from "@/components/typography/typography";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Privacy",
  description:
    "Privacy information for the Khasandjon Babadzhanov software development portfolio and contact form.",
});

export default function PrivacyPage() {
  return (
    <StaticPage
      description="This page explains what the portfolio collects, why it is processed, and what information is intentionally not retained."
      eyebrow="Data and transparency"
      title="Privacy"
    >
      <section>
        <Heading as="h2" size="subsection">
          Contact form
        </Heading>

        <BodyText className="mt-4">
          The contact form collects your name, email address, optional company name, subject, and
          message. This information is used only to receive and respond to your inquiry.
        </BodyText>
      </section>

      <section>
        <Heading as="h2" size="subsection">
          Data minimization
        </Heading>

        <BodyText className="mt-4">
          The form does not request passwords, access tokens, identification documents, home
          addresses, payment details, CV uploads, or account registration.
        </BodyText>
      </section>

      <section>
        <Heading as="h2" size="subsection">
          Retention
        </Heading>

        <BodyText className="mt-4">
          Successfully delivered messages remain subject to the normal retention policy of the
          receiving mailbox. The portfolio does not create a separate marketing database or
          permanently store form submissions.
        </BodyText>
      </section>

      <section>
        <Heading as="h2" size="subsection">
          Application logs
        </Heading>

        <BodyText className="mt-4">
          Application logs may contain a request identifier, timestamp, delivery status, route, and
          error category. They do not intentionally record the message body, full email address,
          company name, or subject.
        </BodyText>
      </section>

      <section>
        <Heading as="h2" size="subsection">
          Spam protection
        </Heading>

        <BodyText className="mt-4">
          The form uses server-side validation, a hidden honeypot field, minimum completion timing,
          request-size limits, and rate limiting. CAPTCHA is not used unless future abuse makes it
          necessary.
        </BodyText>
      </section>

      <section>
        <Heading as="h2" size="subsection">
          Theme preference
        </Heading>

        <BodyText className="mt-4">
          The selected light, dark, or system theme preference is stored locally in the
          visitor&apos;s browser. It is not transmitted through the contact form.
        </BodyText>
      </section>
    </StaticPage>
  );
}
