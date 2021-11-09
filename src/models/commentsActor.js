module.exports = (sequelize, Sequelize) => {
    class commentsActor extends Sequelize.Model {}

    commentsActor.init(
        {
            actorId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            content: {
                type: Sequelize.STRING(255)
            }, 
        },
        {
            sequelize,
            modelName: 'Comments_actor',
            timestamps: true,
            underscored: true,
        },
    );

    return Comments_actor;
};
