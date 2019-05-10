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
  const status = req.body.status;
  const id = req.body.id
  res.status(200).json({ message: 'tweet on its way, stop it if you can.' });
  slowTweet = setTimeout(function () {
    postTweet(status, id)
  }, 60 * 1000)
});

router.post('/cancel', (req, res) => {
  clearTimeout(slowTweet);
  res.status(200).json({ message: 'tweet canceled.' });
});

function postTweet(status, id) {
  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: getSecret(id)
    //process.env.TWITTER_ACCESS_TOKEN_SECRET
  })

  const getSecret = (id) => {
    const sec = User.findById(id);
    return sec
  }

  client
    .post('statuses/update', status)
    .catch(function (error) {
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

