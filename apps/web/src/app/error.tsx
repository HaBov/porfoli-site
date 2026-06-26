"use client";

import { AlertTriangle, House, RotateCcw } from "lucide-react";
import Link from "next/link";

import { PageContainer } from "@/components/layout/page-container";
import { Section } from "@/components/layout/section";
import { Heading, LeadText } from "@/components/typography/typography";
import { Button, buttonStyles } from "@/components/ui/button";

type ErrorPageProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main id="main-content" tabIndex={-1}>
      <Section spacing="large">
        <PageContainer>
          <div className="mx-auto max-w-[760px] text-center">
            <span
              aria-hidden="true"
              className="border-error/30 bg-error/10 text-error mx-auto inline-flex size-14 items-center justify-center rounded-full border"
            >
              <AlertTriangle size={26} strokeWidth={1.8} />
            </span>

            <Heading as="h1" className="mt-6" size="page">
              Something went wrong.
            </Heading>

            <LeadText className="mx-auto mt-5">
              The page could not be displayed. Try the request again or return to the homepage.
            </LeadText>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                leftIcon={<RotateCcw aria-hidden="true" size={18} strokeWidth={1.8} />}
                onClick={reset}
                size="lg"
              >
                Try Again
              </Button>

              <Link
                className={buttonStyles({
                  variant: "secondary",
                  size: "lg",
                })}
                href="/"
              >
                <House aria-hidden="true" size={18} strokeWidth={1.8} />
                Back to Home
              </Link>
            </div>

            {error.digest ? (
              <p className="text-muted mt-8 text-sm">
                Reference: <code className="font-mono">{error.digest}</code>
              </p>
            ) : null}
          </div>
        </PageContainer>
      </Section>
    </main>
  );
}
