const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const DeviceFeedback = sequelize.define('device_feedback', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  value: { type: DataTypes.STRING, allowNull: false },
});

module.exports = {
  DeviceFeedback,
};
