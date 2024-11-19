# Deployment Guide

## Production Build

1. **Build Application**
```bash
pnpm build
```

2. **Production Start**
```bash
pnpm start
```

## Environment Setup

Required environment variables:
```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:pass@host:5432/db
```

## Docker Deployment

1. **Build Image**
```bash
docker build -t app-name .
```

2. **Run Container**
```bash
docker run -p 3000:3000 app-name
```

## Health Checks

Monitor these endpoints:
- `/health` - Application health
- `/metrics` - Application metrics (if configured)
