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
  getCTVForm: async function (req, res, next) {
    try {
      const form = await models.CTV.findAll({ raw: true });
      res.render("CTV-mannagement-admin", { layout: "admin", data: form });
    } catch (error) {
      res.status(500);
      res.render("error", { message: "Something went wrong!", layout: false });
    }
  },
  deleteCTVRequest: async function (req, res, next) {
    const {id} = req.params;
    try {
      await models.CTV.destroy({where: {id}});
    } catch (error) {
      res.status(500);
      res.render("error", { message: "Something went wrong!", layout: false });
    }
  },
};
