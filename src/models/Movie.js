module.exports = (sequelize, Sequelize) => {
  class Movie extends Sequelize.Model {
    static associate(models) {
      Movie.hasOne(models.Review, { foreignKey: "movieId" });
      Movie.hasMany(models.GenreMovie, {
        foreignKey: "movieId",
      });
    }
  }

  Movie.init(
    {
      name: {
        type: Sequelize.STRING(255),
      },
      description: {
        type: Sequelize.TEXT,
      },
      rating: {
        type: Sequelize.DOUBLE,
      },
      releaseYear: {
        type: Sequelize.INTEGER,
      },
      nation: {
        type: Sequelize.STRING,
      },
      length: {
        type: Sequelize.TIME,
      },
      poster: {
        type: Sequelize.STRING,
      },
    },
    {
      sequelize,
      modelName: "Movie",
      timestamps: false,
    }
  );

  return Movie;
};
