var createError = require("http-errors");
require("dotenv").config();
var express = require("express");
var path = require("path");
const cron = require("node-cron");
const mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var entitiesRouter = require("./routes/v1/entities");
var entitiesV2Router = require("./routes/v2/entities");

var app = express();

const RNCService = require("./services/rnc.service");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/", entitiesRouter);
app.use("/api/v2/", entitiesV2Router);

const init = async () => {
  RNCService.getRncZip().then(() => {
    RNCService.extractFile().then(() => {
      RNCService.readFile();
    });
  });
}

mongoose
  .connect(process.env.MONGOLAB_BROWN_URI || `mongodb://127.0.0.1:27017/rnc`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    init()
    cron.schedule("0 1 * * *", async function () {
      try {
        init()
      } catch (e) {
        console.log(e);
      }
    });
  })
  .catch((err) => console.log(err));

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
