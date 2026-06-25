export type NavigationItem = {
  label: string;
  href: string;
};

export const siteConfig = {
  name: "Khasandjon Babadzhanov",
  shortName: "KB",
  title: "Software Developer",
  description:
    "Backend-focused Software Developer building business applications, APIs, integrations, and automation.",
  location: "Tajikistan",
  availability: "Open to relocation and international opportunities",
  resumeHref: "/resume",
} as const;

export const primaryNavigation: readonly NavigationItem[] = [
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Code Samples",
    href: "/code",
  },
  {
    label: "Experience",
    href: "/experience",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
] as const;

export const mobileNavigation: readonly NavigationItem[] = [
  {
    label: "Home",
    href: "/",
  },
  ...primaryNavigation,
] as const;
