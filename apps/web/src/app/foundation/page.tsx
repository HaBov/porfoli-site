import type { Metadata } from "next";

import { ContentContainer } from "@/components/layout/content-container";
import { PageContainer } from "@/components/layout/page-container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const metadata: Metadata = {
  title: "Foundation Preview",
  description:
    "Internal preview of the portfolio design system and interface foundations.",
  robots: {
    index: false,
    follow: false,
  },
};

const colorTokens = [
  {
    name: "Page background",
    className: "bg-page",
  },
  {
    name: "Elevated background",
    className: "bg-elevated",
  },
  {
    name: "Surface",
    className: "bg-surface",
  },
  {
    name: "Surface hover",
    className: "bg-surface-hover",
  },
  {
    name: "Accent",
    className: "bg-accent",
  },
  {
    name: "Accent muted",
    className: "bg-accent-muted",
  },
] as const;

export default function FoundationPage() {
  return (
    <main className="min-h-screen bg-page text-foreground">
      <Section spacing="large">
        <PageContainer>
          <ContentContainer>
            <SectionHeader
              description="Internal preview for validating typography, colors, spacing, reusable controls, and light and dark theme behavior before full page development begins."
              eyebrow="Foundation preview"
              headingLevel="h1"
              size="large"
              title="Design system foundations"
            />

            <div className="mt-8">
              <ThemeSwitcher />
            </div>
          </ContentContainer>
        </PageContainer>
      </Section>

      <Section variant="bordered">
        <PageContainer>
          <SectionHeader
            description="Semantic design tokens used across all portfolio pages and components."
            title="Color tokens"
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {colorTokens.map((token) => (
              <Card
                key={token.name}
                as="article"
                padding="none"
                className="overflow-hidden"
              >
                <div
                  aria-hidden="true"
                  className={`h-28 ${token.className}`}
                />

                <div className="border-t border-line p-5">
                  <h3 className="font-medium">{token.name}</h3>
                </div>
              </Card>
            ))}
          </div>
        </PageContainer>
      </Section>

      <Section>
        <PageContainer>
          <SectionHeader
            description="Core controls use consistent states, spacing, focus indicators, and disabled behavior."
            title="Buttons and badges"
          />

          <div className="mt-10">
            <Card>
              <div className="flex flex-wrap gap-4">
                <Button>Primary action</Button>

                <Button variant="secondary">
                  Secondary action
                </Button>

                <Button variant="outline">
                  Outline action
                </Button>

                <Button variant="ghost">Ghost action</Button>

                <Button
                  loading
                  loadingLabel="Saving"
                  variant="secondary"
                >
                  Save changes
                </Button>

                <Button disabled>Disabled</Button>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Badge>Python</Badge>
                <Badge variant="accent">FastAPI</Badge>
                <Badge showDot variant="success">
                  Deployed
                </Badge>
                <Badge showDot variant="warning">
                  Active development
                </Badge>
                <Badge variant="information">
                  Documentation
                </Badge>
                <Badge variant="restricted">
                  Anonymized
                </Badge>
              </div>
            </Card>
          </div>
        </PageContainer>
      </Section>

      <Section variant="muted">
        <PageContainer>
          <SectionHeader
            description="Cards adapt to content rather than enforcing identical heights."
            title="Cards"
          />

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <Card as="article">
              <Badge variant="accent">Backend platform</Badge>

              <h3 className="mt-5 text-xl font-semibold">
                Internal HR Platform
              </h3>

              <p className="mt-3 leading-7 text-secondary">
                A multi-module business application covering
                employee lifecycle workflows.
              </p>
            </Card>

            <Card as="article" variant="interactive">
              <Badge variant="information">Integration</Badge>

              <h3 className="mt-5 text-xl font-semibold">
                Recording Archive
              </h3>

              <p className="mt-3 leading-7 text-secondary">
                Automated archival workflow for high-volume call
                recordings and long-term storage.
              </p>
            </Card>

            <Card as="article" variant="bordered">
              <Badge variant="outline">Serverless</Badge>

              <h3 className="mt-5 text-xl font-semibold">
                Finance Telegram Bot
              </h3>

              <p className="mt-3 leading-7 text-secondary">
                TypeScript application using webhooks, validation,
                relational storage, and Cloudflare Workers.
              </p>
            </Card>
          </div>
        </PageContainer>
      </Section>

      <Section>
        <PageContainer>
          <SectionHeader
            description="Callouts communicate context and status without relying only on color."
            title="Callouts"
          />

          <div className="mt-10 grid gap-4">
            <Callout title="Confidentiality note">
              The code shown in the portfolio is independently
              rewritten and does not reproduce proprietary source
              code or internal business rules.
            </Callout>

            <Callout
              title="Synthetic data"
              variant="information"
            >
              Public demonstrations use fictional identities and
              isolated data.
            </Callout>

            <Callout title="Validation passed" variant="success">
              The content and metadata satisfy the current
              publication rules.
            </Callout>

            <Callout title="Review required" variant="warning">
              This screenshot must be anonymized before publication.
            </Callout>

            <Callout title="Publication blocked" variant="error">
              A confidential identifier was detected in the asset.
            </Callout>
          </div>
        </PageContainer>
      </Section>

      <Section variant="bordered">
        <PageContainer>
          <SectionHeader
            description="Form fields preserve visible labels, accessible invalid states, and keyboard focus."
            title="Form controls"
          />

          <Card className="mt-10 max-w-[760px]">
            <form className="grid gap-6">
              <div>
                <label
                  className="mb-2 block text-sm font-medium"
                  htmlFor="foundation-name"
                >
                  Name
                </label>

                <Input
                  autoComplete="name"
                  id="foundation-name"
                  placeholder="Jordan Lee"
                />
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-medium"
                  htmlFor="foundation-email"
                >
                  Email
                </label>

                <Input
                  aria-describedby="foundation-email-error"
                  id="foundation-email"
                  invalid
                  placeholder="name@example.com"
                  type="email"
                />

                <p
                  className="mt-2 text-sm text-error"
                  id="foundation-email-error"
                >
                  Enter a valid email address.
                </p>
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-medium"
                  htmlFor="foundation-message"
                >
                  Message
                </label>

                <Textarea
                  id="foundation-message"
                  placeholder="Tell me about the role or project."
                />
              </div>

              <div>
                <Button type="submit">Send message</Button>
              </div>
            </form>
          </Card>
        </PageContainer>
      </Section>
    </main>
  );
}
