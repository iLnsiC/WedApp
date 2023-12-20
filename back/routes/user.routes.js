const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const auth = require("../middleware/auth");

router.post("/add", auth, userController.addAction);
router.put("/:id", auth, userController.editAction);
router.delete("/:id", auth, userController.deleteAction);

router.get("/list", userController.userListAction);
router.get("/:id", userController.getOneAction);
router.get("/:skill/works", userController.getBySkill);

module.exports = router;