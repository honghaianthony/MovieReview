module.exports = (sequelize, Sequelize) => {
    class Reviews extends Sequelize.Model {}

    Reviews.init(
        {
            movieId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            context: {
                type: Sequelize.TEXT,
            },
            rate: {
                type: Sequelize.DOUBLE,
            },
            image: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Reviews",
            timestamps: true,
        }
    );

    return Reviews;
};
