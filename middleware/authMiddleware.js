const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');

const { status: statusErr, message: messageErr } = ApiError.unAuthorized();

module.exports = function auth(req, res, next) {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(statusErr).json({ message: messageErr });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;

    return next();
  } catch (e) {
    return res.status(statusErr).json({ message: messageErr });
  }
};
