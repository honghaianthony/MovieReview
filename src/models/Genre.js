module.exports = (sequelize, Sequelize) => {
  class Genre extends Sequelize.Model {
    static associate(models) {
      Genre.hasMany(models.GenreMovie, {
        foreignKey: "genreId",
      });
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
