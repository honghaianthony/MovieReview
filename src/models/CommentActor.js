module.exports = (sequelize, Sequelize) => {
  class CommentActor extends Sequelize.Model {
    static associate(models) {
      CommentActor.belongsTo(models.User, {
        foreignKey: "userId",
      });
      CommentActor.belongsTo(models.Actor, {
        foreignKey: "actorId",
      });
    }
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
