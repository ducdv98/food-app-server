require("dotenv").config();
require("./config/database").connect();

const express = require("express");
const bodyParser = require("body-parser");

var authRouter = require("./routes/auth.routes");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());

app.use("/auth", authRouter);

app.use(function (req, res, next) {
  res.status(err.status || 404).json({
    message: "No such route exists",
  });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    message: "Unknown error",
  });
});

module.exports = app;
