import {
  ArrowRight,
  BriefcaseBusiness,
  MapPin,
} from "lucide-react";
import Link from "next/link";

import {
  getCurrentExperience,
  profile,
} from "@/content";

export function HomeHero() {
  const currentExperience = getCurrentExperience();

  return (
    <section
      aria-labelledby="home-hero-heading"
      className="border-b border-line"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end lg:px-10 lg:py-32">
        <div className="max-w-4xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-accent sm:text-sm">
            {profile.heroEyebrow}
          </p>

          <h1
            id="home-hero-heading"
            className="mt-6 max-w-4xl text-balance text-4xl font-semibold tracking-[-0.04em] text-primary sm:text-5xl lg:text-7xl lg:leading-[1.04]"
          >
            {profile.heroHeading}
          </h1>

          <p className="mt-7 max-w-3xl text-pretty text-base leading-8 text-secondary sm:text-lg">
            {profile.heroDescription}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href={profile.primaryCTA.href}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {profile.primaryCTA.label}
              <ArrowRight
                aria-hidden="true"
                className="size-4"
              />
            </Link>

            <Link
              href={profile.secondaryCTA.href}
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-line bg-surface px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {profile.secondaryCTA.label}
            </Link>

            {profile.tertiaryCTA ? (
              <Link
                href={profile.tertiaryCTA.href}
                className="inline-flex min-h-12 items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold text-secondary transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {profile.tertiaryCTA.label}
              </Link>
            ) : null}
          </div>
        </div>

        <aside
          aria-label="Current professional status"
          className="rounded-2xl border border-line bg-surface p-6 shadow-sm"
        >
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
            Current status
          </p>

          <div className="mt-5 grid gap-4">
            <div className="flex gap-3">
              <MapPin
                aria-hidden="true"
                className="mt-0.5 size-5 shrink-0 text-accent"
              />

              <div>
                <p className="text-sm font-medium text-primary">
                  {profile.location}
                </p>

                <p className="mt-1 text-sm leading-6 text-secondary">
                  {profile.relocationStatus}
                </p>
              </div>
            </div>

            <div className="h-px bg-line" />

            <div className="flex gap-3">
              <BriefcaseBusiness
                aria-hidden="true"
                className="mt-0.5 size-5 shrink-0 text-accent"
              />

              <div>
                <p className="text-sm font-medium text-primary">
                  {currentExperience?.publicTitle ??
                    profile.functionalTitle}
                </p>

                <p className="mt-1 text-sm leading-6 text-secondary">
                  {currentExperience?.publicCompanyName
                    ? `${currentExperience.publicCompanyName} · ${profile.availabilityStatus}`
                    : profile.availabilityStatus}
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
