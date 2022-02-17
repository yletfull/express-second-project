/* eslint-disable no-console */
const runServerCallback = (PORT) => console.log(`Server started on port: ${PORT}`);
const runServerErrorCallback = (err) => console.log(err);

module.exports = {
  runServerCallback,
  runServerErrorCallback,
};
