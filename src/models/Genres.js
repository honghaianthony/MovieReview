module.exports = (sequelize, Sequelize) => {
  class Genres extends Sequelize.Model {
    static associate(models) {
      Genres.belongsToMany(models.Movies, { through: "Genres_Movies" });
    }
  }

  Genres.init(
    {
      genreId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      type: {
        type: Sequelize.STRING,
      },
    },
    {
      sequelize,
      modelName: "Genres",
      timestamps: false,
    }
  );

  return Genres;
};
