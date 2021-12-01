module.exports = (sequelize, Sequelize) => {
  class CTV extends Sequelize.Model {
    static associate(models) {}
  }

  CTV.init(
    {
      fullname: {
        type: Sequelize.STRING(255),
      },
      email: {
        type: Sequelize.STRING(255),
      },
      phone: {
        type: Sequelize.STRING(255),
      },
      forte: {
        type: Sequelize.TEXT,
      },
      rate: {
        type: Sequelize.DOUBLE,
      },
    },
    {
      sequelize,
      modelName: "CTV",
      timestamps: true,
    }
  );

  return CTV;
};
