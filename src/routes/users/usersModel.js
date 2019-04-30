const db = require('../../data/db.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  orderByDownVotes,
  orderByUpVotes
};

function add(user) {
  return db("app_users").insert(user)
}

function find() {
  return db("app_users").select("id", "screen_name");
}

function findBy(filter) {
  return db("app_users").where(filter);
}

function findById(id) {
  return db("app_users").where({ id }).first();
}

function orderByUpVotes() {
  return db("app_users").orderBy("upvotes")
}

function orderByDownVotes() {
  return db("app_users").orderBy("downvotes")
}
