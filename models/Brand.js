const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Brand = sequelize.define('brand', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

module.exports = {
  Brand,
};
