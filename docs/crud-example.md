# CRUD Example: User Feature

This guide demonstrates how to implement CRUD operations using a User feature example.

## Entity Setup

Create `src/entities/user.entity.ts`:

```typescript
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;
}
```

## Route Implementation

Create `src/modules/users/users.routes.ts`:

```typescript
import { FastifyInstance } from 'fastify';
import { createUser, getUsers, getUser, updateUser, deleteUser } from './users.controller';
import { $ref } from './users.schema';  // We'll create this next

export async function userRoutes(app: FastifyInstance) {
  app.post('/', {
    schema: {
      body: $ref('createUserSchema'),
      response: { 201: $ref('userResponseSchema') }
    }
  }, createUser);

  app.get('/', {
    schema: {
      response: { 200: $ref('usersResponseSchema') }
    }
  }, getUsers);

  app.get('/:id', {
    schema: {
      response: { 200: $ref('userResponseSchema') }
    }
  }, getUser);

  app.put('/:id', {
    schema: {
      body: $ref('updateUserSchema'),
      response: { 200: $ref('userResponseSchema') }
    }
  }, updateUser);

  app.delete('/:id', deleteUser);
}
```

## Schema Validation

Create `src/modules/users/users.schema.ts`:

```typescript
import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const userCore = {
  email: z.string().email(),
  name: z.string(),
  isActive: z.boolean().default(true)
};

const createUserSchema = z.object({
  ...userCore
});

const updateUserSchema = z.object({
  ...userCore,
}).partial();

const userResponseSchema = z.object({
  id: z.number(),
  ...userCore
});

const usersResponseSchema = z.array(userResponseSchema);

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  updateUserSchema,
  userResponseSchema,
  usersResponseSchema
});
```

## Controller Logic

Create `src/modules/users/users.controller.ts`:

```typescript
import { FastifyReply, FastifyRequest } from 'fastify';
import { dataSource } from '../../data-source';
import { User } from '../../entities/user.entity';

const userRepository = dataSource.getRepository(User);

export async function createUser(
  request: FastifyRequest<{ Body: User }>,
  reply: FastifyReply
) {
  const user = await userRepository.save(request.body);
  return reply.code(201).send(user);
}

export async function getUsers() {
  return await userRepository.find();
}

export async function getUser(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const user = await userRepository.findOneBy({ id: parseInt(request.params.id) });
  if (!user) {
    return reply.code(404).send({ message: 'User not found' });
  }
  return user;
}

export async function updateUser(
  request: FastifyRequest<{ Params: { id: string }; Body: Partial<User> }>,
  reply: FastifyReply
) {
  const id = parseInt(request.params.id);
  const result = await userRepository.update(id, request.body);

  if (result.affected === 0) {
    return reply.code(404).send({ message: 'User not found' });
  }

  return await userRepository.findOneBy({ id });
}

export async function deleteUser(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const result = await userRepository.delete(request.params.id);

  if (result.affected === 0) {
    return reply.code(404).send({ message: 'User not found' });
  }

  return reply.code(204).send();
}
```

## Testing the API

Here are some example requests using cURL:

```bash
# Create a user
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User"}'

# Get all users
curl http://localhost:3000/users

# Get specific user
curl http://localhost:3000/users/1

# Update user
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Name"}'

# Delete user
curl -X DELETE http://localhost:3000/users/1
```

## Integration with Main App

Add to `src/modules/setup-routes.ts`:

```typescript
import { userRoutes } from './users/users.routes';
import { userSchemas } from './users/users.schema';

export async function setupRoutes(app: FastifyInstance) {
  // Register schemas
  for (const schema of userSchemas) {
    app.addSchema(schema);
  }

  // Register routes
  app.register(userRoutes, { prefix: '/users' });
}
```

## Testing

Create `src/test/users.test.ts`:

```typescript
import { test, expect } from 'vitest';
import { build } from './fastify';

test('create user', async () => {
  const app = await build();

  const response = await app.inject({
    method: 'POST',
    url: '/users',
    payload: {
      email: 'test@example.com',
      name: 'Test User'
    }
  });

  expect(response.statusCode).toBe(201);
  expect(JSON.parse(response.payload)).toMatchObject({
    email: 'test@example.com',
    name: 'Test User'
  });
});
```

## Common Patterns and Best Practices

1. **Error Handling**
   - Always return appropriate HTTP status codes
   - Use consistent error response format
   - Validate input data using schemas

2. **Database Operations**
   - Use TypeORM repositories for database operations
   - Implement proper error handling for database operations
   - Use transactions for complex operations

3. **Testing**
   - Test happy path and error cases
   - Use proper test isolation
   - Mock external dependencies

4. **Security**
   - Validate and sanitize input
   - Implement proper authentication/authorization
   - Use parameterized queries (handled by TypeORM)
