const e = require("cors");
const { admin } = require("googleapis/build/src/apis/admin");
const models = require("../models");

module.exports = {
  CreateActorPost: async function (req, res, next) {
    const { name, img, description, rate, context, title } = req.body;
    let image;
    if (img.indexOf("sharing")) {
      const arr = img.split("/");
      image = "https://drive.google.com/uc?id=" + arr[5];
    }
    try {
      await models.Actor.create({
        name,
        img: image,
        description,
        rate,
        content: context,
        title,
      });
      res.render("famous-actor-admin", { layout: "admin", isDone: true });
    } catch (error) {
      res.status(500);
      res.render("error", { message: "Something went wrong!", layout: false });
    }
  },
  CreateMovie: async function (req, res, next) {
    const { name, poster, rating, releaseYear, type, description } = req.body;
    try {
      const getMovie = await models.Movie.create({
        name,
        poster,
        description,
        rating,
        releaseYear,
      });
      console.log(getMovie.id);
      let types = type.split(", ");
      types.forEach(async (element) => {
        const getGenre = await models.Genre.create({
          type: element,
        });
        await models.GenreMovie.create({
          movieId: getMovie.id,
          genreId: getGenre.id,
        });
      });
      res.redirect("review-famous-movie");
    } catch (error) {
      res.status(500);
      res.render("error", { message: "Something went wrong!", layout: false });
    }
  },
  getInforActor: async function (req, res, next) {
    let actorList = [];
    const actor = await models.Actor.findAll();
    actor.forEach((element) => {
      actorList.push({
        id: element.id,
        name: element.name,
        description: element.description,
        img: element.img,
      });
    });
    res.render("famous-actor-list", {
      actorList: actorList,
      layout: "admin",
    });
  },
  deleteSelectedActor: async function (req, res, next) {
    const { id } = req.body;
    try {
      await models.Actor.destroy({ where: { id } });
      res.redirect("famous-actor-list");
    } catch (error) {
      res.status(500);
      res.render("error", { message: "Something went wrong!", layout: false });
    }
  },
  getCTVForm: async function (req, res, next) {
    try {
      const form = await models.CTV.findAll({ raw: true });
      res.render("CTV-mannagement-admin", { layout: "admin", data: form });
    } catch (error) {
      res.status(500);
      res.render("error", { message: "Something went wrong!", layout: false });
    }
  },
  deleteCTVRequest: async function (req, res, next) {
    const { id } = req.params;
    try {
      await models.CTV.destroy({ where: { id } });
    } catch (error) {
      res.status(500);
      res.render("error", { message: "Something went wrong!", layout: false });
    }
  },
  getReviewList: async function (req, res, next) {
    try {
      const reviewList = await models.Review.findAll({
        include: [{ model: models.Movie }],
        raw: true,
      });
      let result = [];
      reviewList.forEach((e) => {
        result.push({
          name: e["Movie.name"],
          id: e.id,
          content: e.content,
          rate: e.rate,
        });
      });
      res.render("another-film-admin", { layout: "admin", review: result });
    } catch (error) {
      res.status(500);
      res.render("error", { message: "Something went wrong!", layout: false });
    }
  },
  deleteSelectedReview: async function (req, res, next) {
    const { id } = req.body;
    try {
      await models.Review.destroy({ where: { id } });
      res.redirect("review-another-movie");
    } catch (error) {
      res.status(500);
      res.render("error", { message: "Something went wrong!", layout: false });
    }
  },

  getMovieList: async function (req, res, next) {
    try {
      let result = [];
      const movie = await models.Movie.findAll();
      movie.forEach(async (item) => {
        let genres = [];
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
        genre.forEach((e) => {
          genres.push(e.type);
        });
        result.push({
          id: item.id,
          name: item.name,
          nation: item.nation,
          description: item.description,
          rating: item.rating,
          poster: item.poster,
          releaseYear: item.releaseYear,
          genre: genres.join(", ").toString(),
        });
      });
      res.render("review-movie-admin", { layout: "admin", movie: result });
    } catch (error) {
      res.status(500);
      res.render("error", { message: "Something went wrong!", layout: false });
    }
  },
  deleteSelectedMovie: async function (req, res, next) {
    const { id } = req.body;
    try {
      await models.GenreMovie.destroy({ where: { movieId: id } });
      await models.Review.destroy({ where: { movieId: id } });
      await models.Movie.destroy({ where: { id } });
      res.redirect("review-movie");
    } catch (error) {
      res.status(500);
      res.render("error", { message: "Something went wrong!", layout: false });
    }
  },
};
