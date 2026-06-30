export const productionDockerfileCode = String.raw`FROM python:3.12-slim AS builder

ENV PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PIP_NO_CACHE_DIR=1

WORKDIR /build

RUN python -m venv /opt/venv

COPY requirements.txt ./

RUN /opt/venv/bin/pip install --upgrade pip && \
    /opt/venv/bin/pip install --require-hashes \
    -r requirements.txt


FROM python:3.12-slim AS runtime

ENV PATH="/opt/venv/bin:$PATH" \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

RUN groupadd --system app && \
    useradd \
    --system \
    --gid app \
    --home-dir /app \
    app

COPY --from=builder /opt/venv /opt/venv

WORKDIR /app

COPY --chown=app:app app ./app
COPY --chown=app:app alembic.ini ./
COPY --chown=app:app migrations ./migrations

USER app

EXPOSE 8000

HEALTHCHECK \
  --interval=30s \
  --timeout=5s \
  --start-period=20s \
  --retries=3 \
  CMD ["python", "-c", "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8000/health/live', timeout=3)"]

CMD [
  "uvicorn",
  "app.main:app",
  "--host",
  "0.0.0.0",
  "--port",
  "8000",
  "--proxy-headers",
  "--forwarded-allow-ips=*"
]`;

export const productionComposeCode = String.raw`name: portfolio-api

services:
  api:
    build:
      context: .
      dockerfile: Dockerfile
      target: runtime
    env_file:
      - .env.production
    expose:
      - "8000"
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    networks:
      - edge
      - internal
    restart: unless-stopped
    read_only: true
    tmpfs:
      - /tmp:size=64m,mode=1777
    security_opt:
      - no-new-privileges:true
    healthcheck:
      test:
        [
          "CMD",
          "python",
          "-c",
          "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8000/health/ready', timeout=3)",
        ]
      interval: 30s
      timeout: 5s
      start_period: 20s
      retries: 3

  nginx:
    image: nginx:1.27-alpine
    depends_on:
      api:
        condition: service_healthy
    ports:
      - "80:80"
    volumes:
      - ./deploy/nginx.conf:/etc/nginx/nginx.conf:ro
    networks:
      - edge
    restart: unless-stopped
    read_only: true
    tmpfs:
      - /var/cache/nginx:size=32m
      - /var/run:size=8m
    security_opt:
      - no-new-privileges:true

  postgres:
    image: postgres:16-alpine
    env_file:
      - .env.production
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - internal
    restart: unless-stopped
    healthcheck:
      test:
        [
          "CMD-SHELL",
          "pg_isready -U $$POSTGRES_USER -d $$POSTGRES_DB",
        ]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    command:
      [
        "redis-server",
        "--appendonly",
        "yes",
        "--maxmemory-policy",
        "noeviction",
      ]
    volumes:
      - redis_data:/data
    networks:
      - internal
    restart: unless-stopped
    healthcheck:
      test:
        [
          "CMD",
          "redis-cli",
          "ping",
        ]
      interval: 10s
      timeout: 5s
      retries: 5

networks:
  edge:
  internal:
    internal: true

volumes:
  postgres_data:
  redis_data:`;

export const productionNginxCode = String.raw`events {
  worker_connections 1024;
}

http {
  include /etc/nginx/mime.types;

  server_tokens off;
  client_max_body_size 10m;

  upstream api_backend {
    server api:8000;
    keepalive 16;
  }

  server {
    listen 80;
    server_name _;

    location = /health/nginx {
      access_log off;
      default_type text/plain;
      return 200 "ok\n";
    }

    location / {
      proxy_pass http://api_backend;
      proxy_http_version 1.1;

      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;

      proxy_connect_timeout 5s;
      proxy_send_timeout 30s;
      proxy_read_timeout 30s;
    }
  }
}`;

export const productionSmokeTestCode = String.raw`#!/usr/bin/env bash

set -euo pipefail

COMPOSE_FILE="compose.production.yaml"
BASE_URL="http://127.0.0.1"

docker compose \
  --file "$COMPOSE_FILE" \
  config \
  --quiet

docker compose \
  --file "$COMPOSE_FILE" \
  up \
  --detach \
  --build

cleanup() {
  docker compose \
    --file "$COMPOSE_FILE" \
    down
}

trap cleanup EXIT

for attempt in $(seq 1 30); do
  if curl \
    --fail \
    --silent \
    --show-error \
    "$BASE_URL/health/ready" > /dev/null
  then
    echo "Production stack is ready"
    exit 0
  fi

  sleep 2
done

docker compose \
  --file "$COMPOSE_FILE" \
  ps

docker compose \
  --file "$COMPOSE_FILE" \
  logs \
  --tail 100

echo "Production stack did not become ready"
exit 1`;
