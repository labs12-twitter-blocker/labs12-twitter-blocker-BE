require('dotenv').config();
const passport = require('passport');
express = require('express');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const request = require('request');
const auth = require('./middleware/authenticate')
let passportConfig = require('./passport');
Users = require("./routes/users/usersModel");
passportConfig();

const server = express();

// const authRouter = require('./routes/auth');
const listsRouter = require("./routes/lists/listsRouter.js");
const tweetsRouter = require("./routes/tweets/tweetsRouter.js");
const usersRouter = require("./routes/users/usersRouter.js");
const votesRouter = require("./routes/votes/votesRouter.js");
// const authRouter = require('./routes/auth/authRouter.js')

const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const db = require('./data/db');

const store = new KnexSessionStore({
  "knex": db,
  "tablename": 'sessions'
})

//CORS middleware
// let allowCrossDomain = function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', "*");
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');

//   next();
// }
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: [ 'x-auth-token' ],
};

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 100,
    httpOnly: false
  },
  resave: false,
  saveUninitialized: false,
  store: store
};

//rest API requirements
server.use(bodyParser.urlencoded({
  extended: true
}));
server.use(bodyParser.json());

//All Server Middleware should be applied here
server.use(cors(corsOptions));
// server.use(allowCrossDomain);
server.use(helmet());
server.use(morgan('tiny'));
server.use(session(sessionOptions));
server.use(passport.initialize());
// server.use(passport.session());

// passport.serializeUser(user.serialize);
// passport.deserializeUser(user.deserialize);
passport.serializeUser((user, done) => { done(null, user.id); });

passport.deserializeUser((user, done) => {
  const { id } = user.id
  return knex('app_users').where({ id }).first()
    .then((user) => { done(null, user); })
    .catch((err) => { done(err, null); });
});




let createToken = function (auth) {
  console.log("*********************************************Create Token")

  return jwt.sign({
    id: auth.auth.id,
    username: auth.user._json.screen_name,
    displayName: auth.user._json.name,
    banner_img: auth.user._json.profile_banner_url,
    profile_img: auth.user._json.profile_image_url_https
  }, process.env.SESSION_SECRET,
    {
      expiresIn: 7 * 24 * 60 * 60 * 100
    });
};

let generateToken = function (req, res, next) {
  console.log("*********************************************Generate Token")
  req.token = createToken(req);
  console.log("*********************************************Generated Token", req.token)
  return next();
};

let sendToken = function (req, res) {
  res.setHeader('x-auth-token', req.token);
  return res.status(200).send(JSON.stringify(req.user));
};

server.route('/auth/twitter/reverse')
  .post(function (req, res) {
    request.post({
      url: 'https://api.twitter.com/oauth/request_token',
      oauth: {
        oauth_callback: process.env.CALLBACK_URL,
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET
      }
    }, function (err, r, body) {
      if (err) {
        return res.send(500, { message: e.message });
      }

      let jsonStr = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
      res.send(JSON.parse(jsonStr));
    });
  });

server.route('/auth/twitter')
  .post((req, res, next) => {
    request.post({
      url: `https://api.twitter.com/oauth/access_token?oauth_verifier`,
      oauth: {
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        token: req.query.oauth_token
      },
      form: { oauth_verifier: req.query.oauth_verifier }
    }, function (err, r, body) {
      if (err) {
        return res.send(500, { message: err.message });
      }

      const bodyString = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
      const parsedBody = JSON.parse(bodyString);

      req.body[ 'oauth_token' ] = parsedBody.oauth_token;
      req.body[ 'oauth_token_secret' ] = parsedBody.oauth_token_secret;
      req.body[ 'user_id' ] = parsedBody.user_id;

      next();
    });
  }, passport.authenticate('twitter-token', { session: true }), function (req, res, next) {
    if (!req.user) {
      return res.send(401, 'User Not Authenticated');
    }

    // prepare token for API
    req.auth = {
      id: req.user.id
    };

    return next();
  }, generateToken, sendToken);


//token handling middleware
let authenticate = expressJwt({
  secret: process.env.SESSION_SECRET,
  requestProperty: 'auth',
  getToken: function (req) {
    if (req.headers[ 'x-auth-token' ]) {
      return req.headers[ 'x-auth-token' ];
    }
    return null;
  }
});


let getCurrentUser = function (req, res, next) {
  Users.findById(req.auth.id).then(user => {
    req.user = user;
    next();
  }).catch(error => {
    next(error);
  })
};

let getOne = function (req, res) {

  let user = req.user;
  delete user[ 'twitterProvider' ];
  delete user[ '__v' ];

  res.json(user);
};

server.route('/auth/me').get(authenticate, getCurrentUser, getOne);


// server.use('/auth', authRouter);
server.use("/lists", listsRouter);
server.use("/tweets", tweetsRouter);
server.use("/users", usersRouter);
server.use("/votes", votesRouter);
server.use('/', router);
// server.use("/auth", authRouter)
process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.log('unhandledRejection', error);
});

module.exports = server;
