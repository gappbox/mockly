const createResponder = require('../utils/responder.util');
const {
  generateMockData,
  getCategories,
  getCategoryCodes,
  getTypes,
  getTypeCodes,
} = require('./dataset.service');
const {
  getCategorySchema,
  getMockSchema,
} = require('./dataset-validation.schema');

/**
 * Load categories.
 * Method fetches the categories from the `datasetService` and uses the `responder` utility
 * to send a success response with the data. The response includes a status code of 200 and
 * the list of categories in JSON format.
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */
function loadCategories(req, res) {
  const categories = getCategories();
  const responder = createResponder(req, res);

  return responder.success(200, categories);
}

/**
 * Load types based on category.
 * Method validates the category parameter from the request against a predefined schema.
 * If validation fails, it returns a 400 error with a validation error message.
 * If validation succeeds, it fetches the types for the given category from `datasetService`
 * and sends them as a JSON response.
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */
function loadTypes(req, res) {
  const category = req.params.category;
  const categoryCodes = getCategoryCodes();
  const categorySchema = getCategorySchema(categoryCodes);
  const categoryValidation = categorySchema.validate({ category });
  const responder = createResponder(req, res);

  if (categoryValidation.error) {
    return responder.error(400, {
      errorCode: 'VALIDATION_ERROR',
      errorMessage: categoryValidation.error.details[0].message,
    });
  }

  const types = getTypes(category);

  return responder.success(200, types);
}

/**
 * Generates mock data based on the provided items and count.
 * Method validates the request body using predefined schemas for categories and types.
 * If validation fails, it returns a 400 error with detailed validation error messages.
 * If validation succeeds, it generates and returns mock data.
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */
function createMocks(req, res) {
  const categoryCodes = getCategoryCodes();
  const typeCodes = getTypeCodes();
  const mockSchema = getMockSchema(categoryCodes, typeCodes);
  const mockValidation = mockSchema.validate(req.body);
  const responder = createResponder(req, res);

  if (mockValidation.error) {
    return responder.error(400, {
      errorCode: 'VALIDATION_ERROR',
      errorMessage: mockValidation.error.details.map(({ message }) => message)[0],
    });
  }

  const mockData = generateMockData(
    req.body.items,
    req.body.count,
  );

  return responder.success(200, mockData);
}

module.exports = {
  createMocks,
  loadCategories,
  loadTypes,
};