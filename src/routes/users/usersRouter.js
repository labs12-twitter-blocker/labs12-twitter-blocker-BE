const router = require('express').Router();


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

// POST /users/mega/:twitter_handle - 
// Get all the user info and add to all the DB tables 
// (YES: lists, twitter_users, list_followers. NO: app_users, tweets, twitter_followers )


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