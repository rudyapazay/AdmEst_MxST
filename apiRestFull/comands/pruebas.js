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
                
                //code.charCodeAt(1);
                /*var code ={
                    i: estudiantes._id,
                    n : estudiantes.nombre,
                    a:estudiantes.apellidos
                };
                var demo =JSON.stringify(code);
                //console.log(demo);
                //cifrando con clave privada
                var cifrado = CrytoJS.AES.encrypt(demo,'probando clave').toString();
                console.log(cifrado);
                
                var decifrado =CrytoJS.AES.decrypt(cifrado,'probando clave');
                var data=CrytoJS.enc.Utf8.stringify(decifrado); 
                console.log(data);
                
                //demojson  = JSON.parse(demo)
                //console.log(demojson.id);
                
                /**
                qrcode.toDataURL(demo,{ errorCorrectionLevel: 'H' },(err,cod)=>{
                    //console.log(err);
                    console.log(cod);
                    
                    //qrcode.toCanvas(cod);
                    estudiantes.IQCode = cod;
                    EstudianteMDL.findByIdAndUpdate(id,estudiantes,{new:true},(err,estudianteUpdate)=>{
                        if(err){
                            console.log(err);
                        }else{
                            console.log('actulizado estudiante'+estudianteUpdate.nombre);
                            mongoose.disconnect();
                        }
                    });
                    
                });
                */
            
        });        
    }
});

function updateEst(estudiante){
    var code = estudiante._id + estudiante.dni+" "+estudiante.nombre+" "+estudiante.apellidos;
                
                qrcode.toDataURL(code,{errorCorrectionLevel:"H"},(err,cod)=>{
                    estudiante.QRCode =  cod;
                    EstudianteMDL.findOneAndUpdate({_id:estudiante._id},estudiante,{new:true},(err,estUpdate)=>{
                        console.log("estudiante actulizado"+ estUpdate.nombre);
                    });
                });
}