const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/admin.controller");
const auth = require("../middleware/auth");

router.get("/", [auth.verifyToken, auth.onlyForAdmin], adminControllers.testAdmin);

module.exports = router;
