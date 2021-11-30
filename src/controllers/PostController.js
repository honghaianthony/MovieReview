const models = require("../models");

module.exports = {
    postInfo: async function (req, res, next) {
        const { context } = req.body;
        try {
            await models.Review.create({
                movieId: 1,
                userId: 1,
                context,
            });
        } catch (error) {
            console.log(error);
        }
    },
};
