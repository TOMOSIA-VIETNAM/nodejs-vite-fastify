# Database Guide

## Setup

1. **Install PostgreSQL**
   - [Download PostgreSQL](https://www.postgresql.org/download/)
   - Create database: `createdb your_db_name`

2. **Configure Connection**
   Edit `.env`:
```env
DB_HOST=host.docker.internal
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=fastify-boilerplate
DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=public"
DATABASE_READER_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=reader"
DATABASE_WRITER_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=writer"
```

## Migrations Commands

### Writer Database
- Generate client: `pnpm db:writer:migration`
- Run migrations: `pnpm db:writer:migrate`

### Reader Database
- Generate client: `pnpm db:reader:migration`
- Run migrations: `pnpm db:reader:migrate`

### Combined Commands
- Generate both clients: `pnpm db:migration`
- Run both migrations: `pnpm db:migrate`
