# NestJS Backend - Setup and Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

### Installation

1. **Install dependencies:**
```bash
npm install --legacy-peer-deps
```

2. **Configure environment variables:**
```bash
cp .env.example .env
```

Edit `.env` with your database credentials:
```env
NODE_ENV=development
PORT=3000
DATABASE_URL="postgresql://postgres:password@localhost:5432/vendome-exchange-backend?schema=public"
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=1d
BCRYPT_SALT_ROUNDS=10
THROTTLE_TTL=60
THROTTLE_LIMIT=10
```

3. **Generate Prisma Client:**
```bash
npx prisma generate
```

4. **Run database migrations:**
```bash
npx prisma migrate dev --name init
```

5. **Start the development server:**
```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`
Swagger documentation at `http://localhost:3000/api-docs`

## 📁 Project Structure

```
vendome-exchange-backend/
├── src/
│   ├── common/                 # Shared utilities
│   │   ├── decorators/         # Custom decorators (Roles, etc.)
│   │   ├── filters/            # Global exception filters
│   │   ├── guards/            # Auth guards (JWT, Roles)
│   │   └── interceptors/      # Request/response interceptors
│   ├── config/                # Configuration management
│   │   ├── configuration.ts   # Environment validation schema
│   │   └── config.module.ts    # Config module
│   ├── modules/               # Feature modules
│   │   ├── auth/              # Authentication module
│   │   │   ├── dto/           # Data transfer objects
│   │   │   ├── interfaces/    # TypeScript interfaces
│   │   │   ├── strategies/    # Passport strategies
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.module.ts
│   │   └── user/              # User management module
│   │       ├── dto/           # Data transfer objects
│   │       ├── user.controller.ts
│   │       ├── user.service.ts
│   │       └── user.module.ts
│   ├── prisma/                # Prisma ORM setup
│   │   ├── prisma.service.ts  # Prisma client with lifecycle hooks
│   │   └── prisma.module.ts   # Prisma module
│   ├── app.controller.ts      # Root controller
│   ├── app.service.ts         # Root service
│   ├── app.module.ts          # Root module
│   └── main.ts                # Application entry point
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/           # Database migrations
├── .env                       # Environment variables
├── package.json               # Dependencies and scripts
└── tsconfig.json              # TypeScript configuration
```

## 🗄️ Database Management

### Prisma Commands

**Generate Prisma Client:**
```bash
npx prisma generate
```

**Create and run migrations:**
```bash
npx prisma migrate dev --name migration_name
```

**Apply migrations to production:**
```bash
npx prisma migrate deploy
```

**View database in Prisma Studio:**
```bash
npx prisma studio
```

**Reset database (development only):**
```bash
npx prisma migrate reset
```

**Push schema changes without migration:**
```bash
npx prisma db push
```

## 🔐 Authentication & Authorization

### Authentication Flow

1. **Signup:**
```bash
POST /auth/signup
{
  "email": "user@example.com",
  "password": "password123",
  "role": "USER"
}
```

2. **Login:**
```bash
POST /auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

Returns JWT access token:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "USER"
  }
}
```

3. **Access Protected Routes:**
Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Role-Based Access Control

The application uses role-based access control with two roles:
- `USER`: Standard user access
- `ADMIN`: Administrative access

Example protected routes:
- `GET /auth/profile` - Requires JWT authentication
- `GET /auth/admin` - Requires JWT + ADMIN role
- `GET /users` - Requires JWT + ADMIN role

## 🛡️ Security Features

### Implemented Security Measures

1. **Helmet.js**: HTTP security headers
2. **CORS**: Cross-origin resource sharing configuration
3. **Rate Limiting**: Throttling to prevent abuse
4. **Password Hashing**: bcrypt for secure password storage
5. **JWT Authentication**: Token-based authentication
6. **Input Validation**: class-validator for request validation
7. **Role-Based Access Control**: Authorization by user roles

### Security Best Practices

- Never commit `.env` files to version control
- Use strong JWT secrets in production
- Implement proper database user permissions
- Keep dependencies updated
- Use HTTPS in production
- Implement proper error handling (don't leak sensitive info)

## 📚 API Documentation

### Swagger Documentation

Interactive API documentation is available at:
```
http://localhost:3000/api-docs
```

### Available Endpoints

**Authentication:**
- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/profile` - Get current user profile (protected)
- `GET /auth/admin` - Admin-only endpoint (protected)

**Users:**
- `POST /users` - Create user (admin only)
- `GET /users` - Get all users (admin only)
- `GET /users/:id` - Get user by ID (protected)
- `PUT /users/:id` - Update user (admin only)
- `DELETE /users/:id` - Delete user (admin only)

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run tests with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e

# Run tests in watch mode
npm run test:watch
```

## 🏗️ Build for Production

```bash
# Build the application
npm run build

# Start production server
npm run start:prod
```

## 🔧 Development Scripts

```bash
# Start development server with hot reload
npm run start:dev

# Start in debug mode
npm run start:debug

# Format code
npm run format

# Lint code
npm run lint
```

## 🐛 Troubleshooting

### Common Issues

**Prisma Client Generation Error:**
```bash
rm -rf node_modules
npm install --legacy-peer-deps
npx prisma generate
```

**Database Connection Error:**
- Ensure PostgreSQL is running
- Check `DATABASE_URL` in `.env`
- Verify database exists and credentials are correct

**Migration Conflicts:**
```bash
npx prisma migrate resolve --applied migration_name
```

**Port Already in Use:**
Change the `PORT` in `.env` or stop the process using the port.

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment (development/production/test) | `development` |
| `PORT` | Server port | `3000` |
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `JWT_SECRET` | Secret key for JWT signing | Required |
| `JWT_EXPIRES_IN` | JWT token expiration time | `1d` |
| `BCRYPT_SALT_ROUNDS` | Bcrypt salt rounds | `10` |
| `THROTTLE_TTL` | Rate limit time window (seconds) | `60` |
| `THROTTLE_LIMIT` | Max requests per time window | `10` |

## 🚀 Deployment Checklist

1. Set `NODE_ENV=production`
2. Use strong `JWT_SECRET`
3. Configure production `DATABASE_URL`
4. Set appropriate CORS origins
5. Run database migrations: `npx prisma migrate deploy`
6. Build the application: `npm run build`
7. Start with: `npm run start:prod`
8. Configure reverse proxy (nginx)
9. Enable HTTPS
10. Set up monitoring and logging

## 📞 Support

For issues and questions, refer to:
- NestJS Documentation: https://docs.nestjs.com
- Prisma Documentation: https://www.prisma.io/docs
- Passport.js Documentation: http://www.passportjs.org