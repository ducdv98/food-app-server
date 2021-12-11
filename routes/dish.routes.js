const express = require("express");
const router = express.Router();
const dishControllers = require("../controllers/dish.controller");
const auth = require("../middleware/auth");

router.get("/", dishControllers.getDishesByCategory);
router.get("/sample-data", dishControllers.addSampleData);
router.get("/:id", dishControllers.getDishById);

module.exports = router;
