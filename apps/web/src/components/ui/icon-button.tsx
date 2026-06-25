import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import { cn } from "@/lib/cn";

import { VisuallyHidden } from "./visually-hidden";

const variantClasses = {
  ghost:
    "border-transparent bg-transparent text-secondary hover:bg-surface-hover hover:text-foreground",
  outline:
    "border-line bg-transparent text-foreground hover:border-line-strong hover:bg-surface-hover",
  secondary:
    "border-line-strong bg-surface text-foreground hover:bg-surface-hover",
} as const;

type IconButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  label: string;
  children: ReactNode;
  variant?: keyof typeof variantClasses;
};

export function IconButton({
  label,
  children,
  variant = "ghost",
  className,
  title,
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center",
        "rounded-[var(--radius-md)] border",
        "transition-colors",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-accent focus-visible:ring-offset-2",
        "focus-visible:ring-offset-page",
        "disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        className,
      )}
      title={title ?? label}
      type={type}
      {...props}
    >
      <span
        aria-hidden="true"
        className="inline-flex items-center justify-center"
      >
        {children}
      </span>

      <VisuallyHidden>{label}</VisuallyHidden>
    </button>
  );
}
