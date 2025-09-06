import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { Category } from '../../models';
import { SchemaService } from '../../schema.service';
import { CategoryValidator } from './category.validator';

const categories: Category[] = [
  { code: 'electronics', description: 'Electronics category', id: '1' },
  { code: 'clothing', description: 'Clothing category', id: '2' },
  { code: 'books', description: 'Books category', id: '3' },
];

describe('CategoryValidator', () => {
  let categoryValidator: CategoryValidator;
  let schemaService: SchemaService;

  beforeEach(async () => {
    const mockSchemaService = {
      getCategories: jest.fn().mockReturnValue(categories),
      getTypesByCategory: jest.fn(),
      getTypes: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryValidator,
        SchemaService,
        {
          provide: SchemaService,
          useValue: mockSchemaService,
        },
      ],
    }).compile();

    categoryValidator = module.get<CategoryValidator>(CategoryValidator);
    schemaService = module.get<SchemaService>(SchemaService);
  });

  it('should return true for valid category code', () => {
    expect(categoryValidator.validate('electronics')).toBe(true);
    expect(categoryValidator.validate('clothing')).toBe(true);
    expect(categoryValidator.validate('books')).toBe(true);
  });

  it('should return false for invalid category code', () => {
    expect(categoryValidator.validate('invalid-category')).toBe(false);
    expect(categoryValidator.validate('nonexistent')).toBe(false);
  });

  it('should return false for non-string values', () => {
    expect(categoryValidator.validate(123)).toBe(false);
    expect(categoryValidator.validate(null)).toBe(false);
    expect(categoryValidator.validate(undefined)).toBe(false);
    expect(categoryValidator.validate({})).toBe(false);
    expect(categoryValidator.validate([])).toBe(false);
    expect(categoryValidator.validate(true)).toBe(false);
  });

  it('should handle empty categories array', () => {
    jest.spyOn(schemaService, 'getCategories').mockReturnValue([]);

    expect(categoryValidator.validate('electronics')).toBe(false);
  });

  it('should handle empty string', () => {
    expect(categoryValidator.validate('')).toBe(false);
  });

  it('should handle whitespace strings', () => {
    expect(categoryValidator.validate(' ')).toBe(false);
    expect(categoryValidator.validate('\t')).toBe(false);
    expect(categoryValidator.validate('\n')).toBe(false);
  });

  it('should return correct default error message', () => {
    expect(categoryValidator.defaultMessage()).toBe('category is not exists');
  });

  it('should use schemaService to find matching category by code', () => {
    const getCategories = jest.spyOn(schemaService, 'getCategories');
    const result = categoryValidator.validate('electronics');

    expect(getCategories).toHaveBeenCalledTimes(1);
    expect(result).toBe(true);
  });

  it('should return false when schemaService returns empty array', () => {
    jest.spyOn(schemaService, 'getCategories').mockReturnValue([]);

    expect(categoryValidator.validate('electronics')).toBe(false);
  });
});
