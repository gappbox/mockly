import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { GenerateParamsDto } from './dtos';
import { GeneratorService } from './generator.service';

jest.mock('@faker-js/faker', () => ({
  fakerEN_US: {
    person: {
      firstName: jest.fn(() => 'John'),
      lastName: jest.fn(() => 'Doe'),
      fullName: jest.fn(() => 'John Doe'),
    },
    internet: {
      email: jest.fn(() => 'john@example.com'),
      userName: jest.fn(() => 'john_doe'),
    },
    datatype: {
      uuid: jest.fn(() => '123e4567-e89b-12d3-a456-426614174000'),
    },
    commerce: {
      productName: jest.fn(() => 'Awesome Product'),
    },
    helpers: {
      multiple: jest.fn(),
    },
    nonExistent: undefined,
  },
}));

// eslint-disable-next-line import/order
import { fakerEN_US as mockFaker } from '@faker-js/faker';

describe('GeneratorService', () => {
  let service: GeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneratorService],
    }).compile();

    service = module.get<GeneratorService>(GeneratorService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate data with single field', () => {
    const params: GenerateParamsDto = {
      count: 2,
      fields: [{ field: 'firstName', category: 'person', type: 'firstName' }],
    };

    const expectedResult = [
      { firstName: 'John' },
      { firstName: 'John' },
    ];

    (mockFaker.helpers.multiple as jest.Mock).mockReturnValue(expectedResult);

    expect(service.generate(params)).toEqual(expectedResult);
    expect(mockFaker.helpers.multiple).toHaveBeenCalledTimes(1);
    expect(mockFaker.helpers.multiple).toHaveBeenCalledWith(expect.any(Function), { count: 2 });
  });

  it('should generate data with multiple fields', () => {
    const params: GenerateParamsDto = {
      count: 1,
      fields: [
        {
          field: 'firstName',
          category: 'person',
          type: 'firstName',
        },
        {
          field: 'email',
          category: 'internet',
          type: 'email',
        },
      ],
    };

    const expectedResult = [
      { firstName: 'John', email: 'john@example.com' },
    ];

    (mockFaker.helpers.multiple as jest.Mock).mockReturnValue(expectedResult);

    expect(service.generate(params)).toEqual(expectedResult);
    expect(mockFaker.helpers.multiple).toHaveBeenCalledWith(expect.any(Function), { count: 1 });
  });

  it('should handle empty fields array', () => {
    const params: GenerateParamsDto = {
      count: 2,
      fields: [],
    };

    (mockFaker.helpers.multiple as jest.Mock).mockImplementation((generator, options) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return Array.from({ length: options.count }, () => generator());
    });

    const result = service.generate(params);

    expect(result).toEqual([{}, {}]);
  });

  it('should skip fields with non-existent categories', () => {
    const params: GenerateParamsDto = {
      count: 1,
      fields: [
        {
          field: 'validField',
          category: 'person',
          type: 'firstName',
        },
        {
          field: 'invalidField',
          category: 'nonExistent',
          type: 'someMethod',
        },
      ],
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    (mockFaker.helpers.multiple as jest.Mock).mockImplementation((generator) => [generator()]);

    expect(service.generate(params)).toEqual([{ validField: 'John' }]);
    expect(mockFaker.person.firstName).toHaveBeenCalledTimes(1);
  });

  it('should skip fields with non-existent methods', () => {
    const params: GenerateParamsDto = {
      count: 1,
      fields: [
        {
          field: 'validField',
          category: 'person',
          type: 'firstName',
        },
        {
          field: 'invalidField',
          category: 'person',
          type: 'nonExistentMethod',
        },
      ],
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    (mockFaker.helpers.multiple as jest.Mock).mockImplementation((generator) => [generator()]);

    expect(service.generate(params)).toEqual([{ validField: 'John' }]);
    expect(mockFaker.person.firstName).toHaveBeenCalledTimes(1);
  });

  it('should handle large count values', () => {
    const params: GenerateParamsDto = {
      count: 100,
      fields: [
        {
          field: 'id',
          category: 'datatype',
          type: 'uuid',
        },
      ],
    };

    const expectedResult = Array.from({ length: 100 }, (_, i) => ({
      id: `uuid-${i}`,
    }));

    (mockFaker.helpers.multiple as jest.Mock).mockReturnValue(expectedResult);

    expect(service.generate(params)).toHaveLength(100);
    expect(mockFaker.helpers.multiple).toHaveBeenCalledWith(
      expect.any(Function),
      { count: 100 }
    );
  });
});
