# Portfolio Production Deployment

This folder contains production deployment templates for the portfolio web app and FastAPI demo API.

## Services

Production deployment contains:

- `web` — Next.js portfolio site
- `api` — FastAPI demo API
- `postgres` — PostgreSQL database for synthetic demo data
- `nginx` — reverse proxy for web and API domains

Expected domain layout:

```text
https://your-domain.com
https://api.your-domain.com

Required production files

Create these files on the server:

deploy/.env
apps/api/.env.production
apps/web/.env.production

Do not commit real production environment files.

1. Server setup

Install Docker and Git on the VPS.

apt update
apt install -y git ca-certificates curl

Install Docker using the official convenience script:

curl -fsSL https://get.docker.com | sh

Enable Docker:

systemctl enable docker
systemctl start docker

Check Docker:

docker --version
docker compose version
2. Clone project
mkdir -p /opt/apps
cd /opt/apps
git clone YOUR_REPOSITORY_URL portfolio
cd portfolio
3. Create production env files

Copy examples:

cp deploy/.env.example deploy/.env
cp apps/api/.env.production.example apps/api/.env.production
cp apps/web/.env.production.example apps/web/.env.production

Generate secrets:

python3 - <<'PY'
import secrets
print("POSTGRES_PASSWORD=" + secrets.token_urlsafe(32))
print("PORTFOLIO_API_DEMO_RATE_LIMIT_SALT=" + secrets.token_urlsafe(48))
print("CONTACT_RATE_LIMIT_SALT=" + secrets.token_urlsafe(48))
PY

Edit files:

nano deploy/.env
nano apps/api/.env.production
nano apps/web/.env.production

Required replacements:

your-domain.com
api.your-domain.com
CHANGE_THIS_PASSWORD
CHANGE_THIS_TO_A_LONG_RANDOM_VALUE
CHANGE_THIS_TO_A_STRONG_DATABASE_PASSWORD

The database password must match in:

deploy/.env
apps/api/.env.production

Example:

POSTGRES_PASSWORD=real-db-password

and:

PORTFOLIO_API_DATABASE_URL=postgresql+asyncpg://portfolio_demo:real-db-password@postgres:5432/portfolio_demo
4. Configure Nginx domain names

Edit:

nano deploy/nginx/portfolio.conf

Replace:

your-domain.com
www.your-domain.com
api.your-domain.com

with real domains.

5. Start production services

Build and start:

docker compose -f deploy/compose.prod.yaml --env-file deploy/.env up -d --build

Check containers:

docker compose -f deploy/compose.prod.yaml --env-file deploy/.env ps

Check logs:

docker logs portfolio_web --tail=100
docker logs portfolio_api --tail=100
docker logs portfolio_nginx --tail=100
docker logs portfolio_postgres --tail=100
6. Run API migrations
docker compose -f deploy/compose.prod.yaml --env-file deploy/.env exec api python -m alembic upgrade head
7. Seed synthetic demo data
docker compose -f deploy/compose.prod.yaml --env-file deploy/.env exec api python -m app.db.seed_demo
8. Verify API
curl -i http://127.0.0.1/api/health/live -H "Host: api.your-domain.com"
curl -i http://127.0.0.1/api/health/ready -H "Host: api.your-domain.com"
curl -i http://127.0.0.1/api/demo/v1/employees -H "Host: api.your-domain.com" -H "X-Demo-Role: viewer"

Browser checks:

http://your-domain.com
http://api.your-domain.com/api/docs
http://your-domain.com/demo-api
9. SSL

After DNS points to the VPS, configure HTTPS.

Recommended production target:

https://your-domain.com
https://www.your-domain.com
https://api.your-domain.com

You can use Certbot, Cloudflare, or another reverse proxy / SSL termination setup.

Do not expose production only through plain HTTP.

10. Update deployment
cd /opt/apps/portfolio
git pull
docker compose -f deploy/compose.prod.yaml --env-file deploy/.env up -d --build
docker compose -f deploy/compose.prod.yaml --env-file deploy/.env exec api python -m alembic upgrade head

Run seed only when demo data must be reset or initialized:

docker compose -f deploy/compose.prod.yaml --env-file deploy/.env exec api python -m app.db.seed_demo
11. Stop services
docker compose -f deploy/compose.prod.yaml --env-file deploy/.env down

Stop and remove database volume only if you intentionally want to delete demo data:

docker compose -f deploy/compose.prod.yaml --env-file deploy/.env down -v
Production verification checklist

Web:

Home page loads.
Projects page loads.
Project case studies load.
Code samples load.
Demo API page loads.
Resume page loads.
Contact page loads.
Privacy page loads.
Mobile navigation works.
Footer navigation works.

API:

/api/health/live returns success.
/api/health/ready returns success.
/api/docs opens.
/api/demo/v1/employees works with X-Demo-Role: viewer.
/api/demo/v1/audit-events returns permission error with viewer.
/api/demo/v1/audit-events works with manager.
/api/demo/v1/jobs works with manager.
Request IDs are returned.
Rate limits are active.
CORS allows only the production web domain.

Security:

No real production credentials are committed.
No real company data is exposed.
.env.production files are ignored by Git.
API production mode does not allow localhost CORS.
API production mode does not use development salt.
Contact form uses app password or SMTP provider secret.
Demo API uses synthetic data only.
```
