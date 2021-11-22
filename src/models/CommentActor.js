module.exports = (sequelize, Sequelize) => {
  class CommentActor extends Sequelize.Model {
    static associate(models) {}
  }

  CommentActor.init(
    {
      content: {
        type: Sequelize.TEXT,
      },
    },
    {
      sequelize,
      modelName: "CommentActor",
      timestamps: true,
    }
  );

  return CommentActor;
};
