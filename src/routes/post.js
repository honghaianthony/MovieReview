const express = require("express");
const router = express.Router();

const passportAuth = require('../config/passport');

const postController = require("../controllers/PostController");

router.post("/post", passportAuth.checkAdmin, postController.postInfo);

router.get("/post", passportAuth.checkAdmin, postController.getPostInterface);

router.get("/post/:id", passportAuth.checkAdmin, postController.getEditPost);
router.put("/post/:id", passportAuth.checkAdmin, postController.editPost);

module.exports = router;
