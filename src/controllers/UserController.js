const models = require('../models')

module.exports = {
    CreateUser: async function (req, res, next) {
        await models.user.create(req.body);
        
        res.send("ok")
    },
}