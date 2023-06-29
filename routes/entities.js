var express = require("express");
var router = express.Router();
const entityController = require("../controllers/entity.Controller");
/* GET rnc. */
router.get("/entities/:rnc", entityController.index);

module.exports = router;
