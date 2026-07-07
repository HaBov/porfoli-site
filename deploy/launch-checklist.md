# Portfolio Launch Checklist

## Before deployment

- [ ] Repository is clean.
- [ ] Latest changes are pushed.
- [ ] `pnpm check` passes locally.
- [ ] API tests pass.
- [ ] Web build passes.
- [ ] Docker API image builds.
- [ ] Docker Web image builds.
- [ ] No real secrets are committed.
- [ ] Production env examples are present.
- [ ] Real production env files are ignored by Git.

## DNS

- [ ] Main domain points to the VPS.
- [ ] `www` domain points to the VPS.
- [ ] API subdomain points to the VPS.
- [ ] DNS propagation checked.

## Server

- [ ] Docker installed.
- [ ] Docker Compose available.
- [ ] Git installed.
- [ ] Project cloned to `/opt/apps/portfolio`.
- [ ] `deploy/.env` created.
- [ ] `apps/api/.env.production` created.
- [ ] `apps/web/.env.production` created.
- [ ] Database password is strong.
- [ ] API rate-limit salt is strong.
- [ ] Contact rate-limit salt is strong.
- [ ] SMTP credentials are valid.

## Production config

- [ ] `PORTFOLIO_API_ENVIRONMENT=production`.
- [ ] `PORTFOLIO_API_DEBUG=false`.
- [ ] `PORTFOLIO_API_CORS_ORIGINS` contains only production web domain.
- [ ] `NEXT_PUBLIC_DEMO_API_BASE_URL` points to production API domain.
- [ ] Nginx config contains real domain names.
- [ ] Contact form sends to the correct inbox.

## First deployment

- [ ] `docker compose up -d --build` completed.
- [ ] PostgreSQL container is healthy.
- [ ] API container is running.
- [ ] Web container is running.
- [ ] Nginx container is running.
- [ ] Alembic migrations applied.
- [ ] Synthetic demo data seeded.
- [ ] API live health check passes.
- [ ] API ready health check passes.
- [ ] OpenAPI docs open.

## Web verification

- [ ] Home page loads.
- [ ] Projects page loads.
- [ ] Project case studies load.
- [ ] Code samples page loads.
- [ ] Individual code samples load.
- [ ] Demo API Explorer loads.
- [ ] Resume page loads.
- [ ] Resume PDF downloads.
- [ ] Contact page loads.
- [ ] Contact form validation works.
- [ ] Privacy page loads.
- [ ] Desktop navigation works.
- [ ] Mobile navigation works.
- [ ] Footer navigation works.

## Demo API verification

- [ ] API status shows available.
- [ ] `Viewer` + `List employees` works.
- [ ] `Viewer` + `Audit events` returns permission error.
- [ ] `Manager` + `Audit events` works.
- [ ] `Manager` + `Start report job` works.
- [ ] Idempotency key behavior works.
- [ ] Copy JSON works.
- [ ] OpenAPI docs link works.
- [ ] Stopping API shows unavailable state.

## Security and privacy

- [ ] No real company data appears on the site.
- [ ] No private source code is exposed.
- [ ] No admin screenshots are exposed.
- [ ] No database contents are exposed.
- [ ] No server IPs or private infrastructure details are exposed.
- [ ] No `.env` files are public.
- [ ] CORS does not allow localhost in production.
- [ ] API does not run with development salt in production.

## SEO and accessibility

- [ ] Main pages have titles and descriptions.
- [ ] Important links have accessible labels.
- [ ] Keyboard navigation works.
- [ ] Focus states are visible.
- [ ] Images have appropriate alt text or are decorative.
- [ ] No obvious layout breaks on mobile.
- [ ] Browser console has no critical errors.

## After launch

- [ ] HTTPS configured.
- [ ] HTTP redirects to HTTPS.
- [ ] Main domain works with HTTPS.
- [ ] API domain works with HTTPS.
- [ ] Contact form tested on production.
- [ ] Demo API tested on production.
- [ ] Final resume PDF checked.
- [ ] Final employer-facing review completed.
