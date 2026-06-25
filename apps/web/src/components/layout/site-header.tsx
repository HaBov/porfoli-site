import { ArrowDownToLine } from "lucide-react";
import Link from "next/link";

import { siteConfig } from "@/config/site";

import { DesktopNavigation } from "../navigation/desktop-navigation";
import { MobileNavigation } from "../navigation/mobile-navigation";
import { ThemeSwitcher } from "../theme/theme-switcher";
import { buttonStyles } from "../ui/button";
import { PageContainer } from "./page-container";

export function SiteHeader() {
  return (
    <header className="border-line bg-page/90 sticky top-0 z-40 border-b backdrop-blur-xl">
      <PageContainer className="flex min-h-16 items-center gap-4 lg:min-h-[72px]">
        <Link
          aria-label={`${siteConfig.name}, Home`}
          className="group focus-visible:ring-accent flex min-h-11 min-w-0 items-center gap-3 rounded-[var(--radius-md)] focus-visible:ring-2 focus-visible:outline-none"
          href="/"
        >
          <span
            aria-hidden="true"
            className="border-line bg-surface text-accent group-hover:border-line-strong group-hover:bg-surface-hover inline-flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] border font-mono text-sm font-semibold transition-colors"
          >
            {siteConfig.shortName}
          </span>

          <span className="hidden min-w-0 sm:block">
            <span className="text-foreground block truncate text-sm font-semibold">
              {siteConfig.name}
            </span>

            <span className="text-muted block text-xs">{siteConfig.title}</span>
          </span>
        </Link>

        <div className="ml-auto hidden items-center gap-4 xl:flex">
          <DesktopNavigation />

          <div aria-hidden="true" className="bg-line h-6 w-px" />

          <ThemeSwitcher />

          <Link
            className={buttonStyles({
              variant: "secondary",
              size: "md",
            })}
            href={siteConfig.resumeHref}
          >
            <ArrowDownToLine aria-hidden="true" size={17} strokeWidth={1.8} />
            Resume
          </Link>
        </div>

        <div className="ml-auto xl:hidden">
          <MobileNavigation />
        </div>
      </PageContainer>
    </header>
  );
}
