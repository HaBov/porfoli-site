import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

type InputProps = ComponentProps<"input"> & {
  invalid?: boolean;
};

export function Input({
  invalid = false,
  className,
  "aria-invalid": ariaInvalid,
  ...props
}: InputProps) {
  const hasError =
    invalid || ariaInvalid === true || ariaInvalid === "true";

  return (
    <input
      aria-invalid={invalid ? true : ariaInvalid}
      className={cn(
        "min-h-11 w-full rounded-[var(--radius-md)]",
        "border border-line bg-surface px-3.5",
        "text-base text-foreground shadow-[var(--shadow-sm)]",
        "placeholder:text-muted",
        "transition-colors",
        "hover:border-line-strong",
        "focus-visible:border-accent focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-accent/30",
        "disabled:cursor-not-allowed disabled:bg-elevated",
        "disabled:opacity-60",
        hasError &&
          "border-error focus-visible:border-error focus-visible:ring-error/30",
        className,
      )}
      {...props}
    />
  );
}
