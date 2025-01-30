const Joi = require('joi');

const getCategorySchema = (categoryCodes) => {
  return Joi.object({
    category: Joi
      .string()
      .valid(...categoryCodes)
      .required()
      .messages({
        'any.required': 'Category parameter is required',
        'any.only': `Category parameter must be one of: ${categoryCodes.join(', ')}`,
        'string.empty': 'Category parameter cannot be empty',
      }),
  });
};

const getMockSchema = (categoryCodes, typeCodes) => {
  return Joi.object({
    count: Joi
      .number()
      .integer()
      .min(1)
      .max(1000)
      .required()
      .messages({
        'any.required': 'Count is required',
        'number.base': 'Count must be a number',
        'number.max': 'Count must be at most 1000',
        'number.min': 'Count must be at least 1',
      }),
    items: Joi
      .array()
      .items(Joi.object({
        id: Joi
          .string()
          .required()
          .messages({
            'any.required': `Id is required`,
            'string.empty': `Id cannot be empty`,
          }),
        field: Joi
          .string()
          .required()
          .messages({
            'any.required': `Field is required`,
            'string.empty': `Field cannot be empty`,
          }),
        category: Joi
          .string()
          .valid(...categoryCodes)
          .required()
          .messages({
            'any.only': `Category must be one of: ${categoryCodes.join(', ')}`,
            'any.required': `Category is required`,
          }),
        type: Joi
          .string()
          .valid(...typeCodes)
          .required()
          .messages({
            'any.only': `Type must be one of: ${typeCodes.join(', ')}`,
            'any.required': `Type is required`,
          }),
      }))
      .required()
      .messages({
        'any.required': `Items is required`,
      })
  });
};

module.exports = {
  getCategorySchema,
  getMockSchema,
};