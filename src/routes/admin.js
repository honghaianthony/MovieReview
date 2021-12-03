const express = require("express");
const router = express.Router();
const adminController = require("../controllers/AdminController");

const passportAuth = require("../config/passport");

router.use(passportAuth.checkAdmin);

router.get("/review-movie", adminController.getMovieList);
router.post("/review-movie", adminController.deleteSelectedMovie);

router.get("/famous-actor-list", adminController.getInforActor);
router.post("/famous-actor-list", adminController.deleteSelectedActor);

router.get("/famous-actor", function (req, res, next) {
  res.render("famous-actor-admin", { layout: "admin" });
});
router.post("/famous-actor", adminController.CreateActorPost);

router.get("/review-famous-movie", function (req, res, next) {
  res.render("review-famous-admin", { layout: "admin" });
});
router.post("/review-famous-movie", adminController.CreateMovie);

router.get("/review-another-movie", adminController.getReviewList);
router.post("/review-another-movie", adminController.deleteSelectedReview);

router.get("/user-management", function (req, res, next) {
  res.render("user-mannagement-admin", { layout: "admin" });
});
router.get("/admin-management", function (req, res, next) {
  res.render("admin-mannagement-admin", { layout: "admin" });
});
router.get("/CTV-management", adminController.getCTVForm);
router.post("/CTV-management/:id", adminController.deleteCTVRequest);

module.exports = router;
