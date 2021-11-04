module.exports = (sequelize, Sequelize) => {
    class Rate extends Sequelize.Model {}

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
    
    Rate.associate = function (models) {
        Rate.belongsTo(models.User, {
            foreignKey: 'userId',
        });
    };

    return Rate;
};
