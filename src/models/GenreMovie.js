module.exports = (sequelize, Sequelize) => {
  class GenreMovie extends Sequelize.Model {
    static associate(models) {
      GenreMovie.belongsTo(models.Genre, {
        foreignKey: "genreId",
      });
      GenreMovie.belongsTo(models.Movie, {
        foreignKey: "movieId",
      });
    }
  }
  GenreMovie.init(
    {
      movieId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      genreId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      }
    },
    {
      sequelize,
      modelName: "GenreMovie",
      timestamps: false,
    }
  );

  return GenreMovie;
};
