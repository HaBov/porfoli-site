import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type ContentContainerProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "article" | "section";
};

export function ContentContainer({
  as: Component = "div",
  className,
  ...props
}: ContentContainerProps) {
  return (
    <Component className={cn("w-full max-w-[760px]", "[&_p]:max-w-[72ch]", className)} {...props} />
  );
}
