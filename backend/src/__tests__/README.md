# Backend Unit Test Suite

This directory contains comprehensive unit tests for the backend application.

## Overview

The test suite covers all new features added in the feature/auth-backend branch:
- Configuration files (environment, database, Stream, Inngest)
- User model (Mongoose schema)
- Authentication middleware
- Chat controller
- API routes
- Server setup
- Sentry instrumentation

## Running Tests

```bash
# From backend directory
npm test                    # Run all tests
npm run test:watch         # Watch mode
npm run test:coverage      # With coverage report
```

## Test Coverage

- **Total Test Files**: 10
- **Total Test Cases**: 248+
- **Coverage Target**: >80%

## Test Files

1. config/env.test.js - Environment variable tests (33 tests)
2. config/db.test.js - Database connection tests (15 tests)
3. config/stream.test.js - Stream Chat tests (52 tests)
4. config/inngest.test.js - Inngest webhook tests (30 tests)
5. models/user.model.test.js - User schema tests (24 tests)
6. middleware/auth.middleware.test.js - Auth tests (21 tests)
7. controllers/chat.controller.test.js - Controller tests (22 tests)
8. routes/chat.route.test.js - Route tests (14 tests)
9. server.test.js - Server setup tests (19 tests)
10. instrument.test.js - Sentry tests (18 tests)

## Test Patterns

Each test file includes:
- Happy path tests (expected behavior)
- Error handling tests (failure scenarios)
- Edge cases (boundary conditions)
- Async behavior validation

All external dependencies are mocked for fast, isolated testing.