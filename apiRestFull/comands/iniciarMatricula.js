// proceso para iniciar matriculas

'use strict'

var mongoose = require('mongoose');
var EstudianteMDL = require('../models/estudiante.model');
mongoose.connect('mongodb://localhost:27017/appAdmEstMxST',{useNewUrlParser: true}, (err,res)=>{
    if(err){
        throw err;
    }
    else{
        EstudianteMDL.find({estado:"activo"}).exec((err,estudiantes)=>{
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

/*
    1  promover de año a los estudiantes
    2  Estudiantes de quinto pasan a ser promocion
    3  Se pone en espera a todos los demas estudiantes en espera
    4  Siagie en false
    5  Familia
*/

function updateEst(estudiante){
    var yearActual = new Date().getFullYear() ;
    estudiante.estado = 'pendiente';
    estudiante.siagie = false;

    if(estudiante.referencia.primero.year == (yearActual-1)){
        estudiante.referencia.segundo.year =  yearActual;
        estudiante.referencia.segundo.seccion = estudiante.referencia.primero.seccion;
    }
    else if(estudiante.referencia.segundo.year == (yearActual-1)){
        estudiante.referencia.tercero.year =  yearActual;
        estudiante.referencia.tercero.seccion = estudiante.referencia.segundo.seccion;
    }
    else if(estudiante.referencia.tercero.year == (yearActual-1)){
        estudiante.referencia.cuarto.year =  yearActual;
        estudiante.referencia.cuarto.seccion = estudiante.referencia.tercero.seccion;
    }
    else if(estudiante.referencia.cuarto.year == (yearActual-1)){
        estudiante.referencia.quinto.year =  yearActual;
        estudiante.referencia.quinto.seccion = estudiante.referencia.cuarto.seccion;
    }
    else if(estudiante.referencia.quinto.year == (yearActual-1)){
        estudiante.estado = 'egresado';
        estudiante.siagie = true;
    }

    EstudianteMDL.findOneAndUpdate({_id:estudiante._id},estudiante,{new:true},(err,estUpdate)=>{
        console.log("estudiante actulizado -> "+ estUpdate.nombre);
    });

}