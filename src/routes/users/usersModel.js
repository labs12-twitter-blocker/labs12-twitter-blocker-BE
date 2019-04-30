const db = require('../../data/db.js');

module.exports = {
    findTwitterUserByTwitterId,
    insertMegaUser,
    insertMegaUserList,
    updateMegaUser,
};


function findTwitterUserByTwitterId(twitter_id) {
    return db('twitter_users')
      .where({ twitter_id })
      .first();
}

function insertMegaUser(user) {
    return db("twitter_users")
      .insert(user)
      .then(ids => {
        return ids;
      });
}

function insertMegaUserList(list) {
    return db("lists")
      .insert(list)
      .then(ids => {
        return ids;
      });
}

function updateMegaUser(twitter_id, changes) {
    return db("twitter_users")
      .where({ twitter_id })
      .update(changes)
      .returning('*');
}
