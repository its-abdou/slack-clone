import { beforeEach, describe, expect, it, jest } from '@jest/globals';

// Mock dependencies
const mockInngestConstructor = jest.fn();
const mockCreateFunction = jest.fn();
const mockConnect = jest.fn();
const mockCreate = jest.fn();
const mockDeleteOne = jest.fn();
const mockUpsertStreamUser = jest.fn();
const mockDeleteStreamUser = jest.fn();
const mockAddUserToPublicChannels = jest.fn();

jest.unstable_mockModule('inngest', () => ({
  Inngest: jest.fn().mockImplementation(() => ({
    createFunction: mockCreateFunction,
  })),
}));

jest.unstable_mockModule('../../config/db.js', () => ({
  connectDB: mockConnect,
}));

jest.unstable_mockModule('../../models/user.model.js', () => ({
  User: {
    create: mockCreate,
    deleteOne: mockDeleteOne,
  },
}));

jest.unstable_mockModule('../../config/stream.js', () => ({
  upsertStreamUser: mockUpsertStreamUser,
  deleteStreamUser: mockDeleteStreamUser,
  addUserToPublicChannels: mockAddUserToPublicChannels,
}));

describe('Inngest Configuration', () => {
  let inngest, functions;

  beforeEach(async () => {
    jest.clearAllMocks();
    
    // Reset mock implementations
    mockCreateFunction.mockImplementation((config, eventConfig, handler) => {
      return { config, eventConfig, handler };
    });

    const inngestModule = await import('../../config/inngest.js');
    inngest = inngestModule.inngest;
    functions = inngestModule.functions;
  });

  describe('Inngest Client Initialization', () => {
    it('should create Inngest client with correct id', () => {
      expect(inngest).toBeDefined();
    });

    it('should export functions array', () => {
      expect(Array.isArray(functions)).toBe(true);
      expect(functions.length).toBe(2);
    });
  });

  describe('syncUser Function', () => {
    let syncUserHandler;

    beforeEach(async () => {
      const inngestModule = await import('../../config/inngest.js');
      const syncUserFunc = inngestModule.functions[0];
      syncUserHandler = syncUserFunc.handler;
    });

    describe('Happy Path', () => {
      it('should create user in database successfully', async () => {
        const mockEvent = {
          data: {
            id: 'clerk_user_123',
            email_addresses: [{ email_address: 'test@example.com' }],
            first_name: 'John',
            last_name: 'Doe',
            image_url: 'https://example.com/avatar.jpg',
          },
        };

        mockConnect.mockResolvedValueOnce(undefined);
        mockCreate.mockResolvedValueOnce({});
        mockUpsertStreamUser.mockResolvedValueOnce({});
        mockAddUserToPublicChannels.mockResolvedValueOnce(undefined);

        await syncUserHandler({ event: mockEvent });

        expect(mockConnect).toHaveBeenCalled();
        expect(mockCreate).toHaveBeenCalledWith({
          clerkId: 'clerk_user_123',
          email: 'test@example.com',
          name: 'John Doe',
          image: 'https://example.com/avatar.jpg',
        });
        expect(mockUpsertStreamUser).toHaveBeenCalledWith({
          id: 'clerk_user_123',
          name: 'John Doe',
          image: 'https://example.com/avatar.jpg',
        });
        expect(mockAddUserToPublicChannels).toHaveBeenCalledWith('clerk_user_123');
      });

      it('should handle user with only first name', async () => {
        const mockEvent = {
          data: {
            id: 'clerk_user_456',
            email_addresses: [{ email_address: 'jane@example.com' }],
            first_name: 'Jane',
            last_name: null,
            image_url: 'https://example.com/jane.jpg',
          },
        };

        mockConnect.mockResolvedValueOnce(undefined);
        mockCreate.mockResolvedValueOnce({});
        mockUpsertStreamUser.mockResolvedValueOnce({});
        mockAddUserToPublicChannels.mockResolvedValueOnce(undefined);

        await syncUserHandler({ event: mockEvent });

        expect(mockCreate).toHaveBeenCalledWith(
          expect.objectContaining({
            name: 'Jane ',
          })
        );
      });

      it('should handle user with only last name', async () => {
        const mockEvent = {
          data: {
            id: 'clerk_user_789',
            email_addresses: [{ email_address: 'smith@example.com' }],
            first_name: null,
            last_name: 'Smith',
            image_url: 'https://example.com/smith.jpg',
          },
        };

        mockConnect.mockResolvedValueOnce(undefined);
        mockCreate.mockResolvedValueOnce({});
        mockUpsertStreamUser.mockResolvedValueOnce({});
        mockAddUserToPublicChannels.mockResolvedValueOnce(undefined);

        await syncUserHandler({ event: mockEvent });

        expect(mockCreate).toHaveBeenCalledWith(
          expect.objectContaining({
            name: ' Smith',
          })
        );
      });

      it('should handle user with no name', async () => {
        const mockEvent = {
          data: {
            id: 'clerk_user_noname',
            email_addresses: [{ email_address: 'noname@example.com' }],
            first_name: null,
            last_name: null,
            image_url: 'https://example.com/default.jpg',
          },
        };

        mockConnect.mockResolvedValueOnce(undefined);
        mockCreate.mockResolvedValueOnce({});
        mockUpsertStreamUser.mockResolvedValueOnce({});
        mockAddUserToPublicChannels.mockResolvedValueOnce(undefined);

        await syncUserHandler({ event: mockEvent });

        expect(mockCreate).toHaveBeenCalledWith(
          expect.objectContaining({
            name: ' ',
          })
        );
      });
    });

    describe('Edge Cases - Email Handling', () => {
      it('should handle multiple email addresses and use first', async () => {
        const mockEvent = {
          data: {
            id: 'clerk_user_multi',
            email_addresses: [
              { email_address: 'primary@example.com' },
              { email_address: 'secondary@example.com' },
            ],
            first_name: 'Multi',
            last_name: 'Email',
            image_url: 'https://example.com/multi.jpg',
          },
        };

        mockConnect.mockResolvedValueOnce(undefined);
        mockCreate.mockResolvedValueOnce({});
        mockUpsertStreamUser.mockResolvedValueOnce({});
        mockAddUserToPublicChannels.mockResolvedValueOnce(undefined);

        await syncUserHandler({ event: mockEvent });

        expect(mockCreate).toHaveBeenCalledWith(
          expect.objectContaining({
            email: 'primary@example.com',
          })
        );
      });

      it('should handle empty email addresses array', async () => {
        const mockEvent = {
          data: {
            id: 'clerk_user_noemail',
            email_addresses: [],
            first_name: 'No',
            last_name: 'Email',
            image_url: 'https://example.com/noemail.jpg',
          },
        };

        mockConnect.mockResolvedValueOnce(undefined);
        mockCreate.mockResolvedValueOnce({});
        mockUpsertStreamUser.mockResolvedValueOnce({});
        mockAddUserToPublicChannels.mockResolvedValueOnce(undefined);

        await syncUserHandler({ event: mockEvent });

        expect(mockCreate).toHaveBeenCalledWith(
          expect.objectContaining({
            email: undefined,
          })
        );
      });

      it('should handle missing email_addresses field', async () => {
        const mockEvent = {
          data: {
            id: 'clerk_user_missing',
            first_name: 'Missing',
            last_name: 'Email',
            image_url: 'https://example.com/missing.jpg',
          },
        };

        mockConnect.mockResolvedValueOnce(undefined);
        mockCreate.mockResolvedValueOnce({});
        mockUpsertStreamUser.mockResolvedValueOnce({});
        mockAddUserToPublicChannels.mockResolvedValueOnce(undefined);

        await expect(syncUserHandler({ event: mockEvent })).rejects.toThrow();
      });
    });

    describe('Error Handling', () => {
      it('should handle database connection error', async () => {
        const mockEvent = {
          data: {
            id: 'clerk_user_123',
            email_addresses: [{ email_address: 'test@example.com' }],
            first_name: 'John',
            last_name: 'Doe',
            image_url: 'https://example.com/avatar.jpg',
          },
        };

        mockConnect.mockRejectedValueOnce(new Error('Connection failed'));

        await expect(syncUserHandler({ event: mockEvent })).rejects.toThrow(
          'Connection failed'
        );
      });

      it('should handle user creation error', async () => {
        const mockEvent = {
          data: {
            id: 'clerk_user_123',
            email_addresses: [{ email_address: 'test@example.com' }],
            first_name: 'John',
            last_name: 'Doe',
            image_url: 'https://example.com/avatar.jpg',
          },
        };

        mockConnect.mockResolvedValueOnce(undefined);
        mockCreate.mockRejectedValueOnce(new Error('Duplicate key error'));

        await expect(syncUserHandler({ event: mockEvent })).rejects.toThrow(
          'Duplicate key error'
        );
      });

      it('should handle Stream user upsert error', async () => {
        const mockEvent = {
          data: {
            id: 'clerk_user_123',
            email_addresses: [{ email_address: 'test@example.com' }],
            first_name: 'John',
            last_name: 'Doe',
            image_url: 'https://example.com/avatar.jpg',
          },
        };

        mockConnect.mockResolvedValueOnce(undefined);
        mockCreate.mockResolvedValueOnce({});
        mockUpsertStreamUser.mockRejectedValueOnce(new Error('Stream API error'));

        await expect(syncUserHandler({ event: mockEvent })).rejects.toThrow(
          'Stream API error'
        );
      });

      it('should handle addUserToPublicChannels error', async () => {
        const mockEvent = {
          data: {
            id: 'clerk_user_123',
            email_addresses: [{ email_address: 'test@example.com' }],
            first_name: 'John',
            last_name: 'Doe',
            image_url: 'https://example.com/avatar.jpg',
          },
        };

        mockConnect.mockResolvedValueOnce(undefined);
        mockCreate.mockResolvedValueOnce({});
        mockUpsertStreamUser.mockResolvedValueOnce({});
        mockAddUserToPublicChannels.mockRejectedValueOnce(new Error('Channel add error'));

        await expect(syncUserHandler({ event: mockEvent })).rejects.toThrow(
          'Channel add error'
        );
      });
    });
  });

  describe('deleteUserFromDB Function', () => {
    let deleteUserHandler;

    beforeEach(async () => {
      const inngestModule = await import('../../config/inngest.js');
      const deleteUserFunc = inngestModule.functions[1];
      deleteUserHandler = deleteUserFunc.handler;
    });

    describe('Happy Path', () => {
      it('should delete user from database successfully', async () => {
        const mockEvent = {
          data: {
            id: 'clerk_user_123',
          },
        };

        mockConnect.mockResolvedValueOnce(undefined);
        mockDeleteOne.mockResolvedValueOnce({ deletedCount: 1 });
        mockDeleteStreamUser.mockResolvedValueOnce(undefined);

        await deleteUserHandler({ event: mockEvent });

        expect(mockConnect).toHaveBeenCalled();
        expect(mockDeleteOne).toHaveBeenCalledWith({ clerkId: 'clerk_user_123' });
        expect(mockDeleteStreamUser).toHaveBeenCalledWith('clerk_user_123');
      });

      it('should handle numeric user id', async () => {
        const mockEvent = {
          data: {
            id: 12345,
          },
        };

        mockConnect.mockResolvedValueOnce(undefined);
        mockDeleteOne.mockResolvedValueOnce({ deletedCount: 1 });
        mockDeleteStreamUser.mockResolvedValueOnce(undefined);

        await deleteUserHandler({ event: mockEvent });

        expect(mockDeleteOne).toHaveBeenCalledWith({ clerkId: 12345 });
        expect(mockDeleteStreamUser).toHaveBeenCalledWith('12345');
      });
    });

    describe('Error Handling', () => {
      it('should handle database connection error', async () => {
        const mockEvent = {
          data: {
            id: 'clerk_user_123',
          },
        };

        mockConnect.mockRejectedValueOnce(new Error('Connection failed'));

        await expect(deleteUserHandler({ event: mockEvent })).rejects.toThrow(
          'Connection failed'
        );
      });

      it('should handle user deletion error', async () => {
        const mockEvent = {
          data: {
            id: 'clerk_user_123',
          },
        };

        mockConnect.mockResolvedValueOnce(undefined);
        mockDeleteOne.mockRejectedValueOnce(new Error('Delete failed'));

        await expect(deleteUserHandler({ event: mockEvent })).rejects.toThrow('Delete failed');
      });

      it('should handle Stream user deletion error', async () => {
        const mockEvent = {
          data: {
            id: 'clerk_user_123',
          },
        };

        mockConnect.mockResolvedValueOnce(undefined);
        mockDeleteOne.mockResolvedValueOnce({ deletedCount: 1 });
        mockDeleteStreamUser.mockRejectedValueOnce(new Error('Stream delete error'));

        await expect(deleteUserHandler({ event: mockEvent })).rejects.toThrow(
          'Stream delete error'
        );
      });

      it('should handle non-existent user deletion', async () => {
        const mockEvent = {
          data: {
            id: 'nonexistent_user',
          },
        };

        mockConnect.mockResolvedValueOnce(undefined);
        mockDeleteOne.mockResolvedValueOnce({ deletedCount: 0 });
        mockDeleteStreamUser.mockResolvedValueOnce(undefined);

        await deleteUserHandler({ event: mockEvent });

        expect(mockDeleteOne).toHaveBeenCalled();
        expect(mockDeleteStreamUser).toHaveBeenCalled();
      });
    });

    describe('Edge Cases', () => {
      it('should handle empty string user id', async () => {
        const mockEvent = {
          data: {
            id: '',
          },
        };

        mockConnect.mockResolvedValueOnce(undefined);
        mockDeleteOne.mockResolvedValueOnce({ deletedCount: 0 });
        mockDeleteStreamUser.mockResolvedValueOnce(undefined);

        await deleteUserHandler({ event: mockEvent });

        expect(mockDeleteOne).toHaveBeenCalledWith({ clerkId: '' });
        expect(mockDeleteStreamUser).toHaveBeenCalledWith('');
      });

      it('should handle null user id', async () => {
        const mockEvent = {
          data: {
            id: null,
          },
        };

        mockConnect.mockResolvedValueOnce(undefined);
        mockDeleteOne.mockResolvedValueOnce({ deletedCount: 0 });
        mockDeleteStreamUser.mockResolvedValueOnce(undefined);

        await deleteUserHandler({ event: mockEvent });

        expect(mockDeleteStreamUser).toHaveBeenCalledWith('null');
      });
    });
  });

  describe('Function Configuration', () => {
    it('should configure syncUser with correct event', () => {
      const syncUserFunc = functions[0];
      expect(syncUserFunc.config).toEqual({ id: 'sync-user' });
      expect(syncUserFunc.eventConfig).toEqual({ event: 'clerk/user.created' });
    });

    it('should configure deleteUserFromDB with correct event', () => {
      const deleteUserFunc = functions[1];
      expect(deleteUserFunc.config).toEqual({ id: 'delete-user-from-db' });
      expect(deleteUserFunc.eventConfig).toEqual({ event: 'clerk/user.deleted' });
    });

    it('should export exactly two functions', () => {
      expect(functions).toHaveLength(2);
    });
  });
});