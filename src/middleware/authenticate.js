const jwt = require('jsonwebtoken');
require('dotenv').config()


const secret = process.env.SESSION_SECRET;
module.exports = function (req, res, next) {
  const token = req.get('Authorization');

  if (token) {
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        res.status(401).json({ error: error });
      }
      {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({ error: 'No token provided.' });
  }
};
