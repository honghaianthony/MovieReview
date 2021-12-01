module.exports = (sequelize, Sequelize) => {
  class Comment extends Sequelize.Model {
    static associate(models) {
      Comment.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Comment.belongsTo(models.Review, {
        foreignKey: "reviewId",
      });
    }
  }

  Comment.init(
    {
      content: {
        type: Sequelize.TEXT,
      },
    },
    {
      sequelize,
      modelName: "Comment",
      timestamps: true,
    }
  );

  return Comment;
};
