const models = require('../models');

module.exports = {
    getStringGenre: async function (movieId) {
        let genre = [];
        const genreMv = await models.GenreMovie.findAll({where: {movieId: movieId}});
        for (let i = 0; i < genreMv.length; i++) {
          const genreType = await models.Genre.findByPk(genreMv[i].genreId);
          genre.push(genreType.type);
        }
        const stringGenre = genre.join(" - ");
        return stringGenre;
    }
}