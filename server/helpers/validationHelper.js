const Joi = require("joi");
const Boom = require("boom");

const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().required().description("Person's username"),
    email: Joi.string().required().description("Active email"),
    password: Joi.string()
      .min(8)
      .max(20)
      .required()
      .description("Should be between 8-20 characters"),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

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
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().description("Active email"),
    password: Joi.string()
      .min(8)
      .max(20)
      .required()
      .description("Should be between 8-20 characters"),
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

const orderValidation = (data) => {
  const schema = Joi.object({
    items: Joi
      .array()
      .items(
        Joi.object({
          productIds: Joi.number().required(),
          qtys: Joi.number().required(),
        })
      )
      .min(1)
      .required(),
    note: Joi.string().allow(""),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const orderIdValidation = (data) => {
  const schema = Joi.object({
    id: Joi.string().required().description("Category id, i.e. milk-coffee"),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

module.exports = {
  registerValidation,
  loginValidation,
  productValidation,
  categoryRequestValidation,
  categoryIdValidation,
  orderValidation,
  orderIdValidation,
};
