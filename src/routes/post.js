const express = require("express");
const router = express.Router();

const passportAuth = require('../config/passport');

const postController = require("../controllers/PostController");

router.post("/post", passportAuth.checkAuthenticated, postController.postInfo);

router.get("/post", passportAuth.checkAuthenticated, postController.getPostInterface);

module.exports = router;
