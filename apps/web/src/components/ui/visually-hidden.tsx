import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type VisuallyHiddenProps = HTMLAttributes<HTMLSpanElement>;

export function VisuallyHidden({
  className,
  ...props
}: VisuallyHiddenProps) {
  return <span className={cn("sr-only", className)} {...props} />;
}
