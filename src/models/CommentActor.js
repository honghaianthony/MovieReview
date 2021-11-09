module.exports = (sequelize, Sequelize) => {
    class CommentActor extends Sequelize.Model {
        static associate(models) {
            CommentActor.belongsTo(models.Actor, {
                foreignKey: "actorId",
            });
            CommentActor.belongsTo(models.User, {
                foreignKey: "userId",
            });
        }
    }

    CommentActor.init(
        {
            actorId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            content: {
                type: Sequelize.TEXT,
            }, 
        },
        {
            sequelize,
            modelName: 'CommentActor',
            timestamps: true,
        },
    );

    return CommentActor;
};