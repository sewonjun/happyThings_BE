/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const url = process.env.DB_URL;
const allowedOriginUrl = process.env.ALLOWED_ORIGIN;

var indexRouter = require("./routes/index");

var app = express();

const corsOptions = {
  origin: [`${allowedOriginUrl}`],
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

mongoose.connect(url);

app.use("/", indexRouter);

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
