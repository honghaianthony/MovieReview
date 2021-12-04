const e = require("cors");
const models = require("../models");
const { Op } = require("sequelize");

module.exports = {
  CreateActorPost: async function (req, res, next) {
    const { name, img, description, rate, context, title } = req.body;
    let image;
    if (img.indexOf("sharing")) {
      const arr = img.split("/");
      image = "https://drive.google.com/uc?id=" + arr[5];
    }
    try {
      await models.Actor.create({
        name,
        img: image,
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
    const { id } = req.params;
    try {
      await models.CTV.destroy({ where: { id } });
      res.send("Xóa thành công")
    } catch (error) {
      res.status(500);
      res.send("Lỗi!!!");
    }
  },
  getUserList: async function (req, res, next) {
    const users = await models.User.findAll({
      where: {
        role: 1,
        id: { [Op.ne]: req.user.id },
      },
      raw: true,
      attributes: { exclude: ["password"] },
    });
    res.render("user-mannagement-admin", { layout: "admin", data: users });
  },
  deleteUserById: async function (req, res, next) {
    const { id } = req.params;
    if (req.user.role !== 2) {
      res.send("Lỗi user không có quyền xóa!");
    } else {
      try {
        await models.User.destroy({ where: { id } });
        res.send("Thành công!");
      } catch (error) {
        res.send("Lỗi!!!");
      }
    }
  },
  getAdminList: async function (req, res, next) {
    const users = await models.User.findAll({
      where: { role: 2, id: { [Op.ne]: req.user.id } },
      raw: true,
      attributes: { exclude: ["password"] },
    });
    res.render("admin-mannagement-admin", { layout: "admin", data: users });
  },
  updateRole: async function (req, res, next) {
    const {username, email} = req.body;
    const user = await models.User.findOne({
      where: {
        username,
        email,
        role: 1,
      },
      raw: true,
      attributes: { exclude: ["password"] },
    });
    if (user) {
      await models.User.update(
        { role: 2 },
        {
          where: {
            username,
            email,
          },
        }
      );
    }
    res.send(user);
  },
};
