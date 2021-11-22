const express = require("express");
const router = express.Router();
const passport = require('passport');
const passportAuth = require('../config/passport');

const userController = require("../controllers/UserController");


router.get("/login", passportAuth.checkNotAuthenticated, function (req, res, next) {
    res.render("login", { layout: "other" });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }));

router.post('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
})

router.get("/register", function (req, res, next) {
    res.render("register", { layout: "other"});
});

router.post("/register", userController.CreateUser);

module.exports = router;
