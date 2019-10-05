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
    entrada:Date,  // hora de retorno del almuerzo
    estado:String, // puntual, tarde, evasion, falta, permiso
    uniforme:String, // 1 completo || 2 sin sombrero || 3 incompleto || 4  sin uniforme
  },

  permisoExp: {type:Schema.ObjectId, ref:'Permiso'},  //expediente del permiso 

  resumen:{
    siagie:String, // . Asistio, F Falta, J Falta justificada, T Tardanza, U Tardanza justificada
    reporte:String, // P Puntual, F Falta, E Evasion, T Tarde, L Licencia
    uniforme: String // // C completo || SS sin sombrero || I incompleto || SU  sin uniforme
  }
  

});

module.exports = mongoose.model('Asistencia', AsistenciaSchema);


