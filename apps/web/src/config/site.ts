import { profile } from "@/content/data/profile";

export type NavigationItem = {
  label: string;
  href: string;
};

export const siteConfig = {
  name: profile.fullName,
  shortName: profile.initials,
  title: profile.primaryTitle,
  functionalTitle: profile.functionalTitle,
  description: profile.professionalDescriptor,
  location: profile.location,
  availability: profile.relocationStatus,
  employmentStatus: profile.availabilityStatus,
  email: profile.email,
  phone: profile.phone,
  githubUrl: profile.githubUrl,
  resumeHref: profile.secondaryCTA.href,
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
