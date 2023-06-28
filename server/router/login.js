const express = require("express");
const router = express.Router();
const LoginController = require("../controller/login.js");
const loginController = new LoginController();

router.get("/", loginController.getLoginPage.bind(loginController));

router.post("/", loginController.submitLogin.bind(loginController));

module.exports = router;
