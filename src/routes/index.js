const express = require("express");
const router = express.Router();

const userRouter = require("./users");
const adminRouter = require("./admin");
const authRouter = require("./auth");
const filmRouter = require("./film");
const driveRouter = require("./drive");
const postRouter = require("./post");

const indexController = require("../controllers/index");

/* GET home page. */
router.get("/", indexController.getIndexInfor);

router.use(authRouter);
router.use("/film-review", filmRouter);
router.use("/admin", adminRouter);
router.use("/upload", driveRouter);
router.use(postRouter);

router.get("/review-detail-squid-game", function (req, res, next) {
    res.render("review-detail");
});

router.get("/aboutus", function (req, res, next) {
    res.render("aboutus");
});
router.get("/personal-page", function (req, res, next) {
    res.render("personal-page", { layout: "other" });
});

module.exports = router;
