import {
  BriefcaseBusiness,
  Code2,
  FileText,
  Mail,
  MapPin,
  Plane,
} from "lucide-react";
import Link from "next/link";

import { ContactForm } from "@/components/contact/contact-form";
import { buttonStyles } from "@/components/ui/button";
import {
  activeResume,
  profile,
} from "@/content";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact Khasandjon Babadzhanov about Software Developer opportunities, backend systems, integrations, and business applications.",
});

export default function ContactPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
    >
      <section className="border-line border-b">
        <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-accent font-mono text-xs font-medium tracking-[0.1em] uppercase">
              Get in touch
            </p>

            <h1 className="text-foreground mt-4 text-[2.5rem] leading-[1.08] font-semibold tracking-[-0.035em] sm:text-[3.25rem]">
              Contact
            </h1>

            <p className="text-secondary mt-6 max-w-[72ch] text-lg leading-8">
              I am open to Software Developer
              opportunities, technical
              collaborations, and conversations
              about backend systems,
              integrations, and business
              applications.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="direct-contact-heading"
        className="border-line border-b"
      >
        <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-accent font-mono text-xs tracking-[0.1em] uppercase">
              Direct contact
            </p>

            <h2
              id="direct-contact-heading"
              className="text-foreground mt-3 text-3xl font-semibold tracking-[-0.035em]"
            >
              Contact details
            </h2>

            <p className="text-secondary mt-5 max-w-2xl text-base leading-8">
              You can contact me directly
              without using the form.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <a
              href={`mailto:${profile.email}`}
              className="border-line bg-surface hover:border-line-strong hover:bg-surface-hover focus-visible:ring-accent rounded-2xl border p-6 transition-colors focus-visible:ring-2 focus-visible:outline-none"
            >
              <Mail
                aria-hidden="true"
                className="text-accent size-6"
              />

              <p className="text-muted mt-5 text-xs uppercase">
                Email
              </p>

              <p className="text-foreground mt-2 break-all text-sm font-semibold">
                {profile.email}
              </p>
            </a>

            {profile.githubUrl ? (
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="border-line bg-surface hover:border-line-strong hover:bg-surface-hover focus-visible:ring-accent rounded-2xl border p-6 transition-colors focus-visible:ring-2 focus-visible:outline-none"
              >
                <Code2
                  aria-hidden="true"
                  className="text-accent size-6"
                />

                <p className="text-muted mt-5 text-xs uppercase">
                  GitHub
                </p>

                <p className="text-foreground mt-2 text-sm font-semibold">
                  View profile
                </p>
              </a>
            ) : null}

            {profile.linkedinUrl ? (
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="border-line bg-surface hover:border-line-strong hover:bg-surface-hover focus-visible:ring-accent rounded-2xl border p-6 transition-colors focus-visible:ring-2 focus-visible:outline-none"
              >
                <BriefcaseBusiness
                  aria-hidden="true"
                  className="text-accent size-6"
                />

                <p className="text-muted mt-5 text-xs uppercase">
                  LinkedIn
                </p>

                <p className="text-foreground mt-2 text-sm font-semibold">
                  View profile
                </p>
              </a>
            ) : null}

            <Link
              href="/resume"
              className="border-line bg-surface hover:border-line-strong hover:bg-surface-hover focus-visible:ring-accent rounded-2xl border p-6 transition-colors focus-visible:ring-2 focus-visible:outline-none"
            >
              <FileText
                aria-hidden="true"
                className="text-accent size-6"
              />

              <p className="text-muted mt-5 text-xs uppercase">
                Resume
              </p>

              <p className="text-foreground mt-2 text-sm font-semibold">
                {activeResume.title}
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="contact-form-heading"
        className="border-line border-b"
      >
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:px-10 lg:py-20">
          <div>
            <p className="text-accent font-mono text-xs tracking-[0.1em] uppercase">
              Send a message
            </p>

            <h2
              id="contact-form-heading"
              className="text-foreground mt-3 text-3xl font-semibold tracking-[-0.035em]"
            >
              Contact form
            </h2>

            <p className="text-secondary mt-5 max-w-2xl text-base leading-8">
              Use this form for role
              opportunities, project discussions,
              or technical collaboration.
            </p>

            <div className="mt-10">
              <ContactForm
                fallbackEmail={profile.email}
              />
            </div>
          </div>

          <aside className="grid content-start gap-5">
            <div className="border-line bg-elevated rounded-2xl border p-6">
              <MapPin
                aria-hidden="true"
                className="text-accent size-5"
              />

              <h3 className="text-foreground mt-4 font-semibold">
                Location
              </h3>

              <p className="text-secondary mt-2 text-sm leading-6">
                {profile.location}
              </p>
            </div>

            <div className="border-line bg-elevated rounded-2xl border p-6">
              <Plane
                aria-hidden="true"
                className="text-accent size-5"
              />

              <h3 className="text-foreground mt-4 font-semibold">
                Relocation
              </h3>

              <p className="text-secondary mt-2 text-sm leading-6">
                {profile.relocationStatus}
              </p>
            </div>

            <div className="border-line bg-elevated rounded-2xl border p-6">
              <BriefcaseBusiness
                aria-hidden="true"
                className="text-accent size-5"
              />

              <h3 className="text-foreground mt-4 font-semibold">
                Availability
              </h3>

              <p className="text-secondary mt-2 text-sm leading-6">
                {profile.availabilityStatus}
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section
        aria-labelledby="contact-privacy-heading"
        className="bg-elevated"
      >
        <div className="mx-auto grid w-full max-w-7xl gap-7 px-5 py-14 sm:px-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:px-10">
          <div>
            <h2
              id="contact-privacy-heading"
              className="text-foreground text-xl font-semibold"
            >
              Privacy
            </h2>

            <p className="text-secondary mt-3 max-w-3xl text-sm leading-7">
              Contact details are used only to
              respond to your message. Please do
              not submit sensitive personal or
              confidential company information.
            </p>
          </div>

          <Link
            href="/privacy"
            className={buttonStyles({
              variant: "outline",
              size: "md",
            })}
          >
            Read Privacy Information
          </Link>
        </div>
      </section>
    </main>
  );
}
