const Router = require("express").Router();

const Validation = require("../helpers/validationHelper");
const OrderHelper = require("../helpers/orderHelper");
const GeneralHelper = require("../helpers/generalHelper");
const Boom = require("boom");
const jwt = require("jsonwebtoken");
const Middleware = require("../middlewares/authMiddleware");

const createOrder = async (req, res) => {
    try{
        const newData = req?.body;
        Validation.orderValidation(newData);
        
        await OrderHelper.createOrder(newData, req.userId);

        return res.status(201).json({ message: "Order created"});
    }catch (err) {
        console.log(err);
        return res.send(GeneralHelper.errorResponse(err));
    }
};

const getAllUserOrder = async (req, res) => {
    try{
        const response = await OrderHelper.getAllUserOrder(req.userId);
        return res.status(200).json({ message: "Success get all order", data: response});
    }catch (err) {
        console.log(err);
        return res.send(GeneralHelper.errorResponse(err));
    }
};

const getAllOrder = async (req, res) => {
    try{
        const response = await OrderHelper.getAllOrder();
        return res.status(200).json({ message: "Success get all order", data: response});
    }catch (err) {
        console.log(err);
        return res.send(GeneralHelper.errorResponse(err));
    }
};

const updateStatusOrder = async (req, res) => {
    try {
        const dataId = req.body;

        Validation.orderIdValidation(dataId);

        const response = await OrderHelper.updateStatusOrder(dataId?.id);
      
        res
        .status(200)
        .send({ message: "Successfully Update a Order status", data: response });
    }catch (err) {
        console.log(err);
        return res.send(GeneralHelper.errorResponse(err));
    }
}


Router.post("/create",Middleware.validateToken, createOrder);
Router.get("/user", Middleware.validateToken, getAllUserOrder);
Router.get("/all", getAllOrder);
Router.patch("/update", updateStatusOrder);

module.exports = Router;