const Boom = require("boom");
const {Cart, User, Product} = require("../../models");
const _ = require("lodash");
const generalHelper = require("../helpers/generalHelper");

const fileName = 'server/api/cartHelper.js';


const addToCart = async (cartData, idUser) => {
    const {product_id, quantity} = cartData;

    try {

        const checkCartData = await Cart.findOne({
            where: {
                product_id: product_id,
                user_id: idUser
            }
        });

        if(!_.isEmpty(checkCartData)){
            await Cart.update({
                quantity: checkCartData?.quantity + quantity
            }, {
                where: {
                    product_id: product_id,
                    user_id: idUser
                }
            })
        } else {
            await Cart.create({product_id, quantity, user_id: idUser})
        }

        return Promise.resolve(true)
    } catch (err) {
        console.log([fileName, 'add cart', 'ERROR'], { info: `${err}` });
        return Promise.reject(generalHelper.errorResponse(err));
    }

}


const getCartByUser = async (idUser) => {
    try {
        const response = await Cart.findAll({
            where: {
                user_id: idUser
            },            
        });

        if (_.isEmpty(response)) {
            return Promise.reject(Boom.notFound("Cart is empty"));
          }

        return Promise.resolve(response)

    } catch (err) {
        console.log([fileName, 'get cart', 'ERROR'], { info: `${err}` });
        return Promise.reject(generalHelper.errorResponse(err));
    }
}

const updateDataCart = async (cartData) => {
    const {id, quantity} = cartData;
    try {
        const checkCartData = await Cart.findOne({
            where: {
                id: id
            }
        });

        if(_.isEmpty(checkCartData)){
            return Promise.reject(Boom.notFound(`Cannot find cart items ${id}!`));
        } else {
            await Cart.update({
                quantity: quantity
            }, {
                where: {
                    id:id
                }
            });
            
            const cartItemUpdate = await Cart.findOne({
                where: {
                    id: id
                }
            })

            return Promise.resolve(cartItemUpdate);
        }
    } catch (err) {
        console.log([fileName, 'update data cart', 'ERROR'], { info: `${err}` });
        return Promise.reject(generalHelper.errorResponse(err));
    }
}

const deleteDataCart = async (id, userId) => {
    try {
        const checkCartData = await Cart.findOne({
            where: {
                id: id
            }
        });

        if(_.isEmpty(checkCartData)){
            return Promise.reject(Boom.notFound(`Cannot find cart items ${id}!`));
        } else {
            await Cart.destroy({
                where: {
                    id:id,
                }
            });

        };
        const cartitems = await Cart.findAll({
            where: {
                user_id: userId
            }
        });

        return Promise.resolve(cartitems);

    } catch (err) {
        console.log([fileName, 'delete cart', 'ERROR'], { info: `${err}` });
        return Promise.reject(generalHelper.errorResponse(err));
    }
}

module.exports = {
    addToCart,
    getCartByUser,
    updateDataCart,
    deleteDataCart,
}