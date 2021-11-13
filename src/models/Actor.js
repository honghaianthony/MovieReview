module.exports = (sequelize, Sequelize) => {
  class Actor extends Sequelize.Model {
    static associate(models) {
      Actor.belongsToMany(models.User, {
        through: "CommentActor",
        foreignKey: "actorId",
      });
      Actor.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }

  Actor.init(
    {
      userId: {
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        // allowNull: false
      },
      title: {
        type: Sequelize.TEXT,
        // allowNull: false
      },
      content: {
        type: Sequelize.TEXT,
        // allowNull: false
      },
      rate: {
        type: Sequelize.DOUBLE,
        // allowNull: false
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
