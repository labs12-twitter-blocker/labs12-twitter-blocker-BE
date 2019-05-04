const express = require('express');
const serverMiddleware = require('./middleware/serverMiddleware');
const server = express();
const router = require('./routes');

const listsRouter = require("./routes/lists/listsRouter.js");
const tweetsRouter = require("./routes/tweets/tweetsRouter.js");
const usersRouter = require("./routes/users/usersRouter.js");

serverMiddleware(server);

server.use("/lists", listsRouter);
server.use("/tweets", tweetsRouter);
server.use("/users", usersRouter);
server.use('/', router);
process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.log('unhandledRejection', error);
});

module.exports = server;
