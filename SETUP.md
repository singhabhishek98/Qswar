# NestJS Authentication API Setup

## Installation

```bash
npm install
```

## MongoDB Setup

1. Install MongoDB locally or use MongoDB Atlas
2. Update `.env` file with your MongoDB connection string

## Environment Variables

Update `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/qswar
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRES_IN=7d
PORT=3000
```

## Run the Application

```bash
npm run start:dev
```

## API Endpoints

### Signup
- **POST** `http://localhost:3000/auth/signup`
- Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
- **POST** `http://localhost:3000/auth/login`
- Body:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Response Format
```json
{
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

## React Frontend Integration

```javascript
// Signup
const signup = async (name, email, password) => {
  const response = await fetch('http://localhost:3000/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  const data = await response.json();
  localStorage.setItem('token', data.token);
  return data;
};

// Login
const login = async (email, password) => {
  const response = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  localStorage.setItem('token', data.token);
  return data;
};

// Protected API calls
const fetchProtectedData = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:3000/protected-route', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
};
```

## Protecting Routes

Use `@UseGuards(JwtAuthGuard)` decorator:

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './common/jwt-auth.guard';

@Controller('protected')
export class ProtectedController {
  @Get()
  @UseGuards(JwtAuthGuard)
  getProtectedData() {
    return { message: 'This is protected data' };
  }
}
```

## Naming Conventions (NestJS Best Practices)

- **Files**: kebab-case (e.g., `auth.service.ts`, `user.schema.ts`)
- **Classes**: PascalCase (e.g., `AuthService`, `UserSchema`)
- **Variables/Functions**: camelCase (e.g., `findUser`, `isValid`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `JWT_SECRET`)
- **Interfaces**: PascalCase with 'I' prefix (e.g., `IUser`)
- **DTOs**: PascalCase with 'Dto' suffix (e.g., `SignupDto`)
- **Modules**: PascalCase with 'Module' suffix (e.g., `AuthModule`)
- **Controllers**: PascalCase with 'Controller' suffix (e.g., `AuthController`)
- **Services**: PascalCase with 'Service' suffix (e.g., `AuthService`)
