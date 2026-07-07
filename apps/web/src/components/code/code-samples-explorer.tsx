"use client";

import { useMemo, useState } from "react";

import { CodeSampleCard } from "@/components/code/code-sample-card";
import type { CodeSampleRecord } from "@/content";
import { cn } from "@/lib/cn";

export type CodeSampleExplorerItem = {
  sample: CodeSampleRecord;
  relatedProjectTitle: string;
};

type CodeSamplesExplorerProps = {
  items: CodeSampleExplorerItem[];
};

type FilterId =
  | "all"
  | "python"
  | "typescript"
  | "api-design"
  | "service-layer"
  | "authorization"
  | "data-modeling"
  | "background-processing"
  | "integration"
  | "testing"
  | "infrastructure";

const filters: Array<{
  id: FilterId;
  label: string;
}> = [
  {
    id: "all",
    label: "All",
  },
  {
    id: "python",
    label: "Python",
  },
  {
    id: "typescript",
    label: "TypeScript",
  },
  {
    id: "api-design",
    label: "API Design",
  },
  {
    id: "service-layer",
    label: "Service Layer",
  },
  {
    id: "authorization",
    label: "Authorization",
  },
  {
    id: "data-modeling",
    label: "Data Modeling",
  },
  {
    id: "background-processing",
    label: "Background Jobs",
  },
  {
    id: "integration",
    label: "Integrations",
  },
  {
    id: "testing",
    label: "Testing",
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
  },
];

function matchesFilter(item: CodeSampleExplorerItem, filter: FilterId): boolean {
  if (filter === "all") {
    return true;
  }

  if (filter === "python" || filter === "typescript") {
    return item.sample.language === filter;
  }

  return item.sample.category === filter;
}

export function CodeSamplesExplorer({ items }: CodeSamplesExplorerProps) {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");

  const counts = useMemo(() => {
    return Object.fromEntries(
      filters.map((filter) => [
        filter.id,
        items.filter((item) => matchesFilter(item, filter.id)).length,
      ]),
    ) as Record<FilterId, number>;
  }, [items]);

  const visibleItems = useMemo(() => {
    return items.filter((item) => matchesFilter(item, activeFilter));
  }, [activeFilter, items]);

  const featuredItem =
    activeFilter === "all"
      ? visibleItems.find((item) => item.sample.slug === "rbac-permission-check")
      : undefined;

  const gridItems = featuredItem
    ? visibleItems.filter((item) => item.sample.id !== featuredItem.sample.id)
    : visibleItems;

  return (
    <section aria-labelledby="code-library-heading" className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-accent font-mono text-xs tracking-[0.12em] uppercase">
              Technical library
            </p>

            <h2
              id="code-library-heading"
              className="text-primary mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl"
            >
              Focused implementation patterns
            </h2>

            <p className="text-secondary mt-4 max-w-2xl text-base leading-8">
              Each page isolates one engineering concern, presents independently rewritten code, and
              explains validation, failure behavior, tests, and production trade-offs.
            </p>
          </div>
        </div>

        <div aria-label="Filter code samples" className="mt-8 flex flex-wrap gap-2" role="group">
          {filters.map((filter) => {
            const selected = activeFilter === filter.id;

            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setActiveFilter(filter.id)}
                className={cn(
                  "focus-visible:ring-accent min-h-11 rounded-lg border px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none",
                  selected
                    ? "border-accent bg-accent text-background"
                    : "border-line bg-surface text-secondary hover:bg-elevated hover:text-primary",
                )}
              >
                {filter.label}

                <span aria-hidden="true" className="ml-2 font-mono text-xs opacity-75">
                  {counts[filter.id]}
                </span>
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="text-muted mt-7 text-sm">
          Showing {visibleItems.length} of {items.length} code samples.
        </p>

        {featuredItem ? (
          <div className="mt-8">
            <CodeSampleCard
              sample={featuredItem.sample}
              relatedProjectTitle={featuredItem.relatedProjectTitle}
              variant="featured"
            />
          </div>
        ) : null}

        {gridItems.length > 0 ? (
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {gridItems.map((item) => (
              <CodeSampleCard
                key={item.sample.id}
                sample={item.sample}
                relatedProjectTitle={item.relatedProjectTitle}
              />
            ))}
          </div>
        ) : visibleItems.length === 0 ? (
          <div className="border-line bg-surface mt-8 rounded-2xl border p-8 text-center">
            <h3 className="text-primary text-xl font-semibold">No samples match this filter</h3>

            <p className="text-secondary mt-3 text-sm leading-7">
              Clear the selected filter to return to the complete technical library.
            </p>

            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className="bg-accent text-background focus-visible:ring-accent mt-6 min-h-11 rounded-lg px-5 py-2 text-sm font-semibold focus-visible:ring-2 focus-visible:outline-none"
            >
              Clear filters
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
