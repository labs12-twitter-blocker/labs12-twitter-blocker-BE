// AUTH ROUTE FOR OAUTH AUTHORIZATION
require('dotenv').config();
const router = require('express').Router();
const passport = require('passport');
const Strategy = require('passport-twitter').Strategy;
const Users = require("./users/usersModel");

passport.use(
  new Strategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: process.env.CALLBACK_URL
    }, //passportSuccessCallback
    function (token, tokenSecret, profile, callback) {
      console.log(token, tokenSecret);
      console.log(profile)

      return callback(null, profile);
    }
  )
);

// function passportSuccessCallback(accessToken, accessTokenSecret, profile, done) {
//   const twitter_id = profile.id;
//   const screen_name = profile.username;
//   // console.log(Users.findById(twitter_id))
//   // console.log(profile)
//   console.log(accessToken)
//   console.log(accessTokenSecret)
//   return [ screen_name ]
// }

passport.serializeUser(function (user, callback) {
  callback(null, user);
});

passport.deserializeUser(function (obj, callback) {
  callback(null, obj);
});

// passport.serializeUser(function (user, done) {
//   done(null, JSON.stringify({
//     id: user.uid,
//     accessToken: user.access_token

//   }));
// });


// passport.deserializeUser(function (serialized, done) {
//   var sessionUser = JSON.parse(serialized);
//   return BtUser.find({
//     where: {
//       id: sessionUser.id,
//       deactivatedAt: null
//     }, include: [ {
//       model: TwitterUser
//     } ]
//   }).then(function (user) {

//   }).catch(function (err) {
//     logger.error(err);
//     // User not found in DB. Leave the user object undefined.
//     done(null, undefined);
//     return null;
//   });
// });

router.get('/twitter/login', passport.authenticate('twitter'));

router.get(
  '/twitter/callback',
  passport.authenticate('twitter', {

    failureRedirect: process.env.FRONT_END_URL

  }),
  function (req, res) {

    res.redirect(`${process.env.FRONT_END_URL}/test`);
    // console.log(token)
  }
);

module.exports = router;
