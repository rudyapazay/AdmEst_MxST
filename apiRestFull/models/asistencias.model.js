'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;   

var AsistenciaSchema = Schema({
  estudiante: {type:Schema.ObjectId, ref:'Estudiante'},
  uniforme:String, // 1 completo || 2 sin sombre || 3 incompleto || 4  sin uniforme
  fecha:Date, //fecha de registro
  entrada:Date,  // hora de entrada
  salida:Date, // hora de salida, para despues
  
  almuerzo:{
    salida: Date, // hora de salida del almuerzo
    entrada:Date,  // hora de retorno del almuerzo
    uniforme:String, // 1 completo || 2 sin sombre || 3 incompleto || 4  sin uniforme
  },
  
  estado:String, // temprano, tarde, evasion, falta, permiso
  permisoExp: String  //expediente del permiso 

});

module.exports = mongoose.model('Asistencia', AsistenciaSchema);


