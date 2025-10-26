import { beforeEach, describe, expect, it, jest } from '@jest/globals';

// Mock mongoose
const mockSchema = jest.fn();
const mockModel = jest.fn();

jest.unstable_mockModule('mongoose', () => ({
  default: {
    Schema: mockSchema,
    model: mockModel,
  },
}));

describe('User Model', () => {
  let User;

  beforeEach(async () => {
    jest.clearAllMocks();
    
    // Mock Schema constructor to return a mock schema
    mockSchema.mockImplementation((definition, options) => ({
      definition,
      options,
    }));

    const userModule = await import('../../models/user.model.js');
    User = userModule.User;
  });

  describe('Schema Definition', () => {
    it('should create User model with mongoose', () => {
      expect(mockSchema).toHaveBeenCalled();
      expect(mockModel).toHaveBeenCalledWith('User', expect.any(Object));
    });

    it('should define email field with correct properties', () => {
      const schemaCall = mockSchema.mock.calls[0][0];
      
      expect(schemaCall.email).toBeDefined();
      expect(schemaCall.email.type).toBe(String);
      expect(schemaCall.email.required).toBe(true);
      expect(schemaCall.email.unique).toBe(true);
    });

    it('should define name field with correct properties', () => {
      const schemaCall = mockSchema.mock.calls[0][0];
      
      expect(schemaCall.name).toBeDefined();
      expect(schemaCall.name.type).toBe(String);
      expect(schemaCall.name.required).toBe(true);
    });

    it('should define image field with correct properties', () => {
      const schemaCall = mockSchema.mock.calls[0][0];
      
      expect(schemaCall.image).toBeDefined();
      expect(schemaCall.image.type).toBe(String);
      expect(schemaCall.image.required).toBe(true);
    });

    it('should define clerkId field with correct properties', () => {
      const schemaCall = mockSchema.mock.calls[0][0];
      
      expect(schemaCall.clerkId).toBeDefined();
      expect(schemaCall.clerkId.type).toBe(String);
      expect(schemaCall.clerkId.required).toBe(true);
      expect(schemaCall.clerkId.unique).toBe(true);
    });

    it('should have timestamps enabled', () => {
      const schemaOptions = mockSchema.mock.calls[0][1];
      
      expect(schemaOptions).toBeDefined();
      expect(schemaOptions.timestamps).toBe(true);
    });

    it('should have exactly 4 fields defined', () => {
      const schemaCall = mockSchema.mock.calls[0][0];
      const fields = Object.keys(schemaCall);
      
      expect(fields).toHaveLength(4);
      expect(fields).toContain('email');
      expect(fields).toContain('name');
      expect(fields).toContain('image');
      expect(fields).toContain('clerkId');
    });
  });

  describe('Field Requirements', () => {
    it('should require all fields to be present', () => {
      const schemaCall = mockSchema.mock.calls[0][0];
      
      expect(schemaCall.email.required).toBe(true);
      expect(schemaCall.name.required).toBe(true);
      expect(schemaCall.image.required).toBe(true);
      expect(schemaCall.clerkId.required).toBe(true);
    });

    it('should enforce unique constraint on email', () => {
      const schemaCall = mockSchema.mock.calls[0][0];
      expect(schemaCall.email.unique).toBe(true);
    });

    it('should enforce unique constraint on clerkId', () => {
      const schemaCall = mockSchema.mock.calls[0][0];
      expect(schemaCall.clerkId.unique).toBe(true);
    });
  });

  describe('Data Types', () => {
    it('should use String type for all fields', () => {
      const schemaCall = mockSchema.mock.calls[0][0];
      
      expect(schemaCall.email.type).toBe(String);
      expect(schemaCall.name.type).toBe(String);
      expect(schemaCall.image.type).toBe(String);
      expect(schemaCall.clerkId.type).toBe(String);
    });
  });

  describe('Schema Options', () => {
    it('should enable automatic timestamps', () => {
      const schemaOptions = mockSchema.mock.calls[0][1];
      expect(schemaOptions.timestamps).toBe(true);
    });

    it('should create createdAt and updatedAt fields implicitly', () => {
      const schemaOptions = mockSchema.mock.calls[0][1];
      // When timestamps is true, Mongoose automatically adds createdAt and updatedAt
      expect(schemaOptions.timestamps).toBe(true);
    });
  });

  describe('Model Export', () => {
    it('should export User model', () => {
      expect(User).toBeDefined();
    });

    it('should create model with correct name', () => {
      expect(mockModel).toHaveBeenCalledWith('User', expect.any(Object));
    });
  });

  describe('Edge Cases - Schema Validation', () => {
    it('should not have optional fields', () => {
      const schemaCall = mockSchema.mock.calls[0][0];
      const fields = Object.values(schemaCall);
      
      fields.forEach((field) => {
        expect(field.required).toBe(true);
      });
    });

    it('should not define default values', () => {
      const schemaCall = mockSchema.mock.calls[0][0];
      
      expect(schemaCall.email.default).toBeUndefined();
      expect(schemaCall.name.default).toBeUndefined();
      expect(schemaCall.image.default).toBeUndefined();
      expect(schemaCall.clerkId.default).toBeUndefined();
    });

    it('should not have custom validators defined in schema', () => {
      const schemaCall = mockSchema.mock.calls[0][0];
      
      expect(schemaCall.email.validate).toBeUndefined();
      expect(schemaCall.name.validate).toBeUndefined();
      expect(schemaCall.image.validate).toBeUndefined();
      expect(schemaCall.clerkId.validate).toBeUndefined();
    });
  });

  describe('Index Configuration', () => {
    it('should have unique indexes on email and clerkId', () => {
      const schemaCall = mockSchema.mock.calls[0][0];
      
      // Unique constraint creates an index
      expect(schemaCall.email.unique).toBe(true);
      expect(schemaCall.clerkId.unique).toBe(true);
    });
  });
});