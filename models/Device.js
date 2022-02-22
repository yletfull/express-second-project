const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Device = sequelize.define('device', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  // rating: { type: DataTypes.FLOAT, defaultValue: 2.5 },
  preview: { type: DataTypes.STRING, allowNull: false },
  images: { type: DataTypes.ARRAY(DataTypes.STRING) },
  count: { type: DataTypes.INTEGER },
});

module.exports = {
  Device,
};
