import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { ValidationArguments } from 'class-validator';
import type { Type } from '../../models';
import { SchemaService } from '../../schema.service';
import { TypeValidator } from './type.validator';

const electronicsTypes: Type[] = [
  { code: 'smartphone', description: 'Smartphone type', id: '1' },
  { code: 'laptop', description: 'Laptop type', id: '2' },
  { code: 'tablet', description: 'Tablet type', id: '3' },
];

const clothingTypes: Type[] = [
  { code: 'shirt', description: 'Shirt type', id: '4' },
  { code: 'pants', description: 'Pants type', id: '5' },
];

const categories: Record<string, Type[]> = {
  electronics: electronicsTypes,
  clothing: clothingTypes,
};

describe('TypeValidator', () => {
  let schemaService: SchemaService;
  let typeValidator: TypeValidator;

  beforeEach(async () => {
    const mockSchemaService = {
      getCategories: jest.fn(),
      getTypes: jest.fn(),
      getTypesByCategory: jest.fn((category: string) => categories[category] ?? []),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TypeValidator,
        {
          provide: SchemaService,
          useValue: mockSchemaService,
        },
      ],
    }).compile();

    schemaService = module.get<SchemaService>(SchemaService);
    typeValidator = module.get<TypeValidator>(TypeValidator);
  });

  const createValidationArgs = (object: any, category = 'category'): ValidationArguments => ({
    constraints: [category],
    object,
    property: 'type',
    targetName: 'TestClass',
    value: undefined,
  });

  it('should return true for valid type code in correct category', () => {
    const electronicsObject = { category: 'electronics', type: 'smartphone' };
    const clothingObject = { category: 'clothing', type: 'shirt' };

    expect(typeValidator.validate('smartphone', createValidationArgs(electronicsObject))).toBe(true);
    expect(typeValidator.validate('laptop', createValidationArgs(electronicsObject))).toBe(true);
    expect(typeValidator.validate('shirt', createValidationArgs(clothingObject))).toBe(true);
    expect(typeValidator.validate('pants', createValidationArgs(clothingObject))).toBe(true);
  });

  it('should return false for valid type code in wrong category', () => {
    const electronicsObject = { category: 'electronics', type: 'shirt' };
    const clothingObject = { category: 'clothing', type: 'smartphone' };

    expect(typeValidator.validate('shirt', createValidationArgs(electronicsObject))).toBe(false);
    expect(typeValidator.validate('smartphone', createValidationArgs(clothingObject))).toBe(false);
  });

  it('should return false for invalid type code', () => {
    const object = { category: 'electronics', type: 'invalid-type' };

    expect(typeValidator.validate('invalid-type', createValidationArgs(object))).toBe(false);
    expect(typeValidator.validate('nonexistent', createValidationArgs(object))).toBe(false);
  });

  it('should return false for invalid category', () => {
    const object = { category: 'invalid-category', type: 'smartphone' };

    expect(typeValidator.validate('smartphone', createValidationArgs(object))).toBe(false);
  });

  it('should return false for non-string type values', () => {
    const object = { category: 'electronics', type: 123 };

    expect(typeValidator.validate(123, createValidationArgs(object))).toBe(false);
    expect(typeValidator.validate(null, createValidationArgs(object))).toBe(false);
    expect(typeValidator.validate(undefined, createValidationArgs(object))).toBe(false);
    expect(typeValidator.validate({}, createValidationArgs(object))).toBe(false);
    expect(typeValidator.validate([], createValidationArgs(object))).toBe(false);
    expect(typeValidator.validate(true, createValidationArgs(object))).toBe(false);
  });

  it('should return false when category property is missing', () => {
    const object = { type: 'smartphone' };

    expect(typeValidator.validate('smartphone', createValidationArgs(object))).toBe(false);
  });

  it('should return false when category property is not a string', () => {
    const object = { category: 123, type: 'smartphone' };

    expect(typeValidator.validate('smartphone', createValidationArgs(object))).toBe(false);
  });

  it('should handle empty types array for category', () => {
    jest.spyOn(schemaService, 'getTypesByCategory').mockReturnValue([]);
    const object = { category: 'electronics', type: 'smartphone' };

    expect(typeValidator.validate('smartphone', createValidationArgs(object))).toBe(false);
  });

  it('should handle empty string type', () => {
    const object = { category: 'electronics', type: '' };

    expect(typeValidator.validate('', createValidationArgs(object))).toBe(false);
  });

  it('should handle whitespace strings', () => {
    const object = { category: 'electronics', type: ' ' };

    expect(typeValidator.validate(' ', createValidationArgs(object))).toBe(false);
    expect(typeValidator.validate('\t', createValidationArgs(object))).toBe(false);
    expect(typeValidator.validate('\n', createValidationArgs(object))).toBe(false);
  });

  it('should return correct default error message', () => {
    expect(typeValidator.defaultMessage()).toBe('type is not exists');
  });

  it('should use schemaService to find matching type by code', () => {
    const getTypesByCategory = jest.spyOn(schemaService, 'getTypesByCategory');
    const object = { category: 'electronics', type: 'smartphone' };
    const result = typeValidator.validate('smartphone', createValidationArgs(object));

    expect(getTypesByCategory).toHaveBeenCalledWith('electronics');
    expect(getTypesByCategory).toHaveBeenCalledTimes(1);
    expect(result).toBe(true);
  });

  it('should handle custom category property name', () => {
    const object = { productCategory: 'electronics', type: 'smartphone' };
    const result = typeValidator.validate('smartphone', createValidationArgs(object, 'productCategory'));

    expect(result).toBe(true);
    expect(schemaService.getTypesByCategory).toHaveBeenCalledWith('electronics');
  });

  it('should return false when custom category property does not exist', () => {
    const object = { category: 'electronics', type: 'smartphone' };
    const result = typeValidator.validate('smartphone', createValidationArgs(object, 'nonExistentProperty'));

    expect(result).toBe(false);
  });
});
