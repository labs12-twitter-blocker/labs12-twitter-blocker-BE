const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors());

const userRoutes = require('./api/users');
app.use('/', userRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`\n** server up on port ${port} **\n`)) 
