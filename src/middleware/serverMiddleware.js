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



const corsOptions = {
  origin: '*',
  credentials: true,
  allowedHeaders: [ 'Origin', 'X-Requested-With', 'contentType', 'Content-Type', 'Accept', 'Authorization' ],
}


require('dotenv').config();

//All Server Middleware should be applied here
module.exports = server => {
  server.use(express.json());
  server.use(cors());
  server.use(helmet());
  server.use(morgan());
  server.use(cookieParser());
  server.use(passport.initialize());
  server.use(passport.session());
  server.use(
    session({
      secret: process.env.SESSION_SECRET,
      cookie: {
        maxAge: 24 * 60 * 60 * 100,
        sameSite: lax
        //       // domain: process.env.BACK_END_URL
      },
      resave: true,
      saveUninitialized: true,
      store: store
    })
  );
};
