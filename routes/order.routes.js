const express = require("express");
const router = express.Router();
const orderControllers = require("../controllers/order.controller");
const auth = require("../middleware/auth");

router.get("/", auth, orderControllers.getUserOrders);
router.post("/create", auth, orderControllers.createOrderFromCart);

module.exports = router;
