const Joi = require("joi");
const Boom = require("boom");

const categoryRequestValidation = (data, isUpdate = false) => {
  const schema = Joi.object({
    name:
      !isUpdate &&
      Joi.string().required().description("Category name, i.e. Coffee"),
    description: Joi.string()
      .required()
      .description("Category description, Various coffee beverages"),
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
  categoryRequestValidation,
  categoryIdValidation,
};
