const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors());


const db = require('./data/db')

app.get('/', (req, res) => {
    db('twitter_users')
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({error: 'The users information could not be retrieved.'})
    })
})


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`\n** server up on port ${port} **\n`)) 
