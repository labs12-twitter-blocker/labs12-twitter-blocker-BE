const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport');
const morgan = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const cookieSession = require("cookie-session")
const KnexSessionStore = require('connect-session-knex')(session);
const db = require('../data/db')

const store = new KnexSessionStore({
  "knex": db,
  "tablename": 'sessions'
})
let whitelist = [
  'http://localhost:3000',
  'http://localhost:5000',
  'https://twitter-blocker.netlify.com/',
  'https://twitter-block.herokuapp.com' ]

const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}


require('dotenv').config();

//All Server Middleware should be applied here
module.exports = server => {
  server.use(express.json());
  server.use(helmet());
  server.use(cors(corsOptions));
  server.use(morgan());
  server.use(cookieParser());
  server.use(passport.initialize());
  server.use(passport.session());
  server.use(
    session({
      secret: process.env.SESSION_SECRET,
      cookie: {
        maxAge: 24 * 60 * 60 * 100,
        // domain: process.env.BACK_END_URL
      },
      resave: true,
      saveUninitialized: true,
      store: store
    })
  );
};
