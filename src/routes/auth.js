// AUTH ROUTE FOR OAUTH AUTHORIZATION
require('dotenv').config();
const router = require('express').Router();
const passport = require('passport');
const Strategy = require('passport-twitter').Strategy;
const Users = require("./users/usersModel");
const axios = require("axios")

// url for testing
const url = process.env.BACKEND_URL;
passport.use(
  new Strategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: process.env.CALLBACK_URL
    },
    function (token, tokenSecret, profile, callback) {

      //search app users table for twitter id
      Users.findById(profile.id).then(user => {
        // console.log("++++++++++++++++++++++++++PROFILE_________________________________", profile)
        if (!user) {

          //insert new user info into app user db
          let newUser = {
            "twitter_id": profile.id,
            "screen_name": profile.username,
            "token": token,
            "token_secret": tokenSecret,
            "upvotes": 0,
            "downvotes": 0,
            "admin": false,
            "deactivated": false,
            "email": null,
            "is_paying": false
          }
          axios
            .post(`${url}/users`, newUser).then(

              // post /users/mega with screen_name
              axios.post(`${url}/users/mega/${profile.username}`))

          // If user exists it will trigger the else function
        } else {

          //GET /users/:twitter_id
          axios.get(`${url}/users/${profile.id}`).then(res => {

            let modifiedUser = {
              "screen_name": profile.username,
              "token": token,
              "token_secret": tokenSecret,
            }
            // axios put by twitter id insert modified user
            axios
              .put(`${url}/users/${profile.id}`, modifiedUser).then(
                axios.post(`${url}/users/mega/${profile.username}`))
          }).catch(error => {
            // res.status(400).json(error)
          })
        }
        return callback(null, user);
      })
    }));

passport.serializeUser(function (user, callback) {
  callback(null, user);
});

passport.deserializeUser(function (obj, callback) {
  callback(null, obj);
});


// when login is successful, retrieve user info
router.get("/twitter/login/success", (req, res) => {
  console.log(req.session.passport.user)
  if (req.session.passport.user) {
    res.json({
      success: true,
      user: req.session.passport.user
    });
  }
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
