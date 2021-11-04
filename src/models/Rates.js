module.exports = (sequelize, Sequelize) => {
    class Rates extends Sequelize.Model {}

    Rates.init(
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
            modelName: 'Rates',
            timestamps: false,
        },
    );
    
    Rates.associate = function (models) {
        Rates.belongsTo(models.Users, {
            foreignKey: 'userId',
        });
    };

    return Rates;
};
