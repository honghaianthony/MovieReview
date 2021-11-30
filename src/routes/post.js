const express = require("express");
const router = express.Router();

const postController = require("../controllers/PostController");

router.post("/post", postController.postInfo);

router.get("/post", postController.getPostInterface);

module.exports = router;
