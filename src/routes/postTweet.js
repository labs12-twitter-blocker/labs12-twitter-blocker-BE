const router = require('express').Router();
require('dotenv').config();

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
