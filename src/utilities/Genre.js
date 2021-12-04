const models = require('../models');

module.exports = {
    getStringGenre: async function (movieId) {
        let sql = `select genres.type 
                    from genremovies, genres
                    where genremovies.genreId = genres.id
                        and genremovies.movieId = :id`;
        const genre = await models.sequelize.query(sql, {
          replacements: {
            id: movieId,
          },
          type: models.Sequelize.QueryTypes.SELECT,
        });
        const genreArr = genre.map((i) => {
          return i.type;
        });
        const stringGenre = genreArr.join(" - ");
        return stringGenre;
    }
}