const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');

const { status: statusErr, message: messageErr } = ApiError.unAuthorized();

module.exports = async function auth(req, res, next) {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    const { bdSession } = req;

    if (!token) {
      if (bdSession && bdSession.userId) {
        await bdSession.update({
          userId: null,
        });
        await bdSession.save();
      }
      return res.status(statusErr).json({ message: messageErr });
    }

    const decodedUser = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decodedUser;

    if (bdSession && bdSession.userId === null) {
      await bdSession.update({
        userId: decodedUser.id,
      });
      await bdSession.save();
      console.log(bdSession);
    }
    return next();
  } catch (e) {
    return res.status(statusErr).json({ message: messageErr });
  }
};
