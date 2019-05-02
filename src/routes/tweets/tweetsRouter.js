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
  postTweet(status)
  res.status(200).json({ message: 'tweet sent' })
});

router.post('/cancel', (req, res) => {
  clearTimeout(postTweet);
  res.status(200).json({ message: 'tweet canceled.' });
});

function postTweet(status) {
  setTimeout(function () {
    client
      .post('statuses/update', status)
      .then(function (tweet) {
        res.status(200).json({ message: 'Post Successful' });
      })
      .catch(function (error) {
        res.status(400).json({ message: error });
      });
  }, 3 * 1000);
}
/////////////////////////////////////////////////////////////////////
//////////////////////PUT////////////////////////////////////////////

// No edit button

/////////////////////////////////////////////////////////////////////
//////////////////////DELETE/////////////////////////////////////////

// [X] DELETE /tweets/:tweet_id
// Delete a tweet by tweet_id

module.exports = router;

// new rewrite strategy
// Take in the text and Store in a post
//send user a message "60 seconds to post"
// set a timer and hand it the post
// write a stop timer function
// write endpoint to trigger stop timer
// respond to user. timer stopped


// router.post('/', async (req, res) => {
//   try {
//     status = req.body;
//     console.log(status);
//     await postThis(status);
//     await res.status(203).json({ message: 'post will send in 60 seconds' });
//   } catch (error) {
//     res.status(400).json(error);
//   }
// });

// router.post('/cancel', async (req, res) => {
//   keepGoing = false;
//   stop();
//   res.status(200).json({ message: 'tweet canceled.' });
// });

// function postThis(status) {
//   try {
//     setTimeout(function () {
//       client.post('status/update', status).then(function (tweet) {
//         res.status(200).json({ message: 'posted' });
//       });
//     }, 10 * 1000);
//   } catch (error) {
//     res.status(400).json(error);
//   }
// }
