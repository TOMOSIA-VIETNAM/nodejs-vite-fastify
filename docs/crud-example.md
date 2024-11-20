# CRUD Example: User Feature

## Schema Definition

Define model schema prisma

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  posts     Post[]
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Route Implementation

Create `src/modules/users/users.routes.ts`:

```typescript
import { FastifyInstance } from 'fastify';
import { createUser, getUsers, getUser, updateUser, deleteUser } from './users.controller';
import { $ref } from './users.schema';

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
import { prisma } from '../../lib/prisma';
import { Prisma } from '@prisma/client';

export async function createUser(
  request: FastifyRequest<{ Body: Prisma.UserCreateInput }>,
  reply: FastifyReply
) {
  try {
    const user = await prisma.user.create({
      data: request.body
    });
    return reply.code(201).send(user);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return reply.code(409).send({ message: 'Email already exists' });
      }
    }
    throw error;
  }
}

export async function getUsers() {
  return await prisma.user.findMany();
}

export async function getUser(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(request.params.id) }
  });

  if (!user) {
    return reply.code(404).send({ message: 'User not found' });
  }
  return user;
}

export async function updateUser(
  request: FastifyRequest<{
    Params: { id: string };
    Body: Prisma.UserUpdateInput
  }>,
  reply: FastifyReply
) {
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(request.params.id) },
      data: request.body
    });
    return user;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return reply.code(404).send({ message: 'User not found' });
      }
    }
    throw error;
  }
}

export async function deleteUser(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    await prisma.user.delete({
      where: { id: parseInt(request.params.id) }
    });
    return reply.code(204).send();
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return reply.code(404).send({ message: 'User not found' });
      }
    }
    throw error;
  }
}
```

## Prisma Client Setup

Tạo file `src/lib/prisma.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();
```

## API Testing Commands

### User Endpoints

1. Create User
```bash
curl -X POST http://localhost:3000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User"
  }' | json_pp
```

2. Get All Users
```bash
curl http://localhost:3000/api/v1/users | json_pp
```

3. Get User by ID
```bash
curl http://localhost:3000/api/v1/users/1 | json_pp
```

4. Update User
```bash
curl -X PATCH http://localhost:3000/api/v1/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name",
    "email": "updated@example.com"
  }' | json_pp
```

5. Delete User
```bash
curl -X DELETE http://localhost:3000/api/v1/users/1
```

### Post Endpoints

1. Create Post
```bash
curl -X POST http://localhost:3000/api/v1/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Post",
    "content": "This is a test post content",
    "published": true,
    "authorId": 1
  }' | json_pp
```

2. Get All Posts
```bash
curl http://localhost:3000/api/v1/posts | json_pp
```

3. Get Post by ID
```bash
curl http://localhost:3000/api/v1/posts/1 | json_pp
```

4. Update Post
```bash
curl -X PATCH http://localhost:3000/api/v1/posts/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "content": "Updated content",
    "published": true
  }' | json_pp
```

5. Delete Post
```bash
curl -X DELETE http://localhost:3000/api/v1/posts/1
```

## Error Cases Testing

### User API Error Cases

1. Create User with Duplicate Email
```bash
# First create a user
curl -X POST http://localhost:3000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User"
  }' | json_pp

# Try to create another user with same email
curl -X POST http://localhost:3000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Another User"
  }' | json_pp
```

2. Get Non-existent User
```bash
curl -X GET http://localhost:3000/api/v1/users/999 | json_pp
```

### Post API Error Cases

1. Create Post with Non-existent Author
```bash
curl -X POST http://localhost:3000/api/v1/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Post",
    "content": "This is a test post",
    "published": true,
    "authorId": 999
  }' | json_pp
```

2. Update Non-existent Post
```bash
curl -X PATCH http://localhost:3000/api/v1/posts/999 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title"
  }' | json_pp
```

3. Update Post with Non-existent Author
```bash
curl -X PATCH http://localhost:3000/api/v1/posts/1 \
  -H "Content-Type: application/json" \
  -d '{
    "authorId": 999
  }' | json_pp
```

## Response Status Codes

- 200: Success (GET, PATCH)
- 201: Created (POST)
- 204: No Content (DELETE)
- 400: Bad Request
- 404: Not Found
- 409: Conflict (e.g., duplicate email)
- 500: Internal Server Error
