const db = require('../../data/db.js');

module.exports = {
  add,
  find,
  findBy,
  findById
};

function add(user) {
  return db("app_users").insert(user)
}

function find() {
  return db("users").select("id", "username");
}

function findBy(filter) {
  return db("app_users").where(filter);
}

function findById(id) {
  return db("app_users").where({ id }).first();
}

