"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";

type CopyCodeButtonProps = {
  code: string;
  className?: string;
};

export function CopyCodeButton({
  code,
  className,
}: CopyCodeButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setCopied(false);
    }, 1800);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [copied]);

  async function handleCopy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Code copied" : "Copy code"}
      className={cn(
        "text-secondary hover:bg-surface-hover hover:text-foreground",
        "focus-visible:ring-accent inline-flex min-h-10 items-center gap-2",
        "rounded-md px-3 text-xs font-semibold transition-colors",
        "focus-visible:ring-2 focus-visible:outline-none",
        className,
      )}
    >
      {copied ? (
        <Check
          aria-hidden="true"
          className="size-4"
        />
      ) : (
        <Copy
          aria-hidden="true"
          className="size-4"
        />
      )}

      <span>{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}
