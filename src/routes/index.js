const express = require("express");
const router = express.Router();

const userRouter = require("./users");
const adminRouter = require("./admin");
const authRouter = require("./auth");
const filmRouter = require("./film");

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});

router.use(authRouter);
router.use("/film-review", filmRouter);
router.use('/admin',adminRouter)

router.get("/review-detail-squid-game", function (req, res, next) {
    res.render("review-detail");
});

router.get("/aboutus", function (req, res, next) {
    res.render("aboutus");
});
router.get("/personal-page", function (req, res, next) {
    res.render("personal-page", { layout: "other" });
});

router.get("/admin-review-famous-movie", function (req, res, next) {
    res.render("review-famous-admin.hbs", { layout: "admin" });
});

router.get("/admin-review-another-movie", function (req, res, next) {
    res.render("another-film-admin.hbs", { layout: "admin" });
});



module.exports = router;
