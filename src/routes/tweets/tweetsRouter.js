const router = require('express').Router();
const Twitter = require('twitter');
const User = require('../users/usersModel')
require('dotenv').config();



/////////////////////////////////////////////////////////////////////
//////////////////////GET////////////////////////////////////////////

// [X] GET /tweets
// [X] Get list of tweets

// [X] GET /tweets/:tweet_id
// [X] Tweet by ID

// [X] GET /tweets/user/:user_id
// [X] Get All tweets by a user by user_id

// [X] GET /tweets/friends/:user_id - (Timeline)
// [X] Get all tweets from a users friends by user_id


/////////////////////////////////////////////////////////////////////
//////////////////////POST///////////////////////////////////////////

// POST /tweets

// Send a new Tweet
router.post('/', (req, res) => {
  const newStatus = req.body.status;
  const newId = req.body.twitter_user_id
  res.status(200).json({ message: 'tweet on its way, stop it if you can.' });
  slowTweet = setTimeout(function () {
    postTweet(newStatus, newId)
  }, 1000)
});

function postTweet(status, id) {
  Users.findById(id)
    .then(newUser => {
      console.log("NEW USER+++++++++++++++++++++++++++++++++", newUser);
      let client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: newUser.token,
        access_token_secret: newUser.token_secret,
      })
      client
        .post('statuses/update', status)
        .catch(function (error) {
        });
    })
}

router.post('/cancel', (req, res) => {
  clearTimeout(slowTweet);
  res.status(200).json({ message: 'tweet canceled.' });
})

/////////////////////////////////////////////////////////////////////
//////////////////////PUT////////////////////////////////////////////

// No edit button

/////////////////////////////////////////////////////////////////////
//////////////////////DELETE/////////////////////////////////////////

// [X] DELETE /tweets/:tweet_id
// Delete a tweet by tweet_id

module.exports = router;

