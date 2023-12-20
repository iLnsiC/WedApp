const express = require("express");
const router = express.Router();
const tableController = require("../controller/table.controller");
const auth = require("../middleware/auth");

router.post("/add", auth, tableController.addAction);
router.put("/:id", auth, tableController.editAction);
router.delete("/:id", auth, tableController.deleteAction);

router.get("/list", tableController.tableListAction);
router.get("/:id", tableController.getOneAction);

module.exports = router;