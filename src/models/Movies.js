module.exports = (sequelize, Sequelize) => {
  class Movies extends Sequelize.Model {
    static associate(models) {
      Movies.belongsToMany(models.Genres, { through: "Genres_Movies" });
    }
  }

  Movies.init(
    {
      movieId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
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
      modelName: "Movies",
      timestamps: false,
    }
  );

  return Movies;
};
