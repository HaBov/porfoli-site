## Demo API Explorer

The portfolio includes an interactive Demo API Explorer at `/demo-api`.

It is designed to show backend engineering patterns without exposing private company systems or real production data.

The explorer supports:

- predefined safe API requests only;
- synthetic demo records;
- simulated roles through the `X-Demo-Role` header;
- structured JSON responses;
- request IDs;
- permission-error examples;
- idempotency-key demonstration;
- OpenAPI documentation link;
- API unavailable fallback state.

### Local development

Start the API database:

```bash
cd apps/api
docker compose -f compose.dev.yaml up -d
cd ../..
