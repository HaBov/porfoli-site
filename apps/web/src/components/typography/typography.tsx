import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

const headingSizeClasses = {
  display: [
    "text-[2.5rem] leading-[1.08] tracking-[-0.035em]",
    "sm:text-[3.25rem]",
    "lg:text-[4rem]",
  ].join(" "),
  page: [
    "text-[2.125rem] leading-[1.1] tracking-[-0.025em]",
    "sm:text-5xl",
  ].join(" "),
  section: [
    "text-[1.625rem] leading-[1.2] tracking-[-0.02em]",
    "sm:text-[2rem]",
  ].join(" "),
  subsection: "text-xl leading-[1.3] sm:text-2xl",
} as const;

type HeadingElement = "h1" | "h2" | "h3" | "h4";

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: HeadingElement;
  size?: keyof typeof headingSizeClasses;
};

export function Heading({
  as: Component = "h2",
  size = "section",
  className,
  ...props
}: HeadingProps) {
  return (
    <Component
      className={cn(
        "font-semibold text-foreground",
        headingSizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}

type EyebrowProps = HTMLAttributes<HTMLParagraphElement>;

export function Eyebrow({
  className,
  ...props
}: EyebrowProps) {
  return (
    <p
      className={cn(
        "font-mono text-xs font-medium uppercase",
        "tracking-[0.08em] text-accent",
        className,
      )}
      {...props}
    />
  );
}

type LeadTextProps = HTMLAttributes<HTMLParagraphElement>;

export function LeadText({
  className,
  ...props
}: LeadTextProps) {
  return (
    <p
      className={cn(
        "max-w-[72ch] text-lg leading-8 text-secondary",
        className,
      )}
      {...props}
    />
  );
}

type BodyTextProps = HTMLAttributes<HTMLParagraphElement>;

export function BodyText({
  className,
  ...props
}: BodyTextProps) {
  return (
    <p
      className={cn(
        "max-w-[72ch] text-base leading-7 text-secondary",
        className,
      )}
      {...props}
    />
  );
}

type ArticleProseProps = HTMLAttributes<HTMLElement> & {
  as?: "article" | "div" | "section";
};

export function ArticleProse({
  as: Component = "article",
  className,
  ...props
}: ArticleProseProps) {
  return (
    <Component
      className={cn(
        "max-w-[760px] text-base leading-7 text-secondary",
        "[&_h2]:mt-16 [&_h2]:text-3xl",
        "[&_h2]:font-semibold [&_h2]:tracking-[-0.02em]",
        "[&_h2]:text-foreground",
        "[&_h3]:mt-10 [&_h3]:text-xl",
        "[&_h3]:font-semibold [&_h3]:text-foreground",
        "[&_p]:mt-5 [&_p]:max-w-[72ch]",
        "[&_ul]:mt-5 [&_ul]:list-disc [&_ul]:pl-6",
        "[&_ol]:mt-5 [&_ol]:list-decimal [&_ol]:pl-6",
        "[&_li]:mt-2",
        "[&_a]:font-medium [&_a]:text-accent",
        "[&_a]:underline [&_a]:decoration-transparent",
        "[&_a]:underline-offset-4",
        "[&_a:hover]:decoration-current",
        "[&_pre]:mt-6 [&_pre]:overflow-x-auto",
        "[&_code]:font-mono",
        className,
      )}
      {...props}
    />
  );
}
