const entityModel = require("../models/entity.model");

class entityController {
  async index(req, res) {
    try {
      let entities = [];
      if (req.query.hasOwnProperty("rnc")) {
        entities = await entityModel.findOne({ rnc: req.query.rnc });
        return res.status(200).send({ code: 200, data: entities });
      } else {
        entities = await entityModel.find().limit(10);
        return res.status(200).send({ code: 200, data: entities });
      }
    } catch (e) {
      returnres.status(400).send({ code: 400, data: e });
    }
  }
}

module.exports = new entityController();
