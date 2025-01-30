const { faker } = require('@faker-js/faker');
const { categories, types, options } = require('./dataset.config');

/**
 * Retrieves the list of categories from the configuration.
 * @returns {Array<Category>} An array of category objects.
 */
const getCategories = () => {
  return categories || [];
}

/**
 * Retrieves the list of category codes from the configuration.
 * @returns {Array<String>} An array of category codes.
 */
const getCategoryCodes = () => {
  return getCategories().map(({ code }) => code);
}

/**
 * Retrieves the list of types for a given category.
 * @param {String} category - The category name.
 * @returns {Array<Type>} An array of type objects for the given category.
 */
const getTypes = (category) => {
  return types[category] || [];
}

/**
 * Retrieves the list of all type codes from the faker configuration.
 * @returns {Array<String>} An array of all type codes.
 */
const getTypeCodes = () => {
  return Object.values(types || {}).flat().map(({ code }) => code);
}

/**
 * Retrieves options for a specific category and type.
 * @param {String} category - The category name.
 * @param {String} type - The type name.
 * @returns {Object|null} An object representing the options for the given category and type, or `null` if not found.
 */
const getTypeOptions = (category, type) => {
  return options[type]?.ref === category && options[type];
}

/**
 * Retrieves all options from the faker configuration.
 * @returns {Object} An object representing all options in the faker configuration.
 */
const getOptions = () => {
  return options;
};

/**
 * Creates a function to generate an object based on specified items.
 * @param {Array<Object>} items - An array of field definitions.
 * @returns {Function} A function that generates an object with the specified items.
 */
const createObject = (items) => {
  return () => (
    items.reduce((acc, { category, field, type }) => {
      if (faker[category] && faker[category][type]) {
        acc[field] = faker[category][type]();
      }

      return acc;
    }, {})
  );
};

/**
 * Generates an array of mock data based on the specified items and count.
 * @param {Array<Object>} items - An array of field definitions.
 * @param {Number} count - The number of mock objects to generate. Defaults to 10.
 * @returns {Array<Object>} An array of mock data objects.
 */
const generateMockData = (items, count) => {
  if (items.length === 0) {
    return [];
  }

  return faker.helpers.multiple(createObject(items), {
    count: count ?? 10,
  });
};

module.exports = {
  createObject,
  generateMockData,
  getCategories,
  getCategoryCodes,
  getOptions,
  getTypeCodes,
  getTypeOptions,
  getTypes,
};