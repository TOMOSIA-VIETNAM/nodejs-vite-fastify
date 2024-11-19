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

# Start development server
pnpm dev
```
Visit `http://localhost:3000` to see your server running.

## Core Features

- 🚀 **[Fastify](https://www.fastify.io/)** - High performance web framework
- 📘 **TypeScript** - Type safety and better DX
- 🗄️ **TypeORM** - Database ORM with migrations
- 🔄 **Hot Reload** - Fast development with HMR
- ✅ **Testing** - Ready-to-use test setup
- 📝 **Logging** - Structured logging configuration

## Documentation

- [Getting Started](docs/getting-started.md) - First steps and installation
- [Development Guide](docs/development.md) - Development workflow and tools
- [Architecture](docs/architecture.md) - Project architecture
- [Database Guide](docs/database.md) - Database setup and migrations
- [Testing Guide](docs/testing.md) - How to write and run tests
- [Deployment Guide](docs/deployment.md) - Production deployment instructions
- [API Documentation](docs/api.md) - API endpoints and usage

## Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm test         # Run tests
pnpm format       # Format code
```

## Project Structure

```
src/
├── config/         # App configuration
├── modules/        # Feature modules
├── test/          # Test files
├── app.ts         # App entry point
├── server.ts      # Server setup
└── logger.ts      # Logger setup
```

## Contributing

Contributions are welcome! Please read our [Contributing Guide](docs/contributing.md).

## License

MIT License - see [LICENSE](LICENSE) for details.

## Support

Create an issue in this repository for any questions or problems.

