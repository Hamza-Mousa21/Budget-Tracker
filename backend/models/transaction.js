'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {

    static associate(models) {

      // Transaction → User
      Transaction.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user"
      });

      // Transaction → Category
      Transaction.belongsTo(models.Category, {
        foreignKey: "categoryId",
        as: "category"
      });
    }
  }

  Transaction.init({
    amount: DataTypes.FLOAT,
    description: DataTypes.STRING,
    transactionDate: DataTypes.DATE,
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });

  return Transaction;
};