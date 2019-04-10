'use string'

var mongoose= require('mongoose');

var Schema = mongoose.Schema;

var EstudianteSchema = Schema({
    dni:String,
    nombre:String,
    apellidos:String,
    estudios:[],
    familia: {type:Schema.ObjectId, ref:'Familia'},
    certificado:String,
    partida_nacimiento:String,
    ficha_matricula:String,
    sis:String,
    otros:String,
    observaciones
});

module.export = mongoose.Schema('Estudiante', EstudianteSchema);

