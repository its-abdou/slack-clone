import { beforeEach, describe, expect, it, jest } from '@jest/globals';

describe('Auth Middleware (protectRoute)', () => {
  let protectRoute;
  let mockReq;
  let mockRes;
  let mockNext;

  beforeEach(async () => {
    jest.clearAllMocks();

    // Import the middleware
    const authModule = await import('../../middleware/auth.middleware.js');
    protectRoute = authModule.protectRoute;

    // Setup mock response
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    // Setup mock next function
    mockNext = jest.fn();
  });

  describe('Happy Path - Authenticated User', () => {
    it('should call next() when user is authenticated', () => {
      mockReq = {
        auth: jest.fn().mockReturnValue({
          isAuthenticated: true,
          userId: 'user_123',
        }),
      };

      protectRoute(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledTimes(1);
      expect(mockRes.status).not.toHaveBeenCalled();
      expect(mockRes.json).not.toHaveBeenCalled();
    });

    it('should call auth() method on request', () => {
      const authSpy = jest.fn().mockReturnValue({
        isAuthenticated: true,
        userId: 'user_456',
      });

      mockReq = {
        auth: authSpy,
      };

      protectRoute(mockReq, mockRes, mockNext);

      expect(authSpy).toHaveBeenCalled();
      expect(authSpy).toHaveBeenCalledTimes(1);
    });

    it('should not modify request or response when authenticated', () => {
      mockReq = {
        auth: jest.fn().mockReturnValue({
          isAuthenticated: true,
          userId: 'user_789',
        }),
      };

      protectRoute(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(mockRes.status).not.toHaveBeenCalled();
    });
  });

  describe('Failure Path - Unauthenticated User', () => {
    it('should return 401 when user is not authenticated', () => {
      mockReq = {
        auth: jest.fn().mockReturnValue({
          isAuthenticated: false,
        }),
      };

      protectRoute(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Unauthorized - you must be logged in',
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should not call next() when user is not authenticated', () => {
      mockReq = {
        auth: jest.fn().mockReturnValue({
          isAuthenticated: false,
        }),
      };

      protectRoute(mockReq, mockRes, mockNext);

      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return correct error message', () => {
      mockReq = {
        auth: jest.fn().mockReturnValue({
          isAuthenticated: false,
        }),
      };

      protectRoute(mockReq, mockRes, mockNext);

      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Unauthorized - you must be logged in',
      });
    });

    it('should chain status and json methods', () => {
      mockReq = {
        auth: jest.fn().mockReturnValue({
          isAuthenticated: false,
        }),
      };

      const result = protectRoute(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalled();
    });
  });

  describe('Edge Cases - Auth Property Variations', () => {
    it('should handle auth() returning null userId but authenticated', () => {
      mockReq = {
        auth: jest.fn().mockReturnValue({
          isAuthenticated: true,
          userId: null,
        }),
      };

      protectRoute(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });

    it('should handle auth() returning undefined userId but authenticated', () => {
      mockReq = {
        auth: jest.fn().mockReturnValue({
          isAuthenticated: true,
          userId: undefined,
        }),
      };

      protectRoute(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });

    it('should handle auth() returning only isAuthenticated property', () => {
      mockReq = {
        auth: jest.fn().mockReturnValue({
          isAuthenticated: true,
        }),
      };

      protectRoute(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });

    it('should reject when isAuthenticated is explicitly false', () => {
      mockReq = {
        auth: jest.fn().mockReturnValue({
          isAuthenticated: false,
          userId: 'user_123',
        }),
      };

      protectRoute(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe('Edge Cases - Falsy isAuthenticated Values', () => {
    it('should reject when isAuthenticated is 0', () => {
      mockReq = {
        auth: jest.fn().mockReturnValue({
          isAuthenticated: 0,
        }),
      };

      protectRoute(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
    });

    it('should reject when isAuthenticated is empty string', () => {
      mockReq = {
        auth: jest.fn().mockReturnValue({
          isAuthenticated: '',
        }),
      };

      protectRoute(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
    });

    it('should reject when isAuthenticated is null', () => {
      mockReq = {
        auth: jest.fn().mockReturnValue({
          isAuthenticated: null,
        }),
      };

      protectRoute(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
    });

    it('should reject when isAuthenticated is undefined', () => {
      mockReq = {
        auth: jest.fn().mockReturnValue({
          isAuthenticated: undefined,
        }),
      };

      protectRoute(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
    });
  });

  describe('Error Handling', () => {
    it('should handle auth() throwing an error', () => {
      mockReq = {
        auth: jest.fn().mockImplementation(() => {
          throw new Error('Auth error');
        }),
      };

      expect(() => {
        protectRoute(mockReq, mockRes, mockNext);
      }).toThrow('Auth error');
    });

    it('should handle missing auth method on request', () => {
      mockReq = {};

      expect(() => {
        protectRoute(mockReq, mockRes, mockNext);
      }).toThrow();
    });
  });

  describe('Response Handling', () => {
    it('should return the response for method chaining', () => {
      mockReq = {
        auth: jest.fn().mockReturnValue({
          isAuthenticated: false,
        }),
      };

      const result = protectRoute(mockReq, mockRes, mockNext);

      // The middleware returns the result of res.json()
      expect(result).toBe(mockRes);
    });
  });

  describe('Multiple Calls', () => {
    it('should handle multiple sequential calls independently', () => {
      const authReq = {
        auth: jest.fn().mockReturnValue({ isAuthenticated: true }),
      };
      const unauthReq = {
        auth: jest.fn().mockReturnValue({ isAuthenticated: false }),
      };

      protectRoute(authReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalledTimes(1);

      const mockRes2 = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const mockNext2 = jest.fn();

      protectRoute(unauthReq, mockRes2, mockNext2);
      expect(mockRes2.status).toHaveBeenCalledWith(401);
      expect(mockNext2).not.toHaveBeenCalled();
    });
  });
});