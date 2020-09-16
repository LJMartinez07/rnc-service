const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EntitySchema = Schema({
  rnc: String,
  nombre: String,
  nombre_comercial: String,
  categoria: String,
  regimen_de_pagos: String,
  estado: String,
  actividad_economica: String,
});

module.exports = mongoose.model("entity", EntitySchema);
