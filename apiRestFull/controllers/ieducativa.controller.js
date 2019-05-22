'use strict'

var IEducativaMdl= require('../models/ieducativa.model')

function getIEducativa(req, res){
    var ieducativa_id  = req.params.id;

    IEducativaMdl.findOne({_id:ieducativa_id},(err,ieducativa)=>{
        if(err){
            res.status(500).send({message:'error en la peticion'});
        }else{
            if(!ieducativa){
                res.status(404).send({message:'no existe Institucion Educativa'});
            }else{
                res.status(200).send({ieducativa});
            }
        }
    });
}

function getIEducativas(req,res){
    IEducativaMdl.find().sort().exec((err,ieducativas)=>{
        if(err){
            res.status(500).send({message:'error en la peticion'});
        }
        else{
            if(!ieducativas){
                res.status(404).send({message:'no existe Institucion educativa'});
            }
            else{
                res.status(200).send({ieducativas});
            }
        }
    });
}

function addIEducativa(req,res){
    var ieducativa =  new IEducativaMdl();
    var params = req.body;

    ieducativa.codigo = params.codigo;
    ieducativa.nombre = params.nombre;
    ieducativa.nivel = params.nivel;
    //ubicacion
    ieducativa.pais =params.pais;
    ieducativa.region = params.region;
    ieducativa.provincia = params.provincia;
    ieducativa.distrito = params.distrito;
    ieducativa.direccion = params.direccion;

    ieducativa.telefono = params.telefono;
    ieducativa.nota = params.nota;

    ieducativa.save((err, ieducativaStored)=>{
        if(err){
            res.status(500).send({message:'error en el registro de Institucion Educativa'});
        }else{
            if(!ieducativaStored){
                res.status(404).send({message:'no se ha guardado la Institucion Educativa'});
            }else{
                res.status(200).send({ieducativaStored});
            }
        }
    });
}
//actulizacion de una institucion educativa
function updateIEducativa(req,res){
    var ieducativa_id = req.params.id;
    var update = req.body;

    IEducativaMdl.findByIdAndUpdate(ieducativa_id, update,{new:true},(err,ieducativaUpdate)=>{
        if(err){
            res.status(500).send({message:'error en la peticion'});
        }else{
            if(!ieducativaUpdate){
                res.status(404).send({message:'NO se ha actualizado la imagen'});
            }else{
                res.status(200).send({ieducativaUpdate});
            }
        }
    });
}

function deleteIEducativa(req,res){
    var ieducativaId = req.params.id;
    IEducativaMdl.findByIdAndRemove(ieducativaId, (err, ieducativaRemoved)=>{
        if(err){
            res.status(500).send({message:'error en la peticion'});
        }else{
            if(!ieducativaRemoved){
                res.status(404).send({message:'No se ha podido eliminar la institucion'});
            }else{
                res.status(200).send({ieducativaRemoved});
            }
        }
    });
}

function buscarIEducativa(req,res){
    var data = req.params.data;
    //buscar por nombre
    IEducativaMdl.find({nombre:data}).sort({}).exec((err,ieducativas)=>{
        if(err){
            res.status(500).value({message:'error en la peticion'});
        }else{
            if(!ieducativas){
                IEducativaMdl.find({codigo:data}).sort({nombre:+1}).exec((err,ieducativas)=>{
                    if(err){
                        res.status(500).value({message:'error en la peticion'});
                    }else{
                        if(!ieducativas){
                            res.status(500).send({message:'NO existe Institucion Educativa'});
                        }else{
                            res.status(200).send({ieducativas});
                        }
                    }
                });
            }else{
                res.status(200).send({ieducativas});
            }
        }
    });
}

module.exports={
    getIEducativa,
    getIEducativas,
    addIEducativa,
    updateIEducativa,
    deleteIEducativa,
    buscarIEducativa
}