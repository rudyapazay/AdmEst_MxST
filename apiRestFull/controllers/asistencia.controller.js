'use strict'

var AsistenciaMdl = require("../models/asistencias.model");

// registrar asistencia de los estudiantes

function registrarAsistencia(req, res){
  var uniforme = req.params.uniforme;
  var id = req.params.id;

  res.status('200').send("registrado correctamente la asistencia del estudiant" +uniforme+ id);
}

function getAsistencias(req,res){
  AsistenciaMdl.find().limit(10).exec((err,asistencias)=>{
    if(err){
      res.status(500).send({message:"error en la peiticion"});
    }
    else{
      if(!asistencias){
        res.status(404).send({message:"No hay registro de asistencia"});
      }
      else{
        res.status(200).send({asistencias});
      }

    }
  });
}

module.exports = {
  registrarAsistencia,
  getAsistencias
}
