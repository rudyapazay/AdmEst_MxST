AsistenciaMdl  = require('../../models/asistencias.model');
EstudianteMdl = require('../../models/estudiante.model');

//generar el reporte por seccion del dia
async function reporteEntradaSeccion(req, res){
  var fecha = new Date(new Date().getFullYear() +'-'+ (new Date().getMonth()+1) +'-' + new Date().getDate());
  var year  =new Date().getFullYear() ;
  var grado=req.params.grado;
  var seccion = req.params.seccion;
  var report ;
  switch (grado) {
    case 'primero':
      report = await AsistenciaMdl.aggregate([
        {$match:{"fecha":fecha }},
        {$lookup:{from:"estudiantes",localField:"estudiante", foreignField:"_id", as:"estudiante"}},
        {$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$estudiante", 0 ] }, "$$ROOT" ] } }},
        {$match: {"referencia.primero.year":year.toString(), "referencia.primero.seccion":seccion}},
        {$project:{"estudiante":0, "QRCode":0, "documentos":0}},
        {$sort:{"apellidos":+1, "nombre":+1}}
      ]);        
      break;
    case 'segundo':
        report = await AsistenciaMdl.aggregate([
          {$match:{"fecha":fecha }},
          {$lookup:{from:"estudiantes",localField:"estudiante", foreignField:"_id", as:"estudiante"}},
          {$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$estudiante", 0 ] }, "$$ROOT" ] } }},
          {$match: {"referencia.segundo.year":year.toString(), "referencia.segundo.seccion":seccion}},
          {$project:{"estudiante":0, "QRCode":0, "documentos":0}},
          {$sort:{"apellidos":+1, "nombre":+1}}
        ]);
      break;
    case 'tercero':
        report = await AsistenciaMdl.aggregate([
          {$match:{"fecha":fecha }},
          {$lookup:{from:"estudiantes",localField:"estudiante", foreignField:"_id", as:"estudiante"}},
          {$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$estudiante", 0 ] }, "$$ROOT" ] } }},
          {$match: {"referencia.tercero.year":year.toString(), "referencia.tercero.seccion":seccion}},
          {$project:{"estudiante":0, "QRCode":0, "documentos":0}},
          {$sort:{"apellidos":+1, "nombre":+1}}
        ]);
        break;
    case 'cuarto':
        report = await AsistenciaMdl.aggregate([
          {$match:{"fecha":fecha }},
          {$lookup:{from:"estudiantes",localField:"estudiante", foreignField:"_id", as:"estudiante"}},
          {$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$estudiante", 0 ] }, "$$ROOT" ] } }},
          {$match: {"referencia.cuarto.year":year.toString(), "referencia.cuarto.seccion":seccion}},
          {$project:{"estudiante":0, "QRCode":0, "documentos":0}},
          {$sort:{"apellidos":+1, "nombre":+1}}
        ]);
        break;
    case 'quinto':
        report = await AsistenciaMdl.aggregate([
          {$match:{"fecha":fecha }},
          {$lookup:{from:"estudiantes",localField:"estudiante", foreignField:"_id", as:"estudiante"}},
          {$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$estudiante", 0 ] }, "$$ROOT" ] } }},
          {$match: {"referencia.quinto.year":year.toString(), "referencia.quinto.seccion":seccion}},
          {$project:{"estudiante":0, "QRCode":0, "documentos":0}},
          {$sort:{"apellidos":+1, "nombre":+1}}
        ]);
    default:
      break;
  }
  
  res.status(200).send(report);

}

//asistencia de almuerzo del dia
async function reporteAlmuerzoSeccion(){

}

module.exports={
  reporteEntradaSeccion,
  reporteAlmuerzoSeccion
}