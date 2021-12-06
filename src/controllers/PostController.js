const models = require("../models");

module.exports = {
    postInfo: async function (req, res, next) {
        const { context, movieId, rate } = req.body;
        let image = req.body.image;

        if (image.indexOf("/view?usp=sharing") !== -1) {
          const arr = image.split("/");
          image = "https://drive.google.com/uc?id=" + arr[5];
        }
        const mid = parseInt(movieId);
        try {
            await models.Review.create({
                movieId: mid,
                // rate: rate,
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
        for (let i = 0; i < movie.length; i++) {
            const review = await models.Review.findOne({where: {movieId: movie[i].id}});
            if(!review) {
                result.push({
                    id: movie[i].id,
                    name: movie[i].name,
                });
            }
        }
        res.render("post", { layout: "main", data: result});
    },
    getEditPost: async function (req, res, next) {
        const {id} = req.params;
        const review = await models.Review.findByPk(id, {raw: true});
        const movie = await models.Movie.findByPk(review.movieId, {
          raw: true,
        });

        res.render("post-edit", { layout: "main", data: review, movie: movie });
    },
    editPost: async function (req, res, next) {
        const {context, id} = req.body;
        try {
            await models.Review.update(
              { content: context },
              {
                where: {
                  id: id,
                },
              }
            );
            res.redirect("/film-review/" + id);
        } catch (error) {
            next(error);
        }
    },
};
