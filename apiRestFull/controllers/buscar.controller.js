'use strict'

var EstudianteMdl = require('../models/estudiante.model');
var FamiliaMdl =  require('../models/familia.model');

function getFamilias(req,res){
    var data = req.params.data;
    data = data.toUpperCase();

    //primero buscamos por codigo
    FamiliaMdl.find({$or:[
            {codigo:{$regex:'^'+data,$options:'i'}},
            {carpeta : {$regex:'^'+data,$options:'i'}},
            {"padre.apellidos":{$regex:'^'+data, $options:'i'}},
            {"padre.nombre":{$regex:'^'+data, $options:'i'}},
            {"madre.apellidos":{$regex:'^'+data, $options:'i'}},
            {"madre.nombre":{$regex:'^'+data, $options:'i'}},
            {"apoderado.apellidos":{$regex:'^'+data, $options:'i'}},
            {"apoderado.nombre":{$regex:'^'+data, $options:'i'}},
        ]})
            .populate({path:"estudiantes", select:'-QRCode'})
            .sort({carpeta:+1}).exec((err,familias)=>{
        if(err){
            res.status(500).send({message:'error en la peticion'});
        }
        else{
            if(!familias){
                res.status(500).send({message:'error en la peticion'});
            }
            else{
                res.status(200).send({familias});
            }
        }
    });
}


function getEstudiantes(req,res){
    var data = req.params.data;
    data = data.toUpperCase();

    EstudianteMdl.find({$or:[
            {apellidos:{$regex:'^'+data,$options:'i'}},
            {dni : {$regex:'^'+data,$options:'i'}},
            {nombre:{$regex:'^'+data,$options:'i'}}]}).
        sort({apellidos:+1}).
        exec((err,estudiantes)=>{
        if(err){
            res.status(500).send({message:'error en la peticion'});
        }else{
            if(!estudiantes){
                    res.status(500).send({message:'no existe estudiante'});
            }
            else{
                FamiliaMdl.populate(estudiantes,{path:"familia"},(err,estudiantes)=>{
                    if(err){
                        res.status(500).send('Error en la peticion');
                    }
                    else{
                        res.status(200).send({estudiantes});
                    }
                });
            }
        }
    });
}

module.exports={
    getFamilias,
    getEstudiantes
}