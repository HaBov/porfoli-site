import { Copy, Download, ExternalLink, Menu } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import {
  ArticleProse,
  BodyText,
  Eyebrow,
  Heading,
  LeadText,
} from "@/components/typography/typography";
import { buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IconButton } from "@/components/ui/icon-button";
import { Separator } from "@/components/ui/separator";

export function AccessibilityPreview() {
  return (
    <>
      <Section variant="muted">
        <PageContainer>
          <SectionHeader
            description="Visual size and semantic heading level are controlled separately."
            title="Typography primitives"
          />

          <div className="mt-10 grid gap-5">
            <Card as="article">
              <Eyebrow>Display heading</Eyebrow>

              <Heading as="h3" className="mt-4" size="page">
                Reliable software for operational workflows.
              </Heading>

              <LeadText className="mt-5">
                Large supporting text is limited to a readable line length and remains clear at 200%
                browser zoom.
              </LeadText>
            </Card>

            <Card as="article">
              <Heading as="h3" size="subsection">
                Body typography
              </Heading>

              <BodyText className="mt-4">
                Standard paragraphs use consistent line height, restrained width, semantic colors,
                and no justified alignment.
              </BodyText>
            </Card>

            <Card as="article">
              <ArticleProse>
                <h3>Long-form technical content</h3>

                <p>
                  Project case studies will use this prose foundation for architecture explanations,
                  technical decisions, testing notes, challenges, and trade-offs.
                </p>

                <ul>
                  <li>Readable paragraph width</li>
                  <li>Semantic heading hierarchy</li>
                  <li>Consistent list spacing</li>
                </ul>
              </ArticleProse>
            </Card>
          </div>
        </PageContainer>
      </Section>

      <Section>
        <PageContainer>
          <SectionHeader
            description="Icon-only controls expose an accessible name and maintain a minimum 44×44 pixel target."
            title="Icon buttons"
          />

          <Card className="mt-10">
            <div className="flex flex-wrap items-center gap-3">
              <IconButton label="Open navigation menu">
                <Menu size={20} strokeWidth={1.8} />
              </IconButton>

              <IconButton label="Copy code" variant="outline">
                <Copy size={20} strokeWidth={1.8} />
              </IconButton>

              <IconButton label="Download resume" variant="secondary">
                <Download size={20} strokeWidth={1.8} />
              </IconButton>

              <IconButton label="Open external resource" variant="outline">
                <ExternalLink size={20} strokeWidth={1.8} />
              </IconButton>
            </div>

            <Separator className="my-8" />

            <BodyText>
              Navigate through these controls with the Tab key. Every control must show a visible
              focus indicator and expose a descriptive accessible name.
            </BodyText>
          </Card>
        </PageContainer>
      </Section>

      <Section variant="bordered">
        <PageContainer>
          <SectionHeader
            description="Anchor targets account for the future sticky header and remain keyboard focusable."
            title="Skip and anchor navigation"
          />

          <div className="mt-10 grid gap-6">
            <a
              className={buttonStyles({
                variant: "outline",
                className: "w-fit",
              })}
              href="#foundation-focus-target"
            >
              Jump to focus target
            </a>

            <Card
              id="foundation-focus-target"
              className="focus-visible:ring-accent focus-visible:ring-2"
              tabIndex={-1}
            >
              <Heading as="h3" size="subsection">
                Focus target
              </Heading>

              <BodyText className="mt-3">
                Keyboard focus can move directly to this section without being hidden behind a
                sticky header.
              </BodyText>
            </Card>
          </div>
        </PageContainer>
      </Section>
    </>
  );
}
