require("dotenv").config();
require("./config/database").connect();

const express = require("express");
var cors = require("cors");

const userRoutes = require("./routes/user.routes");
const dishRoutes = require("./routes/dish.routes");
const categoryRoutes = require("./routes/category.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/order.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/dishes", dishRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/admin", adminRoutes);

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
