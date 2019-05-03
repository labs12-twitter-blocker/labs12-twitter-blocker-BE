const router = require('express').Router();
const Twitter = require('twitter');
require('dotenv').config();

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

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
  const status = req.body;
  res.status(200).json({ message: 'tweet on its way, stop it if you can.' });
  slowTweet = setTimeout(function () {
    postTweet(status)
  }, 10 * 1000)
});

router.post('/cancel', (req, res) => {
  clearTimeout(slowTweet);
  res.status(200).json({ message: 'tweet canceled.' });
});

function postTweet(status) {
  client
    .post('statuses/update', status)
    .then(function (tweet) {
      res.status(200).json({ message: 'Post Successful' });
    })
    .catch(function (error) {
      res.status(400).json({ message: error });
    });
}

/////////////////////////////////////////////////////////////////////
//////////////////////PUT////////////////////////////////////////////

// No edit button

/////////////////////////////////////////////////////////////////////
//////////////////////DELETE/////////////////////////////////////////

// [X] DELETE /tweets/:tweet_id
// Delete a tweet by tweet_id

module.exports = router;

