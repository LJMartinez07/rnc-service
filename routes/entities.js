var express = require("express");
var router = express.Router();
const entityController = require("../controllers/entity.Controller");
/* GET rnc. */
router.get("/entities", entityController.index);

module.exports = router;
