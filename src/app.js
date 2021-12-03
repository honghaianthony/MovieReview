const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const hbs  = require('express-handlebars');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

const initializePassport = require('./config/passport').initialize;


// DB sync
const db = require('./models/index');


// Router
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// Configures and sync models to the database
db.sequelize.sync();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine(
  "hbs",
  hbs({
    extname: ".hbs",
    helpers: {
      ifeq: function(arg1, arg2, options) {
        return arg1 == arg2 ? options.fn(this) : options.inverse(this);
      },
    },
  })
);
app.set('view engine', 'hbs');


app.use(
  morgan(
    ':method :url :status :remote-addr - :remote-user [:date[iso]]',
    {
      skip: function (req, res) {
        return req.url.indexOf('/images') == 0 
      }
    }
  )
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))

// Auth
initializePassport(passport);
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  if(req.isAuthenticated()) {
    res.locals.user = req.user;
    // res.locals.user = {
    //   id: req.user.id,
    //   username: req.user.username,
    //   fullName: req.user.fullName,
    //   avatar: req.user.avatar,
    // };
  } else {
    res.locals.user = null;
  }
  next();
});

app.use(indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
