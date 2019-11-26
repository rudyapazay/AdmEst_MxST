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

async function getFamiliaEstudianteRecibo(req, res){
  FamiliaMdl.find({estado:'Activo'}).populate({path:"estudiantes", select:['-QRCode','-documentos']})
    .populate({path:"recibos"})
    .sort({carpeta:+1}).exec((err,familias)=>{
        if(err){
            res.status(500).send({message:'error en la peticion'});
        }
        else{
            if(!familias){
                res.status(404).send({message:'No existe familias'});
            }
            else{
                
                res.status(200).send({familias});
            }
        }
    });
}

async function getRecibosFamiliaEstudiante(req,res){
 
  var recibos = await ReciboMdl.aggregate([
    {$lookup:{from:"familias", localField:"familia",foreignField:"_id",as:"familia" }},
    {$replaceRoot:{newRoot:{ $mergeObjects:[{$arrayElemAt:["$familia",0]}, "$$ROOT"] }}},
    {$lookup:{from:"estudiantes", localField:"estudiantes", foreignField:"_id", as:"estudiantes"}},
    {$project:{"estudiantes.QRCode":0, "familia":0, "estudiante.documentos":0, "documentos":0}},
    {$sort:{boleta:+1}}
  ]);
  res.status(200).send(recibos);
}
module.exports ={
  saveRecibo,
  getRecibos,
  getFamiliasFalta,
  getFamiliaEstudianteRecibo,
  getRecibosFamiliaEstudiante

}