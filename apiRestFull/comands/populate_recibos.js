'use strict'

var mongoose =require('mongoose');

var familiaMDL = require('../models/familia.model');
var ReciboMDl = require('../models/recibo.model');


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
  
  ReciboMDl.find({familia:familia._id}).exec((err, recibos)=>{
    var j=0;
    familia.recibos= [];
    while (recibos[j]){
      var recibo = recibos[j];
      console.log(recibo.boleta);
      j++;
      familia.recibos.push(recibo._id);
    }
      //EstudianteMDL.findOneAndUpdate({_id:estudiante._id},estudiante,{new:true},(err,estUpdate)=>{
      //  console.log("estudiante actulizado -> "+ estUpdate.nombre);
      familiaMDL.findOneAndUpdate({_id:familia._id}, familia,{new:true}, (err, famUpt)=>{
        
        console.log(famUpt.recibos);

      });

  }); 
   

}