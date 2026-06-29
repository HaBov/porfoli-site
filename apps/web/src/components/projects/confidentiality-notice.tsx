import { LockKeyhole, ShieldCheck } from "lucide-react";

export function ConfidentialityNotice() {
  return (
    <aside
      aria-labelledby="project-confidentiality-heading"
      className="border-line bg-surface rounded-2xl border p-6 sm:p-8"
    >
      <div className="flex gap-4">
        <div className="bg-elevated text-accent flex size-11 shrink-0 items-center justify-center rounded-xl">
          <ShieldCheck aria-hidden="true" className="size-5" />
        </div>

        <div>
          <p className="text-accent font-mono text-xs tracking-[0.12em] uppercase">
            Confidentiality
          </p>

          <h2
            id="project-confidentiality-heading"
            className="text-primary mt-2 text-xl font-semibold tracking-[-0.02em]"
          >
            Internal systems, presented without exposing proprietary data
          </h2>

          <p className="text-secondary mt-3 max-w-3xl text-sm leading-7">
            Several projects were built for internal company operations. Their case studies use
            approved metrics, simplified architecture, synthetic data, and independently rewritten
            code samples.
          </p>

          <div className="bg-elevated mt-5 flex gap-3 rounded-xl p-4">
            <LockKeyhole aria-hidden="true" className="text-accent mt-0.5 size-4 shrink-0" />

            <p className="text-muted text-sm leading-6">
              Production credentials, employee information, private repositories, internal
              identifiers, operational logs, and proprietary business rules are not published.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
