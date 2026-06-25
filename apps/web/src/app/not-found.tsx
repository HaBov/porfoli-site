import { ArrowLeft, FolderCode } from "lucide-react";
import Link from "next/link";

import { PageContainer } from "@/components/layout/page-container";
import { Section } from "@/components/layout/section";
import { Eyebrow, Heading, LeadText } from "@/components/typography/typography";
import { buttonStyles } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Section spacing="large">
        <PageContainer>
          <div className="mx-auto max-w-[760px] text-center">
            <Eyebrow>404 · Page not found</Eyebrow>

            <Heading as="h1" className="mt-4" size="page">
              This page does not exist.
            </Heading>

            <LeadText className="mx-auto mt-6">
              The address may be incorrect, or the page may have moved. Return to the homepage or
              continue with the project case studies.
            </LeadText>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                className={buttonStyles({
                  variant: "primary",
                  size: "lg",
                })}
                href="/"
              >
                <ArrowLeft aria-hidden="true" size={18} strokeWidth={1.8} />
                Back to Home
              </Link>

              <Link
                className={buttonStyles({
                  variant: "secondary",
                  size: "lg",
                })}
                href="/projects"
              >
                <FolderCode aria-hidden="true" size={18} strokeWidth={1.8} />
                View Projects
              </Link>
            </div>
          </div>
        </PageContainer>
      </Section>
    </main>
  );
}
