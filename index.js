require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { runServerCallback, runServerErrorCallback } = require('./utils');
const { createClient } = require('./client');
const mainRouter = require('./routes');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');

const sequelize = require('./db');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
// createClient(app);
app.use('/api', mainRouter);
app.use(errorHandler);

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
