'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {

    static associate(models) {

      // Category → User
      Category.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user"
      });

      // Category → Transaction
      Category.hasMany(models.Transaction, {
        foreignKey: "categoryId",
        as: "transactions"
      });
    }
  }

  Category.init({
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Category',
  });

  return Category;
};