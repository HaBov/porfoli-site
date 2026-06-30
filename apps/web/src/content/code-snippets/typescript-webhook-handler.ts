export const typescriptWebhookHandlerCode = String.raw`import { Hono } from "hono";
import { z } from "zod";

type Bindings = {
  DB: D1Database;
  WEBHOOK_SECRET: string;
};

type WebhookDependencies = {
  persistUpdate: typeof persistUpdate;
  dispatchUpdate: typeof dispatchUpdate;
};

const telegramUserSchema = z.object({
  id: z.number().int().positive(),
  username: z.string().min(1).max(64).optional(),
  first_name: z.string().min(1).max(120),
});

const messageSchema = z.object({
  message_id: z.number().int().positive(),
  from: telegramUserSchema,
  chat: z.object({
    id: z.number().int(),
    type: z.enum([
      "private",
      "group",
      "supergroup",
      "channel",
    ]),
  }),
  text: z.string().max(4096).optional(),
});

const callbackQuerySchema = z.object({
  id: z.string().min(1),
  from: telegramUserSchema,
  data: z.string().max(128).optional(),
});

const telegramUpdateSchema = z
  .object({
    update_id: z.number().int().nonnegative(),
    message: messageSchema.optional(),
    callback_query: callbackQuerySchema.optional(),
  })
  .superRefine((update, context) => {
    if (!update.message && !update.callback_query) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Unsupported Telegram update type",
      });
    }
  });

type TelegramUpdate = z.infer<
  typeof telegramUpdateSchema
>;

type PersistResult = {
  inserted: boolean;
};

export function createWebhookApp(
  dependencies: WebhookDependencies,
) {
  const app = new Hono<{
    Bindings: Bindings;
  }>();

  app.post("/telegram/webhook", async (context) => {
    const secret = context.req.header(
      "x-telegram-bot-api-secret-token",
    );

    if (
      !secret ||
      secret !== context.env.WEBHOOK_SECRET
    ) {
      return context.json(
        {
          ok: false,
          code: "forbidden",
        },
        403,
      );
    }

    let payload: unknown;

    try {
      payload = await context.req.json();
    } catch {
      return context.json(
        {
          ok: false,
          code: "invalid_json",
        },
        400,
      );
    }

    const parsed =
      telegramUpdateSchema.safeParse(payload);

    if (!parsed.success) {
      return context.json(
        {
          ok: false,
          code: "invalid_update",
        },
        400,
      );
    }

    const stored = await dependencies.persistUpdate(
      context.env.DB,
      parsed.data,
    );

    if (!stored.inserted) {
      return context.json({
        ok: true,
        status: "duplicate",
      });
    }

    context.executionCtx.waitUntil(
      dependencies
        .dispatchUpdate(parsed.data, context.env)
        .catch((error: unknown) => {
          console.error("telegram_dispatch_failed", {
            updateId: parsed.data.update_id,
            message:
              error instanceof Error
                ? error.message
                : "unknown_error",
          });
        }),
    );

    return context.json(
      {
        ok: true,
        status: "accepted",
      },
      202,
    );
  });

  return app;
}

async function persistUpdate(
  database: D1Database,
  update: TelegramUpdate,
): Promise<PersistResult> {
  const eventType = update.message
    ? "message"
    : "callback_query";

  const actorId =
    update.message?.from.id ??
    update.callback_query?.from.id ??
    null;

  const result = await database
    .prepare(
      [
        "INSERT OR IGNORE INTO telegram_updates",
        "(update_id, event_type, actor_id, status)",
        "VALUES (?, ?, ?, 'accepted')",
      ].join(" "),
    )
    .bind(
      update.update_id,
      eventType,
      actorId,
    )
    .run();

  return {
    inserted: result.meta.changes === 1,
  };
}

async function dispatchUpdate(
  update: TelegramUpdate,
  bindings: Bindings,
): Promise<void> {
  if (update.callback_query) {
    await handleCallbackQuery(
      update.callback_query,
      bindings,
    );
    return;
  }

  if (update.message) {
    await handleMessage(
      update.message,
      bindings,
    );
  }
}

async function handleMessage(
  message: z.infer<typeof messageSchema>,
  bindings: Bindings,
): Promise<void> {
  await bindings.DB
    .prepare(
      [
        "UPDATE telegram_updates",
        "SET status = 'processed', processed_at = datetime('now')",
        "WHERE update_id = ?",
      ].join(" "),
    )
    .bind(message.message_id)
    .run();
}

async function handleCallbackQuery(
  callback: z.infer<typeof callbackQuerySchema>,
  bindings: Bindings,
): Promise<void> {
  await bindings.DB
    .prepare(
      [
        "INSERT INTO webhook_audit",
        "(event_type, actor_id, action)",
        "VALUES ('callback_query', ?, ?)",
      ].join(" "),
    )
    .bind(
      callback.from.id,
      callback.data ?? "unknown",
    )
    .run();
}

export default createWebhookApp({
  persistUpdate,
  dispatchUpdate,
});`;

export const typescriptWebhookMigrationCode = String.raw`CREATE TABLE IF NOT EXISTS telegram_updates (
  update_id INTEGER PRIMARY KEY,
  event_type TEXT NOT NULL,
  actor_id INTEGER,
  status TEXT NOT NULL CHECK (
    status IN (
      'accepted',
      'processed',
      'failed'
    )
  ),
  created_at TEXT NOT NULL DEFAULT (
    datetime('now')
  ),
  processed_at TEXT
);

CREATE INDEX IF NOT EXISTS
  ix_telegram_updates_status_created
ON telegram_updates (
  status,
  created_at
);

CREATE TABLE IF NOT EXISTS webhook_audit (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_type TEXT NOT NULL,
  actor_id INTEGER,
  action TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (
    datetime('now')
  )
);`;

export const typescriptWebhookTestCode = String.raw`import { describe, expect, it, vi } from "vitest";

import { createWebhookApp } from "../telegram-webhook";

describe("Telegram webhook", () => {
  it("rejects requests with an invalid secret", async () => {
    const persistUpdate = vi.fn();
    const dispatchUpdate = vi.fn();

    const app = createWebhookApp({
      persistUpdate,
      dispatchUpdate,
    });

    const response = await app.request(
      "/telegram/webhook",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-telegram-bot-api-secret-token": "wrong-secret",
        },
        body: JSON.stringify({
          update_id: 101,
          message: {
            message_id: 44,
            from: {
              id: 9001,
              first_name: "Demo",
            },
            chat: {
              id: 9001,
              type: "private",
            },
            text: "/start",
          },
        }),
      },
      {
        WEBHOOK_SECRET: "expected-secret",
      },
    );

    expect(response.status).toBe(403);
    expect(await response.json()).toEqual({
      ok: false,
      code: "forbidden",
    });

    expect(persistUpdate).not.toHaveBeenCalled();
    expect(dispatchUpdate).not.toHaveBeenCalled();
  });

  it("acknowledges a duplicate update safely", async () => {
    const persistUpdate = vi.fn().mockResolvedValue({
      inserted: false,
    });

    const dispatchUpdate = vi.fn();

    const app = createWebhookApp({
      persistUpdate,
      dispatchUpdate,
    });

    const response = await app.request(
      "/telegram/webhook",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-telegram-bot-api-secret-token":
            "expected-secret",
        },
        body: JSON.stringify({
          update_id: 102,
          callback_query: {
            id: "callback-001",
            from: {
              id: 9002,
              first_name: "Portfolio",
            },
            data: "profile:start",
          },
        }),
      },
      {
        WEBHOOK_SECRET: "expected-secret",
      },
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      ok: true,
      status: "duplicate",
    });

    expect(persistUpdate).toHaveBeenCalledTimes(1);
    expect(dispatchUpdate).not.toHaveBeenCalled();
  });
});`;
