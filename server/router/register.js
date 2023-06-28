const express = require("express");
const router = express.Router();

const UserController = require("../controller/register");
const userController = new UserController();

router.get("/", userController.registerPage.bind(userController));
router.post("/", userController.register.bind(userController));

module.exports = router;
