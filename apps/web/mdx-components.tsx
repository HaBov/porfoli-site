import type { MDXComponents } from "mdx/types";

import { ArchitectureFlow } from "@/components/case-study/architecture-flow";
import { CaseStudySection } from "@/components/case-study/case-study-section";
import { ConfidentialityNote } from "@/components/case-study/confidentiality-note";
import { TechnicalDecision } from "@/components/case-study/technical-decision";
import { CodeBlock } from "@/components/code/code-block";
import { CodeSampleSection } from "@/components/code/code-sample-section";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    CaseStudySection,
    ArchitectureFlow,
    TechnicalDecision,
    ConfidentialityNote,
    CodeBlock,
    CodeSampleSection,

    p: ({ children }) => <p className="text-secondary text-base leading-8">{children}</p>,

    ul: ({ children }) => (
      <ul className="text-secondary grid gap-3 text-base leading-7">{children}</ul>
    ),

    ol: ({ children }) => (
      <ol className="text-secondary grid list-decimal gap-3 pl-5 text-base leading-7">
        {children}
      </ol>
    ),

    li: ({ children }) => <li className="marker:text-accent pl-1">{children}</li>,

    strong: ({ children }) => <strong className="text-foreground font-semibold">{children}</strong>,

    code: ({ children }) => (
      <code className="bg-elevated text-foreground rounded px-1.5 py-0.5 font-mono text-[0.9em]">
        {children}
      </code>
    ),

    a: ({ href = "", children }) => (
      <a
        href={href}
        className="text-accent decoration-accent/40 hover:decoration-accent focus-visible:ring-accent font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:outline-none"
      >
        {children}
      </a>
    ),

    ...components,
  };
}
