const { v4: uuidv4 } = require('uuid');

module.exports = function sessionMiddleware(req, res, next) {
  const currentSessionCookie = req.cookies['current-session'];

  if (!currentSessionCookie) {
    const generatedSessionId = uuidv4();

    req.currentSession = generatedSessionId;
    res.cookie('current-session', generatedSessionId, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });

    return next();
  }
  req.currentSession = currentSessionCookie;
  return next();
};
