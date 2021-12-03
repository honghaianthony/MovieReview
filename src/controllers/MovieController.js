const models = require("../models");

module.exports = {
  getAllMovie: async function (req, res, next) {
    let result = [];
    const movie = await models.Movie.findAll();
    movie.forEach(async (item) => {
      let sql = `select genres.type 
                    from genremovies, genres
                    where genremovies.genreId = genres.id
                        and genremovies.movieId = :id`;
      const genre = await models.sequelize.query(sql, {
        replacements: {
          id: item.id,
        },
        type: models.Sequelize.QueryTypes.SELECT,
      });
      const genreArr = genre.map((i) => {
        return i.type;
      })
      const stringGenre = genreArr.join(" - ");
      const review = await models.Review.findOne({where: {movieId: item.id}})
      if(review) {
        result.push({
          reviewId: review.id,
          name: item.name,
          description: item.description,
          rating: item.rating,
          releaseYear: item.releaseYear,
          nation: item.nation,
          length: item["length"],
          poster: item.poster,
          genre: stringGenre,
        });
      }
    });

    res.render("film-review", { films: result });
  },
  getMovieReviewById: async function (req, res, next) {
    const {id} = req.params;
    const {loadMoreComment} = req.query;

    //get review
    const review = await models.Review.findByPk(id);
    if (!review) {
      res.render("review-detail", {review: null});
    } else {
      const movie = await models.Movie.findByPk(review.movieId);
      let sql = `select genres.type 
            from genremovies, genres
            where genremovies.genreId = genres.id
                and genremovies.movieId = :id`;
      const genre = await models.sequelize.query(sql, {
        replacements: {
          id: movie.id,
        },
        type: models.Sequelize.QueryTypes.SELECT,
      });
      const genreArr = genre.map((i) => {
        return i.type;
      })
      const stringGenre = genreArr.join(" - ");
      let rate;
      if (review.rate) {
        rate = review.rate;
      } else {
        rate = 0;
      }
      const result = {
        reviewId: review.id,
        movieName: movie.name,
        nation: movie.nation,
        poster: movie.poster,
        stringGenre: stringGenre,
        length: movie["length"],
        releaseYear: movie.releaseYear,
        content: review.content,
        rate: rate,
      }
      //get comment
      let limit = 10;
      if (loadMoreComment) {
        limit += (5 * loadMoreComment);
      }
      const comment = await models.Comment.findAll({
        where: {
          reviewId: review.id,
        },
        limit: limit,
        raw: true,
        order: [
          ['createdAt', 'DESC'],
        ],
      });
      comment.forEach(async i => {
        i.user = await models.User.findByPk(i.userId, {raw: true,});
      });
      comment.reverse();

      //get rate
      let rateShow;
      if(req.user) {
        rateShow = await models.Rate.findOne({
          where: { userId: req.user.id, reviewId: id },
          raw: true,
          attributes: ["rate"],
        });
      } else {
        rateShow = {rate: null};
      }
      console.log(rateShow.rate)
      res.render("review-detail", {
        data: result,
        comment: comment,
        rate: rateShow.rate,
      });
    }
  },
  rate: async function (req, res, next) {
    const { id } = req.params;
    const {rate} = req.query;
    console.log(rate);
    const found = await models.Rate.findOne({
      where: { userId: req.user.id, reviewId: id },
    });
    if(found) {
      try {
        await models.Rate.update(
          { rate: rate },
          {
            where: { userId: req.user.id, reviewId: id },
          }
        );
        res.redirect("/film-review/" + id);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await models.Rate.create({
          reviewId: id,
          userId: req.user.id,
          rate: rate,
        });
        res.redirect('/film-review/'+ id);
      } catch (error) {
        console.log(error);
      }
    }
  },
};
