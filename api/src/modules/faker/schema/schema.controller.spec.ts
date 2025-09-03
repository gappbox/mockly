import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { TypesParamsDto } from './dtos';
import type { Category, Type } from './models';
import { SchemaController } from './schema.controller';
import { SchemaService } from './schema.service';

const mockCategories: Category[] = [
  { id: '1', code: 'electronics', description: 'Electronics category' },
  { id: '2', code: 'clothing', description: 'Clothing category' },
  { id: '3', code: 'books', description: 'Books category' },
];

const mockElectronicsTypes: Type[] = [
  { id: '1', code: 'smartphone', description: 'Smartphone type' },
  { id: '2', code: 'laptop', description: 'Laptop type' },
];

const mockAllTypes: Type[] = [
  { id: '1', code: 'smartphone', description: 'Smartphone type' },
  { id: '2', code: 'laptop', description: 'Laptop type' },
  { id: '3', code: 'shirt', description: 'Shirt type' },
  { id: '4', code: 'pants', description: 'Pants type' },
  { id: '5', code: 'fiction', description: 'Fiction books' },
];

describe('SchemaController', () => {
  let controller: SchemaController;
  let schemaService: jest.Mocked<SchemaService>;

  beforeEach(async () => {
    const mockSchemaService: jest.Mocked<SchemaService> = {
      getCategories: jest.fn(),
      getTypesByCategory: jest.fn(),
      getTypes: jest.fn(),
    };

    const module: TestingModule = await Test
      .createTestingModule({
        controllers: [SchemaController],
        providers: [{ provide: SchemaService, useValue: mockSchemaService }],
      })
      .compile();

    controller = module.get<SchemaController>(SchemaController);
    schemaService = module.get<SchemaService>(SchemaService) as jest.Mocked<SchemaService>;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all categories', () => {
    schemaService.getCategories.mockReturnValue(mockCategories);

    expect(controller.getCategories()).toEqual(mockCategories);
    expect(schemaService.getCategories).toHaveBeenCalledTimes(1);
    expect(schemaService.getCategories).toHaveBeenCalledWith();
  });

  it('should return empty array when no categories', () => {
    schemaService.getCategories.mockReturnValue([]);

    expect(controller.getCategories()).toEqual([]);
    expect(schemaService.getCategories).toHaveBeenCalledTimes(1);
  });

  it('should call schemaService.getCategories only once', () => {
    schemaService.getCategories.mockReturnValue(mockCategories);
    controller.getCategories();

    expect(schemaService.getCategories).toHaveBeenCalledTimes(1);
  });

  it('should return types for valid category', () => {
    schemaService.getTypesByCategory.mockReturnValue(mockElectronicsTypes);

    expect(controller.getTypesByCategory({ category: 'electronics' })).toEqual(mockElectronicsTypes);
    expect(schemaService.getTypesByCategory).toHaveBeenCalledTimes(1);
    expect(schemaService.getTypesByCategory).toHaveBeenCalledWith('electronics');
  });

  it('should return empty array for non-existing category', () => {
    schemaService.getTypesByCategory.mockReturnValue([]);

    expect(controller.getTypesByCategory({ category: 'non-existent' })).toEqual([]);
    expect(schemaService.getTypesByCategory).toHaveBeenCalledWith('non-existent');
  });

  it('should pass correct category parameter to service', () => {
    const params: TypesParamsDto = { category: 'clothing' };
    const clothingTypes: Type[] = [{ id: '3', code: 'shirt', description: 'Shirt type' }];

    schemaService.getTypesByCategory.mockReturnValue(clothingTypes);

    expect(controller.getTypesByCategory(params)).toEqual(clothingTypes);
    expect(schemaService.getTypesByCategory).toHaveBeenCalledWith('clothing');
  });

  it('should handle special characters in category name', () => {
    schemaService.getTypesByCategory.mockReturnValue([]);
    controller.getTypesByCategory({ category: 'toys-&-games' });

    expect(schemaService.getTypesByCategory).toHaveBeenCalledWith('toys-&-games');
  });

  it('should call schemaService.getTypesByCategory only once', () => {
    schemaService.getTypesByCategory.mockReturnValue(mockElectronicsTypes);
    controller.getTypesByCategory({ category: 'electronics' });

    expect(schemaService.getTypesByCategory).toHaveBeenCalledTimes(1);
  });

  it('should return all types', () => {
    schemaService.getTypes.mockReturnValue(mockAllTypes);

    expect(controller.getTypes()).toEqual(mockAllTypes);
    expect(schemaService.getTypes).toHaveBeenCalledTimes(1);
    expect(schemaService.getTypes).toHaveBeenCalledWith();
  });

  it('should return empty array when no types', () => {
    schemaService.getTypes.mockReturnValue([]);

    expect(controller.getTypes()).toEqual([]);
    expect(schemaService.getTypes).toHaveBeenCalledTimes(1);
  });

  it('should call schemaService.getTypes only once', () => {
    schemaService.getTypes.mockReturnValue(mockAllTypes);
    controller.getTypes();

    expect(schemaService.getTypes).toHaveBeenCalledTimes(1);
  });

  it('should properly delegate to service methods', () => {
    schemaService.getCategories.mockReturnValue(mockCategories);
    schemaService.getTypesByCategory.mockReturnValue(mockElectronicsTypes);
    schemaService.getTypes.mockReturnValue(mockAllTypes);

    expect(controller.getCategories()).toEqual(mockCategories);
    expect(controller.getTypesByCategory({ category: 'electronics' })).toEqual(mockElectronicsTypes);
    expect(controller.getTypes()).toEqual(mockAllTypes);
    expect(schemaService.getCategories).toHaveBeenCalledTimes(1);
    expect(schemaService.getTypesByCategory).toHaveBeenCalledTimes(1);
    expect(schemaService.getTypes).toHaveBeenCalledTimes(1);
  });

  it('should not modify data returned by service', () => {
    schemaService.getCategories.mockReturnValue(mockCategories);

    expect(controller.getCategories()).toEqual([...mockCategories]);
    expect(mockCategories).toEqual([...mockCategories]);
  });
});