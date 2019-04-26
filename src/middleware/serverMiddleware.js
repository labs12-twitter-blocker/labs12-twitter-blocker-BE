const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport');
const morgan = require('morgan');
const session = require('express-session');
require('dotenv').config();

module.exports = server => {
  server.use(express.json());
  server.use(helmet());
  server.use(cors());
  server.use(morgan('tiny'));
  server.use(passport.initialize());
  server.use(passport.session());
  server.use(
    session({
      secret: process.env.SESSION_SECRET || 'keep it secret',
      resave: true,
      saveUninitialized: true
    })
  );
};
