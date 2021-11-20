const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

/* GET users listing. */

router.get("/register", function (req, res, next) {
    res.render("register", { layout: "other"});
});

router.post("/register", userController.CreateUser);

module.exports = router;
