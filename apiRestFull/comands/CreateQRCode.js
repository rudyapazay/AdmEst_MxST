'use strict'

var mongoose =require('mongoose');
var qrcode = require('qrcode');
var EstudianteMDL = require('../models/estudiante.model');
var CrytoJS = require('crypto-js');

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
    var code =  estudiante._id +"~~"+estudiante.nombre+" "+estudiante.apellidos +"~~"+"SIN PERMISO";
                
                qrcode.toDataURL(code,{errorCorrectionLevel:"H"},(err,cod)=>{
                    estudiante.QRCode =  cod;
                    EstudianteMDL.findOneAndUpdate({_id:estudiante._id},estudiante,{new:true},(err,estUpdate)=>{
                        console.log("estudiante actulizado -> "+ estUpdate.nombre);
                    });
                });
}