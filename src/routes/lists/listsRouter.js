const router = require('express').Router()
const data = require('./listsModel')
const axios = require('axios')
let Twitter = require("twitter")
let client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
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
  const params = { list_id: id }
  // Fetch data from twitter api
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

router.post('/create', (req, res) => {
  if (req.body.name) {
    let params = {
      name: req.body.name,
      mode: req.body.mode,
      description: req.body.description
    }
    // Executes the function to create the list on twitter
    createList(params);
    res.status(200).json({ message: "List Created" })
  } else {
    res.status(400).json({ message: "Please enter a name for your list" })
  }
})

// Creates the list on twitter

function createList(params) {
  client.post("/lists/create", params, function (error, response) {

    // This still needs error handling
  })
}

// ==========================TWITTER ENDPOINT========================================
// Add a list of users to a list with the twitter api
// POST lists/members/create_all

router.post('/members/create_all', (req, res) => {
  const params = {
    list_id: req.body.list_id,
    screen_name: req.body.screen_name
  }
  addMembers(params);
  res.status(200);
})

function addMembers(params) {
  client.post('/lists/members/create_all', params, function (error, response) {
    if (error) {
      return error
    } else {
      return response
    }
  })
}


// ==========================TWITTER ENDPOINT========================================

// Subscribe to a list with the twitter api
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
// Not working still for some reason. Can only get Error 204 off twitter endpoint
router.post('/members/destroy', (req, res) => {
  const params = {
    list_id: req.body.list_id,
  }
  destroyMember(params)
});

function destroyMember(params) {
  // twitter api stuff here
  client.post('/lists/members/destroy', params, function (error, response) {

  })
}


// Delete a list with the twitter api
// ==========================================STILL GETTING 204 WHEN I HIT THIS ENDPOINT ======================
router.post('/destroy/:list_id', (req, res) => {
  list_id = req.params.list_id;
  // const params = {
  //   list_id: req.body.twitter_list_id
  // }
  console.log("LIST ID", list_id);
  destroyList(list_id);
  res.status(200)
})

function destroyList(list_id) {
  client.post('/lists/destroy', list_id, function (error, response) {
    if (error) {
      console.log(error)
    } else {
      console.log(response)
    }
  })
}



// Build endpoint to take in post from react server to pass to ds endpoint


// Create a new list (Create Block/Cool List; Public/Private List)**
router.post('/', (req, res) => {
  const userInput = req.body
  const user = req.user.screen_name
  const key = client.access_token_key
  const secret = client.access_token_secret
  let params = {
    "original_user": user,
    "TWITTER_ACCESS_TOKEN": key,
    "TWITTER_ACCESS_TOKEN_SECRET": secret,
    "search_users": userInput,
    "return_limit": 20,
    "last_level": 2,
    "no_of_results": 50
  }

  //POST req to DS server
  axios.post('https://us-central1-twitter-follower-blocker.cloudfunctions.net/list_rec', params)
    .then(response => {
      res.status(200).json(response)
      const list = response.data.ranked_results
      if (!list) {
        res.status(404).json({ error: 'No lists returned.' })
      }
      data.insertList(list)
        .then(response => {
          res.status(201).json(response)
        })
        .catch(err => {
          res.status(500).json({ error: 'There was an error adding the list.' })
        })
    })
    .catch(err => {
      res.status(500).json({ error: 'There was an error creating the list.' })
    })
})


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

/////////////////////////////////////////////////////////////////////
//////////////////////DELETE/////////////////////////////////////////

// DELETE /lists/:list_id
// Delete a list by the list_id
router.delete('/:list_id', (req, res) => {
  const listId = req.params.list_id
  if (!listId) {
    res.status(404).json({ error: 'The list with the specified ID does not exist.' })
    return;
  }
  data.deleteList(listId)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      res.status(500).json({ error: 'There was an error deleting the list.' })
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
