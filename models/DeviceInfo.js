const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const DeviceInfo = sequelize.define('device_info', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  value: { type: DataTypes.STRING, allowNull: false },
});

module.exports = {
  DeviceInfo,
};
