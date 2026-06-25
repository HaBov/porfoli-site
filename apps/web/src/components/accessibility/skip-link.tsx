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
        "fixed top-4 left-4 z-[100]",
        "-translate-y-24 rounded-[var(--radius-md)]",
        "border-accent bg-page border px-4 py-3",
        "text-foreground font-medium shadow-[var(--shadow-md)]",
        "transition-transform",
        "focus:translate-y-0",
        "focus-visible:ring-2 focus-visible:outline-none",
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
