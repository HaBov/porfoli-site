import { createHash, randomUUID } from "node:crypto";

import nodemailer from "nodemailer";

import { contactSubmissionSchema } from "@/content/schemas/contact.schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 20_000;
const MIN_COMPLETION_MS = 2_500;
const MAX_COMPLETION_MS = 7_200_000;

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 3;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

declare global {
  var portfolioContactRateLimit: Map<string, RateLimitEntry> | undefined;
}

const rateLimitStore = globalThis.portfolioContactRateLimit ?? new Map<string, RateLimitEntry>();

globalThis.portfolioContactRateLimit = rateLimitStore;

type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  password: string;
  fromEmail: string;
  toEmail: string;
  fromName: string;
  rateLimitSalt: string;
};

function getSmtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT);
  const user = process.env.SMTP_USER?.trim();
  const password = process.env.SMTP_PASSWORD?.trim();

  const fromEmail = process.env.CONTACT_FROM_EMAIL?.trim() ?? user;

  const toEmail = process.env.CONTACT_TO_EMAIL?.trim();

  const rateLimitSalt = process.env.CONTACT_RATE_LIMIT_SALT?.trim();

  if (
    !host ||
    !Number.isInteger(port) ||
    port <= 0 ||
    !user ||
    !password ||
    !fromEmail ||
    !toEmail ||
    !rateLimitSalt
  ) {
    return null;
  }

  return {
    host,
    port,
    secure: process.env.SMTP_SECURE === "true",
    user,
    password,
    fromEmail,
    toEmail,
    fromName: process.env.CONTACT_FROM_NAME?.trim() ?? "Portfolio Contact",
    rateLimitSalt,
  };
}

function getClientAddress(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

function createRateLimitKey(request: Request, salt: string): string {
  const clientAddress = getClientAddress(request);

  return createHash("sha256").update(`${salt}:${clientAddress}`).digest("hex");
}

function checkRateLimit(key: string): {
  allowed: boolean;
  retryAfterSeconds: number;
} {
  const now = Date.now();

  if (rateLimitStore.size > 1000) {
    for (const [storedKey, entry] of rateLimitStore) {
      if (entry.resetAt <= now) {
        rateLimitStore.delete(storedKey);
      }
    }
  }

  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });

    return {
      allowed: true,
      retryAfterSeconds: 0,
    };
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  rateLimitStore.set(key, current);

  return {
    allowed: true,
    retryAfterSeconds: 0,
  };
}

function jsonResponse(
  body: Record<string, unknown>,
  status: number,
  requestId: string,
  extraHeaders?: HeadersInit,
): Response {
  return Response.json(body, {
    status,
    headers: {
      "cache-control": "no-store",
      "x-request-id": requestId,
      ...extraHeaders,
    },
  });
}

export async function POST(request: Request): Promise<Response> {
  const requestId = randomUUID();

  const contentType = request.headers.get("content-type") ?? "";

  if (!contentType.toLowerCase().startsWith("application/json")) {
    return jsonResponse(
      {
        ok: false,
        code: "unsupported_content_type",
        message: "The request must use JSON.",
        requestId,
      },
      415,
      requestId,
    );
  }

  const declaredLength = Number(request.headers.get("content-length") ?? "0");

  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return jsonResponse(
      {
        ok: false,
        code: "request_too_large",
        message: "The submitted message is too large.",
        requestId,
      },
      413,
      requestId,
    );
  }

  let rawBody: string;

  try {
    rawBody = await request.text();
  } catch {
    return jsonResponse(
      {
        ok: false,
        code: "invalid_body",
        message: "The request body could not be read.",
        requestId,
      },
      400,
      requestId,
    );
  }

  if (Buffer.byteLength(rawBody, "utf8") > MAX_BODY_BYTES) {
    return jsonResponse(
      {
        ok: false,
        code: "request_too_large",
        message: "The submitted message is too large.",
        requestId,
      },
      413,
      requestId,
    );
  }

  let unknownPayload: unknown;

  try {
    unknownPayload = JSON.parse(rawBody);
  } catch {
    return jsonResponse(
      {
        ok: false,
        code: "invalid_json",
        message: "The submitted form is not valid JSON.",
        requestId,
      },
      400,
      requestId,
    );
  }

  const parsed = contactSubmissionSchema.safeParse(unknownPayload);

  if (!parsed.success) {
    return jsonResponse(
      {
        ok: false,
        code: "validation_failed",
        message: "Review the form fields and submit again.",
        fieldErrors: parsed.error.flatten().fieldErrors,
        requestId,
      },
      422,
      requestId,
    );
  }

  const submission = parsed.data;

  if (submission.website !== "") {
    return jsonResponse(
      {
        ok: true,
        code: "accepted",
        message: "Thanks for reaching out. Your message has been received.",
        requestId,
      },
      202,
      requestId,
    );
  }

  if (submission.elapsedMs < MIN_COMPLETION_MS || submission.elapsedMs > MAX_COMPLETION_MS) {
    return jsonResponse(
      {
        ok: false,
        code: "invalid_form_timing",
        message: "Please reload the page and submit the form again.",
        requestId,
      },
      400,
      requestId,
    );
  }

  const smtpConfig = getSmtpConfig();

  if (!smtpConfig) {
    return jsonResponse(
      {
        ok: false,
        code: "contact_unavailable",
        message:
          "The contact form is temporarily unavailable. Please contact me directly by email.",
        requestId,
      },
      503,
      requestId,
    );
  }

  const rateLimitKey = createRateLimitKey(request, smtpConfig.rateLimitSalt);

  const rateLimit = checkRateLimit(rateLimitKey);

  if (!rateLimit.allowed) {
    return jsonResponse(
      {
        ok: false,
        code: "rate_limited",
        message: "Too many messages were submitted. Please try again later or use email.",
        requestId,
      },
      429,
      requestId,
      {
        "retry-after": String(rateLimit.retryAfterSeconds),
      },
    );
  }

  const transporter = nodemailer.createTransport({
    host: smtpConfig.host,
    port: smtpConfig.port,
    secure: smtpConfig.secure,
    auth: {
      user: smtpConfig.user,
      pass: smtpConfig.password,
    },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  const company = submission.company || "Not provided";

  const textBody = [
    "New portfolio contact request",
    "",
    `Request ID: ${requestId}`,
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Company: ${company}`,
    `Subject: ${submission.subject}`,
    "",
    "Message:",
    submission.message,
  ].join("\n");

  try {
    await transporter.sendMail({
      from: {
        name: smtpConfig.fromName,
        address: smtpConfig.fromEmail,
      },
      to: smtpConfig.toEmail,
      replyTo: submission.email,
      subject: `[Portfolio] ${submission.subject}`,
      text: textBody,
      headers: {
        "X-Portfolio-Request-ID": requestId,
      },
    });
  } catch (error) {
    console.error("contact_delivery_failed", {
      requestId,
      errorCategory: error instanceof Error ? error.name : "unknown_error",
    });

    return jsonResponse(
      {
        ok: false,
        code: "delivery_failed",
        message: "The message could not be sent. Please contact me directly by email.",
        requestId,
      },
      502,
      requestId,
    );
  }

  return jsonResponse(
    {
      ok: true,
      code: "message_sent",
      message: "Thanks for reaching out. Your message has been received.",
      requestId,
    },
    201,
    requestId,
  );
}
