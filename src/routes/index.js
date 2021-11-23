const express = require("express");
const router = express.Router();

const userRouter = require("./users");

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});

router.get("/login", function (req, res, next) {
    res.render("login", { layout: "other" });
});

router.get("/review-detail-squid-game", function (req, res, next) {
    res.render("review-detail");
});

router.get("/film-review", function (req, res, next) { 
    res.render("film-review",{ 
        films:[ 
            { 
                img:"images/sky-tuour.jpg", 
                filmname:"Cô gái đến từ hư vôc", 
                rate:"7.6/10", 
                kind:"Kinh dị" 
            }, 
            { 
                img:"images/sky-tuour.jpg", 
                filmname:"Thiên tài bất hảo - Bad Genius", 
                rate:"7.6/10", 
                kind:"Giật gân" 
            }, 
            { 
                img:"images/sky-tuour.jpg", 
                filmname:"Nhiệm vụ giải cứu - Extraction", 
                rate:"6.7/10", 
                kind:"Hành động" 
            }, 
            { 
                img:"images/sky-tuour.jpg", 
                filmname:"Skytour Movie - Sơn Tùng M-TP", 
                rate:"9/10", 
                kind:"Phim tài liệu, ca nhạc" 
            }, 
            { 
                img:"images/sky-tuour.jpg", 
                filmname:"Điệp viên 007 - Skyfall", 
                rate:"7.8/10", 
                kind:"Hành động" 
            }, 
            { 
                img:"images/sky-tuour.jpg", 
                filmname:"Cruella", 
                rate:"7.4/10", 
                kind:"Phiêu lưu, hài hước" 
            }, 
            { 
                img:"images/sky-tuour.jpg", 
                filmname:"Lồng chim - Bird Box", 
                rate:"7.6/10", 
                kind:"Phiêu lưu, viễn tưởng" 
            }, 
            { 
                img:"images/sky-tuour.jpg", 
                filmname:"Loki - Thần lừa lọc", 
                rate:"8.3/10", 
                kind:"Viễn tưởng" 
            } 
        ] 
    }); 
}); 

router.get("/aboutus", function (req, res, next) {
    res.render("aboutus");
});
router.get("/personal-page", function (req, res, next) {
    res.render("personal-page",{ layout: "other" });
});

router.use("/user", userRouter);

module.exports = router;
