AsistenciaMDL = require('../../models/asistencias.model');
EstudianteMDL = require('../../models/estudiante.model');

async function asistenciaEstudiante(req, res){
  let id = req.params.id;
  var asistencia = await AsistenciaMDL.find({estudiante:id}).populate({path:"estudiante",select:'-QRCode'}).sort({fecha:-1});
  res.status(200).send(asistencia);
}

async function asistenciaEstudianteDia(req,res){
  let id = req.params.id;
  let fecha = req.params.fecha;

  var asistencia = await AsistenciaMDL.find({estudiante:id, fecha:fecha});
  res.status(200).send(asistencia);
}

module.exports={
  asistenciaEstudiante,
  asistenciaEstudianteDia
}