const Boom = require("boom");
const {Product, Order, OrderGroup} = require("../../models");
const _ = require("lodash");
const generalHelper = require("../helpers/generalHelper");

const fileName = 'server/api/orderHelper.js';

const createOrder = async (order) => {
    try{    
        const productIds = order.items.map((item) => item.productIds);
        const quantities = order.items.map((item) => item.qtys);

        const orderGroupData = {
            user_id: 1,
            status: "Order Processed",
            note: order.note
        }

        const orderGroupResponse = await OrderGroup.create(orderGroupData);

        for(let i = 0; i < productIds.length; i++){
            productId = productIds[i];
            quantity = quantities[i];

            const product = await Product.findOne({where: {id: productId}});
            const orderData = {
                user_id: 1,
                product_id: productId,
                orderGroup_id: orderGroupResponse?.id,
                product_name: product?.name,
                quantity: quantity,
                price: product?.price * quantity
            };
            await Order.create(orderData);
        }

        return Promise.resolve(true);
    }catch (err) {
        console.log([fileName, 'createOrder', 'ERROR'], { info: `${error}` });
        return Promise.reject(generalHelper.errorResponse(err));
    }
};


const getAllUserOrder = async () => {
    try{
        const result = await OrderGroup.findAll({
            include: [
                {
                    model: Order,
                }
            ],
            where: { user_id: 1 },
              
        });
        return Promise.resolve(result);
    }catch (err) {
        console.log([fileName, 'get all order', 'ERROR'], { info: `${err}` });
        return Promise.reject(generalHelper.errorResponse(err));
    }
};

const getAllOrder = async () => {
    try{
        const result = await OrderGroup.findAll({
            include: [
                {
                    model: Order,
                }
            ],
            where: { status: "Order Processed" },
              
        });
        return Promise.resolve(result);
    }catch (err) {
        console.log([fileName, 'get all order', 'ERROR'], { info: `${err}` });
        return Promise.reject(generalHelper.errorResponse(err));
    }
};


module.exports = {
    createOrder,
    getAllOrder,
    getAllUserOrder
}
