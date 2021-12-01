module.exports = (sequelize, Sequelize) => {
  class Review extends Sequelize.Model {
    static associate(models) {
      Review.hasMany(models.Comment, { foreignKey: "reviewId" });
      Review.belongsToMany(models.User, {
        through: "Rate",
        foreignKey: "reviewId",
      });
      Review.belongsTo(models.Movie, { foreignKey: "movieId" });
    }
  }

  Review.init(
    {
      content: {
        type: Sequelize.TEXT,
      },
      rate: {
        type: Sequelize.DOUBLE,
      },
      image: {
        type: Sequelize.STRING(255),
      },
    },
    {
      sequelize,
      modelName: "Review",
      timestamps: true,
    }
  );

  return Review;
};
