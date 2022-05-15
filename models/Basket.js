const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Basket = sequelize.define('basket', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  sessionId: { type: DataTypes.STRING, allowNull: false },
});

module.exports = {
  Basket,
};
