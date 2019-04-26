// AUTH ROUTE FOR OAUTH AUTHORIZATION
const router = require('express').Router();
const passport = require('passport');
const Strategy = require('passport-twitter').Strategy;

require('dotenv').config();

passport.use(
  new Strategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL:
        process.env.CALLBACK_URL ||
        'http://localhost:5000/auth/twitter/callback'
    },
    function(token, tokenSecret, profile, callback) {
      return callback(null, profile);
    }
  )
);

passport.serializeUser(function(user, callback) {
  callback(null, user);
});

passport.deserializeUser(function(obj, callback) {
  callback(null, obj);
});

router.get('/twitter/login', passport.authenticate('twitter'));

router.get(
  '/twitter/callback',
  passport.authenticate('twitter', {
    failureRedirect: 'https://twitter-block.herokuapp.com/auth/twitter/callback'
  }),
  function(req, res) {
    res.redirect(' https://twitter-block.herokuapp.com/');
  }
);
module.exports = router;
