const router = require('express').Router();
const authRouter = require('./auth');
const listRouter = require('./lists/listsRouter')

router.use('/auth', authRouter);
router.use('/lists', listRouter)

router.get('/', (req, res) => {
  res.send('Hello World!');
});
router.get('/welcome', (req, res) => {
  res.send('You are logged in');
});


module.exports = router;
