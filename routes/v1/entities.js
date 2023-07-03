var express = require("express");
var router = express.Router();
const entityController = require("../../controllers/v1/entity.controller");
/* GET rnc. */
router.get("/entities/:rnc", entityController.index);

module.exports = router;
