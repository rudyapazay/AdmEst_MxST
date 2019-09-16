'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;   

var FamiliaSchema = Schema({
    //el codigo se tiene que generar usando las primeras letras de los apellidos
    codigo:String,
    carpeta:String,
    
    madre:{
        dni:String,
        nombre:String,
        apellidos:String,
        celular:String,
        direccion:String,
        nota:String
    },
    padre:{
        dni:String,
        nombre:String,
        apellidos:String,
        celular:String,
        direccion:String,
        nota:String
    },
    apoderado:{
        dni:String,
        nombre:String,
        apellidos:String,
        celular:String,
        direccion:String,
        relacion:String,
        nota:String
    },
    //documentos que se tiene de los padres
    documentos:{
        folder:Boolean,
        cdnipadre:Boolean,  //opcional   
        cdnimadre:Boolean,  //opcional
        cdniapoderado:Boolean, //opcional
        djurada:Boolean
    },
    
    faena:String,

    estudiantes:[{type:Schema.ObjectId, ref:'Estudiante'}],
    direccion:String,
    observaciones:String,
    estado:String
});

module.exports = mongoose.model('Familia', FamiliaSchema);