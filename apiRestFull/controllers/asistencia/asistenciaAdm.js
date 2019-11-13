EstudianteMdl = require("../../models/estudiante.model");
AsistenciaMdl = require('../../models/asistencias.model');

// administracion de asistencia
//iniciar dia
async function iniciarDia (req, res){
  try{
    var estudiantes = await EstudianteMdl.find({estado:"activo"});
    var fechaActual = new Date(new Date().getFullYear() +'-'+ (new Date().getMonth()+1) +'-' + (new Date().getDate()+1));
    fechaActual.setHours('00');
    var asistenciaTotal = await AsistenciaMdl.find({fecha:fechaActual}).limit(10);
    //console.log(fechaActual);
    //console.log(asistenciaTotal.length);
    if(asistenciaTotal.length != '0'){
      res.status(200).send({message:"Día iniciado correctamente"});
    }else{
      for (estudiante of estudiantes) {
        var asistencia = new AsistenciaMdl();
        asistencia.fecha = fechaActual;
        asistencia.estudiante = estudiante._id;
        asistencia.resumen.reporte = 'F' ;
        asistencia.almuerzo.estado = 'F' ;
        await asistencia.save();
      }
      res.status(200).send("Correct para " + await EstudianteMdl.count() + " estudiantes");
    }
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