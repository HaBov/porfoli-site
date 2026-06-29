import { ArrowDown } from "lucide-react";

type ArchitectureStep = {
  title: string;
  description: string;
};

type ArchitectureFlowProps = {
  label: string;
  steps: readonly ArchitectureStep[];
};

export function ArchitectureFlow({ label, steps }: ArchitectureFlowProps) {
  return (
    <figure
      aria-labelledby={`${label}-heading`}
      className="border-line bg-surface rounded-2xl border p-5 sm:p-7"
    >
      <figcaption id={`${label}-heading`} className="text-primary text-sm font-semibold">
        {label}
      </figcaption>

      <ol className="mt-5 grid gap-3">
        {steps.map((step, index) => (
          <li key={`${step.title}-${index}`}>
            <div className="bg-elevated rounded-xl p-4">
              <p className="text-accent font-mono text-xs tracking-[0.08em] uppercase">
                Step {String(index + 1).padStart(2, "0")}
              </p>

              <h3 className="text-primary mt-2 text-base font-semibold">{step.title}</h3>

              <p className="text-secondary mt-2 text-sm leading-6">{step.description}</p>
            </div>

            {index < steps.length - 1 ? (
              <div aria-hidden="true" className="text-muted flex h-8 items-center justify-center">
                <ArrowDown className="size-4" />
              </div>
            ) : null}
          </li>
        ))}
      </ol>
    </figure>
  );
}
