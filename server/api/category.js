const Router = require("express").Router();

const categoryHelper = require("../helpers/categoryHelper");
const validationHelper = require("../helpers/validationHelper");

const createCategory = async (req, res) => {
  try {
    const objectData = {
      name: req.body.name,
      description: req.body.description,
    };

    validationHelper.createCategoryValidation(objectData);

    const response = await categoryHelper.postCreateCategory(objectData);

    res
      .status(201)
      .send({ message: "Successfully Create New Category", data: response });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

Router.post("/create", createCategory);

module.exports = Router;
