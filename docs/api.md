# API Documentation

## Authentication

All protected routes require Bearer token:
```bash
Authorization: Bearer <token>
```

## Endpoints

### Users API

**Create User**
```http
POST /api/users
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "User Name"
}
```

**Get User**
```http
GET /api/users/:id
```

See [CRUD Example](crud-example.md) for more endpoints.

## Error Responses

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Error description"
}
```

## Rate Limiting

- 100 requests per minute per IP
- 429 Too Many Requests response when exceeded
