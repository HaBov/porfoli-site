import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

const variantClasses = {
  primary:
    "border border-accent bg-accent text-page hover:border-accent-hover hover:bg-accent-hover",
  secondary: "border border-line-strong bg-surface text-foreground hover:bg-surface-hover",
  outline:
    "border border-line bg-transparent text-foreground hover:border-line-strong hover:bg-surface-hover",
  ghost:
    "border border-transparent bg-transparent text-secondary hover:bg-surface-hover hover:text-foreground",
  danger: "border border-error bg-error text-white hover:opacity-90",
} as const;

const sizeClasses = {
  sm: "min-h-9 px-3 text-sm",
  md: "min-h-11 px-4 text-sm",
  lg: "min-h-12 px-5 text-base",
  icon: "size-11 p-0",
} as const;

export type ButtonVariant = keyof typeof variantClasses;
export type ButtonSize = keyof typeof sizeClasses;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  loadingLabel?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}): string {
  return cn(
    "relative inline-flex items-center justify-center gap-2",
    "rounded-[var(--radius-md)] font-medium",
    "transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-accent focus-visible:ring-offset-2",
    "focus-visible:ring-offset-page",
    "disabled:pointer-events-none disabled:cursor-not-allowed",
    "disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  loadingLabel = "Loading",
  leftIcon,
  rightIcon,
  className,
  children,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      aria-busy={loading || undefined}
      className={buttonStyles({
        variant,
        size,
        className,
      })}
      disabled={disabled || loading}
      type={type}
      {...props}
    >
      <span className={cn("inline-flex items-center justify-center gap-2", loading && "invisible")}>
        {leftIcon}
        {children}
        {rightIcon}
      </span>

      {loading ? (
        <span
          aria-hidden="true"
          className="absolute inset-0 inline-flex items-center justify-center gap-2"
        >
          <span className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent motion-reduce:animate-none" />
          <span>{loadingLabel}</span>
        </span>
      ) : null}
    </button>
  );
}
