const express = require("express");
const router = express.Router();
const Search = require("../controller/search.js");
const utils = require("../utils/verifyToken");
const search = new Search();

router.get("/", utils.verifyToken, search.search.bind(search));

module.exports = router;
