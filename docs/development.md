# Development Guide

## Development Workflow

1. **Start Development Server**
```bash
pnpm dev
```
This starts the server with hot reload enabled.

## Project Structure
```
.
├── LICENCE
├── README.md
├── docs
│   ├── api.md
│   ├── architecture.md
│   ├── contributing.md
│   ├── crud-example.md
│   ├── database.md
│   ├── deployment.md
│   ├── development.md
│   ├── getting-started.md
│   └── testing.md
├── logs
├── package.json
├── pnpm-lock.yaml
├── prisma
│   ├── reader
│   │   ├── migrations
│   │   │   ├── 20241119175009_create_users
│   │   │   │   └── migration.sql
│   │   │   └── migration_lock.toml
│   │   └── schema.prisma
│   └── writer
│       ├── migrations
│       │   ├── 20241119174931_create_posts
│       │   │   └── migration.sql
│       │   └── migration_lock.toml
│       └── schema.prisma
├── src
│   ├── app.ts
│   ├── config
│   │   ├── environment.ts
│   │   └── swagger.ts
│   ├── lib
│   │   └── prisma.ts
│   ├── logger.ts
│   ├── modules
│   │   ├── index.ts
│   │   ├── post
│   │   │   ├── controllers
│   │   │   │   └── post.controller.ts
│   │   │   ├── interfaces
│   │   │   │   └── post.interface.ts
│   │   │   ├── models
│   │   │   │   └── post.model.ts
│   │   │   ├── operations
│   │   │   │   ├── create-post.operation.ts
│   │   │   │   ├── delete-post.operation.ts
│   │   │   │   ├── get-post.operation.ts
│   │   │   │   ├── get-posts.operation.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── post.operations.ts
│   │   │   │   └── update-post.operation.ts
│   │   │   ├── routes.ts
│   │   │   └── schemas
│   │   │       └── post.schema.ts
│   │   ├── setup-routes.ts
│   ├── server.ts
│   ├── shared
│   │   ├── middlewares
│   │   │   ├── auth.ts
│   │   │   └── error-handler.ts
│   │   ├── types
│   │   │   ├── fastify.d.ts
│   │   │   └── global.d.ts
│   │   └── utils
│   │       └── logger.ts
│   └── test
│       ├── app.test.ts
│       └── fastify.ts
├── tsconfig.json
├── vite.config.ts
└── vitest.config.ts
```

## Code Style & Linting

- Prettier for code formatting
- TypeScript for type checking

```bash
# Format code
pnpm format

# Type check
pnpm type-check
```

## Development Tools

1. **VS Code Extensions**
   - ESLint
   - Prettier
   - TypeScript IDE Support

2. **Debug Configuration**
```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Server",
  "runtimeExecutable": "pnpm",
  "runtimeArgs": ["dev"],
  "skipFiles": ["<node_internals>/**"]
}
```

## Best Practices

1. Use TypeScript features
2. Follow modular architecture
3. Write tests for new features
4. Document API changes
5. Use conventional commits
