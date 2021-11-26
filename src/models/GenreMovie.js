module.exports = (sequelize, Sequelize) => {
  class GenreMovie extends Sequelize.Model {
    static associate(models) {}
  }

  GenreMovie.init(
    {},
    {
      sequelize,
      modelName: "GenreMovie",
      timestamps: true,
    }
  );

  return GenreMovie;
};
