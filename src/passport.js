let passport = require('passport'),
  TwitterTokenStrategy = require('passport-twitter-token'),
  Users = require("./routes/users/usersModel");
const axios = require("axios");
const url = process.env.BACKEND_URL;

module.exports = function () {

  passport.use(new TwitterTokenStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET
  }, (token, tokenSecret, profile, done) => {
    Users.findById(profile.id).then(user => {
      // console.log("++++++++++++++++++++++++++PROFILE_USERS________________________________", profile)
      if (!user) {
        // console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++USER NOT FOUND")

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
            axios.post(`${url}/users/mega/${profile.username}`)
          )

        // If user exists it will trigger the else function
        //   console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++USER NOT FOUND DONE")
      } else {
        // console.log("profile", profile)
        axios.post(`${url}/users/mega/${profile.username}`)
        // console.log("after mega!!!!")
        // console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++USER FOUND")
        //GET /users/:twitter_id
        axios.get(`${url}/users/${profile.id}`).then(res => {

          let modifiedUser = {
            "screen_name": profile.username,
            "token": token,
            "token_secret": tokenSecret,
          }
          // axios put by twitter id insert modified user
          axios
            .put(`${url}/users/${profile.id}`, modifiedUser)
          // console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++USER FOUND DONE")
        }).catch(error => {
          // console.log("++++++++++++++++++++++++++ERROR________________________________", error)
          // res.status(400).json(error)
        })
      }
      // console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++callback")
      return done(null, profile);
    })
  }
  ))

};
