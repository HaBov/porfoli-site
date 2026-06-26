import { StaticPage } from "@/components/layout/static-page";
import { Callout } from "@/components/ui/callout";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Code Samples",
  description:
    "Focused examples of API design, authorization, background processing, testing, integrations, and deployment patterns.",
  draft: true,
});

export default function CodeSamplesPage() {
  return (
    <StaticPage
      description="Focused examples of API design, authorization, background processing, testing, integrations, and deployment patterns."
      eyebrow="Technical evidence"
      title="Code Samples"
    >
      <Callout title="Independently rewritten code">
        Samples published here will demonstrate real engineering patterns without reproducing
        proprietary source code, internal identifiers, credentials, or company-specific business
        rules.
      </Callout>
    </StaticPage>
  );
}
