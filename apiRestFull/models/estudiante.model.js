'use string'

var mongoose= require('mongoose');

var Schema = mongoose.Schema;

var EstudianteSchema = Schema({
    dni:String,
    nombre:String,
    apellidos:String,
    estudios:[],
    familia: {type:Schema.ObjectId, ref:'Familia'}
});

module.export = mongoose.Schema('Estudiante', EstudianteSchema);

