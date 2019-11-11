'use strict'

var ReciboMdl = require('../models/recibo.model');
var FamiliaMdl = require('../models/familia.model');

async function saveRecibo(req,res){
  var familia_id = req.params.familia;
  var datos = req.body;
  var recibo = new ReciboMdl();
  
  recibo.familia = familia_id;
  recibo.fecha = new Date(datos.year +'-'+datos.mes+'-'+datos.dia);
  recibo.boleta = datos.boleta;
  recibo.monto = datos.monto;
  try{

    var reciboStored = await recibo.save();
    var familia = await FamiliaMdl.find({_id:familia_id}).limit(1);
    if(!familia.recibos){
      familia.recibos = [];
    }
    familia.recibos.push(reciboStored._id);
    await FamiliaMdl.findOneAndUpdate({_id:familia_id},familia,{new:true});
    res.status(200).send(reciboStored);
  }catch(err){
    console.log(err);
    res.status(500).send("Error con la BBDD")
  }
}

async function getRecibos(req,res){
  try{
    let recibos = await ReciboMdl.find();
    res.status(200).send(recibos);

  }catch(err){
    console.log(err);
    res.status(500).send("Error con la BBDD");
  }

}

async function getFamiliasFalta(req, res){
  var familias = await FamiliaMdl.find({"recibos":{$size:0},"estudiantes":{$exists:true}, $where:'this.estudiantes.length >0', estado:"Activo"})
    .populate({path:"estudiantes", select:['-QRCode','-documentos']}).sort({carpeta:+1});
 
  res.send(familias);
}

module.exports ={
  saveRecibo,
  getRecibos,
  getFamiliasFalta

}