const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const auth = require("../middleware/auth");

router.post("/add", auth, userController.addAction);
router.post("/send-invitation", auth, userController.sendInvitation);
router.put("/:id", auth, userController.editAction);
router.delete("/:id", auth, userController.deleteAction);

router.get("/list", userController.userListAction);
router.get("/is-auth", auth, userController.isAuthAction);
router.get("/:id", userController.getOneAction);

module.exports = router;