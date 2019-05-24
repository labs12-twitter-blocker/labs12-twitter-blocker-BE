const router = require("express").Router();
const axios = require("axios");
const querystring = require('querystring');
const Users = require("./usersModel.js");
const data = require('../lists/listsModel')
const auth = require('../../middleware/authenticate')
// https://www.npmjs.com/package/twitter
let Twitter = require("twitter");
// let client = new Twitter({
//   consumer_key: process.env.TWITTER_CONSUMER_KEY,
//   consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//   // access_token_key: process.env.ACCESS_TOKEN_KEY,
//   // access_token_secret: process.env.ACCESS_TOKEN_SECRET
// });


/////////////////////////////////////////////////////////////////////
//////////////////////GET////////////////////////////////////////////

// GET /users
// Get all users

router.get("/", auth, (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json({ users });
    })
    .catch(error => {
      res.status(400).json({ message: "There was an error retrieving all users", error });
    })
})

// GET /users/:user_id
// Get a users by twitter_id

router.get("/:twitter_id", auth, (req, res) => {
  Users.findById(req.params.twitter_id)
    .then(users => {
      res.status(200).json({ users });
    })
    .catch(error => {
      res.status(400).json({ message: "There was an error retrieving user by twitter id", error });
    })
})

// GET /users/points/
// Get all users ordered by number of points

router.get("/points", auth, (req, res) => {
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

router.get("/premium", auth, (req, res) => {
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

  console.log("req.params.twitter_handle-----------------------------------------------------", req.params.twitter_handle)
  const params = { screen_name: req.params.twitter_handle };

  
  Users.findByScreenName(params.screen_name)
  .then(newUser => {
      console.log("NEW USER+++++++++++++++++++++++++++++++++", newUser);
      let tClient = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: newUser.token,
        access_token_secret: newUser.token_secret,
      })
      
      console.log("tClient-----------------------------------------------------", tClient)
      // Inserts the user into the twitter_users table
    tClient.get("users/show", params, function (error, user, response) {
    // console.log("Twitter users/show Response-------------------------------", response)
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
    console.log("~~~~~~new_user", new_user)
    // First test if the user is already in out DB
    Users.findTwitterUserByTwitterId(user.id_str)
      .then(user => {
        // If we find the twitter user, update their info
        if (user) {
          console.log("~~~~~~found the new_user", user)
          Users.updateMegaUser(user.twitter_users_id, new_user)
            .then(updated => {
              if (updated) {
                // res.status(200).json(updated);
                console.log("here")
                console.log("updated", updated)

                ///////////////////////////////////////
                // Also add the users lists to the DB
                updateLists(params, tClient);
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
          console.log("~~~~~~no user found", new_user)
          Users.insertMegaUser(new_user)
            .then(user => {

              ///////////////////////////////////////
              // Also add the users lists to the DB
              updateLists(params, tClient);
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

    if (!error) { console.log("error", error); }
  });


    })


  
});

// Inserts the user's lists into the lists table
function updateLists(params, tClient) {
  tClient.get("lists/list", params, function (error, lists, response) {
    const listArr = []

    if (error) {
      console.log("user has no lists");
    } else {
      const usersList = []

      // console.log(lists)
      // For every list the user has, add it to the DB.
      lists.map(list => {
        listArr.push(list.id_str)

        let new_list = {
          "twitter_list_id": list.id_str,
          "list_name": list.name,
          "list_creation_date": list.created_at,
          "member_count": list.member_count,
          "subscriber_count": list.subscriber_count,
          "public": true,
          "description": list.description,
          "twitter_id": list.user.id_str,
          "list_points": 0,
          "is_block_list": false,
          "created_with_hashtag": false,
          "created_with_users": false,
          "created_with_category": false
        }
        if (list.mode != "public") {
          new_list.public = false
        };
        // check if the lists exists in our db and not twitter
        // console.log("LIST___________________++++++++++++++++++++++++__________________", listArr)
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
                    updateListFollowers({ list_id: new_list.twitter_list_id, count: 5000 }, tClient)
                    updateListMembers({ list_id: new_list.twitter_list_id, count: 5000 }, tClient)
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
                  updateListFollowers({ list_id: new_list.twitter_list_id, count: 5000 }, tClient)
                  updateListMembers({ list_id: new_list.twitter_list_id, count: 5000 }, tClient)
                  ////////////////////////////////////////////////////////
                })
                .catch(error => {
                  console.log("error+: ", error);
                  response.status(500).json({ message: "There was an error while saving the list to the database" });
                });
            }
          })
          .catch(error => {
            console.log("error: ", error);
            res.status(500).json({ message: "There was an error while saving the list to the database" });
          }).then(
            data.getUserTwitterId(list.user.id_str).then(item =>
              item.map(x => {
                if (listArr.includes(x.twitter_list_id)) {
                } else {
                  data.deleteTwitterList(x.twitter_list_id)
                }
              })
            ))
      });
      if (error) {
        console.log("error*", error);
      }
    }
  })
};

function updateListFollowers(params, tClient) {
  console.log("****************************************************************************************updateListFollowers", params.list_id)
  tClient.get("lists/subscribers", params, function (error, subscribers, response) {
    console.log("updateListFollowers, list id, subscribers", params.list_id, subscribers)

    Users.removeAllListFollowers(params.list_id)
      .then(e => {
        console.log("****************************************************************************************removeAllListFollowers", params.list_id)
        let json_follower = [];
        try {
          subscribers.users.map(follower => {
            json_follower.push({
              "twitter_user_id": follower.id_str,
              "name": follower.name,
              "screen_name": follower.screen_name,
              "description": follower.description,
              "profile_img": follower.profile_image_url_https
            })
          })
          console.log("removeAllListFollowers, list id, json_follower", params.list_id, json_follower)
        } catch (error) { console.log("No subscribers to map") }
        Users.insertMegaUserListFollower(params.list_id, json_follower);
      })
  })
};

function updateListMembers(params, tClient) {
  console.log("****************************************************************************************updateListMembers  ", params.list_id)
  tClient.get("lists/members", params, function (error, members, response) {

    Users.removeAllListMembers(params.list_id)
      .then(e => {
        let json_member = [];
        members.users.map(member => {
          json_member.push({
            "twitter_user_id": member.id_str,
            "name": member.name,
            "screen_name": member.screen_name,
            "description": member.description,
            "profile_img": member.profile_image_url_https 
          })
        })
        Users.insertMegaUserListMember(params.list_id, json_member);
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

//////////////////////////////////////////////
/////////////FOLLOW ANOTHER USER/////////////


// POST friendships/create
// Follow another user


router.post("/follow", auth, async (req, res) => {
  const userId = req.body.twitter_id;
  const followId = req.body.follow_id
  if (!userId || !followId) {
    res.status(404).json({ error: 'The user with the specified ID does not exist.' })
  }

  let params = { user_id: followId }

  Users.findById(userId)
    .then(newUser => {
      // console.log("NEW USER+++++++++++++++++++++++++++++++++", newUser);
      let client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: newUser.token,
        access_token_secret: newUser.token_secret,
      })
      client.post('/friendships/create', auth, querystring.stringify(params), function (error, response) {

        if (error) {
          console.log(error)
        } else {
          console.log(response)
          res.status(200).json({ message: "User is now followed", response })
        }
      })
    })
})


/////////////////////////////////////////////////////////////////////
//////////////////////PUT////////////////////////////////////////////

// PUT /users/:user_id
// Edit a user by user_id

router.put("/:twitter_id", auth, async (req, res) => {
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

router.delete("/:twitter_id", auth, async (req, res) => {
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

// Block a user with twitter api
// POST /users/blocks/create
router.post("/blocks/create/:user_id/:twitter_id", async (req, res) => {
  const twitter_id = req.params.twitter_id
  const params = {
    user_id: req.params.user_id
  }
  console.log(params)
  console.log(twitter_id)
  await Users.findById(twitter_id)
    .then(newUser => {
      console.log("NEW USER+++++++++++++++++++++++++++++++++", newUser);
      let client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: newUser.token,
        access_token_secret: newUser.token_secret,
      })
      client.post('/blocks/create', querystring.stringify(params), function (response, error) {
        if (error) {
          console.log(error)
        } else {
          console.log(response)
        }
      })
    }).then(
      res.status(200).json("User Blocked"))
}
)
router.post("/blocks/destroy/:user_id/:twitter_id", async (req, res) => {
  const twitter_id = req.params.twitter_id
  const params = {
    user_id: req.params.user_id
  }
  console.log(params)
  console.log(twitter_id)
  await Users.findById(twitter_id)
    .then(newUser => {
      // console.log("NEW USER+++++++++++++++++++++++++++++++++", newUser);
      let client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: newUser.token,
        access_token_secret: newUser.token_secret,
      })
      client.post('/blocks/destroy', params, function (response, error) {
        if (error) {
          console.log(error)
        } else {
          console.log("response", response)
        }
      })
      res.status(200).json("User Unblocked")
    })
})
router.delete("/delete/:user_id", async (req, res) => {
  const twitter_id = req.params.user_id.toString()
  await Users.deleteUser(twitter_id);
  res.status(200).json("success");
})
router.delete("/delete/userlists/:user_id", async (req, res) => {
  const twitter_id = req.params.user_id.toString()
  console.log("Twitter Id", twitter_id)
  const lists = await data.getUserTwitterId(twitter_id)

  lists.map(item => {
    data.deleteTwitterList(item.twitter_list_id)
  })
  await Users.deleteUser(twitter_id);
  res.status(200).json("success");
})
module.exports = router;