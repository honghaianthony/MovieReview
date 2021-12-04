const e = require("cors");
const { admin } = require("googleapis/build/src/apis/admin");
const models = require("../models");
const { Op } = require("sequelize");
const { getStringGenre } = require("../utilities/Genre");

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
      res.redirect("/admin/famous-actor-list");
    } catch (error) {
      res.status(500);
      res.render("error", { message: "Something went wrong!", layout: false });
    }
  },
  CreateMovie: async function (req, res, next) {
    const { name, poster, rating, releaseYear, type, description } = req.body;
    try {
      const getMovie = await models.Movie.create({
        name,
        poster,
        description,
        rating,
        releaseYear,
      });
      console.log(getMovie.id);
      let types = type.split(", ");
      types.forEach(async (element) => {
        const getGenre = await models.Genre.create({
          type: element,
        });
        await models.GenreMovie.create({
          movieId: getMovie.id,
          genreId: getGenre.id,
        });
      });
      res.redirect("review-famous-movie");
    } catch (error) {
      res.status(500);
      res.render("error", { message: "Something went wrong!", layout: false });
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
    const { id } = req.body;
    try {
      await models.Actor.destroy({ where: { id } });
      res.redirect("famous-actor-list");
    } catch (error) {
      res.status(500);
      res.render("error", { message: "Something went wrong!", layout: false });
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
      res.send("Xóa thành công");
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
    const { username, email } = req.body;
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
  getMovieList: async function (req, res, next) {
    try {
      let result = [];
      const movie = await models.Movie.findAll();
      movie.forEach(async (item) => {
        let genres = await getStringGenre(item.id);
        result.push({
          id: item.id,
          name: item.name,
          nation: item.nation,
          description: item.description,
          rating: item.rating,
          poster: item.poster,
          releaseYear: item.releaseYear,
          genre: genres,
        });
      });
      res.render("review-movie-admin", { layout: "admin", movie: result });
    } catch (error) {
      res.status(500);
      res.render("error", { message: "Something went wrong!", layout: false });
    }
  },
  deleteSelectedMovie: async function (req, res, next) {
    const { id } = req.body;
    try {
      await models.GenreMovie.destroy({ where: { movieId: id } });
      await models.Review.destroy({ where: { movieId: id } });
      await models.Movie.destroy({ where: { id } });
      res.redirect("review-movie");
    } catch (error) {
      res.status(500);
      res.render("error", { message: "Something went wrong!", layout: false });
    }
  },
};
