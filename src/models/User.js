module.exports = (sequelize, Sequelize) => {
  class User extends Sequelize.Model {
    static associate(models) {
      User.hasMany(models.Comment, {
        foreignKey: "userId",
      });
      User.hasMany(models.CommentActor, {
        foreignKey: "userId",
      });
      User.hasMany(models.Post, {
        foreignKey: "userId",
      });
      User.belongsToMany(models.Review, {
        through: "Rate",
        foreignKey: "userId",
      });
    }
  }

  User.init(
    {
      username: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: {
          args: true,
          msg: "User with this username already exist.",
        },
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      fullName: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: {
          args: true,
          msg: "User with this email already exist.",
        },
      },
      phone: {
        type: Sequelize.STRING(255),
      },
      role: {
        type: Sequelize.INTEGER,
      },
      dateOfBirth: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      avatar: {
        type: Sequelize.STRING(255),
      },
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true,
    }
  );

  return User;
};
