require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { runServerCallback, runServerErrorCallback } = require('./helpers');
const mainRouter = require('./routes');

const sequelize = require('./db');
// const models = require('./models/models');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', mainRouter);

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
