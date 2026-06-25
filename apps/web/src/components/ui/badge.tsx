import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

const variantClasses = {
  neutral: "border-line bg-surface-hover text-secondary",
  accent: "border-accent/30 bg-accent-muted text-accent",
  success: "border-success/30 bg-success/10 text-success",
  warning: "border-warning/30 bg-warning/10 text-warning",
  information:
    "border-information/30 bg-information/10 text-information",
  restricted: "border-error/30 bg-error/10 text-error",
  outline: "border-line bg-transparent text-secondary",
} as const;

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: keyof typeof variantClasses;
  showDot?: boolean;
};

export function Badge({
  variant = "neutral",
  showDot = false,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-7 items-center gap-1.5",
        "rounded-[var(--radius-sm)] border px-2.5 py-1",
        "text-xs font-medium leading-none",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {showDot ? (
        <span
          aria-hidden="true"
          className="size-1.5 rounded-full bg-current"
        />
      ) : null}

      {children}
    </span>
  );
}
