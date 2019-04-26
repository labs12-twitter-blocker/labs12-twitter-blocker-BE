const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport');
const morgan = require('morgan');
const session = require('express-session');
require('dotenv').config();

//All Server Middleware should be applied here
module.exports = server => {
  server.use(express.json());
  server.use(helmet());
  server.use(cors());
  server.use(morgan('tiny'));
  server.use(passport.initialize());
  server.use(passport.session());
  server.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true
    })
  );
};
