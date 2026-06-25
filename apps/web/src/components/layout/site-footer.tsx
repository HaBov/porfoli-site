import Link from "next/link";

import { primaryNavigation, siteConfig } from "@/config/site";

import { PageContainer } from "./page-container";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-line bg-elevated border-t">
      <PageContainer className="py-12 sm:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link
              className="text-foreground focus-visible:ring-accent inline-flex rounded-[var(--radius-sm)] text-lg font-semibold focus-visible:ring-2 focus-visible:outline-none"
              href="/"
            >
              {siteConfig.name}
            </Link>

            <p className="text-secondary mt-3 max-w-md leading-7">{siteConfig.description}</p>

            <p className="text-muted mt-4 text-sm">
              Based in {siteConfig.location} · {siteConfig.availability}
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="text-muted font-mono text-xs font-medium tracking-[0.08em] uppercase">
              Navigation
            </h2>

            <ul className="mt-4 grid gap-1">
              {primaryNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    className="text-secondary hover:text-foreground focus-visible:ring-accent inline-flex min-h-11 items-center rounded-[var(--radius-sm)] text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-muted font-mono text-xs font-medium tracking-[0.08em] uppercase">
              Professional
            </h2>

            <ul className="mt-4 grid gap-1">
              <li>
                <Link
                  className="text-secondary hover:text-foreground focus-visible:ring-accent inline-flex min-h-11 items-center rounded-[var(--radius-sm)] text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
                  href="/contact"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  className="text-secondary hover:text-foreground focus-visible:ring-accent inline-flex min-h-11 items-center rounded-[var(--radius-sm)] text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
                  href={siteConfig.resumeHref}
                >
                  Resume
                </Link>
              </li>

              <li>
                <Link
                  className="text-secondary hover:text-foreground focus-visible:ring-accent inline-flex min-h-11 items-center rounded-[var(--radius-sm)] text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
                  href="/privacy"
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-line text-muted mt-12 flex flex-col gap-3 border-t pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} {siteConfig.name}
          </p>

          <p>Built with Next.js, TypeScript, Python, and FastAPI.</p>
        </div>
      </PageContainer>
    </footer>
  );
}
