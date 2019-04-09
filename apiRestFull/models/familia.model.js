'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;   

var FamiliaSchema = Schema({
    //el codigo se tiene que generar usando las primeras letras de los apellidos
    codigo:String,
    nombre:String,
    direccion:String,
    observaciones:String,

    
});

module.exports = mongoose.model('Familia', FamiliaSchema);