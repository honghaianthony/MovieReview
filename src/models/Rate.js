module.exports = (sequelize, Sequelize) => {
    class Rate extends Sequelize.Model {
        static associate(models) {
            Rate.belongsTo(models.User, {
                foreignKey: 'userId',
            });
            Rate.belongsTo(models.Review, {
                foreignKey: 'reviewId',
            });
        }
    }

    Rate.init(
        {
            userId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
            reviewId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
            rate: {
                type: Sequelize.INTEGER,
            },
            
        },
        {
            sequelize,
            modelName: 'Rate',
            timestamps: false,
        },
    );

    return Rate;
};