// Add this to the very top of the first file loaded in your app
// Add this to the very top of the first file loaded in your app
const Sentry = require("@sentry/node");
const { nodeProfilingIntegration } = require("@sentry/profiling-node");

Sentry.init({
  dsn: "https://6a8c611818bc48a561442d2a51a1f2b9@o4504673550991360.ingest.us.sentry.io/4507498253254656",
  integrations: [nodeProfilingIntegration()],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions

  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});

// var apm = require("elastic-apm-node").start({
//   serviceName: "nodejs-test-app",
//   secretToken: "Kab78MgB0L4yl9N6Dx",
//   serverUrl:
//     "https://69e74d51ba0c48bd90b982d0b6cb0393.apm.us-central1.gcp.cloud.es.io:443",
//   environment: "my-environment",
// });

// Sentry.setupExpressErrorHandler(app);

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var init = require("@elastic/apm-rum");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

apm.captureError("another error");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

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
