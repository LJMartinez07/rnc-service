const entityModel = require("../../models/entity.model");
const { PaginationParameters } = require('mongoose-paginate-v2');
class entityController {
  async index(req, res) {
    try {

       const entities = await entityModel.paginate(...new PaginationParameters(req).get())
        

    
       return res.status(200).send({code: 200, data: entities})
       
    } catch (e) {
      return res.status(400).send({ code: 400, data: e });
    }
  }

  async show(req, res){
    try{
        const entity = await entityModel.findOne({ rnc: req.params.rnc });

        if(entity){
          return res.status(200).send({ code: 200, data: entity });
        }
        return res.status(404).send({ code: 404, message: "RNC no encontrado" });

    }catch(e){
        return res.status(400).send({ code: 400, data: e });
    }
  }
}

module.exports = new entityController();
