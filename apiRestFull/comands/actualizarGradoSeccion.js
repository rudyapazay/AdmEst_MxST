'use strict'

var mongoose = require('mongoose');

var EstudianteMDL = require('../models/estudiante.model');

mongoose.connect('mongodb://localhost:27017/appAdmEstMxST',{useNewUrlParser: true}, (err,res)=>{
    if(err){
        throw err;
    }
    else{
        EstudianteMDL.find({}).exec((err,estudiantes)=>{
            //console.log(err);
            //console.log(estudiantes._id);
            var i = 0;
            while(estudiantes[i]){
                var estudiante = estudiantes[i];

                //console.log(estudiante.nombre);
                updateEst(estudiante);
                
                i++;
            }
                
        });        
    }
});

function updateEst(estudiante){

  //estudiante.apellidos = estudiante.apellidos.toUpperCase();
  if(estudiante.referencia.primero.year == '2020'){
      estudiante.resumen.grado = 'primero';
      estudiante.resumen.seccion = estudiante.referencia.primero.seccion;
      estudiante.resumen.grade = '1'
  }
  else if( estudiante.referencia.segundo.year == '2020'){
      estudiante.resumen.grado = 'segundo';
      estudiante.resumen.seccion = estudiante.referencia.segundo.seccion;
      estudiante.resumen.grade = '2'
  }
  else if( estudiante.referencia.tercero.year == '2020'){
      estudiante.resumen.grado = 'tercero';
      estudiante.resumen.seccion = estudiante.referencia.tercero.seccion;
      estudiante.resumen.grade = '3'
  }
  else if( estudiante.referencia.cuarto.year == '2020'){
      estudiante.resumen.grado =  'cuarto';
      estudiante.resumen.seccion = estudiante.referencia.cuarto.seccion;
      estudiante.resumen.grade = '4'
  }
  else if( estudiante.referencia.quinto.year == '2020'){
      estudiante.resumen.grado = 'quinto';
      estudiante.resumen.seccion = estudiante.referencia.quinto.seccion;
      estudiante.resumen.grade = '5'
  }
  
  estudiante.resumen.nivel =  'secundaria';
  estudiante.resumen.jornada = 'JEC';
  estudiante.resumen.turno = 'completo'

  EstudianteMDL.findOneAndUpdate({_id:estudiante._id},estudiante,{new:true},(err,estUpdate)=>{
      console.log("estudiante actulizado -> "+ estUpdate.nombre);
  });
}