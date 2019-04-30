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
        res.status(500).json({error: 'The users information could not be retrieved.'})
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
      res.status(500).json({Error: 'The users information could not be retrieved.'})
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
      res.status(500).json({Error: 'The users information could not be retrieved.'})
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
        res.status(500).json({error: 'The users information could not be retrieved.'})
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
        res.status(500).json({error: 'The users information could not be retrieved.'})
    })
  })

// GET /lists/:list_id
// Get a Single List by List ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    if(!id){
        res.status(404).json({error: 'The user with the specified ID does not exist.'})
        return;
    }
    data.getById(id)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({error: 'The user information could not be retrieved.'})
    })
  })

// GET /lists/creator/:user_id
// Get All Lists Created by the user_ID

// GET /lists/creator/public/:user_id 
// Get All Public Lists by List Creator user_ID

// GET /lists/creator/private/:user_id 
// Get All Private Lists by List Creator user_ID

// GET /lists/creator/block/:user_id 
// Get All Block Lists by List Creator user_ID

// GET /lists/creator/cool/:user_id 
// Get All Cool Lists by List Creator user_ID

// GET /lists/subscribers/:list_id 
// Get all users subscribed to a list by list_ID

// GET /lists/points 
// Get All lists ordered by number of points

// GET /lists/timeline/:list_id 
// Gets the Twitter Timeline for the selected list_id


/////////////////////////////////////////////////////////////////////
//////////////////////POST///////////////////////////////////////////

// POST /lists/ - 
// Create a new list (Create Block/Cool List; Public/Private List)**

// POST /lists/:list_id/follow/:user_id 
// Send JSON with user_id to subscribe that user to a list by list_id**


/////////////////////////////////////////////////////////////////////
//////////////////////PUT////////////////////////////////////////////

// PUT /lists/:list_id
// Update a List by the list_id

/////////////////////////////////////////////////////////////////////
//////////////////////DELETE/////////////////////////////////////////

// DELETE /lists/:list_id 
// Delete a list by the list_id

// DELETE /lists/:list_id/unfollow/:user_id 
// Unfollow a list by list_id and user_id



module.exports = router;