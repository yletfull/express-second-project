const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const RolePermission = sequelize.define('role_permission', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
});

module.exports = {
  RolePermission,
};
