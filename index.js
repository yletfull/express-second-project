require('dotenv').config();
const express = require('express');
const { runServerCallback, runServerErrorCallback } = require('./helpers');

const sequelize = require('./db');

const PORT = process.env.PORT || 5000;

const app = express();

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => runServerCallback(PORT));
  } catch (err) {
    runServerErrorCallback(err);
  }
};
start();
