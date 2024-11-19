# Getting Started

Quick guide to get the project up and running.

## Prerequisites

- Node.js 16 or later
- pnpm (recommended) or npm
- PostgreSQL database

## Installation Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd project-name
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Configure environment**
```bash
cp .env.example .env
```

Edit `.env` with your settings:
```env
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://user:pass@localhost:5432/dbname
```

4. **Start development server**
```bash
pnpm dev
```

## Verify Installation

1. Server should be running at `http://localhost:3000`
2. Test the health endpoint: `http://localhost:3000/health`

## Next Steps

- Read the [Development Guide](development.md) to understand the workflow
- Check the [API Documentation](api.md) to see available endpoints
- Learn about [database setup](database.md) if you need persistence

## Common Issues

**Problem**: Port already in use
```bash
lsof -i :3000  # Find process using port 3000
kill -9 <PID>  # Kill the process
```

**Problem**: Database connection fails
- Check if PostgreSQL is running
- Verify database credentials in `.env`
