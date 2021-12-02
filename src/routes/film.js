const express = require("express");
const router = express.Router();

const movieController = require("../controllers/MovieController");

router.get("/", movieController.getAllMovie);
router.get("/:id", movieController.getMovieReviewById);

module.exports = router;
