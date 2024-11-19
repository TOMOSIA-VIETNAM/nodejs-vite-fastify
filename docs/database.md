# Database Guide

## Setup

1. **Install PostgreSQL**
   - [Download PostgreSQL](https://www.postgresql.org/download/)
   - Create database: `createdb your_db_name`

2. **Configure Connection**
   Edit `.env`:
```env
DATABASE_URL=postgresql://user:pass@localhost:5432/your_db_name
```

## Migrations

1. **Create Migration**
```bash
pnpm typeorm migration:create src/migrations/CreateUsers
```

2. **Generate Migration**
```bash
pnpm typeorm migration:generate src/migrations/AddUserFields
```

3. **Run Migrations**
```bash
pnpm typeorm migration:run
```

## Entity Example
```typescript
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;
}
```

## Common Operations

```typescript
// Get repository
const userRepo = dataSource.getRepository(User);

// Create
await userRepo.save({ email: "test@example.com" });

// Find
const user = await userRepo.findOneBy({ id: 1 });

// Update
await userRepo.update(1, { email: "new@example.com" });

// Delete
await userRepo.delete(1);
```
