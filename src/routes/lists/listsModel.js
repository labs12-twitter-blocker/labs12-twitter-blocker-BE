const db = require('../../data/db.js');

module.exports = {
    get,
    getPublic,
    getPrivate,
    getById,
    getByUserCreated,
    getPublicByUserCreated,
    getPrivateByUserCreated,
    getSubscribers,
    getAllByOrder,
    insertList,
};
//   get lists/, /cool, /block,
function get() {
    return db('lists')
}

// get /public
function getPublic() {
    return db('lists')
    .where('public', true)
}

// get /private
function getPrivate() {
    return db('lists')
    .where('public', false)
}

// get /:list_id
function getById(listId) {
    return db('lists')
    .where('uuid', listId).first()
}

// get all/cool/block lists created by user
function getByUserCreated(userId) {
    return db('lists as l')
    .join('twitter_users as tu', 'tu.twitter_id', "l.twitter_id")
    .where('l.twitter_id', userId)
} 

// get all /public lists created by user
function getPublicByUserCreated(userId) {
    return db('lists as l')
    .join('twitter_users as tu', 'tu.twitter_id', "l.twitter_id")
    .where('l.twitter_id', userId)
    .where('public', true)
} 

// get all /private lists created by user
function getPrivateByUserCreated(userId) {
    return db('lists as l')
    .join('twitter_users as tu', 'tu.twitter_id', "l.twitter_id")
    .where('l.twitter_id', userId)
    .where('public', false)
} 

// get /subscribers/:list_id - all USERS who have subscribed to list
function getSubscribers(listId) {
    return db('list_followers as f')
    .where('list_id', listId)
}

// get /points list in order of points (upvotes-downvotes)
function getAllByOrder() {
    return db('lists as l')
    .orderBy('l.upvotes')
}

// get /timeline/:list_id - returns timeline of list
// getListTimeline: function(listId) {
//     return db('lists as l')
//     .where('l.uuid', listId)
//     .select('')
// }

// post /lists
function insertList(list) {
    return db('lists')
        .insert(list)
        .then(ids => ({uuid: ids[0]}));
        return query;
}

