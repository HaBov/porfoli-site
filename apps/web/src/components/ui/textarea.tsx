import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

type TextareaProps = ComponentProps<"textarea"> & {
  invalid?: boolean;
};

export function Textarea({
  invalid = false,
  className,
  "aria-invalid": ariaInvalid,
  ...props
}: TextareaProps) {
  const hasError =
    invalid || ariaInvalid === true || ariaInvalid === "true";

  return (
    <textarea
      aria-invalid={invalid ? true : ariaInvalid}
      className={cn(
        "min-h-32 w-full resize-y",
        "rounded-[var(--radius-md)]",
        "border border-line bg-surface px-3.5 py-3",
        "text-base leading-6 text-foreground",
        "shadow-[var(--shadow-sm)]",
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
