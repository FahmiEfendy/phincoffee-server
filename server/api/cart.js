const Router = require("express").Router();

const Validation = require("../helpers/validationHelper");
const CartHelper = require("../helpers/cartHelper");
const GeneralHelper = require("../helpers/generalHelper");
const Boom = require("boom");
const jwt = require("jsonwebtoken");
const Middleware = require("../middlewares/authMiddleware");


const addToCart = async (req, res) => {
    try {
        const newData = req?.body;
        Validation.addCartValidation(newData);

        const response = await CartHelper.addToCart(newData, req.userId)

        return res.status(201).json({ message: "success add to cart"});
    }catch (err) {
        console.log(err);
        return res.send(GeneralHelper.errorResponse(err));
    }
}

const getUserCart = async (req, res) => {
    try{
        const response = await CartHelper.getCartByUser(req.userId);
        return res.status(200).json({ message: "success get cart items", data: response});
    }catch (err) {
        console.log(err);
        return res.send(GeneralHelper.errorResponse(err));
    }
};

const updateCart = async (req, res) => {
    try{
        const newData = req?.body;
        Validation.updateCartValidation(newData);
        const response = await CartHelper.updateDataCart(newData);
        return res.status(200).json({ message: "success update cart items", data: response});
    }catch (err) {
        console.log(err);
        return res.send(GeneralHelper.errorResponse(err));
    }
};

const deleteCart = async (req, res) => {
    try{
        const newData = req?.body;
        Validation.cartIdValidation(newData);
        const response = await CartHelper.deleteDataCart(newData.id, req.userId);
        return res.status(200).json({ message: "success delete cart items", data: response});
    }catch (err) {
        console.log(err);
        return res.send(GeneralHelper.errorResponse(err));
    }
};

Router.post("/", Middleware.validateToken, addToCart);
Router.get("/", Middleware.validateToken, getUserCart);
Router.patch("/", Middleware.validateToken, updateCart);
Router.delete("/", Middleware.validateToken, deleteCart);

module.exports = Router;