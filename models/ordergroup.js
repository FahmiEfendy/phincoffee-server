'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      //belongs to user 

      
      OrderGroup.hasMany(models.Order, {
        foreignKey: {
          name: "orderGroup_id",
        },
        onDelete: "CASCADE",
      });


    }
  }
  OrderGroup.init({
    user_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
    note: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'OrderGroup',
  });
  return OrderGroup;
};