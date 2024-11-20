# Node.js Fastify TypeScript Starter

<p align="center">
  <img src="https://fastify.dev/img/logos/fastify-black.svg" alt="Fastify Logo" width="300"/>
</p>

A modern Node.js backend starter template with Fastify, TypeScript, and best practices setup.

## Quick Start

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env

# Generate Prisma clients
pnpm db:migration

# Run database migrations
pnpm db:migrate

# Start development server
pnpm dev
```
Visit `http://localhost:3000` to see your server running.

## Core Features

- 🚀 **[Fastify](https://www.fastify.io/)** - High performance web framework
- 📘 **TypeScript** - Type safety and better DX
- 🗄️ **Prisma** - Modern database ORM with migrations
- 🔄 **Hot Reload** - Fast development with Vite HMR
- ✅ **Testing** - Ready-to-use test setup with Vitest
- 📝 **Logging** - Structured logging with Pino
- 📚 **API Documentation** - Swagger/OpenAPI integration
- 🔒 **Security** - Helmet, CORS, and rate limiting
- 🎯 **Validation** - Request/Response validation with Zod

## Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server

# Testing
pnpm test         # Run tests
pnpm test:ui      # Run tests with UI
pnpm coverage     # Generate test coverage

# Database
pnpm db:writer:migration  # Generate writer database client
pnpm db:writer:migrate    # Run writer database migrations
pnpm db:reader:migration  # Generate reader database client
pnpm db:reader:migrate    # Run reader database migrations
pnpm db:migration        # Generate both database clients
pnpm db:migrate         # Run all database migrations
pnpm db:studio         # Open Prisma Studio

# Code Quality
pnpm format       # Format code with Prettier
```

## Documentation

- [Getting Started](docs/getting-started.md) - First steps and installation
- [Development Guide](docs/development.md) - Development workflow and tools
- [Architecture](docs/architecture.md) - Project architecture
- [Database Guide](docs/database.md) - Database setup and migrations
- [Testing Guide](docs/testing.md) - How to write and run tests
- [Deployment Guide](docs/deployment.md) - Production deployment instructions
- [API Documentation](docs/api.md) - API endpoints and usage

## Contributing

Contributions are welcome! Please read our [Contributing Guide](docs/contributing.md).

## License

MIT License - see [LICENSE](LICENSE) for details.

## Support

Create an issue in this repository for any questions or problems.

