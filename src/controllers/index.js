//viết các logic chính
const models = require("../models");

module.exports = {
  getIndexInfor: async function (req, res, next) {
    let mainFilms = [];
    let otherFilms = [];
    // let actor = [];
    const movie = await models.Movie.findAll({
      limit: 4,
    });
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
      mainFilms.push({
        id: "film" + item.id,
        name: item.name,
        description: item.description,
        rating: item.rating,
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
      otherFilms: otherFilms,
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
