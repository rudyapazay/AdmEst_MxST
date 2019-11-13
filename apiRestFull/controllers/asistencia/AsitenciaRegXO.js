'use strict'
var AsistenciaMdl = require('../../models/asistencias.model');

async function registrarAsistenciaXO (req,res){
  var est_id = req.params.id;
  var fecha = new Date(new Date().getFullYear() +'-'+ (new Date().getMonth()+1) +'-' + (new Date().getDate()+1));
  fecha.setHours('00');
  var hora = new Date();
  //buscar por fecha
  try{
    var asistEst= await AsistenciaMdl.findOne({estudiante:est_id, fecha:fecha});
    var asist_id = asistEst._id;
    //console.log(hora.getHours());
    //console.log(hora.getMinutes());
    switch (hora.getHours()) {
      case 7:
        asistEst.entrada = new Date();
        asistEst.resumen.reporte = "P";
        await AsistenciaMdl.findOneAndUpdate({_id:asist_id}, asistEst);
        res.status(200).send('OK'); 
        
        break;
        
      case 8:
          asistEst.entrada = new Date();
          if(hora.getMinutes() <= 5){
            asistEst.resumen.reporte = "P" ;   
            await AsistenciaMdl.findOneAndUpdate({_id:asist_id}, asistEst);
            res.status(200).send('OK'); 
          }
          else if(hora.getMinutes() >= 6 && hora.getMinutes() <= 30){
            asistEst.resumen.reporte = "T"; 
            await AsistenciaMdl.findOneAndUpdate({_id:asist_id}, asistEst);
            res.status(200).send('OK-T'); 
          }
          else{
            res.status(200).send('Psic.');
          }
          break;
          
      case 13:
          asistEst.almuerzo.entrada = new Date();
          
            asistEst.almuerzo.estado = "P" ;
            await AsistenciaMdl.findOneAndUpdate({_id:asist_id}, asistEst);
            res.status(200).send('OK');
          
        break;

      case 14:
        asistEst.almuerzo.entrada = new Date();
        if(hora.getMinutes() <= 5){
          asistEst.almuerzo.estado ="P" ;
          await AsistenciaMdl.findOneAndUpdate({_id:asist_id}, asistEst);
          res.status(200).send('OK') ;
        }
	else if(hora.getMinutes() >= 6 && hora.getMinutes() <= 30){
            asistEst.almuerzo.estado = "T";  
            await AsistenciaMdl.findOneAndUpdate({_id:asist_id}, asistEst);
            res.status(200).send('OK-T');
          }

        else{
          res.status(200).send('Psic.');
        }
        break;

      case 16:
        asistEst.salida = new Date();
        
        var asistStored = await AsistenciaMdl.findOneAndUpdate({_id:asist_id}, asistEst);
        console.log(asistStored);
        res.status(200).send('OK');
        
        break ;

      default:
        res.status(200).send('X');
        break;
    }
       
  }catch(err){
    res.status(500).send('ERROR');
    console.log("error en la base de datos");
  }
}

module.exports = {
  registrarAsistenciaXO
}