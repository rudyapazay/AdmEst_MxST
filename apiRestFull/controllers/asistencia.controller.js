'use strict'

var AsistenciaMdl = require("../models/asistencias.model");
var EstudianteMdl = require("../models/estudiante.model");

// registrar asistencia de los estudiantes

function registrarAsistenciaEntrada(req, res){
  var uniforme = req.params.uniforme;
  var id = req.params.id;
  AsistenciaMdl.findOne({estudiante:id}).sort({_id:-1}).exec((err,asistencia)=>{
    if(err){
      res.status(500).send({message:"Error en la BBDD"});
    }else{
      if(!asistencia){
        res.status(404).send({message:"Sin inicio de los registros"});
      }else{
        if(asistencia.entrada){
          res.status(200).send("Existe registro anterior");
        }
        else{
          var hora = new Date();
          asistencia.entrada = hora;
          if(hora.getHours()<'08' || ( hora.getHours()=='08' && hora.getMinutes()<='20'))
            asistencia.estado = 'temprano';
          else 
            asistencia.estado = 'tarde';

          switch (uniforme) {
            case '1':
              asistencia.uniforme='completo';
              break;
            case '2':
              asistencia.uniforme = 'sin sombrero';
              break;
            case '3': 
              asistencia.uniforme= 'incompleto';
              break;
            case '4':
              asistencia.uniforme='sin uniforme';
              break;
          }
          console.log('registro de asistencuia de: -> '+asistencia.estudiante);
          
          AsistenciaMdl.findOneAndUpdate({_id:asistencia._id},asistencia,(err,asistenciaStrored)=>{
            if(err){
              res.status(500).send({message:"Error en la BBDD"});
            }else{
              if(!asistencia){
                res.status(404).send({message:"Sin inicio de los registros"});
              }else{
                res.status(200).send("Se registro correctamente");
              }
            }
          });
        }    
      }
    }
  });

}

function registrarAsistenciaAlmuerzo(req,res){
  var id = req.params.id;
  AsistenciaMdl.findOne({estudiante:id}).sort({_id:-1}).exec((err,asistencia)=>{
    if(err){
      res.status(500).send({message:"Error en la BBDD"});
    }else{
      if(!asistencia){
        res.status(404).send({message:"Sin inicio de los registros"});
      }else{
        var hora = new Date();
        asistencia.almuerzo.salida = hora;
        asistencia.almuerzo.estado = 'evasion';
        AsistenciaMdl.findOneAndUpdate({_id:asistencia._id},asistencia,(err,asistenciaStrored)=>{
          if(err){
            res.status(500).send({message:"Error en la BBDD"});
          }else{
            if(!asistencia){
              res.status(404).send({message:"Sin inicio de los registros"});
            }else{
              res.status(200).send("Se registro correctamente");
            }
          }
        });

      }
    }
  });
}

function  registrarAsistenciaRetorno(req,res){
  var uniforme = req.params.uniforme;
  var id = req.params.id;
  AsistenciaMdl.findOne({estudiante:id}).sort({_id:-1}).exec((err,asistencia)=>{
    if(err){
      res.status(500).send({message:"Error en la BBDD"});
    }else{
      if(!asistencia){
        res.status(404).send({message:"Sin inicio de los registros"});
      }else{
        if(asistencia.almuerzo.entrada){
          res.status(200).send("Existe registro anterior");
        }
        else{  
          var hora = new Date();
          asistencia.almuerzo.entrada = hora;
          if(hora.getHours()<'14' || ( hora.getHours()=='14' && hora.getMinutes()<='00'))
            asistencia.almuerzo.estado = 'temprano';
          else 
            asistencia.almuerzo.estado = 'tarde';

          switch (uniforme) {
            case '1':
              asistencia.almuerzo.uniforme='completo';
              break;
            case '2':
              asistencia.almuerzo.uniforme = 'sin sombrero';
              break;
            case '3': 
              asistencia.almuerzo.uniforme= 'incompleto';
              break;
            case '4':
              asistencia.almuerzo.uniforme='sin uniforme';
              break;
          }

          AsistenciaMdl.findOneAndUpdate({_id:asistencia._id},asistencia,(err,asistenciaStrored)=>{
            if(err){
              res.status(500).send({message:"Error en la BBDD"});
            }else{
              if(!asistencia){
                res.status(404).send({message:"Sin inicio de los registros"});
              }else{
                res.status(200).send("Se guardo correctamente");
              }
            }
          });
        }  
      }
    }
  });


}

function registrarAsistenciaSalida(req,res){
  var id = req.params.id;
  AsistenciaMdl.findOne({estudiante:id}).sort({_id:-1}).exec((err,asistencia)=>{
    if(err){
      res.status(500).send({message:"Error en la BBDD"});
    }else{
      if(!asistencia){
        res.status(404).send({message:"Sin inicio de los registros"});
      }else{
        var hora = new Date();
        asistencia.salida = hora;
        //asistencia.estado = 'evasion';
        AsistenciaMdl.findOneAndUpdate({_id:asistencia._id},asistencia,(err,asistenciaStrored)=>{
          if(err){
            res.status(500).send({message:"Error en la BBDD"});
          }else{
            if(!asistencia){
              res.status(404).send({message:"Sin inicio de los registros"});
            }else{
              res.status(200).send("Se registro correctamente");
            }
          }
        });

      }
    }
  });
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

function getAsistenciaEstudiante(req,res){
  var id = req.params.id;

  AsistenciaMdl.find({estudiante:id}).exec((err,asistencias)=>{
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

async function registrarAsistenciaXO (req,res){
  //var asistencia  = await AsistenciaMdl.find().limit(10);
  var estudiantes =  await EstudianteMdl.find();
  var i = 0;
  while(estudiantes[i]){
    var  asistencia  = new AsistenciaMdl();
    asistencia.estudiante = estudiantes[i]._id;
    await asistencia.save();
    i++;
  }
  var ast = await AsistenciaMdl.find().limit(10);
  var id = req.params.id;

  res.send( ast );
}

module.exports = {
  registrarAsistenciaEntrada,
  registrarAsistenciaAlmuerzo,
  registrarAsistenciaRetorno,
  registrarAsistenciaSalida,
  registrarAsistenciaXO,
  getAsistencias,
  getAsistenciaEstudiante
}
