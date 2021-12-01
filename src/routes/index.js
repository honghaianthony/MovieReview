const express = require("express");
const router = express.Router();

const userRouter = require("./users");
const adminRouter = require("./admin");
const authRouter = require("./auth");
const filmRouter = require("./film");
const driveRouter = require("./drive");
const postRouter = require("./post");
const personalRouter = require('./personal');

const indexController = require("../controllers/index");

/* GET home page. */

router.use(authRouter);
router.use(postRouter);
router.use("/film-review", filmRouter);
router.use("/admin", adminRouter);
router.use("/upload", driveRouter);
router.use("/personal-page", personalRouter);


router.get("/", indexController.getIndexInfor);
router.post('/', indexController.formUpload);
router.get("/aboutus", function (req, res, next) {
    res.render("aboutus");
});

// router.get("/review-detail-squid-game", function (req, res, next) {
//     res.render("review-detail");
// });
module.exports = router;
