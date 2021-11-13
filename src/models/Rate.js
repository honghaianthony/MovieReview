module.exports = (sequelize, Sequelize) => {
  class Rate extends Sequelize.Model {
    static associate(models) {}
  }

  Rate.init(
    {
      rate: {
        type: Sequelize.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Rate",
      timestamps: false,
    }
  );

  return Rate;
};
