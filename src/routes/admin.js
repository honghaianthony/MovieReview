const express = require("express");
const router = express.Router();
const adminController = require("../controllers/AdminController");

const passportAuth = require("../config/passport");

router.use(passportAuth.checkAdmin);

router.get("/review-movie", function (req, res, next) {
  res.render("review-movie-admin", { layout: "admin" });
});

router.get("/famous-actor-list", adminController.getInforActor);
router.post("/famous-actor-list/:id", adminController.deleteSelectedActor);

router.get("/famous-actor", function (req, res, next) {
  res.render("famous-actor-admin", { layout: "admin" });
});
router.post("/famous-actor", adminController.CreateActorPost);

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
router.get("/CTV-management", adminController.getCTVForm);
router.post("/CTV-management/:id", adminController.deleteCTVRequest);

module.exports = router;
