"use client";

import { useEffect, useMemo, useState } from "react";

import {
  DEMO_API_ENDPOINTS,
  DEMO_API_ROLES,
  canRoleAccessEndpoint,
  checkDemoApiAvailability,
  getDemoApiDocsUrl,
  getDemoApiHealthUrl,
  sendDemoApiRequest,
  type DemoApiAvailabilityStatus,
  type DemoApiEndpoint,
  type DemoApiResult,
  type DemoApiRole,
} from "@/lib/demo-api";
import { cn } from "@/lib/cn";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

function formatJson(value: unknown): string {
  return JSON.stringify(value, null, 2);
}

function getInitialBody(endpoint: DemoApiEndpoint): string {
  if (!endpoint.supportsBody) {
    return "";
  }

  return formatJson(endpoint.sampleBody ?? {});
}

function getStatusVariant(result: DemoApiResult | null): "neutral" | "success" | "warning" {
  if (result === null) {
    return "neutral";
  }

  if (result.ok) {
    return "success";
  }

  return "warning";
}

function methodBadgeVariant(method: string): "accent" | "information" {
  return method === "GET" ? "information" : "accent";
}

function availabilityBadgeVariant(
  status: DemoApiAvailabilityStatus,
): "neutral" | "success" | "warning" {
  if (status === "available") {
    return "success";
  }

  if (status === "unavailable") {
    return "warning";
  }

  return "neutral";
}

function availabilityLabel(status: DemoApiAvailabilityStatus): string {
  if (status === "available") {
    return "API available";
  }

  if (status === "unavailable") {
    return "API unavailable";
  }

  return "Checking API";
}

export function DemoApiExplorer() {
  const [selectedEndpointId, setSelectedEndpointId] = useState(DEMO_API_ENDPOINTS[0]?.id ?? "");
  const [role, setRole] = useState<DemoApiRole>("viewer");
  const [bodyText, setBodyText] = useState(getInitialBody(DEMO_API_ENDPOINTS[0]));
  const [idempotencyKey, setIdempotencyKey] = useState("portfolio-demo-report");
  const [result, setResult] = useState<DemoApiResult | null>(null);
  const [clientError, setClientError] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const [availabilityStatus, setAvailabilityStatus] =
    useState<DemoApiAvailabilityStatus>("checking");
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const selectedEndpoint = useMemo(
    () =>
      DEMO_API_ENDPOINTS.find((endpoint) => endpoint.id === selectedEndpointId) ??
      DEMO_API_ENDPOINTS[0],
    [selectedEndpointId],
  );

  const selectedRole = DEMO_API_ROLES.find((demoRole) => demoRole.value === role);
  const roleCanAccessSelectedEndpoint = canRoleAccessEndpoint(role, selectedEndpoint);
  const responseText = result ? formatJson(result.payload) : "";

  async function refreshAvailability() {
    setIsCheckingAvailability(true);
    setAvailabilityStatus("checking");

    const status = await checkDemoApiAvailability();

    setAvailabilityStatus(status);
    setIsCheckingAvailability(false);
  }

  useEffect(() => {
    let isActive = true;

    async function checkInitialAvailability() {
      const status = await checkDemoApiAvailability();

      if (!isActive) {
        return;
      }

      setAvailabilityStatus(status);
      setIsCheckingAvailability(false);
    }

    void checkInitialAvailability();

    return () => {
      isActive = false;
    };
  }, []);

  function selectEndpoint(endpoint: DemoApiEndpoint) {
    setSelectedEndpointId(endpoint.id);
    setBodyText(getInitialBody(endpoint));
    setResult(null);
    setClientError(null);
    setCopyStatus("idle");
  }

  function resetForm() {
    setBodyText(getInitialBody(selectedEndpoint));
    setIdempotencyKey("portfolio-demo-report");
    setResult(null);
    setClientError(null);
    setCopyStatus("idle");
  }

  async function copyResponse() {
    if (!responseText) {
      return;
    }

    try {
      await navigator.clipboard.writeText(responseText);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
  }

  async function sendRequest() {
    setIsLoading(true);
    setResult(null);
    setClientError(null);
    setCopyStatus("idle");

    try {
      const response = await sendDemoApiRequest({
        endpoint: selectedEndpoint,
        role,
        bodyText,
        idempotencyKey,
      });

      setResult(response);

      if (availabilityStatus !== "available") {
        setAvailabilityStatus("available");
      }
    } catch (error) {
      if (error instanceof SyntaxError) {
        setClientError("Request body must be valid JSON.");
      } else {
        setAvailabilityStatus("unavailable");
        setClientError(
          "The demonstration API is temporarily unavailable. Static code samples and project details remain available.",
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card as="section" className="grid gap-6" padding="lg">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="accent">Interactive Demo</Badge>
            <Badge variant="outline">Synthetic Data Only</Badge>
            <Badge variant={availabilityBadgeVariant(availabilityStatus)}>
              {availabilityLabel(availabilityStatus)}
            </Badge>
          </div>

          <h2 className="text-foreground mt-4 text-2xl font-semibold tracking-[-0.02em]">
            Portfolio Demo API Explorer
          </h2>

          <p className="text-secondary mt-3 max-w-[72ch] leading-7">
            Send safe predefined requests to the FastAPI demonstration API. Roles are simulated
            through the <code className="font-mono">X-Demo-Role</code> header and do not represent
            production authentication.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            loading={isCheckingAvailability}
            loadingLabel="Checking"
            onClick={refreshAvailability}
            size="sm"
            variant="outline"
          >
            Check API
          </Button>

          <a
            className="text-accent hover:text-accent-hover inline-flex min-h-10 items-center text-sm font-medium underline-offset-4 hover:underline"
            href={getDemoApiDocsUrl()}
            rel="noreferrer"
            target="_blank"
          >
            Open OpenAPI docs
          </a>
        </div>
      </div>

      <Callout title="Demo safety boundary" variant="information">
        This explorer only uses predefined endpoints, synthetic records, bounded request bodies, and
        simulated roles. It does not expose internal company systems, real employee data, secrets, or
        arbitrary API calls.
      </Callout>

      {availabilityStatus === "unavailable" ? (
        <Callout title="API currently unavailable" variant="warning">
          The API health endpoint did not respond successfully. Start the FastAPI service locally or
          configure <code className="font-mono">NEXT_PUBLIC_DEMO_API_BASE_URL</code>. Static project
          pages and code samples remain available.
        </Callout>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="grid gap-6">
          <div>
            <h3 className="text-foreground text-sm font-semibold">Endpoint</h3>

            <div className="mt-3 grid gap-3">
              {DEMO_API_ENDPOINTS.map((endpoint) => {
                const isSelected = endpoint.id === selectedEndpoint.id;

                return (
                  <button
                    className={cn(
                      "rounded-[var(--radius-md)] border p-4 text-left transition-colors",
                      "focus-visible:ring-accent focus-visible:ring-2 focus-visible:outline-none",
                      isSelected
                        ? "border-accent bg-accent-muted"
                        : "border-line bg-surface hover:border-line-strong hover:bg-surface-hover",
                    )}
                    key={endpoint.id}
                    onClick={() => selectEndpoint(endpoint)}
                    type="button"
                  >
                    <span className="flex flex-wrap items-center gap-2">
                      <Badge variant={methodBadgeVariant(endpoint.method)}>{endpoint.method}</Badge>
                      <span className="text-foreground text-sm font-semibold">{endpoint.label}</span>
                      <Badge variant="outline">Min role: {endpoint.requiredRole}</Badge>
                    </span>

                    <span className="text-secondary mt-2 block text-sm leading-6">
                      {endpoint.description}
                    </span>

                    <code className="text-muted mt-3 block break-all font-mono text-xs">
                      {endpoint.path}
                    </code>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-foreground text-sm font-semibold">Role</h3>

            <div className="mt-3 grid gap-3">
              {DEMO_API_ROLES.map((demoRole) => {
                const isSelected = demoRole.value === role;

                return (
                  <button
                    className={cn(
                      "rounded-[var(--radius-md)] border p-4 text-left transition-colors",
                      "focus-visible:ring-accent focus-visible:ring-2 focus-visible:outline-none",
                      isSelected
                        ? "border-accent bg-accent-muted"
                        : "border-line bg-surface hover:border-line-strong hover:bg-surface-hover",
                    )}
                    key={demoRole.value}
                    onClick={() => setRole(demoRole.value)}
                    type="button"
                  >
                    <span className="text-foreground block text-sm font-semibold">
                      {demoRole.label}
                    </span>

                    <span className="text-secondary mt-1 block text-sm leading-6">
                      {demoRole.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <Card className="grid gap-4" padding="md" variant="bordered">
            <div>
              <h3 className="text-foreground text-sm font-semibold">Request</h3>

              <dl className="mt-3 grid gap-2 text-sm">
                <div className="grid gap-1 sm:grid-cols-[140px_1fr]">
                  <dt className="text-muted">Method</dt>
                  <dd className="text-foreground font-mono">{selectedEndpoint.method}</dd>
                </div>

                <div className="grid gap-1 sm:grid-cols-[140px_1fr]">
                  <dt className="text-muted">Endpoint</dt>
                  <dd className="text-foreground break-all font-mono">{selectedEndpoint.path}</dd>
                </div>

                <div className="grid gap-1 sm:grid-cols-[140px_1fr]">
                  <dt className="text-muted">Role header</dt>
                  <dd className="text-foreground font-mono">X-Demo-Role: {role}</dd>
                </div>

                <div className="grid gap-1 sm:grid-cols-[140px_1fr]">
                  <dt className="text-muted">Minimum role</dt>
                  <dd className="text-foreground font-mono">{selectedEndpoint.requiredRole}</dd>
                </div>

                <div className="grid gap-1 sm:grid-cols-[140px_1fr]">
                  <dt className="text-muted">Health check</dt>
                  <dd className="text-foreground break-all font-mono">{getDemoApiHealthUrl()}</dd>
                </div>
              </dl>
            </div>

            {!roleCanAccessSelectedEndpoint ? (
              <Callout title="Expected permission error" variant="warning">
                The selected <strong>{selectedRole?.label ?? role}</strong> role is below the
                minimum role for this endpoint. You can still send the request to inspect the
                structured permission error response.
              </Callout>
            ) : null}

            {selectedEndpoint.requiresIdempotencyKey ? (
              <label className="grid gap-2">
                <span className="text-foreground text-sm font-medium">Idempotency key</span>
                <input
                  className="border-line bg-surface text-foreground focus-visible:border-accent focus-visible:ring-accent/30 min-h-11 rounded-[var(--radius-md)] border px-3.5 text-base shadow-[var(--shadow-sm)] transition-colors focus-visible:ring-2 focus-visible:outline-none"
                  onChange={(event) => setIdempotencyKey(event.target.value)}
                  value={idempotencyKey}
                />
                <span className="text-muted text-sm">
                  Send the same key again to verify idempotent behavior.
                </span>
              </label>
            ) : null}

            {selectedEndpoint.supportsBody ? (
              <label className="grid gap-2">
                <span className="text-foreground text-sm font-medium">JSON body</span>
                <Textarea
                  className="min-h-40 font-mono text-sm"
                  onChange={(event) => setBodyText(event.target.value)}
                  value={bodyText}
                />
              </label>
            ) : (
              <p className="text-muted text-sm">This endpoint does not require a request body.</p>
            )}

            {clientError ? (
              <Callout title="Request error" variant="error">
                {clientError}
              </Callout>
            ) : null}

            <div className="flex flex-wrap gap-3">
              <Button loading={isLoading} loadingLabel="Sending" onClick={sendRequest}>
                Send Request
              </Button>

              <Button onClick={resetForm} variant="outline">
                Reset
              </Button>
            </div>
          </Card>

          <Card className="grid gap-4" padding="md" variant="bordered">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-foreground text-sm font-semibold">Response</h3>

                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge variant={getStatusVariant(result)}>
                    {result ? `${result.status} ${result.statusText}` : "Waiting"}
                  </Badge>

                  {result ? <Badge variant="outline">{result.durationMs} ms</Badge> : null}

                  {result?.requestId ? (
                    <Badge className="max-w-full break-all" variant="outline">
                      {result.requestId}
                    </Badge>
                  ) : null}
                </div>
              </div>

              <Button disabled={!responseText} onClick={copyResponse} size="sm" variant="outline">
                {copyStatus === "copied"
                  ? "Copied"
                  : copyStatus === "failed"
                    ? "Copy failed"
                    : "Copy JSON"}
              </Button>
            </div>

            {result?.rateLimitRemaining ? (
              <p className="text-muted text-sm">
                Rate limit remaining:{" "}
                <span className="font-mono">{result.rateLimitRemaining}</span>
              </p>
            ) : null}

            {result?.idempotencyReplayed ? (
              <p className="text-muted text-sm">
                Idempotency replayed:{" "}
                <span className="font-mono">{result.idempotencyReplayed}</span>
              </p>
            ) : null}

            <pre className="border-line bg-elevated text-secondary min-h-64 overflow-x-auto rounded-[var(--radius-md)] border p-4 text-sm leading-6">
              <code>
                {responseText ||
                  "Run a predefined request to inspect the JSON response, request ID, status, and timing."}
              </code>
            </pre>
          </Card>
        </div>
      </div>
    </Card>
  );
}
