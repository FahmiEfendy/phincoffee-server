const Router = require("express").Router();

const Validation = require("../helpers/validationHelper");
const ProductHelper = require("../helpers/productHelper");
const GeneralHelper = require("../helpers/generalHelper");

const getAllProduct = async (req, res) => {
  try {
    const data = await ProductHelper.getAllProduct(req.body);

    return res.status(200).json({ message: "Successfully get data", data });
  } catch (err) {
    console.log(err);
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const getProductById = async (req, res) => {
  try {
    const data = await ProductHelper.getProductById(req.params.id);

    return res.status(200).json({ message: "Successfully get data", data });
  } catch (err) {
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const createProduct = async (req, res) => {
  try {
    Validation.productValidation(req.body);

    await ProductHelper.createProduct(req.body);

    return res.status(200).json("Product successfully created");
  } catch (err) {
    console.log(err);
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const updateProduct = async (req, res) => {
  try {
    Validation.productValidation(req.body);

    await ProductHelper.updateProduct(req.body, req.params.id);

    return res.status(200).json("Product successfully updated");
  } catch (err) {
    console.log(err);
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const deleteProduct = async (req, res) => {
  try {
    await ProductHelper.deleteProduct(req.params.id);

    return res.status(200).json("Product successfully deleted");
  } catch (err) {
    return res.send(GeneralHelper.errorResponse(err));
  }
};

Router.get("/", getAllProduct);
Router.get("/:id", getProductById);
Router.post("/create", createProduct);
Router.put("/update/:id", updateProduct);
Router.delete("/delete/:id", deleteProduct);

module.exports = Router;
