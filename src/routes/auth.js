// AUTH ROUTE FOR OAUTH AUTHORIZATION
require('dotenv').config();
const router = require('express').Router();
const passport = require('passport');
const Strategy = require('passport-twitter').Strategy;

passport.use(
  new Strategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: process.env.CALLBACK_URL
    },
    function (token, tokenSecret, profile, callback) {
      console.log(token, tokenSecret);
      return callback(null, profile);
    }
  )
);

passport.serializeUser(function (user, callback) {
  callback(null, user);
});

passport.deserializeUser(function (obj, callback) {
  callback(null, obj);
});

router.get('/twitter/login', passport.authenticate('twitter'));

router.get(
  '/twitter/callback',
  passport.authenticate('twitter', {
    failureRedirect: process.env.FRONT_END_URL
  }),
  function (req, res) {
    res.redirect(`${process.env.FRONT_END_URL}`);
  }
);

module.exports = router;
