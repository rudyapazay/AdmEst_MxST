'use strict'

var mongoose = require('mongoose');

var RecibosMdl = require('../models/recibo.model');

mongoose.connect('mongodb://localhost:27017/appAdmEstMxST',{useNewUrlParser: true}, (err,res)=>{
    if(err){
        throw err;
    }
    else{
        RecibosMdl.find({}).exec((err, recibos)=>{
          var i = 0;
          
          while(recibos[i]){
            actualizarRecibo(recibos[i]);
            i++;
          }
        });
    }
});


function actualizarRecibo(recibo){
  var newFecha = new Date(recibo.fecha);
  newFecha.setDate(recibo.fecha.getDate()+1);
  //*newFecha.setFullYear('2019');
  newFecha.setHours('00');
  recibo.fecha = newFecha;
  RecibosMdl.findOneAndUpdate({_id:recibo._id},recibo,{new:true},(err,recUpdate)=>{
    console.log("Recibo actualizado -> "+ recUpdate.fecha);
  });
  
}