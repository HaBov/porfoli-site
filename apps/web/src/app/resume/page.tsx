import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

import { ResumeCard } from "@/components/resume/resume-card";
import { buttonStyles } from "@/components/ui/button";
import { activeResume, profile } from "@/content";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Resume",
  description:
    "Download the current Software Developer resume of Khasandjon Babadzhanov and review his experience, technical skills, projects, education, and language proficiency.",
});

export default function ResumePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="border-line border-b">
        <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-accent font-mono text-xs font-medium tracking-[0.1em] uppercase">
              Professional profile
            </p>

            <h1 className="text-foreground mt-4 text-[2.5rem] leading-[1.08] font-semibold tracking-[-0.035em] sm:text-[3.25rem]">
              Resume
            </h1>

            <p className="text-secondary mt-6 max-w-[72ch] text-lg leading-8">
              A concise overview of my professional experience, technical skills, selected projects,
              education, and language proficiency.
            </p>
          </div>
        </div>
      </section>

      <section aria-label="Resume download" className="border-line border-b">
        <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <ResumeCard resume={activeResume} />
        </div>
      </section>

      <section aria-labelledby="resume-online-heading" className="border-line border-b">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:px-10 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-accent font-mono text-xs tracking-[0.1em] uppercase">
              Online evidence
            </p>

            <h2
              id="resume-online-heading"
              className="text-foreground mt-3 text-3xl font-semibold tracking-[-0.035em]"
            >
              Explore the work behind the resume
            </h2>

            <p className="text-secondary mt-5 max-w-2xl text-base leading-8">
              The portfolio contains detailed case studies, independently rewritten code samples,
              technical decisions, and production results that provide more context than a one-page
              document.
            </p>
          </div>

          <Link
            href="/projects"
            className={buttonStyles({
              variant: "secondary",
              size: "lg",
            })}
          >
            Explore Projects
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </section>

      <section aria-labelledby="resume-contact-heading" className="bg-elevated">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:px-10 lg:py-20">
          <div>
            <h2
              id="resume-contact-heading"
              className="text-foreground text-2xl font-semibold tracking-[-0.03em]"
            >
              Discuss an opportunity
            </h2>

            <p className="text-secondary mt-4 max-w-2xl text-base leading-8">
              I am open to Software Developer roles, international remote work, and relocation
              opportunities.
            </p>

            <p className="text-muted mt-3 text-sm">
              {profile.location} · {profile.relocationStatus}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={`mailto:${profile.email}`}
              className={buttonStyles({
                variant: "primary",
                size: "lg",
              })}
            >
              <Mail aria-hidden="true" className="size-4" />
              Email Me
            </a>

            <Link
              href="/contact"
              className={buttonStyles({
                variant: "outline",
                size: "lg",
              })}
            >
              Contact Details
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
