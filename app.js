require("dotenv").config();
require("./config/database").connect();

const express = require("express");
var cors = require("cors");

var corsOptions = {
  origin: "http://localhost:4001",
  optionsSuccessStatus: 200,
};

var userRoutes = require("./routes/user.routes");

const app = express();

app.use(cors(corsOptions));

app.use(express.json());

app.use("/v1/users", userRoutes);

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
