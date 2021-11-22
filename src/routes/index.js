const express = require("express");
const router = express.Router();
const passport = require('passport');
const passportAuth = require('../config/passport');

const userRouter = require("./users");
const authRouter = require("./auth");
const filmRouter = require('./film');

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});

router.use(authRouter);
router.use("/film-review", filmRouter); 

router.get("/review-detail-squid-game", function (req, res, next) {
    res.render("review-detail");
});


router.get("/aboutus", function (req, res, next) {
    res.render("aboutus");
});

module.exports = router;
