const express = require("express");
const router = express.Router();

router.get("/review-movie", function (req, res, next) {
    res.render("review-movie-admin", { layout: "admin" });
});
router.get("/famous-actor", function (req, res, next) {
    res.render("famous-actor-admin", { layout: "admin" });
});

router.get("/review-famous-movie", function (req, res, next) {
    res.render("review-famous-admin", { layout: "admin" });
});

router.get("/review-another-movie", function (req, res, next) {
    res.render("another-film-admin", { layout: "admin" });
});
router.get("/user-management", function (req, res, next) {
    res.render("user-mannagement-admin", { layout: "admin" });
});
router.get("/admin-management", function (req, res, next) {
    res.render("admin-mannagement-admin", { layout: "admin" });
});
router.get("/CTV-management", function (req, res, next) {
    res.render("CTV-mannagement-admin", { layout: "admin" });
});

module.exports = router;
