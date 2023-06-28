const express = require("express");
const router = express.Router();
const utils = require("../utils/verifyToken");
const UrlController = require("../controller/dashboard.js");
const urlController = new UrlController();

router.get("/", utils.verifyToken, urlController.dashboard.bind(urlController));
router.post(
  "/shortUrls",
  utils.verifyToken,
  urlController.addUrl.bind(urlController)
);
router.get(
  "/redirect/:shortUrl",
  utils.verifyToken,
  urlController.increase.bind(urlController)
);
module.exports = router;
