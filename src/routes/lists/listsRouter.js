const router = require('express').Router()
const data = require('./listsModel')
const axios = require('axios')
require('dotenv').config()
const User = require('../users/usersModel');
const querystring = require('querystring');
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

// ==========================TWITTER ENDPOINT========================================
// GET /lists/timeline/:list_id
// Gets the Twitter Timeline for the selected list_id

router.get('/timeline/:list_id', (req, res) => {
  const id = req.params.list_id
  const userId = req.params.user_id
  const params = { list_id: id, user_id: userId }
  // Fetch data from twitter api
  let client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.userId.token,
  access_token_secret: process.env.userId.token_secret
  })
  client.get("lists/statuses", params, function (error, response) {
    if (error) {
      res.status(400).json('The list information could not be retrieved from twitter');
    } else {
      (response => response.json(response))
      res.status(200).json(response)
    }
  });
  // res.status(400).json(error);
})



/////////////////////////////////////////////////////////////////////
//////////////////////POST///////////////////////////////////////////

// POST /lists/ -

// ==========================TWITTER ENDPOINT========================================
// POST /lists/create
// Takes in the post from the Front end
router.post('/create', async (req, res) => {

  const userInput = req.body
  // console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++USER INPUT", userInput)
  const user = userInput.original_user
  const id = userInput.user_id
  // console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++user", user)
  // console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++id", id)
  const newUser = await Users.findById(id)
  // console.log("NEW USER+++++++++++++++++++++++++++++++++", newUser);

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

      // This still needs error handling
      res.status(200).json({ message: "List Created", "response": response })
    })
  } else {
    res.status(400).json({ message: "Please enter a name for your list" })
  }
})



// ==========================TWITTER ENDPOINT========================================

/////////////////////////////////////////////////////////////////////
//////////////////////SUBSCRIBE/////////////////////////////////////////

// POST /lists/subscribers/create
// Subscribe to a list with the twitter api
// 
router.post('/subscribe', (req, res) => {

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
      client.post('/lists/subscribers/create', querystring.stringify(params), function (error, response) {

        if (error) {
          console.log(error)
        } else {
          console.log(response)
        }
      })
        // data.subscribeToList(twitterListId)
        //   .then(response => {
        //     res.status(200).json({ message: "List subscribed to successfully.", response })
        //   })
        //   .catch(err => {
        //     res.status(500).json({ error: 'There was an error subscribing to the list.', err })
        //   })
    })
})





// Unsubscribe from a list with the twitter api
// ============================== Still needs to be built ===========================================
// router.post('/subscribers/destroy', (req, res) => {

//    const id = req.params.list_id


//   console.log(params);

//   unsubscribe(params)
// })

// function unsubscribe(params) {
//   client.post('lists/subscribers/destroy', params, function (error, response) {
//     // handle errors here
//   })
// }

// Delete a user of a list with the twitter api
// POST /lists/members/destroy


// ==========================TWITTER ENDPOINT========================================
// ============================== Not functional still===========================================
// router.post('/members/destroy', (req, res) => {
//   const params = {
//     list_id: req.body.list_id,
//     user_id: req.body.user_id
//   }
//   destroyMember(params)
//   res.status(200).json("user deleted from list")
// });

// function destroyMember(params) {
//   client.post('/lists/members/destroy', params, (error, response) => {
//     if (error) {
//       console.log(error)
//     } else {
//       console.log(response)
//     }
//   })
// }



// Build endpoint to take in post from react server to pass to ds endpoint


// Create a new list (Create Block/Cool List; Public/Private List)**
router.post('/', async (req, res) => {
  const userInput = req.body
  // console.log("REQ BODY!!!!!!!!!!!!!!!!", req.body)

  const newList = {
    "list_name": req.body.name,
    "twitter_id": req.body.user_id
  }
  console.log("NEW LIST", newList)
  data.insertList(newList) // Insert the list into our DB

  console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++USER INPUT", userInput)
  const newUser = await Users.findById(userInput.user_id)
  // console.log("NEW USER+++++++++++++++++++++++++++++++++", newUser);

  let params = {
    "original_user": userInput.original_user,
    "TWITTER_ACCESS_TOKEN": newUser.token,
    "TWITTER_ACCESS_TOKEN_SECRET": newUser.token_secret,
    "search_users": userInput.search_users,
    "return_limit": 20,
    "last_level": 2,
    "no_of_results": 50
  }

  //POST req to DS server
  dsSendMembers(params, userInput)

  res.status(202).json({ message: "making that list" })
})


//POST req to DS server
function dsSendMembers(dsParams, userInput) {
  console.log("_______________DS POST STARTING____________")

  axios.post('https://us-central1-twitter-follower-blocker.cloudfunctions.net/list_rec', dsParams, {
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then(response => {
      console.log("_______________DS POST .THEN____________")

      // find list by name
      // then push list to it with /lists/create_all
      const listUsers = response.data.ranked_results
      console.log("________________________________________USER INPUT________________________________-", userInput)
      listUsersString = listUsers.toString();
      console.log("________________________________________LIST USERS STRING__________________________-", listUsersString)

      let params = { list_id: userInput.id, screen_name: listUsersString }


      Users.findById(userInput.user_id)
        .then(newUser => {

          console.log("NEW USER+++++++++++++++++++++++++++++++++", newUser);
          let client = new Twitter({
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
            access_token_key: newUser.token,
            access_token_secret: newUser.token_secret,
          })
          addMembers(params, client)

          // res.status(200).json(response.data.ranked_results)
        })

    })
}


// ==========================TWITTER ENDPOINT========================================
// Add a list of users to a list with the twitter api
// POST lists/members/create_all

// router.post('/members/create_all', (req, res) => {
//   const params = {
//     list_id: req.body.list_id,
//     screen_name: req.body.screen_name
//   }
//   addMembers(params);
//   res.status(200);
// })
// .post(`/mails/users/sendVerificationMail`, null, { params: {
//   mail,
//   firstname
// }})
// screen_name=rsarver,episod,jasoncosta,theseancook,kurrik,froginthevalley
// &list_id=23
//
// axios.get('http://example.com/', request);

function addMembers(params, clientNew) {
  console.log("________________________________________addMembers params-", params)
  console.log("________________________________________addMembers clientNew-", clientNew)

  clientNew.post('/lists/members/create_all', querystring.stringify(params), function (error, response) {
    if (error) {
      console.log("________________________________________addMembers error__________________________-", error)
      return error
    } else {
      (response => {
        console.log("________________________________________addMembers Response__________________________-", response)
        response.json(response)
      })
      // res.status(200).json(response)
    }
  })
}


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
          throw new error
        } else {
          console.log(response)
        }
      }).then(
        data.deleteTwitterList(twitterListId)
          .then(response => {
            res.status(200).json({ message: "List deleted successfully.", response })
          })
          .catch(err => {
            res.status(500).json({ error: 'There was an error deleting the list.', err })
          })
      )
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
