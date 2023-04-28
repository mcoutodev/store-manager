const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi
    .string()
    .min(5)
    .required()
    .messages(
      {
        'any.required': '"name" is required',
        'string.min': '"name" length must be at least 5 characters long',
      },
    ),
});

const saleProductSchema = Joi.object({
  productId: Joi
    .number()
    .required()
    .messages({ 'any.required': '"productId" is required' }),
  quantity: Joi
    .number()
    .min(1)
    .required()
    .messages(
      {
        'any.required': '"quantity" is required',
        'number.min': '"quantity" must be greater than or equal to 1',
      },
    ),
});

const saleSchema = Joi.array().items(saleProductSchema);

module.exports = {
  productSchema,
  saleSchema,
};
