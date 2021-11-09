module.exports = (sequelize, Sequelize) => {
    class Comment extends Sequelize.Model {}

    Comment.init(
        {
            reviewId: {
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
        },
        {
            sequelize,
            modelName: "Comments",
            timestamps: true,
        }
    );

    return Comment;
};
