import type { ValidationError } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

export function validationExceptionFactory(errors: ValidationError[]): BadRequestException {
  const messages = errors.reduce((previousValue, error) => {
    if (error.constraints) {
      previousValue[error.property] = [...Object.values(error.constraints)];
    }

    return previousValue;
  }, {} as Record<string, string[]>);

  return new BadRequestException({
    message: 'Request validation failed. Please check the provided data',
    errors: messages,
    type: 'VALIDATION_ERROR',
    timestamp: new Date().toISOString(),
  });
}