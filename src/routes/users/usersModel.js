const db = require('../../data/db.js');

module.exports = {
  add,
  deleteUser,
  find,
  findBy,
  findById,
  findPremium,
  orderByDownVotes,
  orderByUpVotes
};

function add(user) {
  return db("app_users").insert(user)
}

function deleteUser(id) {
  return db('app_users').where({ id }).del();
}

function find() {
  return db("app_users").select("app_user_id", "screen_name");
}

function findBy(filter) {
  return db("app_users").where(filter);
}

function findById(id) {
  return db("app_users").where({ id }).first();
}

function findPremium() {
  return db("app_users").where("is_paying", true);
}

function orderByUpVotes() {
  return db("app_users").orderBy("upvotes")
}

function orderByDownVotes() {
  return db("app_users").orderBy("downvotes")
}
