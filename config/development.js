// This file contains all the development configuration 
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const uuid = require('../app/helper/uuid');
const MONGO_DB_DEV_URI = 'mongodb://localhost:27017/elanic';
const SUPER_SECRET = 'dev_1234';

module.exports = {
  NODE_ENV: 'development',
  SSL_OPTIONS: false,
  WEBAPIURI: 'http://localhost:3003/api/v1',
  MONGO_DB: {
    URI: process.env.MONGODB_URI || MONGO_DB_DEV_URI,
  },
  SESSION: {
    OPTIONS: {
      genid: function(req) {
        return uuid.genuuid(); // use UUIDs for session IDs
      },
      secret: process.env.SUPER_SECRET || SUPER_SECRET,
      store: new MongoStore({
        url: process.env.MONGODB_URI || MONGO_DB_DEV_URI,
        autoRemove: 'interval', // Default
        ttl: 7 * 24 * 60 * 60, // 7 days (in seconds)
        autoRemoveInterval: 2 * 60, // 2 hrs (in minutes)
        touchAfter: 2 * 60 * 60, // 24 hrs (time period in seconds)
      }),
      resave: false,
      saveUninitialized: false,
      cookie: {
        path: '/',
        httpOnly: false,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000, // 24 hrs (in milli seconds)
      },
    },
  },
  SUPER_SECRET: process.env.SUPER_SECRET || SUPER_SECRET,
};
