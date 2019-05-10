// const express = require('express');
// const helmet = require('helmet');
// const cors = require('cors');
// const passport = require('passport');
// const morgan = require('morgan');
// const session = require('express-session');
// const cookieParser = require('cookie-parser')
// const cookieSession = require("cookie-session")
// const KnexSessionStore = require('connect-session-knex')(session);
// const db = require('../data/db')
// require('dotenv').config();
// require('../routes/auth/auth')(passport)
// // const store = new KnexSessionStore({
// //   "knex": db,
// //   "tablename": 'sessions'
// // })

// //All Server Middleware should be applied here
// module.exports = server => {
//   server.use(express.json());
//   server.use(cors({
//     origin: process.env.FRONT_END_URL,
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true // allow session cookie from browser to pass through
//   }));
//   server.use(helmet());
//   server.use(morgan('tiny'));
//   server.use(
//     cookieSession({
//       name: "session",
//       keys: 'secretKey',
//       maxAge: 24 * 60 * 60 * 100
//     })
//   );
//   server.use(cookieParser());
//   server.use(passport.initialize());
//   server.use(passport.session({ secret: 'keyboard cat', key: 'sid', cookie: { secure: true } }));
//   // server.use(
//   //   session({
//   //     secret: process.env.SESSION_SECRET,
//   //     cookie: {
//   //       maxAge: 24 * 60 * 60 * 100,
//   //     },
//   //     resave: true,
//   //     saveUninitialized: true,
//   //     store: store
//   //   }),
//   // );
// };
