// Load eng vriables as soon as possible
require("dotenv-flow").config();
console.log("Envs:", process.env);

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
global.sequelize = require("./src/database/connection");
const indexRouter = require("./routes/index");
const apiRouters = require("./routes/api");
const errorHandler = require("./helpers/errorHandler");

const cors = require("cors");

const passport = require("passport");
require("./src/passport/index")(passport);

const app = express();
app.use(cors());
app.use(passport.initialize());
// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api", apiRouters);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(errorHandler);

module.exports = app;
