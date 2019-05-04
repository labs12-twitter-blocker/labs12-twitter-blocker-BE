const router = require("express").Router();
const axios = require("axios");

const Users = require("./usersModel.js");

// https://www.npmjs.com/package/twitter
let Twitter = require("twitter");
let client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});


/////////////////////////////////////////////////////////////////////
//////////////////////GET////////////////////////////////////////////

// GET /users
// Get all users

router.get("/", (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json({ users });
    })
    .catch(error => {
      res.status(400).json({ message: "There was an error retrieving all users" });
    })
})

// GET /users/:user_id
// Get a users by twitter_id

router.get("/:twitter_id", (req, res) => {
  Users.findById(req.params.twitter_id)
    .then(users => {
      res.status(200).json({ users });
    })
    .catch(error => {
      res.status(400).json({ message: "There was an error retrieving user by twitter id" });
    })
})

// GET /users/points/
// Get all users ordered by number of points

router.get("/points", (req, res) => {
  Users.orderByUpVotes(req.params.upvotes)
    .then(users => {
      res.status(200).json({ users })
    })
    .catch(error => {
      res.status(400).json({ message: "There was an error retrieving users by points" })
    })
})

// [X] GET /users/followers/:user_id
// [X] Get all the followers of a user by user_id

// [X] GET /users/friends/:user_id
// [X] Get all the friends of a user by user_id

// GET /users/premium
// Get all paying users

router.get("/premium", (req, res) => {
  Users.findPremium()
    .then(users => {
      res.status(200).json({ users })
    })
    .catch(error => {
      res.status(400).json({ message: "There was an error retrieving premium users" });
    })
})

/////////////////////////////////////////////////////////////////////
//////////////////////POST///////////////////////////////////////////

// POST /users/mega/:twitter_handle
// Get all the user info and add to all the DB tables
// (YES: lists, twitter_users, list_followers. NO: app_users, tweets, twitter_followers )
router.post("/mega/:twitter_handle", (req, res) => {
  const userInfo = req.body;
  const params = { screen_name: req.params.twitter_handle };

  // Inserts the user into the twitter_users table
  client.get("users/show", params, function (error, user, response) {
    console.log(user);
    console.log(response);

    let new_user = {
      twitter_id: user.id_str,
      name: user.name,
      screen_name: user.screen_name,
      location: user.location,
      description: user.description,
      followers: user.followers_count,
      friends: user.friends_count,
      profile_img: user.profile_image_url_https,
      created_at: user.created_at,
      protected: user.protected,
      verified: user.verified
    };

    // First test if the user is already in out DB
    Users.findTwitterUserByTwitterId(user.id_str)
      .then(user => {
        // If we find the twitter user, update their info
        if (user) {
          Users.updateMegaUser(user.twitter_users_id, new_user)
            .then(updated => {
              if (updated) {
                // res.status(200).json(updated);

                ///////////////////////////////////////
                // Also add the users lists to the DB
                updateLists(params);
                //////////////////////////////////////
              } else {
                res.status(404).json({ message: "User not found." });
              }
            }).then(done => { res.status(201).json(done); })  // Finished the functions on updated user so res.status
            .catch(error => {
              console.log("error: ", error);
              res.status(500).json({ message: "The user information could not be modified." });
            });
        } else {
          // No user found So go ahead and Add them to the DB
          Users.insertMegaUser(new_user)
            .then(user => {
              // res.status(201).json(user);

              ///////////////////////////////////////
              // Also add the users lists to the DB
              updateLists(params);
              //////////////////////////////////////
            }).then(done => { res.status(201).json(done); })  // Finished the functions on new user so res.status
            .catch(error => {
              console.log("error: ", error);
              res.status(500).json({ message: "There was an error while saving the user to the database" });
            });
        }
      })
      .catch(error => {
        console.log("error: ", error);
        res.status(500).json({ message: "There was an error while saving the user to the database" });
      });

    if (!error) { console.log(error); }
  });
});

// Inserts the user's lists into the lists table
function updateLists(params) {
  client.get("lists/list", params, function (error, lists, response) {

    // For every list the user has, add it to the DB.
    lists.map(list => {

      let new_list = {
        "twitter_list_id": list.id_str,
        "list_name": list.name,
        "list_creation_date": list.created_at,
        "member_count": list.member_count,
        "subscriber_count": list.subscriber_count,
        "public": true,
        "description": list.description,
        "twitter_id": list.user.id_str,
        "list_upvotes": 0,
        "list_downvotes": 0,
        "is_block_list": false,
        "created_with_hashtag": false,
        "created_with_users": false,
        "created_with_category": false
      }
      if (list.mode != "public") {
        new_list.public = false
      };

      // First test if the list is already in our DB
      Users.findListByTwitterListId(list.id_str)
        .then(list => {
          // If we find the list in our DB, update its info
          if (list) {
            Users.updateMegaList(list.twitter_list_id, new_list)
              .then(updated => {
                if (updated) {
                  // res.status(201).json(user);

                  ////////////////////////////////////////////////////////
                  // Also update the members of the list
                  updateListFollowers({ list_id: new_list.twitter_list_id, count: 5000 })
                  ////////////////////////////////////////////////////////
                } else {
                  res.status(404).json({ message: "List not found." });
                }
              })
              .catch(error => {
                console.log("error: ", error);
                res.status(500).json({ message: "The list information could not be modified." });
              });
          } else {
            // No list found So go ahead and Add them to the DB
            Users.insertMegaUserList(new_list)
              .then(list => {
                // res.status(201).json(user);

                ////////////////////////////////////////////////////////
                // Also update the members and followers of the list
                updateListFollowers({ list_id: new_list.twitter_list_id, count: 5000 })
                updateListMembers({ list_id: new_list.twitter_list_id, count: 5000 })
                ////////////////////////////////////////////////////////
              })
              .catch(error => {
                console.log("error: ", error);
                res.status(500).json({ message: "There was an error while saving the list to the database" });
              });
          }
        })
        .catch(error => {
          console.log("error: ", error);
          res.status(500).json({ message: "There was an error while saving the list to the database" });
        })

    });

    if (!error) {
      console.log(error);
    }
  })
};

function updateListFollowers(params) {
  client.get("lists/subscribers", params, function (error, subscribers, response) {
    // console.log("lists/subscribers params: ", params);
    console.log("subscribers: ", subscribers);

    // Remove all the followers from a list, then add them back
    Users.removeAllListFollowers(params.list_id);
    // For every subscriber the list has, add the user_id to the DB.
    subscribers.users.map(follower => {

      let new_follower = {
        "twitter_list_id": params.list_id,
        "twitter_user_id": follower.id_str,
      }

      Users.insertMegaUserListFollower(new_follower)
        .then(follower => {
          // res.status(201).json(user);
          return
        })
        .catch(error => {
          console.log("error: ", error);
          res.status(500).json({
            message: "There was an error while saving the list follower to the database"
          });
        })
      if (!error) {
        console.log(error);
      }
    })
  })
};

function updateListMembers(params) {
  client.get("lists/members", params, function (error, members, response) {
    // console.log("lists/members params: ", params);
    // console.log("members: ", members);

    // Remove all the followers from a list, then add them back
    Users.removeAllListMembers(params.list_id);
    // For every member the list has, add the user_id and user info to the DB.
    members.users.map(member => {

      let new_member = {
        "twitter_list_id": params.list_id,
        "twitter_user_id": member.id_str,
        "name": member.name,
        "screen_name": member.screen_name,
        "description": member.description,
        "profile_img": member.profile_background_image_url_https
      }

      Users.insertMegaUserListMember(new_member)
        .then(follower => {
          // res.status(201).json(user);
          return
        })
        .catch(error => {
          console.log("error: ", error);
          res.status(500).json({
            message: "There was an error while saving the list member to the database"
          });
        })
      if (!error) {
        console.log(error);
      }
    })
  })
};


// POST /users/
// Add a new user

router.post("/", async (req, res) => {
  try {
    await Users.add(req.body)
    res.status(201).json({ message: "User has been added" })
  } catch (error) {
    res.status(500).json({ message: "There was an error adding new user" })
  }
})

// [X] POST /users/tweets/:twitter_handle
// [X] Add all a users tweets to the tweets table

// [X] POST /users/followers -
// [X] All all a users followers to the twitter_followers table

/////////////////////////////////////////////////////////////////////
//////////////////////PUT////////////////////////////////////////////

// PUT /users/:user_id
// Edit a user by user_id

router.put("/:twitter_id", async (req, res) => {
  const changes = req.body;
  try {
    const updateUser = await Users.editUser(req.params.twitter_id, changes);
    if (updateUser) {
      res.status(200).json({ message: "User has been updated" })
    } else {
      res.status(404).json({ message: "User could not be found" })
    }
  } catch (error) {
    res.status(500).json({ message: "There was an error updating the user" })
  }
})

/////////////////////////////////////////////////////////////////////
//////////////////////DELETE/////////////////////////////////////////

// DELETE /users/:user_id
// Delete app_user by twitter_id

router.delete("/:twitter_id", async (req, res) => {
  try {
    const user = await Users.deleteUser(req.params.twitter_id);
    if (user) {
      res.status(204).json({ message: "User has been deleted" })
    } else {
      res.status(404).json({ message: "User cannot be found" })
    }
  } catch (error) {
    //console.log(error);
    res.status(500).json({
      error,
      message: "There was an error removing user"
    })
  }
})

module.exports = router;