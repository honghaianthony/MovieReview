module.exports = (sequelize, Sequelize) => {
  class Comment extends Sequelize.Model {
    static associate(models) {}
  }

  Comment.init(
    {
      creatAt: {
        type: Sequelize.DATE,
      },
      updateAt: {
        type: Sequelize.DATE,
      },
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
