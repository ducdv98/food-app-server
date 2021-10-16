const express = require("express");
const router = express.Router();
const dishControllers = require("../controllers/dish.controller");
const auth = require("../middleware/auth");

router.get("/", auth, dishControllers.getDishesByCategory);
router.get("/sample-data", auth, dishControllers.addSampleData);
router.get("/:id", auth, dishControllers.getDishById);

module.exports = router;
