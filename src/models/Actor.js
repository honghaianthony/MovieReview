module.exports = (sequelize, Sequelize) => {
    class Actor extends Sequelize.Model {
        /*static associate(models) {
            Actor.hasMany(models.Comment, {
                foreignKey : 'actorId',
            });
          
        }
        */
    }

    Actor.init(
        {
            name: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            descriptionText: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            titleText: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            contentText: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            rate: {
                type: Sequelize.DOUBLE,
                allowNull: false
            },
            img: {
                type: Sequelize.STRING(255),
            },
        },
        {
            sequelize,
            modelName: 'Actor',
            timestamps: false
        }

    );
    return Actor;
};