import { beforeEach, describe, expect, it, jest } from '@jest/globals';

// Mock mongoose
const mockConnect = jest.fn();
const mockConnection = {
  host: 'localhost:27017',
};

jest.unstable_mockModule('mongoose', () => ({
  default: {
    connect: mockConnect,
    connection: mockConnection,
  },
}));

// Mock ENV
jest.unstable_mockModule('../../config/env.js', () => ({
  ENV: {
    MONGO_URI: 'mongodb://localhost:27017/test',
  },
}));

describe('Database Connection (connectDB)', () => {
  let connectDB;
  let processExitSpy;

  beforeEach(async () => {
    jest.clearAllMocks();
    jest.resetModules();
    
    // Spy on process.exit
    processExitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {});
    
    // Import after mocking
    const dbModule = await import('../../config/db.js');
    connectDB = dbModule.connectDB;
  });

  afterEach(() => {
    processExitSpy.mockRestore();
  });

  describe('Happy Path - Successful Connection', () => {
    it('should connect to MongoDB successfully', async () => {
      mockConnect.mockResolvedValueOnce({
        connection: mockConnection,
      });

      await connectDB();

      expect(mockConnect).toHaveBeenCalledWith('mongodb://localhost:27017/test');
      expect(mockConnect).toHaveBeenCalledTimes(1);
    });

    it('should log success message with host', async () => {
      const consoleSpy = jest.spyOn(console, 'log');
      mockConnect.mockResolvedValueOnce({
        connection: mockConnection,
      });

      await connectDB();

      expect(consoleSpy).toHaveBeenCalledWith(
        'MongoDB connected successfully:',
        'localhost:27017'
      );
    });

    it('should not call process.exit on success', async () => {
      mockConnect.mockResolvedValueOnce({
        connection: mockConnection,
      });

      await connectDB();

      expect(processExitSpy).not.toHaveBeenCalled();
    });
  });

  describe('Error Handling - Connection Failures', () => {
    it('should handle connection error and exit process', async () => {
      const error = new Error('Connection failed');
      mockConnect.mockRejectedValueOnce(error);

      await connectDB();

      expect(processExitSpy).toHaveBeenCalledWith(1);
    });

    it('should log error message on connection failure', async () => {
      const consoleSpy = jest.spyOn(console, 'log');
      const error = new Error('Connection failed');
      mockConnect.mockRejectedValueOnce(error);

      await connectDB();

      expect(consoleSpy).toHaveBeenCalledWith(
        'Error connecting to MongoDB:',
        error
      );
    });

    it('should handle authentication error', async () => {
      const authError = new Error('Authentication failed');
      mockConnect.mockRejectedValueOnce(authError);

      await connectDB();

      expect(console.log).toHaveBeenCalledWith(
        'Error connecting to MongoDB:',
        authError
      );
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });

    it('should handle network timeout error', async () => {
      const timeoutError = new Error('Connection timeout');
      mockConnect.mockRejectedValueOnce(timeoutError);

      await connectDB();

      expect(console.log).toHaveBeenCalledWith(
        'Error connecting to MongoDB:',
        timeoutError
      );
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });

    it('should handle invalid URI error', async () => {
      const uriError = new Error('Invalid URI');
      mockConnect.mockRejectedValueOnce(uriError);

      await connectDB();

      expect(processExitSpy).toHaveBeenCalledWith(1);
    });
  });

  describe('Edge Cases', () => {
    it('should handle null connection object', async () => {
      mockConnect.mockResolvedValueOnce({
        connection: { host: null },
      });

      await connectDB();

      expect(console.log).toHaveBeenCalledWith(
        'MongoDB connected successfully:',
        null
      );
    });

    it('should handle connection with different host format', async () => {
      mockConnect.mockResolvedValueOnce({
        connection: { host: 'cluster0.mongodb.net' },
      });

      await connectDB();

      expect(console.log).toHaveBeenCalledWith(
        'MongoDB connected successfully:',
        'cluster0.mongodb.net'
      );
    });

    it('should be callable multiple times', async () => {
      mockConnect
        .mockResolvedValueOnce({ connection: mockConnection })
        .mockResolvedValueOnce({ connection: mockConnection });

      await connectDB();
      await connectDB();

      expect(mockConnect).toHaveBeenCalledTimes(2);
    });
  });

  describe('Async Behavior', () => {
    it('should return a Promise', () => {
      mockConnect.mockResolvedValueOnce({ connection: mockConnection });
      const result = connectDB();
      expect(result).toBeInstanceOf(Promise);
    });

    it('should await connection before logging', async () => {
      const consoleSpy = jest.spyOn(console, 'log');
      let connectionResolved = false;
      
      mockConnect.mockImplementationOnce(() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            connectionResolved = true;
            resolve({ connection: mockConnection });
          }, 10);
        });
      });

      await connectDB();

      expect(connectionResolved).toBe(true);
      expect(consoleSpy).toHaveBeenCalled();
    });
  });
});