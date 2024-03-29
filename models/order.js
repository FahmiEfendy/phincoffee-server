'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Order.belongsTo(models.User, {
        foreignKey: {
          name: 'user_id',
        }
      });

      Order.belongsTo(models.Product, {
        foreignKey: {
          name: 'product_id',
        }
      });

      Order.belongsTo(models.OrderGroup, {
        foreignKey: {
          name: 'orderGroup_id'
        }
      })
    }
  }
  Order.init({
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    orderGroup_id: DataTypes.INTEGER,
    product_name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};