const Router = require("express").Router();

const uploadMedia = require("../middlewares/uploadMedia");
const generalHelper = require("../helpers/generalHelper");
const categoryHelper = require("../helpers/categoryHelper");
const authMiddleware = require("../middlewares/authMiddleware");
const validationHelper = require("../helpers/validationHelper");

const createCategory = async (req, res) => {
  try {
    const objectData = {
      name: req.body.name,
      description: req.body.description,
      image: req?.files?.image,
    };

    validationHelper.categoryRequestValidation(objectData);

    const response = await categoryHelper.postCreateCategory(objectData);

    res
      .status(201)
      .send({ message: "Successfully Create New Category", data: response });
  } catch (err) {
    return res
      .status(err.output.statusCode)
      .send(generalHelper.errorResponse(err).output.payload);
  }
};

const categoryList = async (req, res) => {
  try {
    const response = await categoryHelper.getCategoryList(req.query);

    res
      .status(200)
      .send({ message: "Successfully Get All Category", data: response });
  } catch (err) {
    return res
      .status(err.output.statusCode)
      .send(generalHelper.errorResponse(err).output.payload);
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
    return res
      .status(err.output.statusCode)
      .send(generalHelper.errorResponse(err).output.payload);
  }
};

const updateCategory = async (req, res) => {
  try {
    const objectData = {
      description: req.body.description,
      image: req?.files?.image,
    };

    validationHelper.categoryIdValidation(req.params);
    validationHelper.categoryRequestValidation(objectData, true);

    const response = await categoryHelper.patchUpdateCategory(
      req.params,
      objectData
    );

    res
      .status(200)
      .send({ message: "Successfully Update a Category", data: response });
  } catch (err) {
    return res
      .status(err.output.statusCode)
      .send(generalHelper.errorResponse(err).output.payload);
  }
};

const deleteCategory = async (req, res) => {
  try {
    validationHelper.categoryIdValidation(req.params);

    await categoryHelper.deleteCategory(req.params);

    res.status(202).send({ message: "Successfully Delete a Category" });
  } catch (err) {
    return res
      .status(err.output.statusCode)
      .send(generalHelper.errorResponse(err).output.payload);
  }
};

Router.post(
  "/create",
  uploadMedia.fields([{ name: "image", maxCount: 1 }]),
  authMiddleware.validateToken,
  createCategory
);
Router.get("/list", categoryList);
Router.get("/detail/:id", categoryDetail);
Router.patch(
  "/update/:id",
  uploadMedia.fields([{ name: "image", maxCount: 1 }]),
  authMiddleware.validateToken,
  updateCategory
);
Router.delete("/delete/:id", authMiddleware.validateToken, deleteCategory);

module.exports = Router;
