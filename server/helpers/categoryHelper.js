const _ = require("lodash");
const Boom = require("boom");
const { Op } = require("sequelize");

const db = require("../../models");
const generalHelper = require("../helpers/generalHelper");
const {
  uploadToCloudinary,
  cloudinaryDeleteImg,
} = require("../../utils/cloudinary");

const fileName = "server/helpers/categoryHelper.js";

const postCreateCategory = async (objectData) => {
  const { name, description, image } = objectData;
  let imageResult;

  try {
    // TODO: Validation Only Admin Can Create Category

    const id = _.toLower(_.replace(name, " ", "-"));

    const categoryExist = await db.Categories.findOne({
      where: { id },
    });

    if (!_.isEmpty(categoryExist)) {
      throw Boom.badRequest(`Category ${name} already exist!`);
    }

    imageResult = await uploadToCloudinary(image[0], "image", "image/icons");

    if (!imageResult?.url) {
      throw Boom.badImplementation(imageResult.error);
    }

    const newCategory = db.Categories.build({
      id,
      name,
      description,
      image_url: imageResult?.url,
      image_id: imageResult?.public_id,
    });

    await newCategory.save();

    console.log([fileName, "POST Create Category", "INFO"]);

    return Promise.resolve(newCategory);
  } catch (err) {
    if (imageResult?.public_id) {
      await cloudinaryDeleteImg(imageResult?.public_id, "image");
    }

    console.log([fileName, "POST Create Cateogory", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.reject(generalHelper.errorResponse(err));
  }
};

const getCategoryList = async (query) => {
  try {
    const data = await db.Categories.findAll({
      where: query.name ? { name: { [Op.like]: `%${query.name}%` } } : {},
      include: {
        model: db.Product,
        as: "products",
        attributes: ["name", "price"],
      },
    });

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
  const { description, image } = objectData;
  let imageResult;

  try {
    // TODO: Validation Only Admin Can Update Category

    const selectedCategory = await db.Categories.findOne({
      where: { id: params.id },
    });

    if (_.isEmpty(selectedCategory)) {
      throw Boom.notFound(`Cannot find category with id of ${params.id}`);
    }

    if (image) {
      imageResult = await uploadToCloudinary(image[0], "image", "image/icons");

      if (!imageResult?.url) {
        throw Boom.badImplementation(imageResult.error);
      }

      await cloudinaryDeleteImg(selectedCategory?.image_id, "image");
    }

    await db.Categories.update(
      image
        ? {
            description,
            image_url: imageResult?.url,
            image_id: imageResult?.public_id,
          }
        : { description },
      { where: { id: params.id } }
    );

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

    await db.sequelize.transaction(async (t) => {
      await cloudinaryDeleteImg(selectedCategory?.image_id, "image");
      await db.Categories.destroy({ where: { id: params.id }, transaction: t });
    });

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
