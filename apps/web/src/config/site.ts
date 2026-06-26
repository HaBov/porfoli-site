import {
  getFooterNavigation,
  getMobileNavigation,
  getPrimaryNavigation,
} from "@/content/data/navigation";
import { profile } from "@/content/data/profile";
import type { NavigationItem as ContentNavigationItem } from "@/content/schemas/navigation.schema";

export type NavigationItem = {
  label: string;
  href: string;
};

function simplifyNavigation(items: readonly ContentNavigationItem[]): NavigationItem[] {
  return items.map(({ label, href }) => ({
    label,
    href,
  }));
}

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

export const primaryNavigation: readonly NavigationItem[] =
  simplifyNavigation(getPrimaryNavigation());

export const mobileNavigation: readonly NavigationItem[] =
  simplifyNavigation(getMobileNavigation());

export const footerNavigation: readonly NavigationItem[] =
  simplifyNavigation(getFooterNavigation());
