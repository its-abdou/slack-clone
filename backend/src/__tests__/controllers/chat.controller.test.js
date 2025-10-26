import { beforeEach, describe, expect, it, jest } from '@jest/globals';

// Mock generateStreamToken
const mockGenerateStreamToken = jest.fn();

jest.unstable_mockModule('../../config/stream.js', () => ({
  generateStreamToken: mockGenerateStreamToken,
}));

describe('Chat Controller', () => {
  let getStreamToken;
  let mockReq;
  let mockRes;

  beforeEach(async () => {
    jest.clearAllMocks();

    // Import controller after mocking
    const chatController = await import('../../controllers/chat.controller.js');
    getStreamToken = chatController.getStreamToken;

    // Setup mock request
    mockReq = {
      auth: jest.fn().mockReturnValue({
        userId: 'user_123',
      }),
    };

    // Setup mock response
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  describe('getStreamToken - Happy Path', () => {
    it('should return token successfully for authenticated user', async () => {
      mockGenerateStreamToken.mockReturnValueOnce('mock_stream_token_123');

      await getStreamToken(mockReq, mockRes);

      expect(mockReq.auth).toHaveBeenCalled();
      expect(mockGenerateStreamToken).toHaveBeenCalledWith('user_123');
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        token: 'mock_stream_token_123',
      });
    });

    it('should call auth() to get userId', async () => {
      mockGenerateStreamToken.mockReturnValueOnce('token_456');

      await getStreamToken(mockReq, mockRes);

      expect(mockReq.auth).toHaveBeenCalled();
      expect(mockReq.auth).toHaveBeenCalledTimes(1);
    });

    it('should generate token with correct userId', async () => {
      mockReq.auth = jest.fn().mockReturnValue({
        userId: 'custom_user_789',
      });
      mockGenerateStreamToken.mockReturnValueOnce('token_custom');

      await getStreamToken(mockReq, mockRes);

      expect(mockGenerateStreamToken).toHaveBeenCalledWith('custom_user_789');
    });

    it('should return 200 status code', async () => {
      mockGenerateStreamToken.mockReturnValueOnce('token');

      await getStreamToken(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
    });

    it('should return token in JSON response', async () => {
      const expectedToken = 'expected_token_abc';
      mockGenerateStreamToken.mockReturnValueOnce(expectedToken);

      await getStreamToken(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({
        token: expectedToken,
      });
    });
  });

  describe('getStreamToken - Error Handling', () => {
    it('should handle generateStreamToken throwing error', async () => {
      const consoleSpy = jest.spyOn(console, 'log');
      const error = new Error('Token generation failed');
      mockGenerateStreamToken.mockImplementationOnce(() => {
        throw error;
      });

      await getStreamToken(mockReq, mockRes);

      expect(consoleSpy).toHaveBeenCalledWith(
        'Error generating Stream token:',
        error
      );
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Failed to generate Stream token',
      });
    });

    it('should return 500 status on error', async () => {
      mockGenerateStreamToken.mockImplementationOnce(() => {
        throw new Error('Error');
      });

      await getStreamToken(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
    });

    it('should return error message on failure', async () => {
      mockGenerateStreamToken.mockImplementationOnce(() => {
        throw new Error('Error');
      });

      await getStreamToken(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Failed to generate Stream token',
      });
    });

    it('should log error details', async () => {
      const consoleSpy = jest.spyOn(console, 'log');
      const specificError = new Error('Network timeout');
      mockGenerateStreamToken.mockImplementationOnce(() => {
        throw specificError;
      });

      await getStreamToken(mockReq, mockRes);

      expect(consoleSpy).toHaveBeenCalledWith(
        'Error generating Stream token:',
        specificError
      );
    });

    it('should handle auth() throwing error', async () => {
      mockReq.auth = jest.fn().mockImplementationOnce(() => {
        throw new Error('Auth error');
      });

      await getStreamToken(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
    });
  });

  describe('getStreamToken - Edge Cases', () => {
    it('should handle null token from generateStreamToken', async () => {
      mockGenerateStreamToken.mockReturnValueOnce(null);

      await getStreamToken(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        token: null,
      });
    });

    it('should handle undefined token from generateStreamToken', async () => {
      mockGenerateStreamToken.mockReturnValueOnce(undefined);

      await getStreamToken(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        token: undefined,
      });
    });

    it('should handle empty string userId', async () => {
      mockReq.auth = jest.fn().mockReturnValue({
        userId: '',
      });
      mockGenerateStreamToken.mockReturnValueOnce('token_empty');

      await getStreamToken(mockReq, mockRes);

      expect(mockGenerateStreamToken).toHaveBeenCalledWith('');
    });

    it('should handle numeric userId', async () => {
      mockReq.auth = jest.fn().mockReturnValue({
        userId: 12345,
      });
      mockGenerateStreamToken.mockReturnValueOnce('token_numeric');

      await getStreamToken(mockReq, mockRes);

      expect(mockGenerateStreamToken).toHaveBeenCalledWith(12345);
    });

    it('should handle null userId', async () => {
      mockReq.auth = jest.fn().mockReturnValue({
        userId: null,
      });
      mockGenerateStreamToken.mockReturnValueOnce('token_null');

      await getStreamToken(mockReq, mockRes);

      expect(mockGenerateStreamToken).toHaveBeenCalledWith(null);
    });
  });

  describe('getStreamToken - Async Behavior', () => {
    it('should be an async function', () => {
      expect(getStreamToken.constructor.name).toBe('AsyncFunction');
    });

    it('should return a Promise', () => {
      mockGenerateStreamToken.mockReturnValueOnce('token');
      const result = getStreamToken(mockReq, mockRes);
      expect(result).toBeInstanceOf(Promise);
    });

    it('should handle async token generation', async () => {
      mockGenerateStreamToken.mockReturnValueOnce('async_token');

      await getStreamToken(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({
        token: 'async_token',
      });
    });
  });

  describe('getStreamToken - Multiple Calls', () => {
    it('should handle multiple sequential calls', async () => {
      mockGenerateStreamToken
        .mockReturnValueOnce('token1')
        .mockReturnValueOnce('token2');

      await getStreamToken(mockReq, mockRes);
      expect(mockRes.json).toHaveBeenCalledWith({ token: 'token1' });

      const mockRes2 = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      await getStreamToken(mockReq, mockRes2);
      expect(mockRes2.json).toHaveBeenCalledWith({ token: 'token2' });
    });
  });

  describe('getStreamToken - Response Chaining', () => {
    it('should properly chain status and json methods', async () => {
      mockGenerateStreamToken.mockReturnValueOnce('token');

      await getStreamToken(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledBefore(mockRes.json);
    });
  });
});