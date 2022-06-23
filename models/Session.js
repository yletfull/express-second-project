const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Session = sequelize.define('session', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  value: { type: DataTypes.STRING, allowNull: false },
});

module.exports = {
  Session,
};
