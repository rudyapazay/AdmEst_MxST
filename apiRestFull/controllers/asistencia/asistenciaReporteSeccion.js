AsistenciaMdl  = require('../../models/asistencias.model');
EstudianteMdl = require('../../models/estudiante.model');

//generar el reporte por seccion del dia
async function reporteEntradaSeccion(req, res){
  var fecha = new Date(new Date().getFullYear() +'-'+ (new Date().getMonth()+1) +'-' + new Date().getDate());
  var year  =new Date().getFullYear() ;

  var primero = await AsistenciaMdl.aggregate([
    {$lookup:{from:"estudiantes",localField:"estudiante", foreignField:"_id", as:"estudiante" }},
    {$project:{"estudiante.QRCode":0}},
    {$match: {"fecha":fecha, "estudiante.referencia.primero.year":year.toString()}},
    {$sort:{"estudiante.apellidos":+1, "estudiante.nombre":+1}}
  ]);
  
  res.status(200).send(primero);

}

//asistencia de almuerzo del dia
async function reporteAlmuerzoSeccion(){

}

module.exports={
  reporteEntradaSeccion,
  reporteAlmuerzoSeccion
}