const router = require('express').Router();
const Votes = require('./votesModel')

/////////////////////////////////////////////////////////////////////
//////////////////////GET////////////////////////////////////////////

// GET /votes/list/:twitter_list_id
// Get all Votes on a list by twitter_list_id
router.get('/list/:twitter_list_id', (req, res) => {
  const id = req.params.twitter_list_id;
  if (!id) {
    res.status(404).json({ error: 'The list with the specified ID does not exist.' })
    return;
  }
  Votes.getByListId(id)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      res.status(500).json({ error: 'The vote information could not be retrieved.' })
    })
})

// GET /votes/user/:twitter_user_id
// Get all Votes by a user by twitter_user_id
router.get('/user/:twitter_user_id', (req, res) => {
    const id = req.params.twitter_user_id;
    if (!id) {
      res.status(404).json({ error: 'The user with the specified ID does not exist.' })
      return;
    }
    Votes.getByUserId(id)
      .then(response => {
        res.status(200).json(response)
      })
      .catch(err => {
        res.status(500).json({ error: 'The vote information could not be retrieved.' })
      })
})


/////////////////////////////////////////////////////////////////////
//////////////////////POST///////////////////////////////////////////

// POST /votes/
// Upvote or Downvote a list
router.post('/', (req, res) => {
    const vote = req.body

    // First test if the user has already voted on the list
    Votes.findVote(req.body.twitter_list_id, req.body.twitter_user_id)
    .then(user => {
        console.log("user", user)
        // If we find the user has voted before, update their vote
        if (user) {
            // remove their previous vote
            Votes.removeOldListVote(req.body.twitter_list_id, user.vote)
            .then(
                // Then update the vote table
                Votes.updateListVote(req.body.twitter_list_id, req.body.vote) //increment the list vote count
                .then(
                        Votes.updateVote(req.body.twitter_user_id, vote)
                            .then(response => {
                                res.status(200).json(response)
                    })
                    .catch(err => {
                    res.status(500).json({ error: 'There was an error updating the vote.' })
                    })
                ).catch(err => {
                    res.status(500).json({ error: 'There was an error updating the vote.' })
                })
            )

        } else { // The user has not voted before
            Votes.updateListVote(req.body.twitter_list_id, req.body.vote) //increment the list vote count
                .then(
                        Votes.insertVote(vote)
                            .then(response => {
                                res.status(200).json(response)
                    })
                    .catch(err => {
                    res.status(500).json({ error: 'There was an error updating the vote.' })
                    })
                ).catch(err => {
                    res.status(500).json({ error: 'There was an error updating the vote.' })
                })
        }
    })
})


module.exports = router;