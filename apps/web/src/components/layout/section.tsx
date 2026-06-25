import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

const variantClasses = {
  default: "",
  muted: "border-y border-line bg-elevated",
  bordered: "border-y border-line",
} as const;

const spacingClasses = {
  compact: "py-12 sm:py-16",
  default: "py-16 sm:py-20 lg:py-24",
  large: "py-20 sm:py-24 lg:py-32",
} as const;

type SectionProps = HTMLAttributes<HTMLElement> & {
  as?: "section" | "div";
  variant?: keyof typeof variantClasses;
  spacing?: keyof typeof spacingClasses;
};

export function Section({
  as: Component = "section",
  variant = "default",
  spacing = "default",
  className,
  ...props
}: SectionProps) {
  return (
    <Component
      className={cn(variantClasses[variant], spacingClasses[spacing], className)}
      {...props}
    />
  );
}
