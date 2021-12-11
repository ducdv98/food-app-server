const express = require("express");
const router = express.Router();
const orderControllers = require("../controllers/order.controller");
const auth = require("../middleware/auth");

router.get("/", auth.verifyToken, orderControllers.getUserOrders);
router.post("/create", auth.verifyToken, orderControllers.createOrderFromCart);
router.get("/latest/deli-info", auth.verifyToken, orderControllers.getLatestDeliveryInfo);
router.post("/reorder", auth.verifyToken, orderControllers.reorder);
router.get("/:id", auth.verifyToken, orderControllers.getUserOrderById);

module.exports = router;
