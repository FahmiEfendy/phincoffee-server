const Router = require("express").Router();

const Validation = require("../helpers/validationHelper");
const OrderHelper = require("../helpers/orderHelper");
const GeneralHelper = require("../helpers/generalHelper");
const Boom = require("boom");

const createOrder = async (req, res) => {
    try{
        const newData = req?.body;
        Validation.orderValidation(newData);
        
        await OrderHelper.createOrder(newData);

        return res.status(201).json({ message: "Order created"});
    }catch (err) {
        console.log(err);
        return res.send(GeneralHelper.errorResponse(err));
    }
}


Router.post("/create", createOrder);

module.exports = Router;