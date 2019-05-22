'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;   

var IEducativaSchema = Schema({
    codigo:String,
    nombre:String,
    nivel:String, //inicial || primaria || secundaria
    //ubicacion de la institucion educativa
    pais:String,
    region:String,
    provincia:String,
    distrito:String,
    direccion:String,
  
    telefono:String,
    nota:String
});

module.exports = mongoose.model('IEducativa', IEducativaSchema);