// const express = require('express');
// const helmet = require('helmet');
// const cors = require('cors');
// const passport = require('passport');
// const morgan = require('morgan');
// const session = require('express-session');
// // const cookieParser = require('cookie-parser')
// // const cookieSession = require("cookie-session")
// const KnexSessionStore = require('connect-session-knex')(session);
// const db = require('../data/db')
// const user = require('./passport-serialize');

// const store = new KnexSessionStore({
//   "knex": db,
//   "tablename": 'sessions'
// })

// // let whitelist = [
// //   'http://localhost:3000', 
// //   'http://localhost:5000', 
// //   'https://twitter-blocker.netlify.com/',
// //   'https://twitter-block.herokuapp.com']

// // const corsOptions = {
// //   credentials: false,
// //   origin: function (origin, callback) {
// //     if (whitelist.indexOf(origin) !== -1 || !origin) {
// //       callback(null, true)
// //     } else {
// //       callback(new Error('Not allowed by CORS'))
// //     }
// //   }
// // }

// const corsOptions = {
//   origin: true,
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
//   exposedHeaders: ['x-auth-token']
// };

// require('dotenv').config();

// //All Server Middleware should be applied here
// module.exports = server => {
//   server.use(express.json());
//   server.use(cors(corsOptions));
//   server.use(helmet());
//   server.use(morgan('tiny'));
//   // server.use(cookieParser());
//   server.use(passport.initialize());
//   server.use(passport.session());

  
  
//   server.use(
//     session({
//       secret: process.env.SESSION_SECRET,
//       cookie: {
//         maxAge: 24 * 60 * 60 * 100,
//         httpOnly: false
//       },
//       resave: true,
//       saveUninitialized: true,
//       store: store
//     })
//   );

//   passport.serializeUser(user.serialize);
//   passport.deserializeUser(user.deserialize);
// };
