const db = require('../../data/db.js');

module.exports = {
  add,
  editUser,
  deleteUser,
  find,
  findBy,
  findById,
  findPremium,
  findListByTwitterListId,
  findTwitterUserByTwitterId,
  insertMegaUser,
  insertMegaUserList,
  insertMegaUserListFollower,
  insertMegaUserListMember,
  orderByDownVotes,
  orderByUpVotes,
  removeAllListFollowers,
  removeAllListMembers,
  updateMegaList,
  updateMegaUser,
  getSessionUser
};

function add(user) {
  return db("app_users").insert(user)
}

function deleteUser(twitter_id) {
  return db('app_users').where({ twitter_id }).del();
}

function editUser(twitter_id, body) {
  return db("app_users").where({ twitter_id }).update(body)
}

function find() {
  return db("app_users").select("app_user_id", "twitter_id", "screen_name");
}

function findBy(filter) {
  return db("app_users").where(filter);
}

function findById(twitter_id) {
  return db("app_users").where({ twitter_id }).first();
}

function findPremium() {
  return db("app_users").where("is_paying", true);
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

function insertMegaUserListFollower(twitter_list_id, json) {
  return db("list_followers")
    .insert({ "twitter_list_id": twitter_list_id, "list_followers": JSON.stringify(json) })
    .then(ids => {
      return ids;
    });
}

function insertMegaUserListMember(twitter_list_id, json) {
  return db("list_members")
    .insert({ "twitter_list_id": twitter_list_id, "list_members": JSON.stringify(json) })
    .then(ids => {
      return ids;
    });
}

function orderByDownVotes() {
  return db("app_users").orderBy("downvotes")
}

function orderByUpVotes() {
  return db("app_users").orderBy("upvotes")
}

// function removeAllListFollowers(twitter_list_id) {
//   return db("list_followers")
//     .where("twitter_list_id", 'like', twitter_list_id)
//     .del()
//     .then(count => {
//       console.log(count);
//     });
// }

function removeAllListFollowers(twitter_list_id) {
  return new Promise(function (resolve, reject) {
    if (resolve) {
      db("list_followers")
        .where("twitter_list_id", 'like', twitter_list_id)
        .del()
        .returning('*')
      resolve(resolve);
    }
    else {
      reject(Error("It broke"));
    }
  })
};

// function removeAllListMembers(twitter_list_id) {
//   return db("list_members")
//     .where("twitter_list_id", 'like', twitter_list_id)
//     .del()
//     .then(count => {
//       console.log(count);
//     });
// }

function removeAllListMembers(twitter_list_id) {
  return new Promise(function (resolve, reject) {
    if (resolve) {
      db("list_members")
        .where("twitter_list_id", 'like', twitter_list_id)
        .del()
        .returning('*')
      resolve(resolve);
    }
    else {
      reject(Error("It broke"));
    }
  })
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
function getSessionUser() {
  return db("sessions")
}







