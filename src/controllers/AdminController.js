const e = require("cors");
const models = require("../models");

module.exports = {
  CreateActorPost: async function (req, res, next) {
    const { name, img, description, rate, context, title } = req.body;
    try {
      await models.Actor.create({
        name,
        img,
        description,
        rate,
        content: context,
        title,
      });

      res.redirect("famous-actor");
    } catch (error) {
      res.redirect("");
    }
  },
  CreateMovie: async function (req, res, next) {
    const { name, poster, rating, releaseYear, type, description } = req.body;
    try {
      let types = type.split(" ,");
      types.forEach(async (element) => {
        await models.Genre.create({
          type: element,
        });
      });
      await models.Movie.create({
        name,
        poster,
        description,
        rating,
        releaseYear,
      });
      //genremovie
      res.redirect("");
    } catch (error) {
      res.redirect("");
    }
  },
  getInforActor: async function (req, res, next) {
    let actorList = [];
    const actor = await models.Actor.findAll();
    actor.forEach((element) => {
      actorList.push({
        id: element.id,
        name: element.name,
        description: element.description,
        img: element.img,
      });
    });
    res.render("famous-actor-list", {
      actorList: actorList,
      layout: "admin",
    });
  },
  deleteSelectedActor: async function (req, res, next) {
    try {
      console.log(req.params);
      res.redirect("famous-actor-list");
    } catch (error) {
      res.redirect("famous-actor-list");
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
