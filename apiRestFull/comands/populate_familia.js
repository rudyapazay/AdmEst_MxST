'use strict'

var mongoose =require('mongoose');
var qrcode = require('qrcode');
var EstudianteMDL = require('../models/estudiante.model');
var familiaMDL = require('../models/familia.model');


mongoose.connect('mongodb://localhost:27017/appAdmEstMxST',{useNewUrlParser: true}, (err,res)=>{
    if(err){
        throw err;
    }
    else{
        familiaMDL.find().exec((err, familias) =>{
          var i=0;
          while (familias[i]){
            var familia = familias[i];
            updateFam(familia);
            i++;
          }
        });
                
    }
});



function updateFam(familia){
  
  EstudianteMDL.find({familia:familia._id}).exec((err, estudiantes)=>{
    var j=0;
    while (estudiantes[j]){
      var estudiante = estudiantes[j];
      console.log(estudiante.nombre +" \t\t  " +familia.carpeta);
      j++;
      familia.estudiantes.push(estudiante._id);
    }
      //EstudianteMDL.findOneAndUpdate({_id:estudiante._id},estudiante,{new:true},(err,estUpdate)=>{
      //  console.log("estudiante actulizado -> "+ estUpdate.nombre);
      familiaMDL.findOneAndUpdate({_id:familia._id}, familia,{new:true}, (err, famUpt)=>{
        
        console.log(famUpt.estudiantes);

      });

  }); 
   

}