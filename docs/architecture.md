# Architecture Overview

This project follows a modular, clean architecture pattern with clear separation of concerns. Here's a detailed breakdown of the architectural decisions and patterns used.

## Core Architecture Principles

```
src/modules/[feature]/
├── interfaces/     # Type definitions and interfaces
├── models/         # Data access layer
├── operations/     # Business logic
├── controllers/    # Request handlers
├── schemas/        # Input validation
└── routes.ts       # Route definitions
```

### 1. Modular Structure

Each feature is organized as a self-contained module with its own:
- Business logic
- Data access
- Route handling
- Input validation
- Type definitions

**Example:**
```typescript
modules/
├── users/          # User management module
├── posts/          # Post management module
└── health/         # Health check module
```

### 2. Layer Separation

The architecture follows a clear separation of concerns with distinct layers:

#### 2.1 Controller Layer (`controllers/`)
- Handles HTTP requests and responses
- Performs input validation
- Delegates business logic to operations
- Handles error responses

```typescript
export class UserController {
  async create(request: FastifyRequest<CreateUserRequest>, reply:FastifyReply) {
    try {
      const user = await this.createUserOp.execute(request.body)
      return reply.code(201).send(user)
    } catch (error) {
      // Error handling
    }
  }
}
```

#### 2.2 Operation Layer (`operations/`)
- Contains business logic
- Implements business rules and validations
- Orchestrates data access
- Independent of HTTP layer

```typescript
export class CreateUserOperation {
  async execute(data: CreateUserDTO) {
    // Business logic
    const existingUser = await this.userModel.findByEmail(data.email)
    if (existingUser) {
      throw new Error('Email already exists')
    }
    return this.userModel.create(data)
  }
}
```

#### 2.3 Model Layer (`models/`)
- Handles data access
- Implements database operations
- Uses Prisma client for database interactions

```typescript
export class UserModel {
  async create(data: CreateUserDTO) {
    return prisma.user.create({ data })
  }
}
```

#### 2.4 Schema Layer (`schemas/`)
- Defines input validation rules
- Uses Zod for type-safe validation
- Generates TypeScript types from schemas

```typescript
export const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1)
})
```

### 3. Data Flow

1. Request → Routes
2. Routes → Controller
3. Controller → Operation
4. Operation → Model
5. Model → Database

### 4. Benefits of This Architecture

1. **Maintainability**
   - Clear separation of concerns
   - Easy to understand responsibility of each component
   - Modular structure makes changes isolated

2. **Testability**
   - Each layer can be tested independently
   - Easy to mock dependencies
   - Business logic is isolated from framework

3. **Scalability**
   - Easy to add new features as modules
   - Can split into microservices along module boundaries
   - Clear boundaries for team collaboration

4. **Type Safety**
   - End-to-end type safety with TypeScript
   - Schema validation with Zod
   - Type inference for request/response

### 5. Best Practices

1. **Dependency Injection**
   - Each layer receives its dependencies through constructor
   - Makes testing and mocking easier
   - Follows SOLID principles

2. **Error Handling**
   - Centralized error handling in controllers
   - Business errors thrown from operations
   - Clear error messages for clients

3. **Validation**
   - Input validation at route level
   - Business validation in operations
   - Database constraints in schema

### 6. Example Implementation

A typical feature implementation follows this pattern:

1. Define interfaces:
```typescript
export interface CreateUserDTO {
  email: string;
  name: string;
}
```

2. Create model:
```typescript
export class UserModel {
  async create(data: CreateUserDTO) {
    return prisma.user.create({ data })
  }
}
```

3. Implement operation:
```typescript
export class CreateUserOperation {
  constructor(private userModel: UserModel) {}
  async execute(data: CreateUserDTO) {
    // Business logic here
  }
}
```

4. Setup controller:
```typescript
export class UserController {
  constructor(private createUserOp: CreateUserOperation) {}
  async create(request: FastifyRequest, reply: FastifyReply) {
    // Handle request/response
  }
}
```

### 7. Future Considerations

This architecture supports:
- Microservices migration
- Additional cross-cutting concerns
- Team scaling
- Feature toggles
- A/B testing
- Monitoring and observability
