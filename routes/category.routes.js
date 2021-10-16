const express = require("express");
const router = express.Router();
const categoryControllers = require("../controllers/category.controller");
const auth = require("../middleware/auth");

router.get("/", auth, categoryControllers.allCategories);
router.get("/sample-data", auth, categoryControllers.addSampleData);

module.exports = router;
