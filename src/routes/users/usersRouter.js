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
      res.json(error);
    })
})

// GET /users/:user_id
// Get a users by user_ID


router.get("/:id", (req, res) => {
  Users.findById(req.params.id)
    .then(users => {
      res.status(200).json({ users });
    })
    .catch(error => {
      res.json(error);
    })
})

// GET /users/points/ 
// Get all users ordered by number of points

// [X] GET /users/followers/:user_id
// [X] Get all the followers of a user by user_id

// [X] GET /users/friends/:user_id
// [X] Get all the friends of a user by user_id

// GET /users/premium
// Get all paying users

router.get("/premium", (req, res) => {
  Users.findPremium()
    .then(users => {
      res.status(200.({ users }))
    })
    .catch(error => {
      res.json(error);
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
    // console.log(user);
    // console.log(response);

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
                updateLists(params);
              } else {
                res.status(404).json({ message: "User not found." });
              }
            })
            .catch(error => {
              console.log("error: ", error);
              res.status(500).json({ message: "The user information could not be modified." });
            });
        } else {
          // No user found
          Users.insertMegaUser(new_user)
            .then(user => {
              res.status(201).json(user);
            })
            .catch(error => {
              console.log("error: ", error);
              res.status(500).json({ message: "There was an error while saving the user to the database" });
            });
        }
      })
      .catch(error => {
        console.log("error: ", error);
        res.status(500).json({
          message: "There was an error while saving the user to the database"
        });
      });

    if (!error) {
      console.log(error);
    }
  });
});

// Inserts the user's lists into the lists table
function updateLists(params) {
  client.get("lists/list", params, function (error, lists, response) {

    console.log("lists: ", lists);

    // For every list the user has, add it to the DB.
    lists.map(list => {

      let new_list = {
        "twitter_list_id": list.id_str,
        "list_name": list.name,
        "list_creation_date": list.created_at,
        "member_count": list.member_count,
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
      }

      Users.insertMegaUserList(new_list)
        .then(list => {
          // res.status(201).json(user);
        })
        .catch(error => {
          console.log("error: ", error);
          res.status(500).json({
            message: "There was an error while saving the list to the database"
          });
        })
      if (!error) {
        console.log(error);
      }


    })



  })
};

// axios
// .get(`https://api.twitter.com/1.1/users/show.json?screen_name=${twitter_handle}`, headers)
// .then(res => {
//   console.log(res.data);
// })
// .catch(err => {
//   console.log(err);
// });

// Users.insert(userInfo)
//   .then(users => {
//     if (!userInfo.username) {
//       res
//         .status(422)
//         .json({ message: "Please provide the name of the player." });
//     } else {
//       res.status(201).json(users);
//     }
//   })
//   .catch(error => {
//     res.status(500).json({
//       message: "There was an error while saving the user to the database"
//     });
//   });


// POST /users/
// Add a new user

// [X] POST /users/tweets/:twitter_handle
// [X] Add all a users tweets to the tweets table

// [X] POST /users/followers -
// [X] All all a users followers to the twitter_followers table

/////////////////////////////////////////////////////////////////////
//////////////////////PUT////////////////////////////////////////////

// PUT /users/:user_id
// Edit a user by user_id

/////////////////////////////////////////////////////////////////////
//////////////////////DELETE/////////////////////////////////////////

// DELETE /users/:user_id
// Delete a user by user_ID

router.delete('/:user_id', async (req, res) => {
  try {
    const user = await Users.deleteUser(req.params.id);
    if (user) {
      res.status(200).json({ message: 'User has been deleted' })
    } else {
      res.status(404).json({ error: 'User cannot be found' })
    }
  } catch (error) {
    //console.log(error);
    res.status(500).json({
      error,
      message: 'Error removing user'
    })
  }
})

module.exports = router;