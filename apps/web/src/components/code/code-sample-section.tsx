import type { ReactNode } from "react";

type CodeSampleSectionProps = {
  id: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
};

export function CodeSampleSection({ id, eyebrow, title, children }: CodeSampleSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="border-line scroll-mt-28 border-b pb-12 last:border-b-0 last:pb-0"
    >
      {eyebrow ? (
        <p className="text-accent font-mono text-xs tracking-[0.12em] uppercase">{eyebrow}</p>
      ) : null}

      <h2
        id={`${id}-heading`}
        className="text-foreground mt-2 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl"
      >
        {title}
      </h2>

      <div className="mt-6 grid gap-5">{children}</div>
    </section>
  );
}
