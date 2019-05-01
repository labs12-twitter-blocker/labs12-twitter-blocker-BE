const db = require('../../data/db.js');

module.exports = {
    findListByTwitterListId,
    findTwitterUserByTwitterId,
    insertMegaUser,
    insertMegaUserList,
    insertMegaUserListFollower,
    updateMegaList,
    updateMegaUser,
    removeAllListFollowers,
};

function findListByTwitterListId(twitter_list_id) {
    return db('lists')
      .where({ twitter_list_id })
      .first();
}

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

function insertMegaUserListFollower(follower) {
    return db("list_followers")
      .insert(follower)
      .then(ids => {
        return ids;
      });
}

function updateMegaList(twitter_list_id, changes) {
    return db("lists")
      .where({ twitter_list_id })
      .update(changes)
      .returning('*');
}

function updateMegaUser(twitter_id, changes) {
    return db("twitter_users")
      .where({ twitter_id })
      .update(changes)
      .returning('*');
}

function removeAllListFollowers(twitter_list_id) {
    console.log("*********************DELETE FUNCTION******************************");
    console.log(twitter_list_id);
    return db("list_followers")
      .where("twitter_list_id", 'like', `${twitter_list_id}` )
      .del();
}
