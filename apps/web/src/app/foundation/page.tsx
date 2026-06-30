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
import { AccessibilityPreview } from "@/components/foundation/accessibility-preview";
import { Eyebrow, Heading, LeadText } from "@/components/typography/typography";
import { CodeBlock } from "@/components/code/code-block";

export const metadata: Metadata = {
  title: "Foundation Preview",
  description: "Internal preview of the portfolio design system and interface foundations.",
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
    <main id="main-content" className="bg-page text-foreground min-h-screen" tabIndex={-1}>
      <Section spacing="large">
        <PageContainer>
          <ContentContainer>
            <Eyebrow>Foundation preview</Eyebrow>

            <Heading as="h1" className="mt-4" size="display">
              Design system foundations
            </Heading>

            <LeadText className="mt-6">
              Internal preview for validating typography, colors, spacing, reusable controls,
              accessibility, and light and dark theme behavior before full page development begins.
            </LeadText>

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
              <Card key={token.name} as="article" padding="none" className="overflow-hidden">
                <div aria-hidden="true" className={`h-28 ${token.className}`} />

                <div className="border-line border-t p-5">
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

                <Button variant="secondary">Secondary action</Button>

                <Button variant="outline">Outline action</Button>

                <Button variant="ghost">Ghost action</Button>

                <Button loading loadingLabel="Saving" variant="secondary">
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
                <Badge variant="information">Documentation</Badge>
                <Badge variant="restricted">Anonymized</Badge>
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

              <h3 className="mt-5 text-xl font-semibold">Internal HR Platform</h3>

              <p className="text-secondary mt-3 leading-7">
                A multi-module business application covering employee lifecycle workflows.
              </p>
            </Card>

            <Card as="article" variant="interactive">
              <Badge variant="information">Integration</Badge>

              <h3 className="mt-5 text-xl font-semibold">Recording Archive</h3>

              <p className="text-secondary mt-3 leading-7">
                Automated archival workflow for high-volume call recordings and long-term storage.
              </p>
            </Card>

            <Card as="article" variant="bordered">
              <Badge variant="outline">Serverless</Badge>

              <h3 className="mt-5 text-xl font-semibold">Finance Telegram Bot</h3>

              <p className="text-secondary mt-3 leading-7">
                TypeScript application using webhooks, validation, relational storage, and
                Cloudflare Workers.
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
              The code shown in the portfolio is independently rewritten and does not reproduce
              proprietary source code or internal business rules.
            </Callout>

            <Callout title="Synthetic data" variant="information">
              Public demonstrations use fictional identities and isolated data.
            </Callout>

            <Callout title="Validation passed" variant="success">
              The content and metadata satisfy the current publication rules.
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
                <label className="mb-2 block text-sm font-medium" htmlFor="foundation-name">
                  Name
                </label>

                <Input autoComplete="name" id="foundation-name" placeholder="Jordan Lee" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium" htmlFor="foundation-email">
                  Email
                </label>

                <Input
                  aria-describedby="foundation-email-error"
                  id="foundation-email"
                  invalid
                  placeholder="name@example.com"
                  type="email"
                />

                <p className="text-error mt-2 text-sm" id="foundation-email-error">
                  Enter a valid email address.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium" htmlFor="foundation-message">
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
      <AccessibilityPreview />

      <section className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8 lg:px-10">
        <h2 className="text-foreground text-3xl font-semibold">
          Code block verification
        </h2>

        <p className="text-secondary mt-4 leading-8">
          Temporary rendering check for syntax
          highlighting, line numbers, highlighted
          lines, horizontal scrolling, and copy
          behavior.
        </p>

        <CodeBlock
          filename="app/api/dependencies/permissions.py"
          language="python"
          highlightLines={[8, 9, 10, 11]}
          caption="Temporary visual test. This block will be removed after the code sample pages are connected."
          code={`from typing import Annotated

      from fastapi import Depends, HTTPException, status


      async def require_permission(
          actor: Annotated[User, Depends(get_current_user)],
      ) -> User:
          if "employees.create" not in actor.permissions:
              raise HTTPException(
                  status_code=status.HTTP_403_FORBIDDEN,
                  detail="Permission denied",
              )

          return actor`}
        />
      </section>
    </main>

  );
}
