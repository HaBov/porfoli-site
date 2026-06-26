"use client";

import Link from "next/link";

type GlobalErrorPageProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function GlobalErrorPage({ error, reset }: GlobalErrorPageProps) {
  return (
    <html lang="en">
      <body
        style={{
          alignItems: "center",
          background: "#08111f",
          color: "#f1f5f9",
          display: "flex",
          fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          justifyContent: "center",
          margin: 0,
          minHeight: "100vh",
          padding: "24px",
        }}
      >
        <main
          style={{
            maxWidth: "680px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "#5ee0a0",
              fontFamily: "monospace",
              fontSize: "12px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Application error
          </p>

          <h1
            style={{
              fontSize: "clamp(32px, 6vw, 48px)",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              margin: "16px 0 0",
            }}
          >
            The application could not load.
          </h1>

          <p
            style={{
              color: "#a6b3c5",
              fontSize: "18px",
              lineHeight: 1.7,
              margin: "24px auto 0",
            }}
          >
            Retry the application. If the problem continues, return to the homepage.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              justifyContent: "center",
              marginTop: "32px",
            }}
          >
            <button
              onClick={reset}
              style={{
                background: "#5ee0a0",
                border: "1px solid #5ee0a0",
                borderRadius: "10px",
                color: "#08111f",
                cursor: "pointer",
                font: "inherit",
                fontWeight: 600,
                minHeight: "48px",
                padding: "0 20px",
              }}
              type="button"
            >
              Retry Application
            </button>

            <Link
              href="/"
              style={{
                alignItems: "center",
                border: "1px solid #34445c",
                borderRadius: "10px",
                color: "#f1f5f9",
                display: "inline-flex",
                fontWeight: 600,
                minHeight: "46px",
                padding: "0 20px",
                textDecoration: "none",
              }}
            >
              Back to Home
            </Link>
          </div>

          {error.digest ? (
            <p
              style={{
                color: "#718096",
                fontSize: "14px",
                marginTop: "32px",
              }}
            >
              Reference: {error.digest}
            </p>
          ) : null}
        </main>
      </body>
    </html>
  );
}
