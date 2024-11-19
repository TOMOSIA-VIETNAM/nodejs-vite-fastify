# Development Guide

## Development Workflow

1. **Start Development Server**
```bash
pnpm dev
```
This starts the server with hot reload enabled.

## Project Structure
```
src/
├── config/         # Configuration files
├── entities/       # TypeORM entities
├── modules/        # Feature modules
│   └── users/      # Example module
│       ├── users.controller.ts
│       ├── users.routes.ts
│       └── users.schema.ts
├── test/          # Test files
├── app.ts         # App entry
└── server.ts      # Server configuration
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
