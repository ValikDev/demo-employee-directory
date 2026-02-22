# Employee Directory

Display employee data from a MySQL database with filterable table UI.

## Prerequisites

- Node.js 24+
- Docker

## Setup

```bash
npm ci
```

Copy `.env.example` and adjust values if needed:

```bash
cp .env.example .env
```

## Database

Start the MySQL container (builds image and seeds data from `data/seed.sql`):

```bash
npm run db:start
```

Stop and remove the container:

```bash
npm run db:stop
```

Override defaults via env vars: `DB_USER`, `DB_PASSWORD`, `DB_NAME`.

## Development

```bash
npm run start:server
npm run start:client
```

Use curl for manual API testing
```bash
curl "http://localhost:4000/api/v1/filters" | jq
curl "http://localhost:4000/api/v1/employees" | jq
curl "http://localhost:4000/api/v1/employees?roles=1&countries=1&departments=1" | jq
```

## Tests

```bash
npm test
```

## Lint

```bash
npm run lint
```
