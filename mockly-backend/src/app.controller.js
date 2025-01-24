const {
  generateMockData,
  getCategories,
  getOptions,
  getCategoryCodes,
  getTypeCodes,
  getTypes,
  getTypeOptions,
} = require('./app.service');
const {
  getCategorySchema,
  getCategoryRefSchema,
  getMockSchema,
} = require('./app-validation.schema');
const { createResponder } = require('./app.utils');

/**
 * Load categories.
 *
 * Method fetches the categories from the `fakerService` and uses the `responder` utility
 * to send a success response with the data. The response includes a status code of 200 and
 * the list of categories in JSON format.
 *
 * @param {import('express').Request} request - Express request object.
 * @param {import('express').Response} response - Express response object.
 */
const loadCategories = (request, response) =>   {
  const responder = createResponder(request, response);

  return responder.success(200, getCategories());
};

/**
 * Load types based on category.
 *
 * Method validates the category parameter from the request against a predefined schema.
 * If validation fails, it returns a 400 error with a validation error message.
 * If validation succeeds, it fetches the types for the given category from `fakerService`
 * and sends them as a JSON response.
 *
 * @param {import('express').Request} request - Express request object.
 * @param {import('express').Response} response - Express response object.
 */
const loadTypes = (request, response) => {
  const category = request.params.category;
  const categoryCodes = getCategoryCodes();
  const categorySchema = getCategorySchema(categoryCodes);
  const categoryValidation = categorySchema.validate({ category });
  const responder = createResponder(request, response);

  if (categoryValidation.error) {
    return responder.error(400, {
      errorCode: 'VALIDATION_ERROR',
      errorMessage: categoryValidation.error.details[0].message,
    });
  }

  return responder.success(200, getTypes(category));
};

/**
 * Load type options based on category and type.
 *
 * Method validates the `category` and `type` parameters from the request against predefined schemas.
 * If validation fails for either parameter, it returns a 400 error with a detailed validation error message.
 * If validation succeeds, it fetches the options for the specified category and type from `fakerService`
 * and sends them as a JSON response.
 *
 * @param {import('express').Request} request - Express request object.
 * @param {import('express').Response} response - Express response object.
 */
const loadTypeOptions = (request, response) => {
  const type = request.params.type;
  const options = getOptions();
  const category = request.params.category;
  const categoryCodes = getCategoryCodes();
  const categorySchema = getCategorySchema(categoryCodes);
  const categoryValidation = categorySchema.validate({ category });
  const categoryRefSchema = getCategoryRefSchema(options);
  const categoryRefValidation = categoryRefSchema.validate({ category, type });
  const responder = createResponder(request, response);

  if (categoryValidation.error) {
    return responder.error(400, {
      errorCode: 'VALIDATION_ERROR',
      errorMessage: categoryValidation.error.details[0].message,
    });
  }

  if (categoryRefValidation.error) {
    return responder.error(400, {
      errorCode: 'VALIDATION_ERROR',
      errorMessage: categoryRefValidation.error.details[0].message,
    });
  }

  return responder.success(200, getTypeOptions(
    category,
    type
  ) || null);
};

/**
 * Generates mock data based on the provided items and count.
 *
 * Method validates the request body using predefined schemas for categories and types.
 * If validation fails, it returns a 400 error with detailed validation error messages.
 * If validation succeeds, it generates and returns mock data.
 *
 * @param {import('express').Request} request - Express request object.
 * @param {import('express').Response} response - Express response object.
 */
const createMocks = (request, response) => {
  const categoryCodes = getCategoryCodes();
  const typeCodes = getTypeCodes();
  const mockSchema = getMockSchema(categoryCodes, typeCodes);
  const mockValidation = mockSchema.validate(request.body);
  const responder = createResponder(request, response);

  if (mockValidation.error) {
    return responder.error(400, {
      errorCode: 'VALIDATION_ERROR',
      errorMessage: mockValidation.error.details.map(({ message }) => message)[0],
    });
  }

  return responder.success(200, generateMockData(
    request.body.items,
    request.body.count
  ));
};

module.exports = {
  loadCategories,
  loadTypes,
  loadTypeOptions,
  createMocks,
};