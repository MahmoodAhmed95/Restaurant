var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// Method over ride for the add and delete.
var methodOverride = require("method-override");
// save the session id to the current user.
var session = require("express-session");
//flash message
const flash = require("express-flash");
//
// passport for the authentication
var passport = require("passport");
//
// .env configration
require("dotenv").config();
// connect to the database with AFTER the config vars are processed
require("./config/database");
// passport configration
require("./config/passport");

var usersRouter = require("./routes/users");
var indexRouter = require("./routes/indexes");
var aboutRouter = require("./routes/abouts");
// var blog_singleRouter = require("./routes/blog_singles");
// var blogRouter = require("./routes/blogs");
// var recipesRouter = require("./routes/recipes");
var categoriesRouter = require("./routes/categories");
var restaurantsRouter = require("./routes/restaurants");

var app = express();

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static(path.join(__dirname, "public")));
// use method override
app.use(methodOverride("_method"));
// session use to save the uninitialized
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
// Configure flash middleware
app.use(flash());
//
app.use(passport.initialize());
app.use(passport.session());

// Add this middleware BELOW passport middleware
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});
//
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/about", aboutRouter);
// app.use("/blog_single", blog_singleRouter);
// app.use("/blog", blogRouter);
// app.use("/recipes", recipesRouter);
app.use("/categories", categoriesRouter);
app.use("/restaurants", restaurantsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
