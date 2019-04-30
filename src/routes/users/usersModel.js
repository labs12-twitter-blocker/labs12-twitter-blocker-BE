const db = require('../../data/db.js');

module.exports = {
  insertMegaUser,
};



function insertMegaUser(user) {
    return db("twitter_users")
      .insert(user)
      .then(ids => {
        return ids;
      });
}