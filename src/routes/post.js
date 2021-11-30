const express = require("express");
const router = express.Router();

const postController = require("../controllers/PostController");

router.post("/post", postController.postInfo);

router.get("/post", function (req, res, next) {
    res.render("post", { layout: "main" });
});

module.exports = router;
