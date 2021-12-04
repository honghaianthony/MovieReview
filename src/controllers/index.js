//viết các logic chính
const models = require("../models");
const { getStringGenre } = require('../utilities/Genre');

module.exports = {
  getIndexInfor: async function (req, res, next) {
    let mainFilms = [];
    // let actor = [];
    const movie = await models.Movie.findAll({
      limit: 4,
    });
    for (let i = 0; i < movie.length; i++) {
      let genres = await getStringGenre(movie[i].id);
      const review = await models.Review.findOne({where: {movieId: movie[i].id}});
      let reviewId;
      if (!review) {
        reviewId = null;
      } else {
        reviewId = review.id;
      }
      mainFilms.push({
        id: "film" + movie[i].id,
        name: movie[i].name,
        description: movie[i].description,
        rating: movie[i].rating,
        poster: movie[i].poster,
        genre: genres,
        trailer: movie[i].trailer,
        reviewId: reviewId,
      });
    }

    const otherMovies = await models.Movie.findAll({
      offset: 4,
      limit: 3,
      raw: true,
    });
    // const actorList = await models.Actor.findAll({
    //   limit: 4,
    // });
    // actorList.forEach((item) => {
    //   actor.push({
    //     name: item.name,
    //     description: item.description,
    //     img: item.img,
    //   });
    // });
    res.render("index", {
      mainFilms: mainFilms,
      otherFilms: otherMovies,
      // actor: actor,
    });
  },
  formUpload: async function (req, res, next) {
    const { fullname, email, phone, forte } = req.body;
    try {
      await models.CTV.create({
        fullname,
        email,
        phone,
        forte,
      });
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  },
};
