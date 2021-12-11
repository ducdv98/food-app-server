const express = require("express");
const router = express.Router();
const orderControllers = require("../controllers/order.controller");
const auth = require("../middleware/auth");

router.get("/", auth, orderControllers.getUserOrders);
router.post("/create", auth, orderControllers.createOrderFromCart);
router.get("/latest/deli-info", auth, orderControllers.getLatestDeliveryInfo);
router.post("/reorder", auth, orderControllers.reorder);
router.get("/:id", auth, orderControllers.getUserOrderById);

module.exports = router;
