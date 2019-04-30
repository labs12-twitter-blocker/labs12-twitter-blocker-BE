const router = require('express').Router();
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

let Twitter = require('twitter');
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

router.post('/', (req, res) => {
  status = req.body;
  client
    .post('statuses/update', status)
    .then(function(tweet) {
      console.log(tweet);
      res.status(201).json({ message: 'Post Successful' });
    })
    .catch(function(error) {
      res.status(400).json({ message: error });
    });
});

module.exports = router;

/////////////////////////////////////////////////////////////////////
//////////////////////PUT////////////////////////////////////////////

// No edit button

/////////////////////////////////////////////////////////////////////
//////////////////////DELETE/////////////////////////////////////////

// [X] DELETE /tweets/:tweet_id
// Delete a tweet by tweet_id

module.exports = router;
