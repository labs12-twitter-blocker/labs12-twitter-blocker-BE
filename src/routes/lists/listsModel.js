const db = require('../../data/db.js');

module.exports = {
  get,
  getPublic,
  getPrivate,
  getBlocked,
  getById,
  getByUserTwitterId,
  getByIdUser,
  getByUserCreated,
  getPublicByUserCreated,
  getPrivateByUserCreated,
  getBlockByUserCreated,
  getSubscribers,
  getMembers,
  getAllByOrder,
  getFollowByOrder,
  getBlockByOrder,
  insertList,
  subscribeToList,
  getUserTwitterId,
  updateList,
  deleteList,
  deleteTwitterList,
  unfollowList,
  updateListMembers
};
//   get lists/, /cool
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
// get /block
function getBlocked() {
  return db('lists')
    .where('is_block_list', true)
}

// get /:list_id
function getById(twitter_list_id) {
  return db('lists')
    .where('twitter_list_id', twitter_list_id).first()
}
function getByUserTwitterId(twitter_user_id) {
  return db('lists')
    .where('twitter_id', twitter_user_id).first()
}

function getUserTwitterId(twitter_user_id) {
  return db('lists')
    .where('twitter_id', twitter_user_id)
}
// get /:list_id
function getByIdUser(userId, list_name) {
  return db('lists')
    .where("list_name", list_name).where('twitter_id', userId)
}


// get all/cool lists created by user
function getByUserCreated(userId) {
  return db('lists as l')
    // .join('twitter_users as tu', 'tu.twitter_id', "l.twitter_id")
    .where('l.twitter_id', userId)
}

// get all /public lists created by user
function getPublicByUserCreated(userId) {
  return db('lists as l')
    // .join('twitter_users as tu', 'tu.twitter_id', "l.twitter_id")
    .where('l.twitter_id', userId)
    .where('public', true)
}

// get all /private lists created by user
function getPrivateByUserCreated(userId) {
  return db('lists as l')
    // .join('twitter_users as tu', 'tu.twitter_id', "l.twitter_id")
    .where('l.twitter_id', userId)
    .where('public', false)
}

//get all /block lists created by user
function getBlockByUserCreated(userId) {
  return db('lists as l')
    // .join('twitter_users as tu', 'tu.twitter_id', "l.twitter_id")
    .where('l.twitter_id', userId)
    .where('is_block_list', true)
}

// get /subscribers/:twitter_list_id - all USERS who have subscribed to list
function getSubscribers(twitter_list_id) {
  return db('list_followers')
    .where('twitter_list_id', twitter_list_id)
}

// get /members/:twitter_list_id - all members of a list
function getMembers(twitter_list_id) {
  return db('list_members')
    .where('twitter_list_id', twitter_list_id)
}

// get /lists/points/top all lists in order of points
function getAllByOrder() {
  return db('lists')
    .select('*')
    .where('public', true)
    .orderBy('list_points', 'desc')
}

// get /lists/points/follow follow lists in order of points (upvotes-downvotes)
function getFollowByOrder() {
  return db('lists')
    .select('*')
    .where('is_block_list', false)
    .where('public', true)
    .orderBy('list_points', 'desc')
}

// get /lists/points/block block lists in order of points (upvotes-downvotes)
function getBlockByOrder() {
  return db('lists')
    .select('*')
    .where('is_block_list', true)
    .where('public', true)
    .orderBy('list_points', 'desc')
}

// get /timeline/:list_id - returns timeline of list
// getListTimeline: function(listId) {
//     return db('lists as l')
//     .where('l.list_id', listId)
//     .select('')
// }

// post /lists
function insertList(list) {
  return db('lists')
    .insert(list)
    .then(ids => { return ids })
}

function subscribeToList(listId, userId) {
  return db('lists as l')
    .join('twitter_users as tu', 'tu.twitter_id', 'l.twitter_id')
    .where('tu.twitter_id', userId)
    .insert(getById(listId))
    .then(ids => { return ids })
}

function updateList(listId, list) {
  return db('lists as l')
    .where('l.list_id', listId)
    .update(list)
}

function updateListMembers(list_members_id, listMembers) {
  returndb('list_members')
    .where('list_members_id', list_members_id)
    .update(listMembers)
}

function deleteList(listId) {
  return db('lists')
    .where('list_id', listId)
    .delete()
}
async function deleteTwitterList(listId) {
  return await db('lists')
    .where("twitter_list_id", listId)
    .del()

}

function unfollowList(listId, userId) {
  return db('lists as l')
    .join('twitter_users as tu', 'tu.twitter_id', 'l.twitter_id')
    .where('tu.twitter_id', userId)
    .delete(getById(listId))
}

