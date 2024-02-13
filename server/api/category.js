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

const categoryList = async (req, res) => {
  try {
    const response = await categoryHelper.getCategoryList(req.query);

    res
      .status(200)
      .send({ message: "Successfully Get All Category", data: response });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const categoryDetail = async (req, res) => {
  try {
    validationHelper.categoryIdValidation(req.params);

    const response = await categoryHelper.getCategoryDetail(req.params);

    res
      .status(200)
      .send({ message: "Successfully Get a Category Detail", data: response });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

Router.post("/create", createCategory);
Router.get("/list", categoryList);
Router.get("/detail/:id", categoryDetail);

module.exports = Router;
