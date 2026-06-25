import { cn } from "@/lib/cn";

type SkipLinkProps = {
  href?: string;
  children?: string;
  className?: string;
};

export function SkipLink({
  href = "#main-content",
  children = "Skip to main content",
  className,
}: SkipLinkProps) {
  return (
    <a
      className={cn(
        "fixed left-4 top-4 z-[100]",
        "-translate-y-24 rounded-[var(--radius-md)]",
        "border border-accent bg-page px-4 py-3",
        "font-medium text-foreground shadow-[var(--shadow-md)]",
        "transition-transform",
        "focus:translate-y-0",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-accent focus-visible:ring-offset-2",
        "focus-visible:ring-offset-page",
        className,
      )}
      href={href}
    >
      {children}
    </a>
  );
}
