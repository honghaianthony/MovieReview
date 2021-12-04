const models = require("../models");
const { getStringGenre} = require ('../utilities/Genre');

module.exports = {
  getAllMovie: async function (req, res, next) {
    const result = [];
    const movie = await models.Movie.findAll();
    for(let i = 0; i < movie.length; i++) {
      const stringGenre = await getStringGenre(movie[i].id);
      const review = await models.Review.findOne({
        where: { movieId: movie[i].id },
      });
      if(review !== null) {
        result.push({
          reviewId: review.id,
          name: movie[i].name,
          poster: movie[i].poster,
          genre: stringGenre,
          rating: movie[i].rating,
          // description: movie[i].description,
          // releaseYear: movie[i].releaseYear,
          // nation: movie[i].nation,
          // length: movie[i]["length"],
        });
      }
    };
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
      const stringGenre = await getStringGenre(movie.id);
      
      const result = {
        reviewId: review.id,
        movieName: movie.name,
        nation: movie.nation,
        poster: movie.poster,
        stringGenre: stringGenre,
        length: movie["length"],
        releaseYear: movie.releaseYear,
        content: review.content,
        rate: review.rate,
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
      for (let i = 0; i < comment.length; i++) {
        comment[i].user = await models.User.findByPk(comment[i].userId, {raw: true,});
      }
      comment.reverse();

      //get rate
      let rateShow;
      if(req.user) {
        rateShow = await models.Rate.findOne({
          where: { userId: req.user.id, reviewId: id },
          attributes: ["rate"],
          raw: true,
        });
        if(rateShow == null) {
          rateShow = {rate: 0};
        }
      } else {
        rateShow = {rate: 0};
      }
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
      } catch (error) {
        res.status(500);
        res.render("error", { message: error, layout: false });
      }
    } else {
      try {
        await models.Rate.create({
          reviewId: id,
          userId: req.user.id,
          rate: rate,
        });
      } catch (error) {
        res.status(500);
        res.render("error", { message: error, layout: false });
      }
    }
    //end if found 

    //update rate of review 
    const count = await models.Rate.count({
      where: {
        reviewId: id,
      },
    });

    const rateSum = await models.Rate.sum("rate", { where: { reviewId: id } });

    const rateAvg = Math.round((rateSum / count) * 2) / 2;

    await models.Review.update({ rate: rateAvg }, { where: { id: id } });

    res.redirect('/film-review/'+ id);
  },
};
