type TechnicalDecisionProps = {
  title: string;
  context: string;
  selectedApproach: string;
  reasoning: string;
  tradeoffs: readonly string[];
  optionsConsidered?: readonly string[];
};

export function TechnicalDecision({
  title,
  context,
  selectedApproach,
  reasoning,
  tradeoffs,
  optionsConsidered = [],
}: TechnicalDecisionProps) {
  return (
    <article className="border-line bg-surface rounded-2xl border p-5 sm:p-7">
      <h3 className="text-primary text-xl font-semibold tracking-[-0.02em]">{title}</h3>

      <dl className="mt-6 grid gap-6">
        <div>
          <dt className="text-accent font-mono text-xs tracking-[0.08em] uppercase">Context</dt>

          <dd className="text-secondary mt-2 text-sm leading-7">{context}</dd>
        </div>

        {optionsConsidered.length > 0 ? (
          <div>
            <dt className="text-accent font-mono text-xs tracking-[0.08em] uppercase">
              Options considered
            </dt>

            <dd>
              <ul className="mt-2 grid gap-2">
                {optionsConsidered.map((option) => (
                  <li key={option} className="text-secondary flex gap-3 text-sm leading-6">
                    <span
                      aria-hidden="true"
                      className="bg-accent mt-2 size-1.5 shrink-0 rounded-full"
                    />
                    <span>{option}</span>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ) : null}

        <div>
          <dt className="text-accent font-mono text-xs tracking-[0.08em] uppercase">
            Selected approach
          </dt>

          <dd className="text-secondary mt-2 text-sm leading-7">{selectedApproach}</dd>
        </div>

        <div>
          <dt className="text-accent font-mono text-xs tracking-[0.08em] uppercase">Reasoning</dt>

          <dd className="text-secondary mt-2 text-sm leading-7">{reasoning}</dd>
        </div>

        <div>
          <dt className="text-accent font-mono text-xs tracking-[0.08em] uppercase">Trade-offs</dt>

          <dd>
            <ul className="mt-2 grid gap-2">
              {tradeoffs.map((tradeoff) => (
                <li key={tradeoff} className="text-secondary flex gap-3 text-sm leading-6">
                  <span
                    aria-hidden="true"
                    className="bg-muted mt-2 size-1.5 shrink-0 rounded-full"
                  />
                  <span>{tradeoff}</span>
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
    </article>
  );
}
