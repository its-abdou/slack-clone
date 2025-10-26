// Mock console methods to reduce test output noise
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
};

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.PORT = '5001';
process.env.MONGO_URI = 'mongodb://localhost:27017/test';
process.env.CLERK_PUBLISHABLE_KEY = 'test_clerk_pub_key';
process.env.CLERK_SECRET_KEY = 'test_clerk_secret_key';
process.env.STREAM_API_KEY = 'test_stream_key';
process.env.STREAM_API_SECRET = 'test_stream_secret';
process.env.SENTRY_DSN = 'https://test@sentry.io/123';
process.env.INNGEST_EVENT_KEY = 'test_inngest_event_key';
process.env.INNGEST_SIGNING_KEY = 'test_inngest_signing_key';
process.env.CLIENT_URL = 'http://localhost:3000';