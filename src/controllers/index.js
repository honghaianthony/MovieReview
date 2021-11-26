//viết các logic chính
const models = require("../models");

module.exports = {
  getIndexInfor: async function (req, res, next) {
    let mainFilms = [];
    let otherFilms = [];
    let actor = [];
    const movie = await models.Movie.findAll({
      limit: 4,
    });
    movie.forEach(async (item) => {
      let genres = [];
      const genre = await models.Movie.findAll({
        where: {
          id: item.id,
        },
        include: {
          model: models.Genre,
        },
      });
      genre[0]["Genres"].forEach((e) => {
        genres.push(e.type);
      });
      mainFilms.push({
        name: item.name,
        description: item.description,
        rating: item.rating,
        releaseYear: item.releaseYear,
        poster: item.poster,
        genre: genres.join(", ").toString(),
      });
    });

    const otherMovies = await models.Movie.findAll({
      offset: 4,
      limit: 5,
    });
    otherMovies.forEach((item) => {
      otherFilms.push({
        name: item.name,
        releaseYear: item.releaseYear,
        poster: item.poster,
      });
    });

    const actorList = await models.Actor.findAll({
      limit: 4,
    });
    actorList.forEach((item) => {
      actor.push({
        name: item.name,
        description: item.description,
        img: item.img,
      });
    });

    res.render("index", {
      mainFilms: mainFilms,
      otherFilms: otherFilms,
      actor: actor,
    });
  },
};
