const express = require("express");
const router = express.Router();
const cartControllers = require("../controllers/cart.controller");
const auth = require("../middleware/auth");

router.get("/", auth.verifyToken, cartControllers.getCart);
router.post("/update", auth.verifyToken, cartControllers.updateCart);

module.exports = router;
