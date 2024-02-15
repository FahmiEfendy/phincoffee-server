const _ = require("lodash");
const Boom = require("boom");
const { Op } = require("sequelize");

const db = require("../../models");
const generalHelper = require("../helpers/generalHelper");

const fileName = "server/helpers/categoryHelper.js";

const postCreateCategory = async (objectData) => {
  const { name, description } = objectData;

  try {
    // TODO: Validation Only Admin Can Create Category

    const id = _.toLower(_.replace(name, " ", "-"));

    const categoryExist = await db.Categories.findOne({
      where: { id },
    });

    if (!_.isEmpty(categoryExist)) {
      throw Boom.badRequest(`Category ${name} already exist!`);
    }

    const newCategory = db.Categories.build({
      id,
      name,
      description,
    });

    await newCategory.save();

    console.log([fileName, "POST Create Category", "INFO"]);

    return Promise.resolve(newCategory);
  } catch (err) {
    console.log([fileName, "POST Create Cateogory", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.reject(generalHelper.errorResponse(err));
  }
};

const getCategoryList = async (query) => {
  try {
    const data = await db.Categories.findAll(
      query.name
        ? {
            where: { name: { [Op.like]: `%${query.name}%` } },
          }
        : {}
    );

    if (query?.name && _.isEmpty(data)) {
      throw Boom.notFound(`Cannot find category with query of ${query.name}`);
    }

    if (_.isEmpty(data)) {
      throw Boom.notFound(`No category found!`);
    }

    console.log([fileName, "GET All Category", "INFO"]);

    return Promise.resolve(data);
  } catch (err) {
    console.log([fileName, "GET All Category", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.reject(generalHelper.errorResponse(err));
  }
};

const getCategoryDetail = async (params) => {
  try {
    const data = await db.Categories.findOne({
      where: { id: params.id },
    });

    if (_.isEmpty(data)) {
      throw Boom.notFound(`Cannot find category with id of ${params.id}`);
    }

    console.log([fileName, "GET Category Detail", "INFO"]);

    return Promise.resolve(data);
  } catch (err) {
    console.log([fileName, "GET Category Detail", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.reject(generalHelper.errorResponse(err));
  }
};

const patchUpdateCategory = async (params, objectData) => {
  const { description } = objectData;

  try {
    // TODO: Validation Only Admin Can Update Category

    const selectedCategory = await db.Categories.findOne({
      where: { id: params.id },
    });

    if (_.isEmpty(selectedCategory)) {
      throw Boom.notFound(`Cannot find category with id of ${params.id}`);
    }

    await db.Categories.update({ description }, { where: { id: params.id } });

    const updatedCategory = await db.Categories.findOne({
      where: { id: params.id },
    });

    console.log([fileName, "PATCH Update Category ", "INFO"]);

    return Promise.resolve(updatedCategory);
  } catch (err) {
    console.log([fileName, "PATCH Update Category ", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.reject(generalHelper.errorResponse(err));
  }
};

const deleteCategory = async (params) => {
  try {
    // TODO: Validation Only Admin Can Delete Category

    const selectedCategory = await db.Categories.findOne({
      where: { id: params.id },
    });

    if (_.isEmpty(selectedCategory)) {
      throw Boom.notFound(`Cannot find category with id of ${params.id}`);
    }

    await db.Categories.destroy({ where: { id: params.id } });

    console.log([fileName, "DELETE Category ", "INFO"]);

    return;
  } catch (err) {
    console.log([fileName, "DELETE Category ", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.reject(generalHelper.errorResponse(err));
  }
};

module.exports = {
  postCreateCategory,
  getCategoryList,
  getCategoryDetail,
  patchUpdateCategory,
  deleteCategory,
};
