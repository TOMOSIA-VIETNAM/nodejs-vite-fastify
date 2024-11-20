# Database Guide

This project uses separate migrations for reader and writer databases.

## Directory Structure
```
prisma/
├── reader/           # Reader database (external)
│   ├── schema.prisma
│   └── migrations/
├── writer/           # Writer database (internal)
│   ├── schema.prisma
│   └── migrations/
```

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

### Reader Database
```bash
# Generate Prisma Client
pnpm db:reader:migration

# Create/Apply Migrations
pnpm db:reader:migrate

# Open Prisma Studio
pnpm db:reader:studio
```

### Writer Database
```bash
# Generate Prisma Client
pnpm db:writer:migration

# Create/Apply Migrations
pnpm db:writer:migrate

# Open Prisma Studio
pnpm db:writer:studio
```

### Combined Commands
```bash
# Generate both clients
pnpm db:migration

# Run migrations for both databases
pnpm db:migrate
```
