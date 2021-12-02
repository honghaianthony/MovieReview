const models = require("../models");

module.exports = {
  CreateActorPost: async function (req, res, next) {
    const { name, img, description } = req.body;
    try {
      await models.Actor.create({
        name,
        img,
        description,
      });

      res.redirect("famous-actor");
    } catch (error) {
      res.redirect("/");
    }
  },
};
