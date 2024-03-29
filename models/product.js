"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Order, {
        foreignKey: {
          name: 'product_id',
        }
      });
      Product.belongsTo(models.Categories, { foreignKey: "category_id" });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.INTEGER,
      image_url: DataTypes.STRING,
      category_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
