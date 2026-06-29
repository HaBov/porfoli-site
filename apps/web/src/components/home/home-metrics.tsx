import { getFeaturedMetrics } from "@/content";

export function HomeMetrics() {
  const metrics = getFeaturedMetrics();

  return (
    <section aria-labelledby="home-metrics-heading" className="border-line border-b">
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-accent font-mono text-xs tracking-[0.12em] uppercase">
            Selected outcomes
          </p>

          <h2
            id="home-metrics-heading"
            className="text-primary mt-3 text-2xl font-semibold tracking-[-0.025em] sm:text-3xl"
          >
            Systems measured by operational results
          </h2>
        </div>

        <dl className="border-line bg-line mt-9 grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.id} className="bg-surface p-6 sm:p-7">
              <dt className="text-secondary text-sm leading-6">{metric.label}</dt>

              <dd className="text-primary mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
                {metric.value}
              </dd>

              {metric.context ? (
                <p className="text-muted mt-3 text-sm leading-6">{metric.context}</p>
              ) : null}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
