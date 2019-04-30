const router = require('express').Router();
const axios = require('axios');

const Users = require('./usersModel.js');

// https://www.npmjs.com/package/twitter
let Twitter = require('twitter');
let client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});


// https://www.npmjs.com/package/twit
// var Twit = require('twit'); 
// var T = new Twit({
//   consumer_key:         process.env.TWITTER_CONSUMER_KEY,
//   consumer_secret:      process.env.TWITTER_CONSUMER_SECRET,
//   access_token:         process.env.ACCESS_TOKEN_KEY,
//   access_token_secret:  '...',
//   timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
//   strictSSL:            true,     // optional - requires SSL certificates to be valid.
// })

/////////////////////////////////////////////////////////////////////
//////////////////////GET////////////////////////////////////////////

// GET /users 
// Get all users

// GET /users/:user_id
// Get a users by user_ID

// GET /users/points/ 
// Get all users ordered by number of points

// [X] GET /users/followers/:user_id
// [X] Get all the followers of a user by user_id

// [X] GET /users/friends/:user_id
// [X] Get all the friends of a user by user_id

// GET /users/premium
// Get all paying users

/////////////////////////////////////////////////////////////////////
//////////////////////POST///////////////////////////////////////////

// POST /users/mega/:twitter_handle
// Get all the user info and add to all the DB tables 
// (YES: lists, twitter_users, list_followers. NO: app_users, tweets, twitter_followers )
router.post("/mega/:twitter_handle", (req, res) => {
    const userInfo = req.body;
    const params = { screen_name: req.params.twitter_handle };

    client.get("users/show", params, function(
      error, user, response) {
        // console.log(user);
        // console.log(response);
        let new_user = {
          "twitter_id": user.id_str,
          "name": user.name,
          "screen_name": user.screen_name, 
          "location": user.location,
          "description": user.description,
          "followers": user.followers_count,
          "friends": user.friends_count,
          "profile_img": user.profile_image_url_https,
          "created_at": user.created_at,
          "protected": user.protected,
          "verified": user.verified 
        }

        console.log("new User: ",new_user);
        Users.insertMegaUser(new_user)
          .then(user => {
            res.status(201).json(user);
          })
          .catch(error => {
            console.log("error: ", error);
            res.status(500).json({
              message: "There was an error while saving the user to the database"
            });
          })
      if (!error) {
        console.log(error);
      }
    });



    // axios
    // .get(`https://api.twitter.com/1.1/users/show.json?screen_name=${twitter_handle}`, headers)
    // .then(res => {
    //   console.log(res.data);
    // })
    // .catch(err => {
    //   console.log(err);
    // });
  
    // Users.insert(userInfo)
    //   .then(users => {
    //     if (!userInfo.username) {
    //       res
    //         .status(422)
    //         .json({ message: "Please provide the name of the player." });
    //     } else {
    //       res.status(201).json(users);
    //     }
    //   })
    //   .catch(error => {
    //     res.status(500).json({
    //       message: "There was an error while saving the user to the database"
    //     });
    //   });
  });


// POST /users/ 
// Add a new user

// [X] POST /users/tweets/:twitter_handle
// [X] Add all a users tweets to the tweets table

// [X] POST /users/followers - 
// [X] All all a users followers to the twitter_followers table

/////////////////////////////////////////////////////////////////////
//////////////////////PUT////////////////////////////////////////////

// PUT /users/:user_id
// Edit a user by user_id

/////////////////////////////////////////////////////////////////////
//////////////////////DELETE/////////////////////////////////////////

// DELETE /users/:user_id
// Delete a user by user_ID

module.exports = router;