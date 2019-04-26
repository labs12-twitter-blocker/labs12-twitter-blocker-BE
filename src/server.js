const express = require('express');
const serverMiddleware = require('./middleware/serverMiddleware');
const server = express();
const router = require('./routes');

serverMiddleware(server);
server.use('/', router);

module.exports = server;
