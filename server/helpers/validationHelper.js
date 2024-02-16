const Joi = require("joi");
const Boom = require("boom");

const productValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category_id: Joi.number().required(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const categoryRequestValidation = (data, isUpdate = false) => {
  const schema = Joi.object({
    name:
      !isUpdate &&
      Joi.string().required().description("Category name, i.e. Coffee"),
    description: Joi.string()
      .required()
      .description("Category description, Various coffee beverages"),
    image: isUpdate
      ? Joi.array().optional().description("Category images")
      : Joi.array().required().description("Category images"),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const categoryIdValidation = (data) => {
  const schema = Joi.object({
    id: Joi.string().required().description("Category id, i.e. milk-coffee"),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

module.exports = {
  productValidation,
  categoryRequestValidation,
  categoryIdValidation,
};
