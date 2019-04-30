const router = require('express').Router();
const data = require('./listsModel')

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
        res.status(500).json({error: 'The lists information could not be retrieved.'})
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
      res.status(500).json({Error: 'The lists information could not be retrieved.'})
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
      res.status(500).json({Error: 'The lists information could not be retrieved.'})
    })
  })

// GET /lists/block
// Get All Block Lists in our db
router.get('/block', (req, res) => {
    data.get()
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({error: 'The lists information could not be retrieved.'})
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
        res.status(500).json({error: 'The lists information could not be retrieved.'})
    })
  })

// GET /lists/:list_id
// Get a Single List by List ID
router.get('/:list_id', (req, res) => {
    const id = req.params.list_id;
    if(!id){
        res.status(404).json({error: 'The list with the specified ID does not exist.'})
        return;
    }
    data.getById(id)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({error: 'The list information could not be retrieved.'})
    })
  })

// GET /lists/creator/:user_id
// Get All Lists Created by the user_ID
router.get('/creator/:user_id', (req, res) => {
    const id = req.params.user_id;
    if(!id){
        res.status(404).json({error: 'The user with the specified ID does not exist.'})
        return;
    }
    data.getByUserCreated(id)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({error: 'The user information could not be retrieved.'})
    })
  })

// GET /lists/creator/public/:user_id 
// Get All Public Lists by List Creator user_ID
router.get('/creator/public/:user_id', (req, res) => {
    const id = req.params.user_id;
    if(!id){
        res.status(404).json({error: 'The user with the specified ID does not exist.'})
        return;
    }
    data.getPublicByUserCreated(id)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({error: 'The user information could not be retrieved.'})
    })
  })

// GET /lists/creator/private/:user_id 
// Get All Private Lists by List Creator user_ID
router.get('/creator/private/:user_id', (req, res) => {
    const id = req.params.user_id;
    if(!id){
        res.status(404).json({error: 'The user with the specified ID does not exist.'})
        return;
    }
    data.getPrivateByUserCreated(id)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({error: 'The user information could not be retrieved.'})
    })
  })

// GET /lists/creator/block/:user_id 
// Get All Block Lists by List Creator user_ID
router.get('/creator/block/:user_id', (req, res) => {
    const id = req.params.user_id;
    if(!id){
        res.status(404).json({error: 'The user with the specified ID does not exist.'})
        return;
    }
    data.getByUserCreated(id)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({error: 'The user information could not be retrieved.'})
    })
  })


// GET /lists/creator/cool/:user_id 
// Get All Cool Lists by List Creator user_ID
router.get('/creator/cool/:user_id', (req, res) => {
    const id = req.params.user_id;
    if(!id){
        res.status(404).json({error: 'The user with the specified ID does not exist.'})
        return;
    }
    data.getByUserCreated(id)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({error: 'The user information could not be retrieved.'})
    })
  })

// GET /lists/subscribers/:list_id 
// Get all users subscribed to a list by list_ID
router.get('/subscribers/:list_id', (req, res) => {
    const id = req.params.list_id;
    if(!id){
        res.status(404).json({error: 'The list with the specified ID does not exist.'})
        return;
    }
    data.getSubscribers(id)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({error: 'The list information could not be retrieved.'})
    })
  })

// GET /lists/points 
// Get All lists ordered by number of points
router.get('/points', (req, res) => {
    data.getAllByOrder()
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({error: 'The lists information could not be retrieved.'})
    })
  })

// GET /lists/timeline/:list_id 
// Gets the Twitter Timeline for the selected list_id


/////////////////////////////////////////////////////////////////////
//////////////////////POST///////////////////////////////////////////

// POST /lists/ - 
// Create a new list (Create Block/Cool List; Public/Private List)**
router.post('/', (req, res) => {
    const list = req.body
    data.insertList(list)
    //TODO check for list content
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({error: 'There was an error adding the list.'})
    })
})

// POST /lists/:list_id/follow/:user_id 
// Send JSON with user_id to subscribe that user to a list by list_id**
router.post('/:list_id/follow/:user_id', (req, res) => {
    const listId = req.params.list_id
    const userId = req.params.user_id
    if(!userId){
        res.status(404).json({error: 'The user with the specified ID does not exist.'})
        return;
    }
    if(!listId){
        res.status(404).json({error: 'The list with the specified ID does not exist.'})
        return;
    }
    data.subscribeToList(listId, userId)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({error: 'There was an error adding the list.'})
    })
})


/////////////////////////////////////////////////////////////////////
//////////////////////PUT////////////////////////////////////////////

// PUT /lists/:list_id
// Update a List by the list_id
router.put('/:list_id', (req, res) => {
    const listId = req.params.list_id
    const list = req.body
    if(!listId){
        res.status(404).json({error: 'The list with the specified ID does not exist.'})
        return;
    }
    data.updateList(listId, list)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({error: 'There was an error updating the list.'})
    })
})

/////////////////////////////////////////////////////////////////////
//////////////////////DELETE/////////////////////////////////////////

// DELETE /lists/:list_id 
// Delete a list by the list_id
router.delete('/:list_id', (req, res) => {
    const listId = req.params.list_id
    if(!listId){
        res.status(404).json({error: 'The list with the specified ID does not exist.'})
        return;
    }
    data.deleteList(listId)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({error: 'There was an error deleting the list.'})
    })
})

// DELETE /lists/:list_id/unfollow/:user_id 
// Unfollow a list by list_id and user_id
router.delete('/:list_id/unfollow/:user_id', (req, res) => {
    const listId = req.params.list_id
    const userId = req.params.user_id
    if(!listId){
        res.status(404).json({error: 'The list with the specified ID does not exist.'})
        return;
    }
    if(!userId){
        res.status(404).json({error: 'The user with the specified ID does not exist.'})
        return;
    }
    data.unfollowList(listId, userId)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({error: 'There was an error unfollowing the list.'})
    })
})



module.exports = router;