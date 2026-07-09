# Free Hosting Deployment Guide

This project can be deployed without a VPS by splitting the system across managed free-tier services.

## Selected deployment target

```text
Frontend:
https://khasandzhon-portfolio.vercel.app

API:
https://khasandjon-demo-api.onrender.com

Database:
Neon PostgreSQL

Future custom domain:
https://khasandjon.is-a.dev

Architecture
User browser
  -> Vercel Next.js frontend
  -> Render FastAPI demo API
  -> Neon PostgreSQL database
Why this setup

This setup avoids the need for a personal VPS while keeping the portfolio backend demonstration available.

Vercel hosts the Next.js portfolio frontend.
Render hosts the FastAPI demo API.
Neon provides the PostgreSQL database.
is-a.dev can later provide a free developer subdomain.
Production environment summary
Web / Vercel

Required environment variable:

NEXT_PUBLIC_DEMO_API_BASE_URL=https://khasandjon-demo-api.onrender.com

Optional contact form variables:

SMTP_HOST=
SMTP_PORT=
SMTP_SECURE=
SMTP_USER=
SMTP_PASSWORD=

CONTACT_FROM_NAME=Portfolio Contact
CONTACT_FROM_EMAIL=
CONTACT_TO_EMAIL=
CONTACT_RATE_LIMIT_SALT=
API / Render

Required environment variables:

PORTFOLIO_API_ENVIRONMENT=production
PORTFOLIO_API_DEBUG=false
PORTFOLIO_API_LOG_LEVEL=INFO

PORTFOLIO_API_DATABASE_URL=postgresql+asyncpg://USER:PASSWORD@HOST/DB?ssl=require

PORTFOLIO_API_CORS_ORIGINS=["https://khasandzhon-portfolio.vercel.app"]

PORTFOLIO_API_DEMO_JSON_BODY_LIMIT_BYTES=65536
PORTFOLIO_API_DEMO_READ_RATE_LIMIT=60
PORTFOLIO_API_DEMO_WRITE_RATE_LIMIT=10
PORTFOLIO_API_DEMO_JOB_RATE_LIMIT=3
PORTFOLIO_API_DEMO_RATE_LIMIT_WINDOW_SECONDS=60
PORTFOLIO_API_DEMO_RATE_LIMIT_SALT=CHANGE_THIS_TO_A_LONG_RANDOM_VALUE

PORTFOLIO_API_DEMO_IDEMPOTENCY_TTL_HOURS=24
PORTFOLIO_API_DEMO_JOB_QUEUE_SECONDS=1.0
PORTFOLIO_API_DEMO_JOB_COMPLETION_SECONDS=4.0

PORTFOLIO_API_DOCS_URL=/api/docs
PORTFOLIO_API_OPENAPI_URL=/api/openapi.json



Замени его на:

```md
Run migrations and seed synthetic data locally before or after deploying the Render API.

Render Free web services do not provide Dashboard Shell / SSH access or one-off jobs, so database setup should be run from a trusted local machine using the Neon production database URL.

Create `apps/api/.env` locally with the Neon connection string:

```env
PORTFOLIO_API_DATABASE_URL=postgresql+asyncpg://USER:PASSWORD@HOST/DB?ssl=require

