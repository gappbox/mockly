import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { SchemaService } from './schema.service';

jest.mock('./schemas', () => ({
  schemas: [
    {
      category: {
        id: '1',
        code: 'electronics',
        description: 'Electronics category',
      },
      types: [
        { id: '1', code: 'smartphone', description: 'Smartphone type' },
        { id: '2', code: 'laptop', description: 'Laptop type' },
      ],
    },
    {
      category: {
        id: '2',
        code: 'clothing',
        description: 'Clothing category',
      },
      types: [
        { id: '3', code: 'shirt', description: 'Shirt type' },
        { id: '4', code: 'pants', description: 'Pants type' },
      ],
    },
    {
      category: {
        id: '3',
        code: 'books',
        description: 'Books category',
      },
      types: [
        { id: '5', code: 'fiction', description: 'Fiction books' },
      ],
    },
  ],
}));

describe('SchemaService', () => {
  let service: SchemaService;

  beforeEach(async () => {
    const module: TestingModule = await Test
      .createTestingModule({providers: [SchemaService]})
      .compile();

    service = module.get<SchemaService>(SchemaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all categories', () => {
    expect(service.getCategories()).toHaveLength(3);
    expect(service.getCategories()[0]).toEqual({ id: '1', code: 'electronics', description: 'Electronics category' });
    expect(service.getCategories()[1]).toEqual({ id: '2', code: 'clothing', description: 'Clothing category' });
    expect(service.getCategories()[2]).toEqual({ id: '3', code: 'books', description: 'Books category' });
  });

  it('should return array of Category objects', () => {
    service.getCategories().forEach(category => {
      expect(category).toHaveProperty('id');
      expect(category).toHaveProperty('code');
      expect(category).toHaveProperty('description');
      expect(typeof category.id).toBe('string');
      expect(typeof category.code).toBe('string');
      expect(typeof category.description).toBe('string');
    });
  });

  it('should return types for existing category', () => {
    expect(service.getTypesByCategory('electronics')).toHaveLength(2);
    expect(service.getTypesByCategory('electronics')).toEqual([
      { id: '1', code: 'smartphone', description: 'Smartphone type' },
      { id: '2', code: 'laptop', description: 'Laptop type' },
    ]);
  });

  it('should return types for different categories', () => {
    expect(service.getTypesByCategory('books')).toHaveLength(1);
    expect(service.getTypesByCategory('books')).toEqual([{ id: '5', code: 'fiction', description: 'Fiction books' }]);
    expect(service.getTypesByCategory('clothing')).toHaveLength(2);
    expect(service.getTypesByCategory('clothing')).toEqual([
      { id: '3', code: 'shirt', description: 'Shirt type' },
      { id: '4', code: 'pants', description: 'Pants type' },
    ]);
  });

  it('should return empty array for non-existing category', () => {
    expect(service.getTypesByCategory('non-existent')).toEqual([]);
  });

  it('should be case sensitive', () => {
    expect(service.getTypesByCategory('Electronics')).toEqual([]);
  });

  it('should handle empty string', () => {
    expect(service.getTypesByCategory('')).toEqual([]);
  });

  it('should return array of Type objects', () => {
    service.getTypesByCategory('electronics').forEach((type) => {
      expect(type).toHaveProperty('id');
      expect(type).toHaveProperty('code');
      expect(type).toHaveProperty('description');
      expect(typeof type.id).toBe('string');
      expect(typeof type.code).toBe('string');
      expect(typeof type.description).toBe('string');
    });
  });

  it('should return all types from all categories', () => {
    expect(service.getTypes()).toHaveLength(5);
    expect(service.getTypes()).toEqual([
      { id: '1', code: 'smartphone', description: 'Smartphone type' },
      { id: '2', code: 'laptop', description: 'Laptop type' },
      { id: '3', code: 'shirt', description: 'Shirt type' },
      { id: '4', code: 'pants', description: 'Pants type' },
      { id: '5', code: 'fiction', description: 'Fiction books' },
    ]);
  });

  it('should return flattened array', () => {
    service.getTypes().forEach(type => {
      expect(Array.isArray(type)).toBe(false);
      expect(type).toHaveProperty('id');
      expect(type).toHaveProperty('code');
      expect(type).toHaveProperty('description');
    });

    expect(Array.isArray(service.getTypes())).toBe(true);
  });

  it('should return array of Type objects', () => {
    service.getTypes().forEach((type) => {
      expect(type).toHaveProperty('id');
      expect(type).toHaveProperty('code');
      expect(type).toHaveProperty('description');
      expect(typeof type.id).toBe('string');
      expect(typeof type.code).toBe('string');
      expect(typeof type.description).toBe('string');
    });
  });

  it('should handle schemas with duplicate category codes', () => {
    const categories = service.getCategories();
    const codes = categories.map(c => c.code);
    const uniqueCodes = [...new Set(codes)];

    expect(codes.length).toBe(uniqueCodes.length);
  });

  it('should maintain order of categories and types', () => {
    expect(service.getCategories()[0].code).toBe('electronics');
    expect(service.getCategories()[1].code).toBe('clothing');
    expect(service.getCategories()[2].code).toBe('books');
    expect(service.getTypes()[0].code).toBe('smartphone');
    expect(service.getTypes()[1].code).toBe('laptop');
    expect(service.getTypes()[2].code).toBe('shirt');
  });
});