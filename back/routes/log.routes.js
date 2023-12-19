const express = require("express");
const router = express.Router();
const userController = require("../controller/log.controller");

router.post("/admin", userController.loginAdminAction);
router.post("/login", userController.loginAction);

module.exports = router;