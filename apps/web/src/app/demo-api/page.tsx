import { DemoApiExplorer } from "@/components/demo-api/demo-api-explorer";
import { ContentContainer } from "@/components/layout/content-container";
import { PageContainer } from "@/components/layout/page-container";
import { Section } from "@/components/layout/section";
import { Eyebrow, Heading, LeadText } from "@/components/typography/typography";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Demo API",
  description:
    "Interactive FastAPI demonstration API with synthetic data, simulated roles, request IDs, and structured JSON responses.",
});

export default function DemoApiPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Section spacing="large">
        <PageContainer>
          <ContentContainer>
            <Eyebrow>Backend demonstration</Eyebrow>

            <Heading as="h1" className="mt-4" size="page">
              Demo API Explorer
            </Heading>

            <LeadText className="mt-6">
              A safe interactive FastAPI demo showing backend patterns such as pagination, role
              simulation, structured errors, request IDs, audit events, and background-job style
              workflows.
            </LeadText>
          </ContentContainer>
        </PageContainer>
      </Section>

      <Section spacing="compact" variant="bordered">
        <PageContainer size="wide">
          <DemoApiExplorer />
        </PageContainer>
      </Section>
    </main>
  );
}
