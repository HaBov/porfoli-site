import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

const variantClasses = {
  neutral: "border-line bg-elevated",
  information:
    "border-information/40 bg-information/10",
  success: "border-success/40 bg-success/10",
  warning: "border-warning/40 bg-warning/10",
  error: "border-error/40 bg-error/10",
} as const;

const labelClasses = {
  neutral: "text-foreground",
  information: "text-information",
  success: "text-success",
  warning: "text-warning",
  error: "text-error",
} as const;

type CalloutVariant = keyof typeof variantClasses;

type CalloutProps = HTMLAttributes<HTMLDivElement> & {
  title?: string;
  variant?: CalloutVariant;
};

export function Callout({
  title,
  variant = "neutral",
  className,
  children,
  role,
  ...props
}: CalloutProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-md)] border-l-4 p-5",
        variantClasses[variant],
        className,
      )}
      role={role ?? (variant === "error" ? "alert" : undefined)}
      {...props}
    >
      {title ? (
        <p className={cn("font-semibold", labelClasses[variant])}>
          {title}
        </p>
      ) : null}

      <div
        className={cn(
          "text-sm leading-6 text-secondary",
          title && "mt-2",
        )}
      >
        {children}
      </div>
    </div>
  );
}
