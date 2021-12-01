const express = require("express");
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('personal-page', {layout: 'other'});
})

module.exports = router;