# Testing Guide

## Running Tests

```bash
# Run all tests
pnpm test

# Run with coverage
pnpm test:coverage

# Run specific test file
pnpm test src/test/users.test.ts
```

## Test Structure

```typescript
import { test, expect } from 'vitest';
import { build } from './fastify';

test('group description', async () => {
  const app = await build();

  // Test API endpoints
  const response = await app.inject({
    method: 'GET',
    url: '/api/endpoint'
  });

  expect(response.statusCode).toBe(200);
});
```

## Mocking

```typescript
import { vi } from 'vitest';

// Mock repository
vi.mock('../../data-source', () => ({
  getRepository: () => ({
    find: vi.fn().mockResolvedValue([]),
    save: vi.fn().mockResolvedValue({ id: 1 })
  })
}));
```

## Best Practices

1. Test isolated units
2. Use meaningful test descriptions
3. Setup and teardown properly
4. Mock external dependencies
5. Test error cases
