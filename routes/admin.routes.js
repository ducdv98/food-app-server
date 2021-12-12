const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/admin.controller");
const auth = require("../middleware/auth");

router.post("/orders/update", [auth.verifyToken, auth.onlyForAdmin], adminControllers.updateOrderStatus);
router.get("/orders", [auth.verifyToken, auth.onlyForAdmin], adminControllers.getOrders);
router.get("/orders/:id", [auth.verifyToken, auth.onlyForAdmin], adminControllers.getOrderById);


router.get("/statistics", [auth.verifyToken, auth.onlyForAdmin], adminControllers.getStatistics);

router.post("/categories/create", [auth.verifyToken, auth.onlyForAdmin], adminControllers.createCategory);
router.post("/categories/update", [auth.verifyToken, auth.onlyForAdmin], adminControllers.updateCategory);
router.post("/dishes/create", [auth.verifyToken, auth.onlyForAdmin], adminControllers.createDish);
router.post("/dishes/update", [auth.verifyToken, auth.onlyForAdmin], adminControllers.updateDish);

module.exports = router;
