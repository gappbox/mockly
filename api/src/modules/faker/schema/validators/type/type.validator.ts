import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { SchemaService } from '../../schema.service';

@ValidatorConstraint({ name: 'IsValidType' })
@Injectable()
export class TypeValidator implements ValidatorConstraintInterface {
  constructor(private readonly schemaService: SchemaService) {}

  validate(value: unknown, args: ValidationArguments): boolean {
    const [category] = args.constraints;
    const object = args.object as any;

    if (typeof value !== 'string') {
      return false;
    }

    return !!this.schemaService
      .getTypesByCategory(object[category] as string)
      .find((type) => type.code === value);
  }

  defaultMessage(): string {
    return 'type is not exists';
  }
}

export function IsValidType(category: string, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      constraints: [category],
      options: validationOptions,
      propertyName: propertyName,
      target: object.constructor,
      validator: TypeValidator,
    });
  };
}
