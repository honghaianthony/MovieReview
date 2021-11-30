const express = require("express");
const router = express.Router();


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
router.get("/personal-page", function (req, res, next) {
    res.render("personal-page",{layout :"other"});
});
router.get("/review-movie-admin", function (req, res, next) {
  res.render("review-movie-admin",{layout :"admin"});
});
router.get("/famous-actor-admin", function (req, res, next) {
  res.render("famous-actor-admin",{layout :"admin"});
});


module.exports = router;
