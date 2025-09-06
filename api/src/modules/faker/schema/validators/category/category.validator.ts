import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { SchemaService } from '../../schema.service';

@ValidatorConstraint({ name: 'IsValidCategory' })
@Injectable()
export class CategoryValidator implements ValidatorConstraintInterface {
  constructor(private readonly schemaService: SchemaService) {}

  validate(value: unknown): boolean {
    if (typeof value !== 'string') {
      return false;
    }

    return !!this.schemaService
      .getCategories()
      .find((category) => category.code === value);
  }

  defaultMessage(): string {
    return 'category is not exists';
  }
}

export function IsValidCategory(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      constraints: [],
      options: validationOptions,
      propertyName: propertyName,
      target: object.constructor,
      validator: CategoryValidator,
    });
  };
}