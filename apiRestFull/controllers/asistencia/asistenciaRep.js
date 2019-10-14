'use strict'

AsistenciaMdl  = require('../../models/asistencias.model');

async  function reportFaltaDia(req, res){
  var faltas =await AsistenciaMdl.find({'resumen.reporte':'F'});
  res.status(200).send(faltas);
  //console.log(faltas);

}

//generar el reporte general del dia
async function reporteDiaGeneral(req, res){
  var fecha = new Date(new Date().getFullYear() +'-'+ (new Date().getMonth()+1) +'-' + new Date().getDate());
  //var reporte = "demo";
  var reporte = await AsistenciaMdl.aggregate([{$match:{}},{$group:{_id:"$fecha, $rep", count:{$sum:1}}}]);
  console.log(reporte);
  res.send(reporte);
}
//general el reporte por seccion del dia
async function reporteDiaSeccion(){

}

module.exports ={
  reportFaltaDia,
  reporteDiaGeneral, reporteDiaSeccion
}