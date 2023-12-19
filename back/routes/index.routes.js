const express = require("express");
const router = express.Router();
const logRoutes = require("./log.routes");

router.use("/auth", logRoutes);

module.exports = router;