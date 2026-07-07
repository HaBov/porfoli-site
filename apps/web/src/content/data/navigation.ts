import { z } from "zod";

import { navigationListSchema, type NavigationItem } from "../schemas/navigation.schema";

const navigationInput = [
  {
    id: "navigation-home",
    label: "Home",
    href: "/",

    group: "primary",

    enabled: true,

    showInDesktop: false,
    showInMobile: true,
    showInFooter: false,

    displayOrder: 1,
  },
  {
    id: "navigation-projects",
    label: "Projects",
    href: "/projects",

    group: "primary",

    enabled: true,

    showInDesktop: true,
    showInMobile: true,
    showInFooter: true,

    displayOrder: 2,
  },
  {
    id: "navigation-code",
    label: "Code Samples",
    href: "/code",

    group: "primary",

    enabled: true,

    showInDesktop: true,
    showInMobile: true,
    showInFooter: true,

    displayOrder: 3,
  },
  {
    id: "navigation-demo-api",
    label: "Demo API",
    href: "/demo-api",

    group: "primary",

    enabled: true,

    showInDesktop: true,
    showInMobile: true,
    showInFooter: true,

    displayOrder: 4,
  },
  {
    id: "navigation-experience",
    label: "Experience",
    href: "/experience",

    group: "primary",

    enabled: true,

    showInDesktop: true,
    showInMobile: true,
    showInFooter: true,

    displayOrder: 5,
  },
  {
    id: "navigation-about",
    label: "About",
    href: "/about",

    group: "primary",

    enabled: true,

    showInDesktop: true,
    showInMobile: true,
    showInFooter: true,

    displayOrder: 6,
  },
  {
    id: "navigation-contact",
    label: "Contact",
    href: "/contact",

    group: "primary",

    enabled: true,

    showInDesktop: true,
    showInMobile: true,
    showInFooter: true,

    displayOrder: 7,
  },
  {
    id: "navigation-resume",
    label: "Resume",
    href: "/resume",

    group: "utility",

    enabled: true,

    showInDesktop: false,
    showInMobile: true,
    showInFooter: true,

    displayOrder: 8,
  },
  {
    id: "navigation-privacy",
    label: "Privacy",
    href: "/privacy",

    group: "legal",

    enabled: true,

    showInDesktop: false,
    showInMobile: false,
    showInFooter: true,

    displayOrder: 9,
  },
] satisfies z.input<typeof navigationListSchema>;

export const navigationItems: NavigationItem[] = navigationListSchema.parse(navigationInput);

function sortNavigation(items: NavigationItem[]): NavigationItem[] {
  return [...items].sort((left, right) => left.displayOrder - right.displayOrder);
}

export function getPrimaryNavigation(): NavigationItem[] {
  return sortNavigation(
    navigationItems.filter(
      (item) => item.enabled && item.group === "primary" && item.showInDesktop,
    ),
  );
}

export function getMobileNavigation(): NavigationItem[] {
  return sortNavigation(navigationItems.filter((item) => item.enabled && item.showInMobile));
}

export function getFooterNavigation(): NavigationItem[] {
  return sortNavigation(navigationItems.filter((item) => item.enabled && item.showInFooter));
}

export function getEnabledNavigation(): NavigationItem[] {
  return sortNavigation(navigationItems.filter((item) => item.enabled));
}
