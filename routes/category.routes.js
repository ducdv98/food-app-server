const express = require("express");
const router = express.Router();
const categoryControllers = require("../controllers/category.controller");
const auth = require("../middleware/auth");

router.get("/", categoryControllers.allCategories);
router.get("/sample-data", categoryControllers.addSampleData);

module.exports = router;
