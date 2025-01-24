const Joi = require('joi');

const getMockSchema = (categoryCodes, typeCodes) => Joi.object({
  count: Joi.number()
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
  items: Joi.array()
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

const getCategorySchema = (categoryCodes) => Joi.object({
  category: Joi.string()
    .valid(...categoryCodes)
    .required()
    .messages({
      'any.required': 'Category parameter is required',
      'any.only': `Category parameter must be one of: ${categoryCodes.join(', ')}`,
      'string.empty': 'Category parameter cannot be empty',
    }),
});


const getCategoryRefSchema = (options) => Joi.object({
  category: Joi.string().required(),
  type: Joi.string()
    .required()
    .custom((value, helpers) => {
      const category = helpers.state.ancestors[0].category;
      const typeConfig = options[value];

      if (typeConfig === undefined) {
        return true;
      }

      if (typeConfig.ref !== category) {
        return helpers.message(`Type must have a reference matching category. Expected ${typeConfig.ref} but got ${category}`);
      }

      return value;
    }),
});

module.exports = {
  getCategorySchema,
  getCategoryRefSchema,
  getMockSchema,
};