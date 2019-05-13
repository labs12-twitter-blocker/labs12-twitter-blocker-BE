const db = require('../../data/db.js');

module.exports = {
    getByListId,
    getByUserId,
    findVote,
    insertVote,
    updateVote,
    updateListVote,
    removeOldListVote,
};


// get /votes/list/:twitter_list_id
function getByListId(twitter_list_id) {
    return db('list_votes')
    .where('twitter_list_id', twitter_list_id)
}

// get /votes/user/:twitter_user_id
function getByUserId(twitter_user_id) {
    return db('list_votes')
    .where('twitter_user_id', twitter_user_id)
}

function findVote(twitter_list_id, twitter_user_id) {
    return db('list_votes')
      .where({ 
          "twitter_list_id": twitter_list_id,
        "twitter_user_id": twitter_user_id
     })
     .first();
  }

// post /votes
function insertVote(vote) {
    console.log("insertVote")
    return db('list_votes')
        .insert(vote)
        // .then(ids => {return ids})
}
function updateVote(twitter_list_id, twitter_user_id, vote) {
    console.log("updateVote")
    return db('list_votes')
    // .where({twitter_user_id})
    .where({ 
        "twitter_list_id": twitter_list_id,
        "twitter_user_id": twitter_user_id
   })
    .update(vote)
}

// Update vote count
function updateListVote(twitter_list_id, vote) {
    console.log("updateListVote", twitter_list_id, vote)
    return db('lists')
    .where('twitter_list_id', 'like', twitter_list_id)
    .increment({'list_points': vote}) // Will either add 1 or subtract 1 to the points
    .returning('list_points');
}

function removeOldListVote(twitter_list_id, vote) {
    console.log("removeOldListVote", twitter_list_id, vote)
    return db('lists')
    .where('twitter_list_id', 'like', twitter_list_id)
    .decrement({'list_points': vote}) // Will either add 1 or subtract 1 to the points
    .returning('list_points');
}