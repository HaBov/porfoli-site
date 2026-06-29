import { ArrowRight, BriefcaseBusiness, MapPin } from "lucide-react";
import Link from "next/link";

import { getCurrentExperience, profile } from "@/content";

export function HomeHero() {
  const currentExperience = getCurrentExperience();

  return (
    <section aria-labelledby="home-hero-heading" className="border-line border-b">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end lg:px-10 lg:py-32">
        <div className="max-w-4xl">
          <p className="text-accent font-mono text-xs font-medium tracking-[0.16em] uppercase sm:text-sm">
            {profile.heroEyebrow}
          </p>

          <h1
            id="home-hero-heading"
            className="text-primary mt-6 max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-balance sm:text-5xl lg:text-7xl lg:leading-[1.04]"
          >
            {profile.heroHeading}
          </h1>

          <p className="text-secondary mt-7 max-w-3xl text-base leading-8 text-pretty sm:text-lg">
            {profile.heroDescription}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href={profile.primaryCTA.href}
              className="bg-accent text-accent-foreground focus-visible:ring-accent focus-visible:ring-offset-background inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {profile.primaryCTA.label}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>

            <Link
              href={profile.secondaryCTA.href}
              className="border-line bg-surface text-primary hover:bg-elevated focus-visible:ring-accent focus-visible:ring-offset-background inline-flex min-h-12 items-center justify-center rounded-lg border px-5 py-3 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {profile.secondaryCTA.label}
            </Link>

            {profile.tertiaryCTA ? (
              <Link
                href={profile.tertiaryCTA.href}
                className="text-secondary hover:text-primary focus-visible:ring-accent focus-visible:ring-offset-background inline-flex min-h-12 items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {profile.tertiaryCTA.label}
              </Link>
            ) : null}
          </div>
        </div>

        <aside
          aria-label="Current professional status"
          className="border-line bg-surface rounded-2xl border p-6 shadow-sm"
        >
          <p className="text-muted font-mono text-xs tracking-[0.12em] uppercase">Current status</p>

          <div className="mt-5 grid gap-4">
            <div className="flex gap-3">
              <MapPin aria-hidden="true" className="text-accent mt-0.5 size-5 shrink-0" />

              <div>
                <p className="text-primary text-sm font-medium">{profile.location}</p>

                <p className="text-secondary mt-1 text-sm leading-6">{profile.relocationStatus}</p>
              </div>
            </div>

            <div className="bg-line h-px" />

            <div className="flex gap-3">
              <BriefcaseBusiness
                aria-hidden="true"
                className="text-accent mt-0.5 size-5 shrink-0"
              />

              <div>
                <p className="text-primary text-sm font-medium">
                  {currentExperience?.publicTitle ?? profile.functionalTitle}
                </p>

                <p className="text-secondary mt-1 text-sm leading-6">
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
