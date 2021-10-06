const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');

module.exports = function checkRole(role) {
  return async function checkRoleCallback(req, res, next) {
    if (req.method === 'OPTIONS') {
      return next();
    }
    try {
      const token = req.headers?.authorization?.split(' ')[1];
      if (!token) {
        const { status, message } = ApiError.unAuthorized();
        return res.status(status).json({ message });
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded.role !== role) {
        const { status, message } = ApiError.forbidden();
        return res.status(status).json({ message });
      }
      req.user = decoded;

      return next();
    } catch (e) {
      const { status, message } = ApiError.unAuthorized();
      return res.status(status).json({ message });
    }
  };
};
