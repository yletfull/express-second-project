const { v4: uuidv4 } = require('uuid');
const { Session } = require('../models/Session');

module.exports = async function sessionMiddleware(req, res, next) {
  const currentSessionCookie = req.cookies['current-session'] || null;
  let bdSession = null;

  if (currentSessionCookie) {
    bdSession = await Session.findOne({
      value: currentSessionCookie,
    });
  }

  if (!bdSession) {
    const generatedSessionValue = uuidv4();
    bdSession = await Session.create({
      value: generatedSessionValue,
    });
    req.currentSession = bdSession.value;
    res.cookie('current-session', bdSession.value, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });
    return next();
  }

  req.currentSession = bdSession.value;
  return next();
};
