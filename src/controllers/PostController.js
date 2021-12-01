const models = require("../models");

module.exports = {
    postInfo: async function (req, res, next) {
        const { context, movieId } = req.body;
        try {
            await models.Review.create({
                movieId,
                userId: req.user.id,
                context,
            });
            res.redirect('/');
        } catch (error) {
            console.log(error);
        }
    },
    getPostInterface: async function (req, res, next) {
        const movie = await models.Movie.findAll();

        const result = []
        movie.forEach((item) => {
            result.push({
                id: item.id,
                name: item.name,
            })
        });
        res.render("post", { layout: "main", data: result});
    },
};
