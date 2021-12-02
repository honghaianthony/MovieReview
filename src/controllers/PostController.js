const models = require("../models");

module.exports = {
    postInfo: async function (req, res, next) {
        const { context, movieId, rate } = req.body;
        let image = req.body.image;

        if(image.indexOf("sharing")) {
            const arr = image.split("/");
            image = "https://drive.google.com/uc?id="+ arr[5];
        }
        const mid = parseInt(movieId);
        try {
            await models.Review.create({
                movieId: mid,
                rate: rate,
                image: image,
                content: context,
            });
            res.redirect("/");
        } catch (error) {
            console.log(error);
        }
    },
    getPostInterface: async function (req, res, next) {
        const movie = await models.Movie.findAll();

        const result = [];
        movie.forEach(async (item) => {
            const review = await models.Review.findOne({where: {movieId: item.id}});
            if(!review) {
                result.push({
                    id: item.id,
                    name: item.name,
                });
            }
        });
        res.render("post", { layout: "main", data: result});
    },
};
