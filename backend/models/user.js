'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {

      // User → Category (1:M)
      User.hasMany(models.Category, {
        foreignKey: "userId",
        as: "categories"
      });

      // User → Transaction (1:M)
      User.hasMany(models.Transaction, {
        foreignKey: "userId",
        as: "transactions"
      });

      // User → MonthlyIncome (1:M)
      User.hasMany(models.MonthlyIncome, {
        foreignKey: "userId",
        as: "incomes"
      });
    }
  }

  User.init({
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};