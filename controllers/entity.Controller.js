const entityModel = require("../models/entity.model");

class entityController {
  async index(req, res) {
    try {
        const entities = await entityModel.findOne({ rnc: req.params.rnc });
        return res.status(200).send({ code: 200, data: entities });
    } catch (e) {
      return res.status(400).send({ code: 400, data: e });
    }
  }
}

module.exports = new entityController();
