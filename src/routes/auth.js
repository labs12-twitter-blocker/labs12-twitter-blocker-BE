// AUTH ROUTE FOR OAUTH AUTHORIZATION
require('dotenv').config();
const router = require('express').Router();
const passport = require('passport');
const Strategy = require('passport-twitter').Strategy;
const Users = require("./users/usersModel");
const axios = require("axios")


const url = "http://localhost:5000"
passport.use(
  new Strategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: process.env.CALLBACK_URL
    }, //passportSuccessCallback
    function (token, tokenSecret, profile, callback) {
      // console.log(token, tokenSecret);
      // console.log(profile)
      // console.log(profile.screen_name)

      //insert user info into app user db
      let newUser = {
        twitter_id: profile.id,
        screen_name: profile.username,
        token: token,
        token_secret: tokenSecret,
        upvotes: 0,
        downvotes: 0,
        admin: false,
        deactivated: false,
        email: null,
        is_paying: false
      }
      // console.log(profile.username)
      console.log(newUser)
      Users.add(newUser)
      //post /users/mega with screen_name
      // axios.post(`${url}/users/mega/${profile.screen_name}`)
      //   .then(res => {
      //     res.status(200).json({ message: 'User added' })
      //   }).catch(error => {
      //     res.status(400).json({ message: error })
      //   })
      // .then(res.status(200)).catch(error => {
      // res.status(400).json(error)
      // })
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
