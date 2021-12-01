module.exports = (sequelize, Sequelize) => {
  class Actor extends Sequelize.Model {
    static associate(models) {
      Actor.belongsToMany(models.User, {
        through: "CommentActor",
        foreignKey: "actorId",
      });
    }
  }

  Actor.init(
    {
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      title: {
        type: Sequelize.TEXT,
      },
      content: {
        type: Sequelize.TEXT,
      },
      rate: {
        type: Sequelize.DOUBLE,
      },
      img: {
        type: Sequelize.STRING(255),
      },
    },
    {
      sequelize,
      modelName: "Actor",
      timestamps: false,
    }
  );
  return Actor;
};
