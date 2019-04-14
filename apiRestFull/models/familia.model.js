'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;   

var FamiliaSchema = Schema({
    //el codigo se tiene que generar usando las primeras letras de los apellidos
    codigo:String,
    nombre:String,
    direccion:String,

    madre:{
        dni:String,
        nombre:String,
        apellidos:String,
        celular:String,
        direccion:String
    },
    padre:{
        dni:String,
        nombre:String,
        apellidos:String,
        celular:String
    },
    apoderado:{
        dni:String,
        nombre:String,
        apellido:String,
        celular:String,
        relacion:String
    },
    direccion:String,
    observaciones:String,
    estado:String
});

module.exports = mongoose.model('Familia', FamiliaSchema);