const express = require("express");
const router = express.Router();
const utils = require("../utils/verifyToken");

const LogoutController = require("../controller/logout");

router.post("/", utils.verifyToken, LogoutController.logout);

module.exports = router;
