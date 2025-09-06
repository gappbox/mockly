import type { ValidationError } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

interface FieldErrors {
  [fieldIndex: string]: { [fieldProperty: string]: string[]; };
}

interface StructuredErrors {
  [key: string]: string[] | FieldErrors;
}

export function validationExceptionFactory(errors: ValidationError[]): BadRequestException {
  const structuredErrors = createStructureErrors(errors);

  return new BadRequestException({
    message: 'Request validation failed. Please check the provided data',
    errors: structuredErrors,
    type: 'VALIDATION_ERROR',
    timestamp: new Date().toISOString(),
  });
}

function createStructureErrors(errors: ValidationError[]): StructuredErrors {
  const result: StructuredErrors = {};

  errors.forEach(error => {
    if (error.children && Array.isArray(error.children) && error.children.length > 0) {
      const fieldsErrors: FieldErrors = {};

      error.children.forEach((fieldError) => {
        if (fieldError.children && Array.isArray(fieldError.children) && fieldError.children.length > 0) {
          const fieldIndex = fieldError.property;

          fieldsErrors[fieldIndex] = {};
          fieldError.children.forEach(propError => {
            if (propError.constraints) {
              fieldsErrors[fieldIndex][propError.property] = Object.values(propError.constraints);
            }
          });
        }
      });

      result.fields = fieldsErrors;
    } else if (error.constraints) {
      result[error.property] = Object.values(error.constraints);
    }
  });

  return result;
}
