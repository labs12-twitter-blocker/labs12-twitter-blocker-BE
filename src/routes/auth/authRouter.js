const router = require("express").Router();
const passport = require("passport");
require('dotenv').config();




const authCheck = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: "user has not been authenticated"
    });
  } else {
    next();
  }
};

// if it's already login, send the profile response,
// otherwise, send a 401 response that the user is not authenticated
// authCheck before navigating to home page
router.get("/", authCheck, (req, res) => {
  res.status(200).json({
    authenticated: true,
    message: "user successfully authenticated",
    user: req.user,
    cookies: req.cookies
  });
});



// when login is successful, retrieve user info
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies
    });
  }
});

// when login failed, send failed msg
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate."
  });
});

// When logout, redirect to client
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.FRONT_END_URL);
});

// auth with twitter
// router.get("/twitter", passport.authenticate("twitter"));

// // redirect to home page after successfully login via twitter
// router.get(
//   "/twitter/redirect",
//   passport.authenticate("twitter", {
//     successRedirect: process.env.FRONT_END_URL,
//     failureRedirect: "/auth/login/failed"
//   })
// );

router.get('/twitter/login', passport.authenticate('twitter'));

router.get(
  '/twitter/callback',
  passport.authenticate('twitter', {
    failureRedirect: "/auth/login/failed"
  }),
  function (req, res) {
    res.redirect(process.env.FRONT_END_URL);
  }
);


module.exports = router;