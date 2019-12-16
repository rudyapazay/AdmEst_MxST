'use strict'

AsistenciaMdl  = require('../../models/asistencias.model');
EstudianteMdl = require('../../models/estudiante.model');

async  function reportFaltaDia(req, res){
  var faltas =await AsistenciaMdl.find({'resumen.reporte':'F'});
  res.status(200).send(faltas);
  //console.log(faltas);

}

//generar el resumen general del dia
async function resumenEntradaGeneral(req,res){
  var fecha = new Date(new Date().getFullYear() +'-'+ (new Date().getMonth()+1) +'-' + (new Date().getDate()+1));
  fecha.setHours('00');
  try{
    var resumen = await AsistenciaMdl.aggregate([{$match:{"fecha":fecha}},{$group:{ "_id":"$resumen.reporte" , "total":{$sum:1}}}]);
    res.status(200).send(resumen);
  }catch(err){
    res.status(500).send({message:"Error en la base de datos"});
  }
}
//generar el reporte general del dia
async function reporteEntradaGeneral(req, res){
  var fecha = new Date(new Date().getFullYear() +'-'+ (new Date().getMonth()+1) +'-' + (new Date().getDate()+1));
  fecha.setHours('00');
  var year  =new Date().getFullYear() ;

  var prePrimero = await AsistenciaMdl.aggregate([
    {$match:{"fecha":fecha}},
    {$lookup:{from:"estudiantes",localField:"estudiante", foreignField:"_id", as:"estudiante" }},
    {$match: {"estudiante.referencia.primero.year":year.toString(), "estudiante.estado":"activo"}},
    {$group: {"_id": {"seccion": "$estudiante.referencia.primero.seccion", "asistencia": "$resumen.reporte"}, "total":{$sum:1}}},
    {$sort:{"_id.seccion":+1}}
  ]);

  var preSegundo = await AsistenciaMdl.aggregate([
    {$match:{"fecha":fecha}},
    {$lookup:{from:"estudiantes",localField:"estudiante", foreignField:"_id", as:"estudiante" }},
    {$match: {"estudiante.referencia.segundo.year":year.toString(), "estudiante.estado":"activo"}},
    {$group: {"_id": {"seccion": "$estudiante.referencia.segundo.seccion", "asistencia": "$resumen.reporte"}, "total":{$sum:1}}},
    {$sort:{"_id.seccion":+1}}
  ]);

  var preTercero = await AsistenciaMdl.aggregate([
    {$match:{"fecha":fecha}},
    {$lookup:{from:"estudiantes",localField:"estudiante", foreignField:"_id", as:"estudiante" }},
    {$match: {"estudiante.referencia.tercero.year":year.toString(), "estudiante.estado":"activo"}},
    {$group: {"_id": {"seccion": "$estudiante.referencia.tercero.seccion", "asistencia": "$resumen.reporte"}, "total":{$sum:1}}},
    {$sort:{"_id.seccion":+1}}
  ]);

  var preCuarto = await AsistenciaMdl.aggregate([
    {$match:{"fecha":fecha}},
    {$lookup:{from:"estudiantes",localField:"estudiante", foreignField:"_id", as:"estudiante" }},
    {$match: {"estudiante.referencia.cuarto.year":year.toString(),"estudiante.estado":"activo"}},
    {$group: {"_id": {"seccion": "$estudiante.referencia.cuarto.seccion", "asistencia": "$resumen.reporte"}, "total":{$sum:1}}},
    {$sort:{"_id.seccion":+1}}
  ]);

  var preQuinto = await AsistenciaMdl.aggregate([
    {$match:{"fecha":fecha}},
    {$lookup:{from:"estudiantes",localField:"estudiante", foreignField:"_id", as:"estudiante" }},
    {$match: {"estudiante.referencia.quinto.year":year.toString(), "estudiante.estado":"activo"}},
    {$group: {"_id": {"seccion": "$estudiante.referencia.quinto.seccion", "asistencia": "$resumen.reporte"}, "total":{$sum:1}}},
    {$sort:{"_id.seccion":+1}}
  ]);


  var primero  = await gradoProc(prePrimero);
  var segundo = await gradoProc(preSegundo);
  var tercero = await gradoProc(preTercero);
  var cuarto = await gradoProc(preCuarto);
  var quinto = await gradoProc(preQuinto);
  var reporte  = '['+primero+','+segundo+','+tercero+','+cuarto+','+quinto+']';
  res.send(reporte);
  
}

async function gradoProc(grado){
  

  var ii  ="{", jj ="}",  cc = ",";
  var a , b, c, d, e, f, g ,h ;
  var pp = '"puntual":"0"'
  var tt ='"tarde":"0"';
  var ff = '"falta":"0"'
  var ee ='"evasion":"0"';
  var ll = '"licencia":"0"';
  //console.log(grado);

  grado.forEach(clase => {
    switch (clase._id.seccion[0]) {
      case "A":
          switch (clase._id.asistencia) {
            case "P":
              pp = '"puntual":"'+clase.total+'"';
              break;
            case "T": 
              tt = '"tarde":"'+clase.total+'"'; 
              break;
            case "F":
              ff = '"falta":"'+clase.total+'"';
              break;
            case "E":
              ee = '"evasion":"'+clase.total+'"';
              break;
            case "L":
              ll = '"licencia":"'+clase.total+'"';
            default:
              break;
          }
          a =ii+pp+cc+tt+cc+ff+cc+ee+cc+ll+jj;
        break;
        case "B":
            switch (clase._id.asistencia) {
              case "P":
                pp = '"puntual":"'+clase.total+'"';
                break;
              case "T": 
                tt = '"tarde":"'+clase.total+'"'; 
                break;
              case "F":
                ff = '"falta":"'+clase.total+'"';
                break;
              case "E":
                ee = '"evasion":"'+clase.total+'"';
                break;
              case "L":
                ll = '"licencia":"'+clase.total+'"';
              default:
                break;
            }
            b =ii+pp+cc+tt+cc+ff+cc+ee+cc+ll+jj;
          break;
          case "C":
              switch (clase._id.asistencia) {
                case "P":
                  pp = '"puntual":"'+clase.total+'"';
                  break;
                case "T": 
                  tt = '"tarde":"'+clase.total+'"'; 
                  break;
                case "F":
                  ff = '"falta":"'+clase.total+'"';
                  break;
                case "E":
                  ee = '"evasion":"'+clase.total+'"';
                    break;
                case "L":
                  ll = '"licencia":"'+clase.total+'"';
                default:
                  break;
              }
            c =ii+pp+cc+tt+cc+ff+cc+ee+cc+ll+jj;
          break;
          case "D":
              switch (clase._id.asistencia) {
                case "P":
                  pp = '"puntual":"'+clase.total+'"';
                  break;
                case "T": 
                  tt = '"tarde":"'+clase.total+'"'; 
                  break;
                case "F":
                  ff = '"falta":"'+clase.total+'"';
                  break;
                case "E":
                  ee = '"evasion":"'+clase.total+'"';
                    break;
                case "L":
                  ll = '"licencia":"'+clase.total+'"';
                default:
                  break;
              }
            d =ii+pp+cc+tt+cc+ff+cc+ee+cc+ll+jj;
          break;
          case "E":
              switch (clase._id.asistencia) {
                case "P":
                  pp = '"puntual":"'+clase.total+'"';
                  break;
                case "T": 
                  tt = '"tarde":"'+clase.total+'"'; 
                  break;
                case "F":
                  ff = '"falta":"'+clase.total+'"';
                  break;
                case "E":
                  ee = '"evasion":"'+clase.total+'"';
                    break;
                case "L":
                  ll = '"licencia":"'+clase.total+'"';
                default:
                  break;
              }
            e =ii+pp+cc+tt+cc+ff+cc+ee+cc+ll+jj;
          break;
          case "F":
              switch (clase._id.asistencia) {
                case "P":
                  pp = '"puntual":"'+clase.total+'"';
                  break;
                case "T": 
                  tt = '"tarde":"'+clase.total+'"'; 
                  break;
                case "F":
                  ff = '"falta":"'+clase.total+'"';
                  break;
                case "E":
                  ee = '"evasion":"'+clase.total+'"';
                    break;
                case "L":
                  ll = '"licencia":"'+clase.total+'"';
                default:
                  break;
              }
            f = ii+pp+cc+tt+cc+ff+cc+ee+cc+ll+jj;
          break;
          case "G":
              switch (clase._id.asistencia) {
                case "P":
                  pp = '"puntual":"'+clase.total+'"';
                  break;
                case "T": 
                  tt = '"tarde":"'+clase.total+'"'; 
                  break;
                case "F":
                  ff = '"falta":"'+clase.total+'"';
                  break;
                case "E":
                  ee = '"evasion":"'+clase.total+'"';
                    break;
                case "L":
                  ll = '"licencia":"'+clase.total+'"';
                default:
                  break;
              }
            g = ii+pp+cc+tt+cc+ff+cc+ee+cc+ll+jj;
          break;
          case "H":
              switch (clase._id.asistencia) {
                case "P":
                  pp = '"puntual":"'+clase.total+'"';
                  break;
                case "T": 
                  tt = '"tarde":"'+clase.total+'"'; 
                  break;
                case "F":
                  ff = '"falta":"'+clase.total+'"';
                  break;
                case "E":
                  ee = '"evasion":"'+clase.total+'"';
                    break;
                case "L":
                  ll = '"licencia":"'+clase.total+'"';
                default:
                  break;
              }
            h = ii+pp+cc+tt+cc+ff+cc+ee+cc+ll+jj;
          break;
    
      default:
        break;
    }  
    
  });
  
  var reporte ='['+a+cc+b+cc+c+cc+d+cc+e+cc+f+cc+g+cc+h+']';
  return reporte;
}


//generar el resumen del almuerzo
async function resumenAlmuerzoGeneral(){

}

async function reporteAlmuerzoGeneral(){

}


module.exports ={
  reportFaltaDia,
  resumenEntradaGeneral, 
  resumenAlmuerzoGeneral,
  reporteEntradaGeneral, 
  reporteAlmuerzoGeneral
}