module.exports = (sequelize, Sequelize) => {
  class Genre extends Sequelize.Model {
    static associate(models) {
      Genre.belongsToMany(models.Movie, { through: "GenreMovie" });
    }
  }

  Genre.init(
    {
      type: {
        type: Sequelize.STRING,
      },
    },
    {
      sequelize,
      modelName: "Genre",
      timestamps: false,
    }
  );

  return Genre;
};
