module.exports = (sequelize, Sequelize) => {
  class Post extends Sequelize.Model {
    static associate(models) {
      Post.belongsTo(models.User, { foreignKey: "userId" });
    }
  }

  Post.init(
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
      modelName: "Post",
      timestamps: true,
    }
  );

  return Post;
};
