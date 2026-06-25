import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

const sizeClasses = {
  default: "max-w-[1200px]",
  wide: "max-w-[1280px]",
  article: "max-w-[760px]",
} as const;

type PageContainerProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "main" | "section";
  size?: keyof typeof sizeClasses;
};

export function PageContainer({
  as: Component = "div",
  size = "default",
  className,
  ...props
}: PageContainerProps) {
  return (
    <Component
      className={cn("mx-auto w-full px-5 sm:px-8 lg:px-12", sizeClasses[size], className)}
      {...props}
    />
  );
}
