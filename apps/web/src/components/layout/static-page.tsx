import type { ReactNode } from "react";

import {
  Eyebrow,
  Heading,
  LeadText,
} from "@/components/typography/typography";

import { ContentContainer } from "./content-container";
import { PageContainer } from "./page-container";
import { Section } from "./section";

type StaticPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export function StaticPage({
  eyebrow,
  title,
  description,
  children,
}: StaticPageProps) {
  return (
    <main id="main-content" tabIndex={-1}>
      <Section spacing="large">
        <PageContainer>
          <ContentContainer>
            <Eyebrow>{eyebrow}</Eyebrow>

            <Heading as="h1" className="mt-4" size="page">
              {title}
            </Heading>

            <LeadText className="mt-6">{description}</LeadText>
          </ContentContainer>
        </PageContainer>
      </Section>

      {children ? (
        <Section variant="bordered">
          <PageContainer>
            <ContentContainer className="grid gap-6">
              {children}
            </ContentContainer>
          </PageContainer>
        </Section>
      ) : null}
    </main>
  );
}
