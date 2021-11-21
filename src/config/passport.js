const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const models = require('../models');

async function getUserById(id) {
    return await models.User.findByPk(id);
}

function initialize(passport) {
  const authenticateUser = async (username, password, done) => {
    const user = await models.User.findOne({
        where: {
            username,
        }
    })
    if (user == null) {
      return done(null, false, { message: 'Tên truy cập không tồn tại' })
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Sai mật khẩu' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ 
    usernameField: 'username',
    passwordField: 'password',
  }, authenticateUser))

  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser(async (id, done) => {
    return done(null, await getUserById(id))
  })
}

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

module.exports = {initialize, checkAuthenticated, checkNotAuthenticated};