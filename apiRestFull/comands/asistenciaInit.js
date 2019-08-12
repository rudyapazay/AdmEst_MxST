'use strict'

var mongoose = require('mongoose');

var AsistenciaMdl = require('../models/asistencias.model');
var EstudianteMDL = require('../models/estudiante.model');


mongoose.connect('mongodb://localhost:27017/appAdmEstMxST',{useNewUrlParser: true}, (err,res)=>{
    if(err){
        throw err;
    }
    else{
        EstudianteMDL.find({estado:'activo'}).exec((err,estudiantes)=>{
            //console.log(err);
            //console.log(estudiantes._id);
            var i = 0;
            while(estudiantes[i]){
                var estudiante = estudiantes[i];

                //console.log(estudiante.nombre);
                initAsistenciaEst(estudiante);
                
                i++;
            }
                
        });        
    }
});

function initAsistenciaEst(estudiante){

  var asistencia = new AsistenciaMdl();
  var date = new Date();
  var fecha = date.getDate() + "-"+ (date.getMonth()+1)+"-"+date.getFullYear();
//  console.log(fecha);

  asistencia.fecha = fecha; 
  asistencia.estudiante = estudiante._id;
  asistencia.estado = 'falta';

  asistencia.save((err, asistenciaStored)=>{
    console.log(asistenciaStored.estudiante);
  });
}