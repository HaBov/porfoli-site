"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ArrowDownToLine, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { buttonStyles } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { mobileNavigation, siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

function isRouteActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MobileNavigation() {
  const pathname = usePathname();

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <IconButton className="xl:hidden" label="Open navigation menu" variant="outline">
          <Menu size={21} strokeWidth={1.8} />
        </IconButton>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm",
            "data-[state=closed]:animate-[fade-out_150ms_ease-out]",
            "data-[state=open]:animate-[fade-in_150ms_ease-out]",
            "motion-reduce:animate-none",
          )}
        />

        <Dialog.Content
          aria-describedby="mobile-navigation-description"
          className={cn(
            "fixed inset-y-0 right-0 z-50",
            "flex w-full max-w-sm flex-col",
            "border-line bg-page border-l shadow-[var(--shadow-md)]",
            "data-[state=closed]:animate-[slide-out-right_200ms_ease-out]",
            "data-[state=open]:animate-[slide-in-right_200ms_ease-out]",
            "motion-reduce:animate-none",
          )}
        >
          <VisuallyHidden>
            <Dialog.Title>Navigation menu</Dialog.Title>
          </VisuallyHidden>

          <VisuallyHidden id="mobile-navigation-description">
            Primary portfolio navigation and theme settings.
          </VisuallyHidden>

          <div className="border-line flex min-h-16 items-center justify-between border-b px-5">
            <span className="text-foreground font-semibold">Menu</span>

            <Dialog.Close asChild>
              <IconButton label="Close navigation menu">
                <X size={21} strokeWidth={1.8} />
              </IconButton>
            </Dialog.Close>
          </div>

          <nav
            aria-label="Mobile navigation"
            className="flex flex-1 flex-col overflow-y-auto px-5 py-6"
          >
            <ul className="grid gap-1">
              {mobileNavigation.map((item) => {
                const active = isRouteActive(pathname, item.href);

                return (
                  <li key={item.href}>
                    <Dialog.Close asChild>
                      <Link
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex min-h-12 items-center",
                          "rounded-[var(--radius-md)] px-4",
                          "text-base font-medium",
                          "transition-colors",
                          "focus-visible:outline-none",
                          "focus-visible:ring-2",
                          "focus-visible:ring-accent",
                          active
                            ? "bg-accent-muted text-accent"
                            : "text-secondary hover:bg-surface-hover hover:text-foreground",
                        )}
                        href={item.href}
                      >
                        {item.label}
                      </Link>
                    </Dialog.Close>
                  </li>
                );
              })}
            </ul>

            <div className="border-line mt-8 border-t pt-8">
              <p className="text-muted mb-3 font-mono text-xs tracking-[0.08em] uppercase">Theme</p>

              <ThemeSwitcher />
            </div>

            <div className="mt-auto pt-10">
              <Dialog.Close asChild>
                <Link
                  className={buttonStyles({
                    variant: "primary",
                    size: "lg",
                    className: "w-full",
                  })}
                  href={siteConfig.resumeHref}
                >
                  <ArrowDownToLine aria-hidden="true" size={18} strokeWidth={1.8} />
                  Download Resume
                </Link>
              </Dialog.Close>
            </div>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
