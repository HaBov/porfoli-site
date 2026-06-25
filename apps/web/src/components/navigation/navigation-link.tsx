"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/cn";

type NavigationLinkProps = {
  href: string;
  label: string;
  className?: string;
};

function isRouteActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavigationLink({ href, label, className }: NavigationLinkProps) {
  const pathname = usePathname();
  const active = isRouteActive(pathname, href);

  return (
    <Link
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative inline-flex min-h-11 items-center px-2",
        "text-sm font-medium transition-colors",
        "focus-visible:ring-2 focus-visible:outline-none",
        "focus-visible:ring-accent focus-visible:ring-offset-2",
        "focus-visible:ring-offset-page",
        active ? "text-foreground" : "text-secondary hover:text-foreground",
        className,
      )}
      href={href}
    >
      {label}

      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-x-2 bottom-1 h-0.5 rounded-full",
          active ? "bg-accent" : "bg-transparent",
        )}
      />
    </Link>
  );
}
