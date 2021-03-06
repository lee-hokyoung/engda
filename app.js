const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const writeRouter = require("./routes/write");
const tutorRouter = require("./routes/tutors");
const communityRouter = require("./routes/community");
const mailRouter = require("./routes/mail");

const app = express();

const connect = require("./model");
connect();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/assets", express.static(path.join(__dirname, "public/assets"), { maxAge: "30d" }));
app.use("/public_img", express.static(path.join(__dirname, "public/images"), { maxAge: "30d" }));
app.use("/public_js", express.static(path.join(__dirname, "public/javascripts")));
app.use("/public_css", express.static(path.join(__dirname, "public/stylesheets")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/write", writeRouter);
app.use("/tutors", tutorRouter);
app.use("/community", communityRouter);
app.use("/mail", mailRouter);

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
