const router = require('express').Router()
const data = require('./listsModel')
const axios = require('axios')
require('dotenv').config()
const Users = require('../users/usersModel');
const auth = require('../../middleware/authenticate')
const querystring = require('querystring');
const url = process.env.BACKEND_URL;
// const updateLists = require("../users/usersRouter")

let Twitter = require("twitter")
let client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  // access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  // access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})
/////////////////////////////////////////////////////////////////////
//////////////////////GET////////////////////////////////////////////

// GET /lists
// Get all lists in our db

router.get('/', (req, res) => {
  data.get()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      res.status(500).json({ error: 'The lists information could not be retrieved.' })
    })
})

// GET /lists/public
// Get All Public Lists in our db
router.get('/public', (req, res) => {
  data.getPublic()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      res.status(500).json({ Error: 'The lists information could not be retrieved.' })
    })
})

// GET /lists/private
// Get All Private Lists in our db
router.get('/private', (req, res) => {
  data.getPrivate()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      res.status(500).json({ Error: 'The lists information could not be retrieved.' })
    })
})

// GET /lists/block
// Get All Block Lists in our db
router.get('/block', (req, res) => {
  data.getBlocked()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      res.status(500).json({ error: 'The lists information could not be retrieved.' })
    })
})

// GET /lists/cool
// Get All Cool Lists in our db
router.get('/cool', (req, res) => {
  data.get()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      res.status(500).json({ error: 'The lists information could not be retrieved.' })
    })
})

// GET /lists/:twitter_list_id
// Get a Single List by twitter_list_id
router.get('/:twitter_list_id', (req, res) => {
  const id = req.params.twitter_list_id;
  if (!id) {
    res.status(404).json({ error: 'The list with the specified ID does not exist.' })
    return;
  }
  data.getById(id)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      res.status(500).json({ error: 'The list information could not be retrieved.' })
    })
})

// GET /lists/creator/:user_id
// Get All Lists Created by the user_ID

router.get('/creator/:user_id', (req, res) => {
  const id = req.params.user_id;
  if (!id) {
    res.status(404).json({ error: 'The user with the specified ID does not exist.' })
    return;
  }
  data.getByUserCreated(id)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      res.status(500).json({ error: 'The user information could not be retrieved.' })
    })
})

// GET /lists/creator/public/:user_id
// Get All Public Lists by List Creator user_ID
router.get('/creator/public/:user_id', (req, res) => {
  const id = req.params.user_id;
  if (!id) {
    res.status(404).json({ error: 'The user with the specified ID does not exist.' })
    return;
  }
  data.getPublicByUserCreated(id)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      res.status(500).json({ error: 'The user information could not be retrieved.' })
    })
})

// GET /lists/creator/private/:user_id
// Get All Private Lists by List Creator user_ID
router.get('/creator/private/:user_id', (req, res) => {
  const id = req.params.user_id;
  if (!id) {
    res.status(404).json({ error: 'The user with the specified ID does not exist.' })
    return;
  }
  data.getPrivateByUserCreated(id)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      res.status(500).json({ error: 'The user information could not be retrieved.' })
    })
})

// GET /lists/creator/block/:user_id
// Get All Block Lists by List Creator user_ID
router.get('/creator/block/:user_id', (req, res) => {
  const id = req.params.user_id;
  if (!id) {
    res.status(404).json({ error: 'The user with the specified ID does not exist.' })
    return;
  }
  data.getBlockByUserCreated(id)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      res.status(500).json({ error: 'The user information could not be retrieved.' })
    })
})


// GET /lists/creator/cool/:user_id
// Get All Cool Lists by List Creator user_ID
router.get('/creator/cool/:user_id', (req, res) => {
  const id = req.params.user_id;
  if (!id) {
    res.status(404).json({ error: 'The user with the specified ID does not exist.' })
    return;
  }
  data.getByUserCreated(id)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      res.status(500).json({ error: 'The user information could not be retrieved.' })
    })
})

// GET /lists/subscribers/:twitter_list_id
// Get all users subscribed to a list by twitter_list_ID
router.get('/subscribers/:twitter_list_id', (req, res) => {
  const id = req.params.twitter_list_id;
  if (!id) {
    res.status(404).json({ error: 'The list with the specified ID does not exist.' })
    return;
  }
  data.getSubscribers(id)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      res.status(500).json({ error: 'The list information could not be retrieved.' })
    })
})

// GET /lists/members/:twitter_list_id
// Get all members of a list and some of their info by twitter_list_ID
router.get('/members/:twitter_list_id', (req, res) => {
  const id = req.params.twitter_list_id;
  if (!id) {
    res.status(404).json({ error: 'The list with the specified ID does not exist.' })
    return;
  }
  data.getMembers(id)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      res.status(500).json({ error: 'The list members could not be retrieved.' })
    })
});

// GET /lists/points/top
// Get All lists ordered by number of points
router.get('/points/top', (req, res) => {
  data.getAllByOrder()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      res.status(500).json({ error: 'The lists information could not be retrieved.' })
    })
});
// GET /lists/points/follow
// Get Follow lists ordered by number of points
router.get('/points/follow', (req, res) => {
  data.getFollowByOrder()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      res.status(500).json({ error: 'The lists information could not be retrieved.' })
    })
});

// GET /lists/points/block
// Get Block lists ordered by number of points
router.get('/points/block', (req, res) => {
  data.getBlockByOrder()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      res.status(500).json({ error: 'The lists information could not be retrieved.' })
    })
});

/// ==========================TWITTER ENDPOINT========================================
// GET /lists/timeline/:list_id
// Gets the Twitter Timeline for the selected list_id


router.post('/timeline/:list_id', (req, res) => {
  const id = req.params.list_id
  const params = { list_id: id }
  const userId = req.body.twitter_user_id;
  // Fetch data from twitter api

  Users.findById(userId)
    .then(newUser => {
      let client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: newUser.token,
        access_token_secret: newUser.token_secret
      })

      client.get("/lists/statuses", params, function (error, response) {
        // if (error) {
        //   res.status(400).json('The list information could not be retrieved from twitter');
        // } else {
        (response => response.json(response))
        res.status(200).json(response)
        // }
      })
    })
    .catch(err => {
      res.status(500).json({ error: 'The list timeline could not be retrieved.' })
    })
  // res.status(400).json(error);
})



/////////////////////////////////////////////////////////////////////
//////////////////////POST///////////////////////////////////////////

// ==========================TWITTER ENDPOINT========================================
// POST /lists/create
// Takes in the post from the Front end
// Should create list with Twitter API
// Then it should add members to the newly created list
router.post('/create', async (req, res) => {
  let screen_name = req.body.screen_name

  const newUser = await Users.findById(req.body.user_id)
  console.log("NEW USER+++++++++++++++++++++++++++++++++", newUser);

  let client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: newUser.token,
    access_token_secret: newUser.token_secret,
  })
  if (req.body.name) {
    let params = {
      name: req.body.name,
      mode: req.body.mode,
      description: req.body.description
    }

    // Creates the list on twitter
    client.post("/lists/create", params, function (error, response) {
      console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++response from LIST CREATE", response)
      // We created the list on Twitter API, We now need to add members to it
      let memberCreateParams = {
        list_id: response.id_str,
        screen_name: screen_name
      }
      console.log("memberCreateParams+++++++++++++++++++++++++++++++++", memberCreateParams);

      setTimeout(function () {client.post('/lists/members/create_all', memberCreateParams, function (error, responseCreate) {
        if (error) {
          console.log("________________________________________addMembers error__________________________-", error)
          return error
        } else {
          console.log("________________________________________addMembers Response__________________________-", response)
          console.log("________________________________________addMembers responseCreate__________________________-", responseCreate)

          // Add the new list to our database
          updateLists(client, responseCreate)

          // Need to give the the DB add function time to add the list before we push the user to the list details page
          setTimeout(function () {res.status(200).json(responseCreate)}, 1000)

        }
      }) }, 1000)

    })

  } else {
    res.status(400).json({ message: "list broken, please try again" })
  }
})

// Inserts the user's lists into the lists table
function updateLists(twitterClient, responseCreate) {

  let new_list = {
    "twitter_list_id": responseCreate.id_str,
    "list_name": responseCreate.name,
    "list_creation_date": responseCreate.created_at,
    "member_count": responseCreate.member_count,
    "subscriber_count": responseCreate.subscriber_count,
    "public": responseCreate.mode,
    "description": responseCreate.description,
    "twitter_id": responseCreate.user.id_str,
    "list_points": 0,
    "is_block_list": false,
    "created_with_hashtag": false,
    "created_with_users": true,
    "created_with_category": false
  }
  if (responseCreate.mode != "public") {
    new_list.public = false
  };
  Users.insertMegaUserList(new_list)
    .then(list => {

      ////////////////////////////////////////////////////////
      // Also update the members of the list
      updateListMembers(twitterClient, { list_id: new_list.twitter_list_id, count: 5000 })
      ////////////////////////////////////////////////////////
    })
    .catch(error => {
      console.log("error: ", error);
      res.status(500).json({ message: "There was an error while saving the list to the database" });
    });

};

function updateListMembers(twitterClient, params) {
  console.log("****************************************************************************************updateListMembers")
  twitterClient.get("lists/members", params, function (error, members, response) {

    //There are no followers since the list is empty, so insert empty array to the DB
    const no_followers=[]
    Users.insertMegaUserListFollower(params.list_id, no_followers);


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



// ==========================TWITTER ENDPOINT========================================

/////////////////////////////////////////////////////////////////////
//////////////////////SUBSCRIBE/////////////////////////////////////////

// POST /lists/subscribers/create
// Subscribe to a list with the twitter api
//
router.post('/subscribe/:twitter_list_id/follow/:twitter_id', (req, res) => {
  // router.post('/subscribe', (req, res) => {

  const twitterListId = req.params.twitter_list_id
  const userId = req.params.twitter_id;
  if (!twitterListId || !userId) {
    res.status(404).json({ error: 'The list with the specified ID does not exist.' })
  }
  // console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++List id", twitterListId)
  // console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++User id", userId)
  let params = { list_id: twitterListId }

  Users.findById(userId)
    .then(newUser => {
      // console.log("NEW USER+++++++++++++++++++++++++++++++++", newUser);
      let client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: newUser.token,
        access_token_secret: newUser.token_secret,
      })
      client.post('/lists/subscribers/create', querystring.stringify(params), function (error, response) {

        if (error) {
          console.log(error)
        } else {
          console.log(response)
        }
      })
      res.status(200).json({ message: "Subscribed to List" })

    })
  res.status(200).json({ message: "Subscribed to List" })

})


// POST /lists/unsubscribe
// Subscribe to a list with the twitter api
//
router.post('/:twitter_list_id/unfollow/:twitter_id', (req, res) => {

  const twitterListId = req.params.twitter_list_id
  const userId = req.params.twitter_id;
  if (!twitterListId || !userId) {
    res.status(404).json({ error: 'The list with the specified ID does not exist.' })
  }
  // console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++List id", twitterListId)
  // console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++User id", userId)
  let params = { list_id: twitterListId }

  Users.findById(userId)
    .then(newUser => {
      // console.log("NEW USER+++++++++++++++++++++++++++++++++", newUser);
      let client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: newUser.token,
        access_token_secret: newUser.token_secret,
      })
      client.post('/lists/subscribers/destroy', querystring.stringify(params), function (error, response) {

        if (error) {
          console.log(error)
        } else {
          console.log(response)
        }
      })
      res.status(200).json({ message: "Unsubscribed from list" })

    })
    res.status(200).json({ message: "Unsubscribed from list" })
})

// Delete a user of a list with the twitter api
// POST /lists/members/destroy


// ==========================TWITTER ENDPOINT========================================

router.post('/members/destroy', (req, res) => {

  const twitterListId = req.body.twitter_list_id;
  const removeUserId = req.body.twitter_id;
  const ownerId = req.body.twitter_user_id
  if (!twitterListId || !removeUserId) {
    res.status(404).json({ error: 'The list or user with the specified ID does not exist.' })
  }
  console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++List id", twitterListId)
  console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++User id", removeUserId)
  let params = { list_id: twitterListId, user_id: removeUserId }

  Users.findById(ownerId)
    .then(newUser => {
      console.log("NEW USER+++++++++++++++++++++++++++++++++", newUser);
      let client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: newUser.token,
        access_token_secret: newUser.token_secret,
      })
      client.post('/lists/members/destroy', querystring.stringify(params), function (error, response) {

        if (error) {
          console.log("error", error)
        } else {
          console.log("response", response)
        }
      })
      res.status(200).json({ message: "User removed from list" })

    })
  })
  
  
  // Build endpoint to take in post from react server to pass to ds endpoint
  // 1 First we send the POST to the DS endpoint from REACT
  // 2 We wait about a minute for the response from DS and send it to REACT
  // 3 The user will choose which of the list members they want on the list in REACT
  // 4 They will then submit the list members in REACT -> POST 
  // 5 We take the input with the members, 
  // 6 We will hit the Twitter API and make a list, 
  // 7 then add members to the newly created list with the Twitter API
  // 8 Add the new list to our DB
// Create a new list (Create Block/Cool List; Public/Private List)**
router.post('/', async (req, res) => {
  const userInput = req.body
  console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++userInput", userInput)
  const newUser = await Users.findById(userInput.user_id)
  console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++newUser", newUser)

  let dsParams = {
    "original_user": userInput.original_user,
    "TWITTER_ACCESS_TOKEN": newUser.token,
    "TWITTER_ACCESS_TOKEN_SECRET": newUser.token_secret,
    "search_users": userInput.search_users,
    "return_limit": 20,
    "last_level": 2,
    "no_of_results": 50
  }
  console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++dsParams", dsParams)
  /////////////////
  //POST req to DS server
  axios.post(`${process.env.DS_URL}`, dsParams, {
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then(response => {
      console.log("_______________DS POST .THEN____________")
      console.log("_______________response.data", response.data)
      const listUsers = response.data.ranked_results
      listUsersString = listUsers.toString();


      const params = { screen_name: listUsersString }
      // Got the list of users back from DS, now need to get user objects for each one of them to send back to REACT
      let client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: newUser.token,
        access_token_secret: newUser.token_secret
      })
      client.get("users/lookup", params, function (error, response) {
        if (error) {
          res.status(400).json('The users could not be retrieved from twitter');
        } else {
          (response => response.json(response))
          res.status(200).json(response)
        }
      });

    })

})



// ==========================TWITTER ENDPOINT========================================

router.post('/blocklist', (req, res) => {
  console.log("in blocklist")
  console.log(req.body.twitter_user_id)
  Users.findById(req.body.twitter_user_id)
    .then(newUser => {
      console.log("NEW USER+++++++++++++++++++++++++++++++++", newUser);
      const params = {
        // "since_id": req.body.twitter_user_id,
        "TWITTER_ACCESS_TOKEN": newUser.token,
        "TWITTER_ACCESS_TOKEN_SECRET": newUser.token_secret,
      }
      console.log("Params+++++++++++++++++++++++++++++++++", params)
      axios.post('https://us-central1-twitter-bert-models.cloudfunctions.net/function-2', params, {
        headers: { 'Content-type': 'application/json' }
      }
      )
        .then(
          (response => {
            console.log("RESPONSE DATA+++++++++++++++++++", response.data)
            res.status(200).json(response.data)

          }))
    }).catch(err => {
      res.status(400).json({ error: err })
    })
}
)

// POST /lists/:list_id/follow/:user_id
// Send JSON with user_id to subscribe that user to a list by list_id**
router.post('/:list_id/follow/:user_id', (req, res) => {
  const listId = req.params.list_id
  const userId = req.params.user_id
  if (!userId) {
    res.status(404).json({ error: 'The user with the specified ID does not exist.' })
    return;
  }
  if (!listId) {
    res.status(404).json({ error: 'The list with the specified ID does not exist.' })
    return;
  }
  data.subscribeToList(listId, userId)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      res.status(500).json({ error: 'There was an error adding the list.' })
    })
})


/////////////////////////////////////////////////////////////////////
//////////////////////PUT////////////////////////////////////////////

// PUT /lists/:list_id
// Update a List by the list_id
router.put('/:list_id', (req, res) => {
  const listId = req.params.list_id
  const list = req.body
  if (!listId) {
    res.status(404).json({ error: 'The list with the specified ID does not exist.' })
    return;
  }
  data.updateList(listId, list)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      res.status(500).json({ error: 'There was an error updating the list.' })
    })
})

// PUT /lists/:list_members_id
// Update List members by the list_id
router.put('/:list_members_id', (req, res) => {
  const listMembersId = req.params.list_id
  const listMembers = req.body
  if (!listId) {
    res.status(404).json({ error: 'The list with the specified ID does not exist.' })
    return;
  }
  data.updateListMembers(listId, list)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      res.status(500).json({ error: 'There was an error updating the list.' })
    })
})

/////////////////////////////////////////////////////////////////////
//////////////////////DELETE/////////////////////////////////////////

// DELETE /lists/:list_id
// Delete a list by the list_id
router.delete('/', (req, res) => {
  const twitterListId = req.body.twitter_list_id
  const userId = req.body.twitter_id;
  if (!twitterListId || !userId) {
    res.status(404).json({ error: 'The list with the specified ID does not exist.' })
  }
  // console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++List id", twitterListId)
  // console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++User id", userId)
  let params = { list_id: twitterListId }

  Users.findById(userId)
    .then(newUser => {
      // console.log("NEW USER+++++++++++++++++++++++++++++++++", newUser);
      let client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: newUser.token,
        access_token_secret: newUser.token_secret,
      })
      client.post('/lists/destroy', querystring.stringify(params), function (error, response) {

        if (error) {
          console.log(error)
        } else {
          console.log(response)
        }
      })
      data.deleteTwitterList(twitterListId)
        .then(response => {
          res.status(200).json({ message: "List deleted successfully.", response })
        })
        .catch(err => {
          res.status(500).json({ error: 'There was an error deleting the list.', err })
        })

    })
})





// DELETE /lists/:list_id/unfollow/:user_id
// Unfollow a list by list_id and user_id
router.delete('/:list_id/unfollow/:user_id', (req, res) => {
  const listId = req.params.list_id
  const userId = req.params.user_id
  if (!listId) {
    res.status(404).json({ error: 'The list with the specified ID does not exist.' })
    return;
  }
  if (!userId) {
    res.status(404).json({ error: 'The user with the specified ID does not exist.' })
    return;
  }
  data.unfollowList(listId, userId)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      res.status(500).json({ error: 'There was an error un-following the list.' })
    })
})



module.exports = router;



