const Joi = require("joi");
const Boom = require("boom");

const createCategoryValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().description("Category name, i.e. Coffee"),
    description: Joi.string()
      .required()
      .description("Category description, Various coffee beverages"),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

module.exports = {
  createCategoryValidation,
};
