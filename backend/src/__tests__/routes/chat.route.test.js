import { beforeEach, describe, expect, it, jest } from '@jest/globals';

// Mock dependencies
const mockRouter = {
  get: jest.fn(),
};

const mockGetStreamToken = jest.fn();
const mockProtectRoute = jest.fn();

jest.unstable_mockModule('express', () => ({
  default: {
    Router: jest.fn(() => mockRouter),
  },
}));

jest.unstable_mockModule('../../controllers/chat.controller.js', () => ({
  getStreamToken: mockGetStreamToken,
}));

jest.unstable_mockModule('../../middleware/auth.middleware.js', () => ({
  protectRoute: mockProtectRoute,
}));

describe('Chat Routes', () => {
  let router;

  beforeEach(async () => {
    jest.clearAllMocks();

    // Import the route module
    const routeModule = await import('../../routes/chat.route.js');
    router = routeModule.default;
  });

  describe('Route Configuration', () => {
    it('should export a router', () => {
      expect(router).toBeDefined();
    });

    it('should configure GET /token route', () => {
      expect(mockRouter.get).toHaveBeenCalled();
      expect(mockRouter.get).toHaveBeenCalledWith(
        '/token',
        mockProtectRoute,
        mockGetStreamToken
      );
    });

    it('should use protectRoute middleware before getStreamToken', () => {
      const getCall = mockRouter.get.mock.calls[0];
      expect(getCall[0]).toBe('/token');
      expect(getCall[1]).toBe(mockProtectRoute);
      expect(getCall[2]).toBe(mockGetStreamToken);
    });

    it('should have correct route path', () => {
      const getCall = mockRouter.get.mock.calls[0];
      expect(getCall[0]).toBe('/token');
    });
  });

  describe('Middleware Order', () => {
    it('should apply authentication middleware before controller', () => {
      const getCall = mockRouter.get.mock.calls[0];
      const middlewareIndex = getCall.indexOf(mockProtectRoute);
      const controllerIndex = getCall.indexOf(mockGetStreamToken);
      
      expect(middlewareIndex).toBeLessThan(controllerIndex);
    });

    it('should have exactly 2 handlers (middleware + controller)', () => {
      const getCall = mockRouter.get.mock.calls[0];
      // Path, middleware, controller = 3 arguments
      expect(getCall.length).toBe(3);
    });
  });

  describe('Route Methods', () => {
    it('should only configure GET method', () => {
      expect(mockRouter.get).toHaveBeenCalledTimes(1);
    });

    it('should not configure POST method', () => {
      expect(mockRouter.post).toBeUndefined();
    });

    it('should not configure PUT method', () => {
      expect(mockRouter.put).toBeUndefined();
    });

    it('should not configure DELETE method', () => {
      expect(mockRouter.delete).toBeUndefined();
    });
  });

  describe('Route Handler References', () => {
    it('should use imported getStreamToken controller', () => {
      const getCall = mockRouter.get.mock.calls[0];
      expect(getCall[2]).toBe(mockGetStreamToken);
    });

    it('should use imported protectRoute middleware', () => {
      const getCall = mockRouter.get.mock.calls[0];
      expect(getCall[1]).toBe(mockProtectRoute);
    });
  });

  describe('Router Structure', () => {
    it('should have router.get method', () => {
      expect(mockRouter.get).toBeDefined();
      expect(typeof mockRouter.get).toBe('function');
    });

    it('should export default router', () => {
      expect(router).toBe(mockRouter);
    });
  });

  describe('Edge Cases', () => {
    it('should handle route with leading slash', () => {
      const getCall = mockRouter.get.mock.calls[0];
      expect(getCall[0]).toMatch(/^\//);
    });

    it('should not have trailing slash in route', () => {
      const getCall = mockRouter.get.mock.calls[0];
      expect(getCall[0]).not.toMatch(/\/$/);
    });
  });
});