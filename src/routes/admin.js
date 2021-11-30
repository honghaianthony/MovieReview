const express = require("express");
const router = express.Router();

router.get("/review-movie-admin", function (req, res, next) {
  res.render("review-movie-admin", { layout: "admin" });
});
router.get("/famous-actor-admin", function (req, res, next) {
  res.render("famous-actor-admin", { layout: "admin" });
});

router.get("/admin-review-famous-movie", function (req, res, next) {
  res.render("review-famous-admin.hbs", { layout: "admin" });
});

router.get("/admin-review-another-movie", function (req, res, next) {
  res.render("another-film-admin.hbs", { layout: "admin" });
});
router.get("/user-mannagement", function (req, res, next) {
  res.render("user-mannagement-admin.hbs", { layout: "admin" });
});
router.get("/admin-mannagement", function (req, res, next) {
  res.render("admin-mannagement-admin.hbs", { layout: "admin" });
});
router.get("/CTV-mannagement", function (req, res, next) {
  res.render("CTV-mannagement-admin.hbs", { layout: "admin" });
});

module.exports = router;