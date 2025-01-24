const { faker } = require('@faker-js/faker');
const { types } = require('../src/app.config');

describe('App Config', () => {
  test('should generate valid values for all faker types and codes', () => {
    Object.keys(types).forEach((category) => {
      types[category].forEach((item) => {
        const value = faker[category][item.code]();
        const equal = typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';

        expect(equal).toBe(true);
      });
    });
  });
});