'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;   

var AsistenciaSchema = Schema({
  estudiante: {type:Schema.ObjectId, ref:'Estudiante'},
  
  fecha:String, //fecha de registro
  entrada:Date,  // hora de entrada
  salida:Date, // hora de salida, para despues
  uniforme:String, // 1 completo || 2 sin sombrero || 3 incompleto || 4  sin uniforme
  estado:String, // puntual, tarde, evasion, falta, permiso

  almuerzo:{
    salida: Date, // hora de salida del almuerzo
    entrada:Date,  // hora de retorno del almuerzo
    estado:String, // puntual, tarde, evasion, falta, permiso
    uniforme:String, // 1 completo || 2 sin sombrero || 3 incompleto || 4  sin uniforme
  },
  
  
  permisoExp: String  //expediente del permiso 

});

module.exports = mongoose.model('Asistencia', AsistenciaSchema);


