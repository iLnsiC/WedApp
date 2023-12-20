const express = require("express");
const router = express.Router();
const logRoutes = require("./log.routes");
const tableRoutes = require("./table.routes");
const usersRoutes = require("./user.routes");

router.use("/auth", logRoutes);
router.use("/admin/table", tableRoutes);
router.use("/admin/user", usersRoutes);

module.exports = router;