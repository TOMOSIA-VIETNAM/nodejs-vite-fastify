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
