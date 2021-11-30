const models = require("../models");

module.exports = {
  getAllMovie: async function (req, res, next) {
    let result = [];
    const movie = await models.Movie.findAll();
    movie.forEach(async (item) => {
      let sql = `select genres.type 
                    from genremovie, genres
                    where genremovie.genreId = genres.id
                        and genremovie.movieId = :id`;
      const genre = await models.sequelize.query(sql, {
        replacements: {
          id: item.id,
        },
        type: models.Sequelize.QueryTypes.SELECT,
      });

      result.push({
        name: item.name,
        description: item.description,
        rating: item.rating,
        releaseYear: item.releaseYear,
        nation: item.nation,
        length: item["length"],
        poster: item.poster,
        genre: genre,
      });
    });

    res.render("film-review", { films: result });
  },
  getMovieReviewById: async function (req, res, next) {
    const {id} = req.params;
    const review = await models.Review.findByPk(id);
    if (!review) {
      res.render("review-detail", {review: null});
    } else {
      const movie = await models.Movie.findByPk(review.movieId);
      let sql = `select genres.type 
            from genremovie, genres
            where genremovie.genreId = genres.id
                and genremovie.movieId = :id`;
      const genre = await models.sequelize.query(sql, {
        replacements: {
          id: movie.id,
        },
        type: models.Sequelize.QueryTypes.SELECT,
      });

      const stringGenre = genre.join(" - ");
      const result = {
        movieName: movie.name,
        nation: movie.nation,
        poster: movie.poster,
        stringGenre: stringGenre,
        length: movie["length"],
        releaseYear: movie.releaseYear,
        content: review.context,
        
      }
      res.render("review-detail", {data: result });
    }
  }
};
