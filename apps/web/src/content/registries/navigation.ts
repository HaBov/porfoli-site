export const NAVIGATION_GROUPS = ["primary", "utility", "legal"] as const;

export type NavigationGroup = (typeof NAVIGATION_GROUPS)[number];

export const NAVIGATION_GROUP_LABELS: Record<NavigationGroup, string> = {
  primary: "Primary",
  utility: "Utility",
  legal: "Legal",
};
