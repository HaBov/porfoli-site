import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  align?: "left" | "center";
  size?: "default" | "large";
  headingLevel?: "h1" | "h2" | "h3";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  size = "default",
  headingLevel = "h2",
  className,
}: SectionHeaderProps) {
  const Heading = headingLevel;

  return (
    <div
      className={cn(
        "flex gap-8",
        align === "center"
          ? "mx-auto max-w-[760px] flex-col items-center text-center"
          : "flex-col justify-between md:flex-row md:items-end",
        className,
      )}
    >
      <div
        className={cn(
          "max-w-[760px]",
          align === "center" && "flex flex-col items-center",
        )}
      >
        {eyebrow ? (
          <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-accent">
            {eyebrow}
          </p>
        ) : null}

        <Heading
          className={cn(
            "font-semibold tracking-[-0.025em]",
            eyebrow && "mt-4",
            size === "large"
              ? "text-4xl leading-[1.08] sm:text-5xl lg:text-6xl"
              : "text-3xl leading-tight sm:text-[34px]",
          )}
        >
          {title}
        </Heading>

        {description ? (
          <p className="mt-4 max-w-[72ch] text-base leading-7 text-secondary sm:text-lg sm:leading-8">
            {description}
          </p>
        ) : null}
      </div>

      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
