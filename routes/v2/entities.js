var express = require("express");
var router = express.Router();
const entityController = require("../../controllers/v2/entity.controller");
/* GET rnc. */
router.get("/entities", entityController.index);
router.get("/entities/:rnc", entityController.show)

module.exports = router;
