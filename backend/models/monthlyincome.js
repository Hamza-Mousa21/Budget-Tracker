'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MonthlyIncome extends Model {

    static associate(models) {

      // MonthlyIncome → User
      MonthlyIncome.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user"
      });
    }
  }

  MonthlyIncome.init({
    amount: DataTypes.FLOAT,
    month: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MonthlyIncome',
  });

  return MonthlyIncome;
};