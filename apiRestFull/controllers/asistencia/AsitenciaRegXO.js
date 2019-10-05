'use strict'
var AsistenciaMdl = require('../../models/asistencias.model');

async function registrarAsistenciaXO (req,res){
  var est_id = req.params.id;
  var fecha = new Date(new Date().getFullYear() +'-'+ new Date().getMonth() +'-' +new Date().getDate());
  var hora = new Date();
  //buscar por fecha
  try{
    var asistEst= await AsistenciaMdl.find({estudiante:est_id, fecha:ISODate(fecha)});
    var asist_id = asistEst._id;

    switch (hora.getHours) {
      case '07':
        asistEst.entrada = new Date();
        asistEst.resumen.reporte = "P";
        await AsistenciaMdl.findOneAndUpdate({_id:asist_id}, asistEst);
        res.status(200).send('OK'); 
        
        break;
        
        case '08':
          asistEst.entrada = new Date();
          if(hora.getMinutes <= '05'){
            asistEst.resumen.reporte = "P" ;   
            await AsistenciaMdl.findOneAndUpdate({_id:asist_id}, asistEst);
            res.status(200).send('OK'); 
          }
          else if(hora.getMinutes >='06' && hora.getMinutes <='30'){
            asistEst.resumen.reporte = "T"; 
            await AsistenciaMdl.findOneAndUpdate({_id:asist_id}, asistEst);
            res.status(200).send('OK-T'); 
          }
          else{
            res.status(200).send('Psic.');
          }
          break;
          
        case '13':
          asistEst.almuerzo.entrada = new Date();
          if(hora.getMinutes <= '50'){
            asistEst.almuerzo.estado = "P" ;
            await AsistenciaMdl.findOneAndUpdate({_id:asist_id}, asistEst);
            res.status(200).send('OK');
          }
          else{
            await AsistenciaMdl.findOneAndUpdate({_id:asist_id}, asistEst);
            asistEst.almuerzo.estado ="T" ;  
            res.status(200).send('OK-T');
          }
        break;
      case '14':
        asistEst.almuerzo.entrada = new Date();
        if(hora.getMinutes <= '20'){
          asistEst.almuerzo.estado ="T" ;
          await AsistenciaMdl.findOneAndUpdate({_id:asist_id}, asistEst);
          res.status(200).send('OK-T') ;
        }
        else{
          res.status(200).send('Psic.');
        }
        break;
      case '16':
        asistEst.salida = new date();
        res.status(200).send('OK');

      default:
        res.status(200).send('X');
        break;
    }
       
  }catch(err){
    res.status(200).send('X');
    console.log("error en la base de datos");
  }
}

module.exports = {
  registrarAsistenciaXO
}