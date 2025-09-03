import type { ValidationError } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { validationExceptionFactory } from './validation.exception';

interface ValidationExceptionResponse {
  message: string;
  errors: Record<string, string[]>;
  type: string;
  timestamp: string;
}

describe('validationExceptionFactory', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-01T00:00:00.000Z'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should create BadRequestException with correct structure for single error', () => {
    const mockErrors: ValidationError[] = [
      {
        property: 'email',
        constraints: {
          isEmail: 'email must be an email',
          isNotEmpty: 'email should not be empty',
        },
      },
    ];

    expect(validationExceptionFactory(mockErrors)).toBeInstanceOf(BadRequestException);
    expect(validationExceptionFactory(mockErrors).getResponse()).toEqual({
      message: 'Request validation failed. Please check the provided data',
      errors: { email: ['email must be an email', 'email should not be empty'] },
      type: 'VALIDATION_ERROR',
      timestamp: '2024-01-01T00:00:00.000Z',
    });
  });

  it('should create BadRequestException with correct structure for multiple errors', () => {
    const mockErrors: ValidationError[] = [
      {
        property: 'email',
        constraints: {
          isEmail: 'email must be an email',
        },
      },
      {
        property: 'password',
        constraints: {
          minLength: 'password must be longer than or equal to 8 characters',
          isNotEmpty: 'password should not be empty',
        },
      },
      {
        property: 'age',
        constraints: {
          isNumber: 'age must be a number',
        },
      },
    ];

    expect(validationExceptionFactory(mockErrors)).toBeInstanceOf(BadRequestException);
    expect(validationExceptionFactory(mockErrors).getResponse()).toEqual({
      message: 'Request validation failed. Please check the provided data',
      errors: {
        email: ['email must be an email'],
        password: ['password must be longer than or equal to 8 characters', 'password should not be empty'],
        age: ['age must be a number'],
      },
      type: 'VALIDATION_ERROR',
      timestamp: '2024-01-01T00:00:00.000Z',
    });
  });

  it('should handle empty errors array', () => {
    expect(validationExceptionFactory([])).toBeInstanceOf(BadRequestException);
    expect(validationExceptionFactory([]).getResponse()).toEqual({
      message: 'Request validation failed. Please check the provided data',
      errors: {},
      type: 'VALIDATION_ERROR',
      timestamp: '2024-01-01T00:00:00.000Z',
    });
  });

  it('should handle ValidationError without constraints', () => {
    const mockErrors: ValidationError[] = [
      {
        property: 'email',
      },
      {
        property: 'password',
        constraints: {
          minLength: 'password must be longer than or equal to 8 characters',
        },
      },
    ];

    expect(validationExceptionFactory(mockErrors)).toBeInstanceOf(BadRequestException);
    expect(validationExceptionFactory(mockErrors).getResponse()).toEqual({
      message: 'Request validation failed. Please check the provided data',
      errors: { password: ['password must be longer than or equal to 8 characters'] },
      type: 'VALIDATION_ERROR',
      timestamp: '2024-01-01T00:00:00.000Z',
    });
  });

  it('should handle ValidationError with empty constraints', () => {
    const mockErrors: ValidationError[] = [
      {
        property: 'email',
        constraints: {},
      },
      {
        property: 'password',
        constraints: {
          minLength: 'password must be longer than or equal to 8 characters',
        },
      },
    ];

    expect(validationExceptionFactory(mockErrors)).toBeInstanceOf(BadRequestException);
    expect(validationExceptionFactory(mockErrors).getResponse()).toEqual({
      message: 'Request validation failed. Please check the provided data',
      errors: {
        email: [],
        password: ['password must be longer than or equal to 8 characters'],
      },
      type: 'VALIDATION_ERROR',
      timestamp: '2024-01-01T00:00:00.000Z',
    });
  });

  it('should preserve order of constraint messages', () => {
    const mockErrors: ValidationError[] = [
      {
        property: 'username',
        constraints: {
          isNotEmpty: 'username should not be empty',
          minLength: 'username must be longer than or equal to 3 characters',
          maxLength: 'username must be shorter than or equal to 20 characters',
        },
      },
    ];

    const result = validationExceptionFactory(mockErrors);
    const response = result.getResponse() as ValidationExceptionResponse;

    expect(response.errors.username).toHaveLength(3);
    expect(response.errors.username).toContain('username should not be empty');
    expect(response.errors.username).toContain('username must be longer than or equal to 3 characters');
    expect(response.errors.username).toContain('username must be shorter than or equal to 20 characters');
  });

  it('should have correct HTTP status', () => {
    expect(validationExceptionFactory([{
      property: 'email',
      constraints: { isEmail: 'email must be an email' },
    }]).getStatus()).toBe(400);
  });
});