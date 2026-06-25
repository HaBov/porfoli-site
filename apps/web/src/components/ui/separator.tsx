import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type SeparatorProps = HTMLAttributes<HTMLDivElement> & {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
};

export function Separator({
  orientation = "horizontal",
  decorative = true,
  className,
  ...props
}: SeparatorProps) {
  return (
    <div
      aria-hidden={decorative || undefined}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        "bg-line shrink-0",
        orientation === "horizontal" ? "h-px w-full" : "h-full min-h-6 w-px",
        className,
      )}
      role={decorative ? "presentation" : "separator"}
      {...props}
    />
  );
}
