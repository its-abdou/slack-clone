import { beforeEach, describe, expect, it, jest } from '@jest/globals';

// Mock Sentry
const mockSentryInit = jest.fn();

jest.unstable_mockModule('@sentry/node', () => ({
  default: {
    init: mockSentryInit,
  },
}));

jest.unstable_mockModule('../config/env.js', () => ({
  ENV: {
    SENTRY_DSN: 'https://test@sentry.io/123',
    NODE_ENV: 'test',
  },
}));

describe('Sentry Instrumentation', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe('Sentry Initialization', () => {
    it('should initialize Sentry with correct DSN', async () => {
      await import('../../instrument.mjs');
      
      expect(mockSentryInit).toHaveBeenCalledWith(
        expect.objectContaining({
          dsn: 'https://test@sentry.io/123',
        })
      );
    });

    it('should configure tracesSampleRate', async () => {
      await import('../../instrument.mjs');
      
      expect(mockSentryInit).toHaveBeenCalledWith(
        expect.objectContaining({
          tracesSampleRate: 1.0,
        })
      );
    });

    it('should configure profilesSampleRate', async () => {
      await import('../../instrument.mjs');
      
      expect(mockSentryInit).toHaveBeenCalledWith(
        expect.objectContaining({
          profilesSampleRate: 1.0,
        })
      );
    });

    it('should set environment from NODE_ENV', async () => {
      await import('../../instrument.mjs');
      
      expect(mockSentryInit).toHaveBeenCalledWith(
        expect.objectContaining({
          environment: 'test',
        })
      );
    });

    it('should default environment to development if not set', async () => {
      jest.resetModules();
      
      jest.unstable_mockModule('../config/env.js', () => ({
        ENV: {
          SENTRY_DSN: 'https://test@sentry.io/123',
          NODE_ENV: undefined,
        },
      }));
      
      jest.unstable_mockModule('@sentry/node', () => ({
        default: {
          init: mockSentryInit,
        },
      }));
      
      await import('../../instrument.mjs');
      
      expect(mockSentryInit).toHaveBeenCalledWith(
        expect.objectContaining({
          environment: 'development',
        })
      );
    });

    it('should enable includeLocalVariables', async () => {
      await import('../../instrument.mjs');
      
      expect(mockSentryInit).toHaveBeenCalledWith(
        expect.objectContaining({
          includeLocalVariables: true,
        })
      );
    });

    it('should enable sendDefaultPii', async () => {
      await import('../../instrument.mjs');
      
      expect(mockSentryInit).toHaveBeenCalledWith(
        expect.objectContaining({
          sendDefaultPii: true,
        })
      );
    });

    it('should call Sentry.init exactly once', async () => {
      await import('../../instrument.mjs');
      
      expect(mockSentryInit).toHaveBeenCalledTimes(1);
    });
  });

  describe('Configuration Values', () => {
    it('should set tracesSampleRate to 100%', async () => {
      await import('../../instrument.mjs');
      
      const initCall = mockSentryInit.mock.calls[0][0];
      expect(initCall.tracesSampleRate).toBe(1.0);
    });

    it('should set profilesSampleRate to 100%', async () => {
      await import('../../instrument.mjs');
      
      const initCall = mockSentryInit.mock.calls[0][0];
      expect(initCall.profilesSampleRate).toBe(1.0);
    });

    it('should have all required configuration keys', async () => {
      await import('../../instrument.mjs');
      
      const initCall = mockSentryInit.mock.calls[0][0];
      
      expect(initCall).toHaveProperty('dsn');
      expect(initCall).toHaveProperty('tracesSampleRate');
      expect(initCall).toHaveProperty('profilesSampleRate');
      expect(initCall).toHaveProperty('environment');
      expect(initCall).toHaveProperty('includeLocalVariables');
      expect(initCall).toHaveProperty('sendDefaultPii');
    });
  });

  describe('Privacy and Security', () => {
    it('should enable PII collection', async () => {
      await import('../../instrument.mjs');
      
      const initCall = mockSentryInit.mock.calls[0][0];
      expect(initCall.sendDefaultPii).toBe(true);
    });

    it('should include local variables in error reports', async () => {
      await import('../../instrument.mjs');
      
      const initCall = mockSentryInit.mock.calls[0][0];
      expect(initCall.includeLocalVariables).toBe(true);
    });
  });

  describe('Performance Monitoring', () => {
    it('should enable full transaction tracing', async () => {
      await import('../../instrument.mjs');
      
      const initCall = mockSentryInit.mock.calls[0][0];
      expect(initCall.tracesSampleRate).toBe(1.0);
    });

    it('should enable full profiling', async () => {
      await import('../../instrument.mjs');
      
      const initCall = mockSentryInit.mock.calls[0][0];
      expect(initCall.profilesSampleRate).toBe(1.0);
    });
  });

  describe('Environment Handling', () => {
    it('should handle production environment', async () => {
      jest.resetModules();
      
      jest.unstable_mockModule('../config/env.js', () => ({
        ENV: {
          SENTRY_DSN: 'https://test@sentry.io/123',
          NODE_ENV: 'production',
        },
      }));
      
      jest.unstable_mockModule('@sentry/node', () => ({
        default: {
          init: mockSentryInit,
        },
      }));
      
      await import('../../instrument.mjs');
      
      expect(mockSentryInit).toHaveBeenCalledWith(
        expect.objectContaining({
          environment: 'production',
        })
      );
    });

    it('should handle development environment', async () => {
      jest.resetModules();
      
      jest.unstable_mockModule('../config/env.js', () => ({
        ENV: {
          SENTRY_DSN: 'https://test@sentry.io/123',
          NODE_ENV: 'development',
        },
      }));
      
      jest.unstable_mockModule('@sentry/node', () => ({
        default: {
          init: mockSentryInit,
        },
      }));
      
      await import('../../instrument.mjs');
      
      expect(mockSentryInit).toHaveBeenCalledWith(
        expect.objectContaining({
          environment: 'development',
        })
      );
    });

    it('should handle staging environment', async () => {
      jest.resetModules();
      
      jest.unstable_mockModule('../config/env.js', () => ({
        ENV: {
          SENTRY_DSN: 'https://test@sentry.io/123',
          NODE_ENV: 'staging',
        },
      }));
      
      jest.unstable_mockModule('@sentry/node', () => ({
        default: {
          init: mockSentryInit,
        },
      }));
      
      await import('../../instrument.mjs');
      
      expect(mockSentryInit).toHaveBeenCalledWith(
        expect.objectContaining({
          environment: 'staging',
        })
      );
    });
  });
});