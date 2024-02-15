const Boom = require("boom");
const db = require("../../models");
const _ = require("lodash");

const getAllProduct = async () => {
  const result = await db.Product.findAll();

  if (_.isEmpty(result)) {
    return Promise.reject(Boom.notFound("Product Not Found"));
  }

  return Promise.resolve(result);
};

const getProductById = async (id) => {
  const result = await db.Product.findOne({
    where: { id },
  });

  if (_.isEmpty(result)) {
    return Promise.reject(Boom.notFound("Product Not Found"));
  }

  return Promise.resolve(result.dataValues);
};

const createProduct = async (product) => {
  const result = await db.Product.create({
    name: product?.name,
    description: product?.description,
    price: product?.price,
    description: product?.description,
    image_url: product?.image_url,
    category_id: product?.category_id,
  });

  return Promise.resolve(true);
};

const updateProduct = async (product, id) => {
  await getProductById(id);

  await db.Product.update(
    {
      name: product?.name,
      description: product?.description,
      price: product?.price,
      description: product?.description,
      image_url: product.image_url && product.image_url,
      category_id: product?.category_id,
    },
    { where: { id } }
  );
};

const deleteProduct = async (id) => {
  await getProductById(id);

  await db.Product.destroy({ where: { id } });
};

module.exports = {
  getAllProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
