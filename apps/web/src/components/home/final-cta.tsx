import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

import { profile } from "@/content";

export function FinalCTA() {
  return (
    <section aria-labelledby="home-contact-heading">
      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="border-line bg-surface overflow-hidden rounded-3xl border p-7 sm:p-10 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <div className="bg-elevated text-accent flex size-12 items-center justify-center rounded-xl">
                <Mail aria-hidden="true" className="size-5" />
              </div>

              <p className="text-accent mt-7 font-mono text-xs tracking-[0.12em] uppercase">
                Contact
              </p>

              <h2
                id="home-contact-heading"
                className="text-primary mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl"
              >
                Building a backend system, integration, or business application?
              </h2>

              <p className="text-secondary mt-5 max-w-2xl text-base leading-8">
                I am currently employed and open to Software Developer opportunities, international
                remote roles, relocation, and technical collaboration.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/contact"
                className="bg-accent text-accent-foreground focus-visible:ring-accent inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:outline-none"
              >
                Contact Me
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>

              <a
                href={`mailto:${profile.email}`}
                className="border-line bg-background text-primary hover:bg-elevated focus-visible:ring-accent inline-flex min-h-12 items-center justify-center rounded-lg border px-5 py-3 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none"
              >
                Email directly
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
