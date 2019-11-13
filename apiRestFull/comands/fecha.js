'use strict'

var mongoose = require('mongoose');

var EstudianteMDL = require('../models/estudiante.model');
var AsistenciaMDL = require('../models/asistencias.model');

mongoose.connect('mongodb://localhost:27017/appAdmEstMxST',{useNewUrlParser: true}, (err,res)=>{
    if(err){
        throw err;
    }
    else{
        AsistenciaMDL.find({}).exec((err,asistencias)=>{
          
          //console.log(nuevaFecha);
           // console.log(asistencias[0]);
            
            //console.log(estudiantes._id);
            var i = 0;
            while(asistencias[i]){
                var asistencia  = asistencias[i];

                //console.log(estudiante.nombre);
                updateAst(asistencia);
                
                i++;
            }
              
        });        
    }
});

function updateAst(asistencia){
    let fechaCorregir =  new Date(asistencia.fecha);
    var nuevaFecha;
    if(fechaCorregir.getHours() == '00'){
        nuevaFecha = fechaCorregir; 
    }
    else{

        nuevaFecha = fechaCorregir ;
        nuevaFecha.setDate(nuevaFecha.getDate()+1);
        nuevaFecha.setHours("00");
    }
  //estudiante.apellidos = estudiante.apellidos.toUpperCase();
  asistencia.fecha  = nuevaFecha;
  AsistenciaMDL.findOneAndUpdate({_id:asistencia._id},asistencia,{new:true},(err,estUpdate)=>{
      console.log(" actulizado -> "+ estUpdate.fecha);
  });
}