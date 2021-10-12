const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user.controller");
const auth = require("../middleware/auth");

router.post("/", userControllers.register);
router.post("/login", userControllers.login);
router.get("/me", auth, userControllers.currentUser);
router.get("/logout", auth, userControllers.logout);
router.get("/logoutall", auth, userControllers.logoutAll);

module.exports = router;
