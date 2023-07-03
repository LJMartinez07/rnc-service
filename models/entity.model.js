const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EntitySchema = new Schema({
  rnc: String,
  nombre: String,
  nombre_comercial: String,
  categoria: String,
  regimen_de_pagos: String,
  estado: String,
  actividad_economica: String,
}).plugin(require('mongoose-paginate-v2'));

module.exports = mongoose.model("entity", EntitySchema);
