const session = require('express-session');
const redis = require('redis');
const RedisStorage = require('connect-redis')(session);

const createClient = (app) => {
  const client = redis.createClient({
    legacyMode: true,
  });
  app.use(
    session({
      store: new RedisStorage({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        client,
      }),
      secret: process.env.SECRET_KEY,
      saveUninitialized: true,
    }),
  );
};

module.exports = {
  createClient,
};
