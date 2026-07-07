export type DemoApiRole = "viewer" | "manager" | "admin";

export type DemoApiMethod = "GET" | "POST";

export type DemoApiEndpoint = {
  id: string;
  label: string;
  description: string;
  method: DemoApiMethod;
  path: string;
  requiredRole: "viewer" | "manager" | "admin";
  supportsBody?: boolean;
  requiresIdempotencyKey?: boolean;
  sampleBody?: unknown;
};

export type DemoApiResult = {
  ok: boolean;
  status: number;
  statusText: string;
  durationMs: number;
  requestId?: string;
  rateLimitRemaining?: string;
  idempotencyReplayed?: string;
  payload: unknown;
};

export const DEMO_API_ROLES: Array<{
  value: DemoApiRole;
  label: string;
  description: string;
}> = [
  {
    value: "viewer",
    label: "Viewer",
    description: "Read-only access to public demo resources.",
  },
  {
    value: "manager",
    label: "Manager",
    description: "Can read audit events and create selected demo records.",
  },
  {
    value: "admin",
    label: "Admin",
    description: "Full demo role for restricted administrative actions.",
  },
];

export const DEMO_API_ENDPOINTS: DemoApiEndpoint[] = [
  {
    id: "list-employees",
    label: "List employees",
    description: "Read synthetic employees with pagination.",
    method: "GET",
    path: "/api/demo/v1/employees?page=1&pageSize=5",
    requiredRole: "viewer",
  },
  {
    id: "list-departments",
    label: "List departments",
    description: "Read synthetic departments with pagination.",
    method: "GET",
    path: "/api/demo/v1/departments?page=1&pageSize=10",
    requiredRole: "viewer",
  },
  {
    id: "permissions",
    label: "View role permissions",
    description: "Show what each simulated demo role can do.",
    method: "GET",
    path: "/api/demo/v1/permissions",
    requiredRole: "viewer",
  },
  {
    id: "audit-events",
    label: "List audit events",
    description: "Read synthetic audit events. Viewer should receive a permission error.",
    method: "GET",
    path: "/api/demo/v1/audit-events?page=1&pageSize=10",
    requiredRole: "manager",
  },
  {
    id: "start-report-job",
    label: "Start report job",
    description: "Create a simulated background job with an idempotency key.",
    method: "POST",
    path: "/api/demo/v1/jobs",
    requiredRole: "manager",
    supportsBody: true,
    requiresIdempotencyKey: true,
    sampleBody: {
      type: "employee-report",
      parameters: {
        departmentId: null,
      },
    },
  },
];

export function getDemoApiBaseUrl(): string {
  const configuredUrl = process.env.NEXT_PUBLIC_DEMO_API_BASE_URL;

  if (configuredUrl !== undefined && configuredUrl.trim().length > 0) {
    return configuredUrl.trim().replace(/\/$/, "");
  }

  if (process.env.NODE_ENV === "development") {
    return "http://127.0.0.1:8000";
  }

  return "";
}

export function getDemoApiDocsUrl(): string {
  const baseUrl = getDemoApiBaseUrl();

  if (baseUrl.length > 0) {
    return `${baseUrl}/api/docs`;
  }

  return "/api/docs";
}

function resolveDemoApiUrl(path: string): string {
  const baseUrl = getDemoApiBaseUrl();

  if (typeof window === "undefined") {
    return path;
  }

  const origin = baseUrl.length > 0 ? baseUrl : window.location.origin;

  return new URL(path, origin).toString();
}

function parseRequestBody(bodyText: string): unknown {
  const trimmedBody = bodyText.trim();

  if (trimmedBody.length === 0) {
    return undefined;
  }

  return JSON.parse(trimmedBody);
}

async function readResponsePayload(response: Response): Promise<unknown> {
  const text = await response.text();

  if (text.trim().length === 0) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return {
      raw: text,
    };
  }
}

export async function sendDemoApiRequest({
  endpoint,
  role,
  bodyText,
  idempotencyKey,
}: {
  endpoint: DemoApiEndpoint;
  role: DemoApiRole;
  bodyText?: string;
  idempotencyKey?: string;
}): Promise<DemoApiResult> {
  const headers = new Headers();

  headers.set("Accept", "application/json");
  headers.set("X-Demo-Role", role);

  let body: string | undefined;

  if (endpoint.supportsBody) {
    const parsedBody = parseRequestBody(bodyText ?? "");
    body = JSON.stringify(parsedBody ?? {});

    headers.set("Content-Type", "application/json");
  }

  if (endpoint.requiresIdempotencyKey) {
    headers.set(
      "Idempotency-Key",
      idempotencyKey?.trim() || `portfolio-demo-${Date.now().toString()}`,
    );
  }

  const startedAt = performance.now();

  const response = await fetch(resolveDemoApiUrl(endpoint.path), {
    method: endpoint.method,
    headers,
    body,
    cache: "no-store",
  });

  const durationMs = Math.round(performance.now() - startedAt);
  const payload = await readResponsePayload(response);

  return {
    ok: response.ok,
    status: response.status,
    statusText: response.statusText,
    durationMs,
    requestId:
      response.headers.get("X-Request-ID") ??
      response.headers.get("x-request-id") ??
      undefined,
    rateLimitRemaining:
      response.headers.get("X-RateLimit-Remaining") ??
      response.headers.get("x-ratelimit-remaining") ??
      undefined,
    idempotencyReplayed:
      response.headers.get("Idempotency-Replayed") ??
      response.headers.get("idempotency-replayed") ??
      undefined,
    payload,
  };
}
