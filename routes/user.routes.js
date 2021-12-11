const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user.controller");
const auth = require("../middleware/auth");

router.post("/", userControllers.register);
router.post("/login", userControllers.login);
router.get("/me", auth.verifyToken, userControllers.currentUser);
router.post("/logout", auth.verifyToken, userControllers.logout);
router.post("/logoutall", auth.verifyToken, userControllers.logoutAll);

module.exports = router;
