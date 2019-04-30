const db = require('../../data/db.js');

module.exports = {
//   get lists/, /cool, /block,
get: function() {
    return db('lists')
},

// get /public
getPublic: function() {
    return db('lists')
    .where('public', true)
},

// get /private
getPrivate: function() {
    return db('lists')
    .where('public', false)
},

// get /:list_id
getById: function(listId) {
    return db('lists')
    .where('uuid', listId).first()
},

// get all/cool/block lists created by user
getByUserCreated: function(userId) {
    return db('lists as l')
    .join('twitter_users as tu', 'tu.twitter_id', "l.twitter_id")
    .where('l.twitter_id', userId)
}, 

// get all /public lists created by user
getPublicByUserCreated: function(userId) {
    return db('lists as l')
    .join('twitter_users as tu', 'tu.twitter_id', "l.twitter_id")
    .where('l.twitter_id', userId)
    .where('public', true)
}, 

// get all /private lists created by user
getPrivateByUserCreated: function(userId) {
    return db('lists as l')
    .join('twitter_users as tu', 'tu.twitter_id', "l.twitter_id")
    .where('l.twitter_id', userId)
    .where('public', false)
}, 

// get /subscribers/:list_id - all USERS who have subscribed to list
getSubscribers: function(listId) {
    return db('list_followers as f')
    .where('list_id', listId)
},

// get /points list in order of points (upvotes-downvotes)
getAllByOrder: function() {
    return db('lists as l')
    .orderBy('l.upvotes')
}
};
