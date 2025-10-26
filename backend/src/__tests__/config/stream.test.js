import { beforeEach, describe, expect, it, jest } from '@jest/globals';

// Mock StreamChat
const mockUpsertUser = jest.fn();
const mockDeleteUser = jest.fn();
const mockCreateToken = jest.fn();
const mockQueryChannels = jest.fn();
const mockGetInstance = jest.fn();

jest.unstable_mockModule('stream-chat', () => ({
  StreamChat: {
    getInstance: mockGetInstance,
  },
}));

// Mock ENV
jest.unstable_mockModule('../../config/env.js', () => ({
  ENV: {
    STREAM_API_KEY: 'test_api_key',
    STREAM_API_SECRET: 'test_api_secret',
  },
}));

describe('Stream Configuration Functions', () => {
  let upsertStreamUser, deleteStreamUser, generateStreamToken, addUserToPublicChannels;
  let mockChannel;

  beforeEach(async () => {
    jest.clearAllMocks();
    
    // Setup mock channel
    mockChannel = {
      addMembers: jest.fn().mockResolvedValue({}),
    };

    // Setup StreamChat mock
    mockGetInstance.mockReturnValue({
      upsertUser: mockUpsertUser,
      deleteUser: mockDeleteUser,
      createToken: mockCreateToken,
      queryChannels: mockQueryChannels,
    });

    // Import functions after mocking
    const streamModule = await import('../../config/stream.js');
    upsertStreamUser = streamModule.upsertStreamUser;
    deleteStreamUser = streamModule.deleteStreamUser;
    generateStreamToken = streamModule.generateStreamToken;
    addUserToPublicChannels = streamModule.addUserToPublicChannels;
  });

  describe('upsertStreamUser', () => {
    describe('Happy Path', () => {
      it('should upsert user successfully', async () => {
        const userData = {
          id: 'user123',
          name: 'John Doe',
          image: 'https://example.com/avatar.jpg',
        };

        mockUpsertUser.mockResolvedValueOnce(userData);

        const result = await upsertStreamUser(userData);

        expect(mockUpsertUser).toHaveBeenCalledWith(userData);
        expect(result).toEqual(userData);
      });

      it('should log success message', async () => {
        const consoleSpy = jest.spyOn(console, 'log');
        const userData = { id: 'user123', name: 'Jane Doe', image: 'url' };

        mockUpsertUser.mockResolvedValueOnce(userData);

        await upsertStreamUser(userData);

        expect(consoleSpy).toHaveBeenCalledWith(
          'Stream user upserted successfully:',
          'Jane Doe'
        );
      });

      it('should handle user with minimal data', async () => {
        const userData = { id: 'user123' };
        mockUpsertUser.mockResolvedValueOnce(userData);

        const result = await upsertStreamUser(userData);

        expect(result).toEqual(userData);
      });

      it('should handle user with additional custom fields', async () => {
        const userData = {
          id: 'user123',
          name: 'John Doe',
          image: 'url',
          role: 'admin',
          customField: 'value',
        };
        mockUpsertUser.mockResolvedValueOnce(userData);

        const result = await upsertStreamUser(userData);

        expect(mockUpsertUser).toHaveBeenCalledWith(userData);
      });
    });

    describe('Error Handling', () => {
      it('should handle upsert error gracefully', async () => {
        const consoleSpy = jest.spyOn(console, 'log');
        const error = new Error('Upsert failed');
        mockUpsertUser.mockRejectedValueOnce(error);

        const result = await upsertStreamUser({ id: 'user123' });

        expect(consoleSpy).toHaveBeenCalledWith('Error upserting Stream user:', error);
        expect(result).toBeUndefined();
      });

      it('should not throw error on failure', async () => {
        mockUpsertUser.mockRejectedValueOnce(new Error('Network error'));

        await expect(upsertStreamUser({ id: 'user123' })).resolves.not.toThrow();
      });

      it('should handle API rate limit error', async () => {
        const error = new Error('Rate limit exceeded');
        mockUpsertUser.mockRejectedValueOnce(error);

        await upsertStreamUser({ id: 'user123', name: 'Test' });

        expect(console.log).toHaveBeenCalledWith('Error upserting Stream user:', error);
      });
    });

    describe('Edge Cases', () => {
      it('should handle empty name', async () => {
        const userData = { id: 'user123', name: '', image: 'url' };
        mockUpsertUser.mockResolvedValueOnce(userData);

        await upsertStreamUser(userData);

        expect(console.log).toHaveBeenCalledWith('Stream user upserted successfully:', '');
      });

      it('should handle null values in userData', async () => {
        const userData = { id: 'user123', name: null, image: null };
        mockUpsertUser.mockResolvedValueOnce(userData);

        await upsertStreamUser(userData);

        expect(mockUpsertUser).toHaveBeenCalledWith(userData);
      });
    });
  });

  describe('deleteStreamUser', () => {
    describe('Happy Path', () => {
      it('should delete user successfully', async () => {
        mockDeleteUser.mockResolvedValueOnce({});

        await deleteStreamUser('user123');

        expect(mockDeleteUser).toHaveBeenCalledWith('user123');
      });

      it('should log success message', async () => {
        const consoleSpy = jest.spyOn(console, 'log');
        mockDeleteUser.mockResolvedValueOnce({});

        await deleteStreamUser('user456');

        expect(consoleSpy).toHaveBeenCalledWith(
          'Stream user deleted successfully:',
          'user456'
        );
      });
    });

    describe('Error Handling', () => {
      it('should handle delete error gracefully', async () => {
        const consoleErrorSpy = jest.spyOn(console, 'error');
        const error = new Error('Delete failed');
        mockDeleteUser.mockRejectedValueOnce(error);

        await deleteStreamUser('user123');

        expect(consoleErrorSpy).toHaveBeenCalledWith(
          'Error deleting Stream user:',
          error
        );
      });

      it('should not throw error on failure', async () => {
        mockDeleteUser.mockRejectedValueOnce(new Error('User not found'));

        await expect(deleteStreamUser('user123')).resolves.not.toThrow();
      });

      it('should handle non-existent user deletion', async () => {
        const error = new Error('User not found');
        mockDeleteUser.mockRejectedValueOnce(error);

        await deleteStreamUser('nonexistent');

        expect(console.error).toHaveBeenCalledWith(
          'Error deleting Stream user:',
          error
        );
      });
    });

    describe('Edge Cases', () => {
      it('should handle empty string userId', async () => {
        mockDeleteUser.mockResolvedValueOnce({});

        await deleteStreamUser('');

        expect(mockDeleteUser).toHaveBeenCalledWith('');
      });

      it('should handle numeric userId as string', async () => {
        mockDeleteUser.mockResolvedValueOnce({});

        await deleteStreamUser('12345');

        expect(mockDeleteUser).toHaveBeenCalledWith('12345');
      });
    });
  });

  describe('generateStreamToken', () => {
    describe('Happy Path', () => {
      it('should generate token successfully for string userId', () => {
        mockCreateToken.mockReturnValueOnce('mock_token_123');

        const token = generateStreamToken('user123');

        expect(mockCreateToken).toHaveBeenCalledWith('user123');
        expect(token).toBe('mock_token_123');
      });

      it('should convert numeric userId to string', () => {
        mockCreateToken.mockReturnValueOnce('mock_token_456');

        const token = generateStreamToken(12345);

        expect(mockCreateToken).toHaveBeenCalledWith('12345');
        expect(token).toBe('mock_token_456');
      });

      it('should handle ObjectId-like userId', () => {
        const objectId = { toString: () => '507f1f77bcf86cd799439011' };
        mockCreateToken.mockReturnValueOnce('mock_token_objectid');

        const token = generateStreamToken(objectId);

        expect(mockCreateToken).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
        expect(token).toBe('mock_token_objectid');
      });
    });

    describe('Error Handling', () => {
      it('should handle token generation error', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        const error = new Error('Token generation failed');
        mockCreateToken.mockImplementationOnce(() => {
          throw error;
        });

        const token = generateStreamToken('user123');

        expect(consoleSpy).toHaveBeenCalledWith(
          'Error generating Stream token:',
          error
        );
        expect(token).toBeNull();
      });

      it('should return null on error', () => {
        mockCreateToken.mockImplementationOnce(() => {
          throw new Error('Invalid credentials');
        });

        const token = generateStreamToken('user123');

        expect(token).toBeNull();
      });
    });

    describe('Edge Cases', () => {
      it('should handle empty string userId', () => {
        mockCreateToken.mockReturnValueOnce('token_empty');

        const token = generateStreamToken('');

        expect(mockCreateToken).toHaveBeenCalledWith('');
        expect(token).toBe('token_empty');
      });

      it('should handle null userId conversion', () => {
        mockCreateToken.mockReturnValueOnce('token_null');

        const token = generateStreamToken(null);

        expect(mockCreateToken).toHaveBeenCalledWith('null');
      });

      it('should handle undefined userId conversion', () => {
        mockCreateToken.mockReturnValueOnce('token_undefined');

        const token = generateStreamToken(undefined);

        expect(mockCreateToken).toHaveBeenCalledWith('undefined');
      });
    });
  });

  describe('addUserToPublicChannels', () => {
    describe('Happy Path', () => {
      it('should add user to all public channels', async () => {
        const channels = [
          mockChannel,
          { addMembers: jest.fn().mockResolvedValue({}) },
          { addMembers: jest.fn().mockResolvedValue({}) },
        ];
        mockQueryChannels.mockResolvedValueOnce(channels);

        await addUserToPublicChannels('user123');

        expect(mockQueryChannels).toHaveBeenCalledWith({ discoverable: true });
        expect(channels[0].addMembers).toHaveBeenCalledWith(['user123']);
        expect(channels[1].addMembers).toHaveBeenCalledWith(['user123']);
        expect(channels[2].addMembers).toHaveBeenCalledWith(['user123']);
      });

      it('should handle single public channel', async () => {
        const channels = [mockChannel];
        mockQueryChannels.mockResolvedValueOnce(channels);

        await addUserToPublicChannels('user456');

        expect(mockChannel.addMembers).toHaveBeenCalledWith(['user456']);
      });

      it('should handle no public channels', async () => {
        mockQueryChannels.mockResolvedValueOnce([]);

        await addUserToPublicChannels('user789');

        expect(mockQueryChannels).toHaveBeenCalled();
        // No channels to add to, so no addMembers calls
      });
    });

    describe('Error Handling', () => {
      it('should handle channel query error', async () => {
        mockQueryChannels.mockRejectedValueOnce(new Error('Query failed'));

        await expect(addUserToPublicChannels('user123')).rejects.toThrow('Query failed');
      });

      it('should handle addMembers error for individual channel', async () => {
        const failingChannel = {
          addMembers: jest.fn().mockRejectedValueOnce(new Error('Add member failed')),
        };
        mockQueryChannels.mockResolvedValueOnce([failingChannel]);

        await expect(addUserToPublicChannels('user123')).rejects.toThrow('Add member failed');
      });

      it('should handle partial failures in multiple channels', async () => {
        const successChannel = { addMembers: jest.fn().mockResolvedValue({}) };
        const failChannel = {
          addMembers: jest.fn().mockRejectedValueOnce(new Error('Failed')),
        };
        mockQueryChannels.mockResolvedValueOnce([successChannel, failChannel]);

        await expect(addUserToPublicChannels('user123')).rejects.toThrow('Failed');
        expect(successChannel.addMembers).toHaveBeenCalledWith(['user123']);
      });
    });

    describe('Edge Cases', () => {
      it('should handle empty userId string', async () => {
        const channels = [mockChannel];
        mockQueryChannels.mockResolvedValueOnce(channels);

        await addUserToPublicChannels('');

        expect(mockChannel.addMembers).toHaveBeenCalledWith(['']);
      });

      it('should handle large number of public channels', async () => {
        const channels = Array(100)
          .fill(null)
          .map(() => ({ addMembers: jest.fn().mockResolvedValue({}) }));
        mockQueryChannels.mockResolvedValueOnce(channels);

        await addUserToPublicChannels('user123');

        expect(mockQueryChannels).toHaveBeenCalledTimes(1);
        channels.forEach((channel) => {
          expect(channel.addMembers).toHaveBeenCalledWith(['user123']);
        });
      });
    });

    describe('Async Behavior', () => {
      it('should await all channel operations sequentially', async () => {
        const callOrder = [];
        const channel1 = {
          addMembers: jest.fn().mockImplementation(async () => {
            callOrder.push('channel1');
          }),
        };
        const channel2 = {
          addMembers: jest.fn().mockImplementation(async () => {
            callOrder.push('channel2');
          }),
        };
        mockQueryChannels.mockResolvedValueOnce([channel1, channel2]);

        await addUserToPublicChannels('user123');

        expect(callOrder).toEqual(['channel1', 'channel2']);
      });
    });
  });

  describe('Module Initialization', () => {
    it('should call StreamChat.getInstance with correct parameters', async () => {
      expect(mockGetInstance).toHaveBeenCalledWith('test_api_key', 'test_api_secret');
    });
  });
});