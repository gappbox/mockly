import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { GenerateParamsDto } from './dtos';
import { GeneratorController } from './generator.controller';
import { GeneratorService } from './generator.service';

const mockGenerateParams: GenerateParamsDto = {
  count: 3,
  fields: [
    { field: 'firstName', category: 'person', type: 'firstName' },
    { field: 'email', category: 'internet', type: 'email' },
  ],
};

const mockGeneratedData: Record<string, unknown>[] = [
  { firstName: 'John', email: 'john@example.com' },
  { firstName: 'Jane', email: 'jane@example.com' },
  { firstName: 'Bob', email: 'bob@example.com' },
];

const mockEmptyResult: Record<string, unknown>[] = [];

describe('GeneratorController', () => {
  let controller: GeneratorController;
  let generatorService: jest.Mocked<GeneratorService>;

  beforeEach(async () => {
    const mockGeneratorService: jest.Mocked<Partial<GeneratorService>> = { generate: jest.fn() };
    const module: TestingModule = await Test
      .createTestingModule({
        controllers: [GeneratorController],
        providers: [{ provide: GeneratorService, useValue: mockGeneratorService }],
      })
      .compile();

    controller = module.get<GeneratorController>(GeneratorController);
    generatorService = module.get<GeneratorService>(GeneratorService) as jest.Mocked<GeneratorService>;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should generate fake data using service', () => {
    generatorService.generate.mockReturnValue(mockGeneratedData);

    expect(controller.generate(mockGenerateParams)).toEqual(mockGeneratedData);
    expect(generatorService.generate).toHaveBeenCalledTimes(1);
    expect(generatorService.generate).toHaveBeenCalledWith(mockGenerateParams);
  });

  it('should return empty array when service returns empty array', () => {
    generatorService.generate.mockReturnValue(mockEmptyResult);

    expect(controller.generate(mockGenerateParams)).toEqual([]);
    expect(generatorService.generate).toHaveBeenCalledTimes(1);
  });

  it('should handle single field generation', () => {
    const singleFieldParams: GenerateParamsDto = {
      count: 2,
      fields: [{
        field: 'username',
        category: 'internet',
        type: 'userName',
      }],
    };

    const singleFieldResult = [{ username: 'john_doe' }, { username: 'jane_smith' }];

    generatorService.generate.mockReturnValue(singleFieldResult);

    expect(controller.generate(singleFieldParams)).toEqual(singleFieldResult);
    expect(generatorService.generate).toHaveBeenCalledWith(singleFieldParams);
  });

  it('should handle multiple fields generation', () => {
    const multiFieldParams: GenerateParamsDto = {
      count: 1,
      fields: [
        { field: 'name', category: 'person', type: 'fullName' },
        { field: 'age', category: 'datatype', type: 'number' },
        { field: 'city', category: 'address', type: 'city' },
        { field: 'company', category: 'company', type: 'name' },
      ],
    };

    const multiFieldResult = [{
      name: 'John Smith',
      age: 25,
      city: 'New York',
      company: 'Acme Corp',
    }];

    generatorService.generate.mockReturnValue(multiFieldResult);

    expect(controller.generate(multiFieldParams)).toEqual(multiFieldResult);
    expect(generatorService.generate).toHaveBeenCalledWith(multiFieldParams);
  });

  it('should handle generation with options', () => {
    const paramsWithOptions: GenerateParamsDto = {
      count: 1,
      fields: [{
        field: 'randomNumber',
        category: 'datatype',
        type: 'number',
      }],
    };

    generatorService.generate.mockReturnValue([{ randomNumber: 42 }]);

    expect(controller.generate(paramsWithOptions)).toEqual([{ randomNumber: 42 }]);
    expect(generatorService.generate).toHaveBeenCalledWith(paramsWithOptions);
  });

  it('should call generatorService.generate only once', () => {
    generatorService.generate.mockReturnValue(mockGeneratedData);
    controller.generate(mockGenerateParams);

    expect(generatorService.generate).toHaveBeenCalledTimes(1);
  });

  it('should properly delegate to service method', () => {
    generatorService.generate.mockReturnValue(mockGeneratedData);

    expect(controller.generate(mockGenerateParams)).toEqual(mockGeneratedData);
    expect(generatorService.generate).toHaveBeenCalledTimes(1);
    expect(generatorService.generate).toHaveBeenCalledWith(mockGenerateParams);
  });

  it('should not modify data returned by service', () => {
    generatorService.generate.mockReturnValue(mockGeneratedData);

    expect(controller.generate(mockGenerateParams)).toEqual([...mockGeneratedData]);
    expect(mockGeneratedData).toEqual([...mockGeneratedData]);
  });

  it('should handle large count values', () => {
    const largeCountParams: GenerateParamsDto = {
      count: 1000,
      fields: [{ field: 'id', category: 'datatype', type: 'uuid' }],
    };

    const largeResult = Array.from({ length: 1000 }, (_, i) => ({
      id: `uuid-${i}`,
    }));

    generatorService.generate.mockReturnValue(largeResult);

    expect(controller.generate(largeCountParams)).toHaveLength(1000);
    expect(generatorService.generate).toHaveBeenCalledWith(largeCountParams);
  });
});
