"use client";

import {
  Send,
  TriangleAlert,
} from "lucide-react";
import {
  type FormEvent,
  useRef,
  useState,
} from "react";

import {
  contactSubmissionSchema,
  type ContactVisibleField,
} from "@/content/schemas/contact.schema";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type ContactFormProps = {
  fallbackEmail: string;
};

type ContactFormValues = {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
  website: string;
};

type ContactFieldErrors = Partial<
  Record<ContactVisibleField, string>
>;

type SubmissionStatus =
  | "idle"
  | "submitting"
  | "success"
  | "error"
  | "rate-limited";

type ContactApiResponse = {
  ok?: boolean;
  code?: string;
  message?: string;
  requestId?: string;
};

const FIELD_ORDER: ContactVisibleField[] = [
  "name",
  "email",
  "company",
  "subject",
  "message",
];

const INITIAL_VALUES: ContactFormValues = {
  name: "",
  email: "",
  company: "",
  subject: "",
  message: "",
  website: "",
};

function focusField(
  field: ContactVisibleField,
): void {
  window.requestAnimationFrame(() => {
    document
      .getElementById(`contact-${field}`)
      ?.focus();
  });
}

export function ContactForm({
  fallbackEmail,
}: ContactFormProps) {
  const [values, setValues] =
    useState<ContactFormValues>(INITIAL_VALUES);

  const [errors, setErrors] =
    useState<ContactFieldErrors>({});

  const [status, setStatus] =
    useState<SubmissionStatus>("idle");

  const [statusMessage, setStatusMessage] =
    useState("");

  const startedAtRef = useRef(Date.now());

  function updateField(
    field: keyof ContactFormValues,
    value: string,
  ): void {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));

    if (
      FIELD_ORDER.includes(
        field as ContactVisibleField,
      )
    ) {
      setErrors((current) => {
        const next = { ...current };

        delete next[field as ContactVisibleField];

        return next;
      });
    }

    if (status !== "idle") {
      setStatus("idle");
      setStatusMessage("");
    }
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    const payload = {
      ...values,
      elapsedMs:
        Date.now() - startedAtRef.current,
    };

    const parsed =
      contactSubmissionSchema.safeParse(payload);

    if (!parsed.success) {
      const nextErrors: ContactFieldErrors = {};

      for (const issue of parsed.error.issues) {
        const field = issue.path[0];

        if (
          typeof field === "string" &&
          FIELD_ORDER.includes(
            field as ContactVisibleField,
          ) &&
          !nextErrors[
            field as ContactVisibleField
          ]
        ) {
          nextErrors[
            field as ContactVisibleField
          ] = issue.message;
        }
      }

      setErrors(nextErrors);
      setStatus("error");
      setStatusMessage(
        "Review the highlighted fields and submit the form again.",
      );

      const firstInvalidField =
        FIELD_ORDER.find(
          (field) => nextErrors[field],
        );

      if (firstInvalidField) {
        focusField(firstInvalidField);
      }

      return;
    }

    setStatus("submitting");
    setStatusMessage("");

    try {
      const response = await fetch(
        "/api/contact",
        {
          method: "POST",
          headers: {
            "content-type":
              "application/json",
          },
          body: JSON.stringify(parsed.data),
        },
      );

      const result =
        (await response
          .json()
          .catch(() => ({}))) as ContactApiResponse;

      if (response.ok) {
        setValues(INITIAL_VALUES);
        setErrors({});
        setStatus("success");
        setStatusMessage(
          result.message ??
            "Thanks for reaching out. Your message has been received.",
        );

        startedAtRef.current = Date.now();

        return;
      }

      if (response.status === 429) {
        setStatus("rate-limited");
        setStatusMessage(
          result.message ??
            "Too many messages were submitted. Please try again later or use email.",
        );

        return;
      }

      setStatus("error");
      setStatusMessage(
        result.message ??
          "The message could not be sent. Please contact me directly by email.",
      );
    } catch {
      setStatus("error");
      setStatusMessage(
        "The message could not be sent. Please contact me directly by email.",
      );
    }
  }

  const errorCount = Object.values(
    errors,
  ).filter(Boolean).length;

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="grid gap-6"
    >
      {errorCount > 1 ? (
        <div
          role="alert"
          className="border-error/40 bg-error/10 rounded-xl border p-5"
        >
          <div className="text-error flex items-center gap-2 font-semibold">
            <TriangleAlert
              aria-hidden="true"
              className="size-5"
            />

            Check the form
          </div>

          <ul className="text-secondary mt-3 grid gap-2 text-sm">
            {FIELD_ORDER.map((field) => {
              const message = errors[field];

              if (!message) {
                return null;
              }

              return (
                <li key={field}>
                  <button
                    type="button"
                    onClick={() =>
                      focusField(field)
                    }
                    className="focus-visible:ring-accent rounded text-left underline underline-offset-4 focus-visible:ring-2 focus-visible:outline-none"
                  >
                    {message}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="text-foreground text-sm font-medium"
          >
            Name
          </label>

          <Input
            id="contact-name"
            name="name"
            autoComplete="name"
            value={values.name}
            invalid={Boolean(errors.name)}
            aria-describedby={
              errors.name
                ? "contact-name-error"
                : undefined
            }
            onChange={(event) =>
              updateField(
                "name",
                event.target.value,
              )
            }
            className="mt-2"
          />

          {errors.name ? (
            <p
              id="contact-name-error"
              className="text-error mt-2 text-sm"
            >
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="text-foreground text-sm font-medium"
          >
            Email
          </label>

          <Input
            id="contact-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            invalid={Boolean(errors.email)}
            aria-describedby={
              errors.email
                ? "contact-email-error"
                : undefined
            }
            onChange={(event) =>
              updateField(
                "email",
                event.target.value,
              )
            }
            className="mt-2"
          />

          {errors.email ? (
            <p
              id="contact-email-error"
              className="text-error mt-2 text-sm"
            >
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-company"
          className="text-foreground text-sm font-medium"
        >
          Company{" "}
          <span className="text-muted">
            (optional)
          </span>
        </label>

        <Input
          id="contact-company"
          name="company"
          autoComplete="organization"
          value={values.company}
          invalid={Boolean(errors.company)}
          aria-describedby={
            errors.company
              ? "contact-company-error"
              : undefined
          }
          onChange={(event) =>
            updateField(
              "company",
              event.target.value,
            )
          }
          className="mt-2"
        />

        {errors.company ? (
          <p
            id="contact-company-error"
            className="text-error mt-2 text-sm"
          >
            {errors.company}
          </p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="contact-subject"
          className="text-foreground text-sm font-medium"
        >
          Subject
        </label>

        <Input
          id="contact-subject"
          name="subject"
          value={values.subject}
          invalid={Boolean(errors.subject)}
          aria-describedby={
            errors.subject
              ? "contact-subject-error"
              : undefined
          }
          onChange={(event) =>
            updateField(
              "subject",
              event.target.value,
            )
          }
          className="mt-2"
        />

        {errors.subject ? (
          <p
            id="contact-subject-error"
            className="text-error mt-2 text-sm"
          >
            {errors.subject}
          </p>
        ) : null}
      </div>

      <div>
        <div className="flex items-end justify-between gap-4">
          <label
            htmlFor="contact-message"
            className="text-foreground text-sm font-medium"
          >
            Message
          </label>

          <span className="text-muted text-xs">
            {values.message.length} / 5000
          </span>
        </div>

        <Textarea
          id="contact-message"
          name="message"
          rows={8}
          value={values.message}
          invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message
              ? "contact-message-error"
              : "contact-message-help"
          }
          onChange={(event) =>
            updateField(
              "message",
              event.target.value,
            )
          }
          className="mt-2"
        />

        {errors.message ? (
          <p
            id="contact-message-error"
            className="text-error mt-2 text-sm"
          >
            {errors.message}
          </p>
        ) : (
          <p
            id="contact-message-help"
            className="text-muted mt-2 text-sm"
          >
            Please do not include passwords,
            access tokens, or confidential
            company information.
          </p>
        )}
      </div>

      <div
        aria-hidden="true"
        className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
      >
        <label htmlFor="contact-website">
          Website
        </label>

        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) =>
            updateField(
              "website",
              event.target.value,
            )
          }
        />
      </div>

      {status === "success" ? (
        <Callout
          variant="success"
          title="Message received"
          role="status"
        >
          {statusMessage}
        </Callout>
      ) : null}

      {status === "error" ? (
        <Callout
          variant="error"
          title="Message not sent"
        >
          {statusMessage}{" "}
          <a
            href={`mailto:${fallbackEmail}`}
            className="text-error font-semibold underline underline-offset-4"
          >
            Email me directly
          </a>
          .
        </Callout>
      ) : null}

      {status === "rate-limited" ? (
        <Callout
          variant="warning"
          title="Please try again later"
          role="alert"
        >
          {statusMessage}{" "}
          <a
            href={`mailto:${fallbackEmail}`}
            className="font-semibold underline underline-offset-4"
          >
            Use direct email
          </a>
          .
        </Callout>
      ) : null}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button
          type="submit"
          size="lg"
          loading={status === "submitting"}
          loadingLabel="Sending..."
          leftIcon={
            <Send
              aria-hidden="true"
              className="size-4"
            />
          }
          className="w-full sm:w-auto"
        >
          Send Message
        </Button>

        <p className="text-muted text-sm leading-6">
          Contact details are used only to
          respond to your message.
        </p>
      </div>
    </form>
  );
}
