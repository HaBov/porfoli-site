import { getFeaturedMetrics } from "@/content";

export function HomeMetrics() {
  const metrics = getFeaturedMetrics();

  return (
    <section
      aria-labelledby="home-metrics-heading"
      className="border-b border-line"
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-accent">
            Selected outcomes
          </p>

          <h2
            id="home-metrics-heading"
            className="mt-3 text-2xl font-semibold tracking-[-0.025em] text-primary sm:text-3xl"
          >
            Systems measured by operational results
          </h2>
        </div>

        <dl className="mt-9 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              className="bg-surface p-6 sm:p-7"
            >
              <dt className="text-sm leading-6 text-secondary">
                {metric.label}
              </dt>

              <dd className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-primary sm:text-4xl">
                {metric.value}
              </dd>

              {metric.context ? (
                <p className="mt-3 text-sm leading-6 text-muted">
                  {metric.context}
                </p>
              ) : null}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
