import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

const variantClasses = {
  default: "border-line bg-surface",
  interactive: [
    "border-line bg-surface",
    "transition-[border-color,background-color,transform]",
    "hover:-translate-y-0.5 hover:border-line-strong",
    "hover:bg-surface-hover",
  ].join(" "),
  subtle: "border-transparent bg-elevated",
  bordered: "border-line bg-transparent",
} as const;

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-5 sm:p-6",
  lg: "p-6 sm:p-8",
} as const;

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "article" | "section";
  variant?: keyof typeof variantClasses;
  padding?: keyof typeof paddingClasses;
};

export function Card({
  as: Component = "div",
  variant = "default",
  padding = "md",
  className,
  ...props
}: CardProps) {
  return (
    <Component
      className={cn(
        "rounded-[var(--radius-lg)] border",
        variantClasses[variant],
        paddingClasses[padding],
        className,
      )}
      {...props}
    />
  );
}
