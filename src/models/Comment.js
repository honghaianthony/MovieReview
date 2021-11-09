module.exports = (sequelize, Sequelize) => {
    class Comment extends Sequelize.Model {
        static associate(models) {
            Comment.belongsTo(models.User, {
                foreignKey: "userId",
            });
            Comment.belongsTo(models.Review, {
                foreignKey: "reviewId",
            });
        }
    }

    Comment.init(
        {
            reviewId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            context: {
                type: Sequelize.TEXT,
            },
        },
        {
            sequelize,
            modelName: "Comment",
            timestamps: true,
        }
    );

    return Comment;
};