EstudianteMdl = require("../../models/estudiante.model");
AsistenciaMdl = require('../../models/asistencias.model');

// administracion de asistencia
//iniciar dia
async function iniciarDia (req, res){
  try{

    var estudiantes = await EstudianteMdl.find({estado:"activo"});
    for (estudiante of estudiantes) {
      var asistencia = new AsistenciaMdl();
      asistencia.fecha= new Date(new Date().getFullYear() +'-'+ (new Date().getMonth()+1) +'-' + new Date().getDate());
      asistencia.estudiante = estudiante._id;
      asistencia.resumen.reporte = 'F' ;
      asistencia.almuerzo.estado = 'F' ;
      await asistencia.save();
    }
    res.status(200).send("Correct para " + await EstudianteMdl.count() + " estudiantes");
  }catch(err){
    console.log(err);
    res.status(500).send("Error en la BBDD");
  }
}
//finalizar dia
async function finalizarDia(req,res){

}


module.exports = {
  iniciarDia
}