const Router = require("express").Router();

const Validation = require("../helpers/validationHelper");
const ProductHelper = require("../helpers/productHelper");
const GeneralHelper = require("../helpers/generalHelper");
const {
  uploadToCloudinary,
  cloudinaryDeleteImg,
} = require("../../utils/cloudinary");
const uploadMedia = require("../middlewares/uploadMedia");

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
  let imageResult;
  try {
    if (req?.fileValidationError)
      return responseError(
        res,
        400,
        "Bad Request",
        req.fileValidationError.message
      );
    if (!req?.files?.image_url)
      return res.status(400).json({ message: "Image is required" });

    Validation.productValidation(req.body);

    imageResult = await uploadToCloudinary(req.files.image_url[0], "image");

    if (!imageResult?.url)
      return res.status(500).json({ message: imageResult.error });

    await ProductHelper.createProduct({
      ...req.body,
      image_url: imageResult?.url,
    });

    return res.status(200).json("Product successfully created");
  } catch (err) {
    if (imageResult?.public_id) {
      await cloudinaryDeleteImg(imageResult.public_id, "image");
    }
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
Router.post(
  "/create",
  uploadMedia.fields([{ name: "image_url", maxCount: 1 }]),
  createProduct
);
Router.put("/update/:id", updateProduct);
Router.delete("/delete/:id", deleteProduct);

module.exports = Router;
