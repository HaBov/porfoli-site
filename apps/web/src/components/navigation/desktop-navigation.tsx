import { primaryNavigation } from "@/config/site";

import { NavigationLink } from "./navigation-link";

export function DesktopNavigation() {
  return (
    <nav aria-label="Primary navigation" className="hidden items-center gap-1 xl:flex">
      {primaryNavigation.map((item) => (
        <NavigationLink key={item.href} href={item.href} label={item.label} />
      ))}
    </nav>
  );
}
