import type { Metadata } from "next";

import { ThemeSwitcher } from "@/components/theme/theme-switcher";

export const metadata: Metadata = {
  title: "Foundation Preview",
  description: "Internal preview of the portfolio design tokens and theme foundation.",
  robots: {
    index: false,
    follow: false,
  },
};

const colorTokens = [
  {
    name: "Page background",
    className: "bg-page",
  },
  {
    name: "Elevated background",
    className: "bg-elevated",
  },
  {
    name: "Surface",
    className: "bg-surface",
  },
  {
    name: "Surface hover",
    className: "bg-surface-hover",
  },
  {
    name: "Accent",
    className: "bg-accent",
  },
  {
    name: "Accent muted",
    className: "bg-accent-muted",
  },
] as const;

export default function FoundationPage() {
  return (
    <main className="bg-page text-foreground min-h-screen">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 lg:px-12">
        <header className="max-w-[760px]">
          <p className="text-accent font-mono text-xs font-medium tracking-[0.08em] uppercase">
            Foundation preview
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
            Design tokens and theme system
          </h1>

          <p className="text-secondary mt-6 text-lg leading-8">
            Internal preview for validating typography, colors, spacing, controls, and light and
            dark theme behavior before page development begins.
          </p>

          <div className="mt-8">
            <ThemeSwitcher />
          </div>
        </header>

        <section aria-labelledby="colors-heading" className="mt-24">
          <h2 className="text-3xl font-semibold tracking-[-0.02em]" id="colors-heading">
            Color tokens
          </h2>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {colorTokens.map((token) => (
              <article
                key={token.name}
                className="border-line bg-surface overflow-hidden rounded-[var(--radius-lg)] border"
              >
                <div aria-hidden="true" className={`h-28 ${token.className}`} />

                <div className="border-line border-t p-5">
                  <h3 className="font-medium">{token.name}</h3>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="typography-heading" className="border-line mt-24 border-t pt-24">
          <h2 className="text-3xl font-semibold tracking-[-0.02em]" id="typography-heading">
            Typography
          </h2>

          <div className="mt-8 grid gap-6">
            <article className="border-line bg-surface rounded-[var(--radius-lg)] border p-6">
              <p className="text-accent font-mono text-xs tracking-[0.08em] uppercase">Display</p>

              <p className="mt-4 text-4xl font-semibold tracking-[-0.03em] sm:text-6xl">
                Reliable backend systems.
              </p>
            </article>

            <article className="border-line bg-surface rounded-[var(--radius-lg)] border p-6">
              <p className="text-accent font-mono text-xs tracking-[0.08em] uppercase">Body</p>

              <p className="text-secondary mt-4 max-w-[720px] text-base leading-7">
                The portfolio uses readable long-form typography for project case studies,
                architecture explanations, technical decisions, and measurable outcomes.
              </p>
            </article>

            <article className="border-line bg-surface rounded-[var(--radius-lg)] border p-6">
              <p className="text-accent font-mono text-xs tracking-[0.08em] uppercase">Monospace</p>

              <code className="border-line bg-elevated mt-4 block overflow-x-auto rounded-[var(--radius-md)] border p-4 text-sm">
                GET /api/demo/v1/employees
              </code>
            </article>
          </div>
        </section>

        <section aria-labelledby="controls-heading" className="border-line mt-24 border-t pt-24">
          <h2 className="text-3xl font-semibold tracking-[-0.02em]" id="controls-heading">
            Control states
          </h2>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              className="bg-accent hover:bg-accent-hover min-h-11 rounded-[var(--radius-md)] px-5 font-medium text-[#08111F] transition-colors"
              type="button"
            >
              Primary action
            </button>

            <button
              className="border-line-strong bg-surface hover:bg-surface-hover min-h-11 rounded-[var(--radius-md)] border px-5 font-medium transition-colors"
              type="button"
            >
              Secondary action
            </button>

            <button
              className="text-secondary hover:bg-surface-hover hover:text-foreground min-h-11 rounded-[var(--radius-md)] px-5 font-medium transition-colors"
              type="button"
            >
              Ghost action
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
