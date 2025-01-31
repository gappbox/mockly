const config = require('../src/dataset/dataset.config');
const {
  createObject,
  generateMockData,
  getCategories,
  getCategoryCodes,
  getTypes,
  getTypeCodes,
  getTypeOptions,
  getOptions,
} = require('../src/dataset/dataset.service');

const items = [
  { id: "1", field: "id", category: "string", type: "uuid" },
  { id: "2", field: "name", category: "person", type: "fullName" },
];

describe('dataset service', () => {
  describe('getCategories', () => {
    test('should return an array length', () => {
      expect(getCategories()).toHaveLength(config.categories.length);
    });
  });

  describe('getCategoryCodes', () => {
    test('should return an array length', () => {
      expect(getCategoryCodes()).toHaveLength(11);
    });
  });

  describe('getTypes', () => {
    test('should return correct types for category "person', () => {
      expect(getTypes('person')).toEqual(config.types['person']);
    });

    test('should return an array length', () => {
      expect(getTypes('person')).toHaveLength(14);
    });

    test('should return an empty array for an unknown category', () => {
      expect(getTypes('unknown')).toEqual([]);
    });
  });

  describe('getTypeCodes', () => {
    test('should return an array length', () => {
      expect(getTypeCodes()).toHaveLength(107);
    });
  });

  describe('getTypeOptions', () => {
    test('should return false if the category is invalid but type exists', () => {
      expect(getTypeOptions('location', 'firstName')).toBeFalsy();
    });

    test('should return false if both category and type are invalid', () => {
      expect(getTypeOptions('test', 'test')).toBeFalsy();
    });
  });

  describe('getOptions', () => {
    test('should return the options object from the configuration', () => {
      expect(getOptions()).toEqual(config.options)
    });
  });

  describe('createObject', () => {
    test('should return an empty object if "items" array is empty', () => {
      expect(createObject([])()).toEqual({});
    });

    test('should return an object with properties defined in "items"', () => {
      expect(createObject(items)()).toEqual({
        id: expect.any(String),
        name: expect.any(String),
      });
    });
  });

  describe('generateMockData', () => {
    test('should return an empty array when "items" is an empty array', () => {
      expect(generateMockData([])).toHaveLength(0);
      expect(generateMockData([])).toEqual([]);
    });

    test('should return an array with the specified number of objects', () => {
      expect(generateMockData(items, 2)).toHaveLength(2);
      expect(generateMockData(items, 2)).toEqual([
        { id: expect.any(String), name: expect.any(String) },
        { id: expect.any(String), name: expect.any(String) },
      ]);
    });

    test('should return an array of 10 objects when "count" is not specified', () => {
      expect(generateMockData(items)).toHaveLength(10);
      expect(generateMockData(items)).toEqual([
        { id: expect.any(String), name: expect.any(String) },
        { id: expect.any(String), name: expect.any(String) },
        { id: expect.any(String), name: expect.any(String) },
        { id: expect.any(String), name: expect.any(String) },
        { id: expect.any(String), name: expect.any(String) },
        { id: expect.any(String), name: expect.any(String) },
        { id: expect.any(String), name: expect.any(String) },
        { id: expect.any(String), name: expect.any(String) },
        { id: expect.any(String), name: expect.any(String) },
        { id: expect.any(String), name: expect.any(String) },
      ]);
    });
  });
});