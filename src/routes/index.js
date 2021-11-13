const express = require("express");
const router = express.Router();

const userRouter = require("./users");

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});

router.get("/login", function (req, res, next) {
    res.render("login", { layout: "other" });
});

router.get("/review-detail-squid-game", function (req, res, next) {
    res.render("review-detail");
});

router.use("/user", userRouter);

module.exports = router;
