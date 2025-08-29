const { faker } = require('@faker-js/faker');
const { types } = require('../src/dataset/dataset.config');

describe('dataset config', () => {
  test('should generate valid values for all faker types and codes', () => {
    Object.keys(types).forEach((category) => {
      types[category].forEach((item) => {
        const value = faker[category][item.code]();

        expect(value).toBeDefined();
        expect(value).not.toBeNull();
      });
    });
  });
});