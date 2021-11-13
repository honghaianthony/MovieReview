module.exports = (sequelize, Sequelize) => {
  class Review extends Sequelize.Model {
    static associate(models) {
      Review.belongsToMany(models.User, { through: "Comment" });
      Review.belongsToMany(models.User, { through: "Rate" });
      Review.belongsTo(models.Movie, {
        foreignKey: "movieId",
      });
      Review.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }

  Review.init(
    {
      movieId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      context: {
        type: Sequelize.TEXT,
      },
      rate: {
        type: Sequelize.DOUBLE,
      },
      image: {
        type: Sequelize.STRING(255),
        // allowNull: false,
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
