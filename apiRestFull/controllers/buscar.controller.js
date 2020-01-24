'use strict'

var EstudianteMdl = require('../models/estudiante.model');
var FamiliaMdl =  require('../models/familia.model');

function getFamilias(req,res){
    var data = req.params.data;
    data = data.toUpperCase();

    //primero buscamos por codigo
    FamiliaMdl.aggregate([
        {$match:{ 
            $and:[{
                $or:[{estado:'Activo'}],
                $or:[
                    {codigo:{$regex:'^'+data,$options:'i'}},
                    {carpeta : {$regex:'^'+data,$options:'i'}},
                    {"padre.apellidos":{$regex:'^'+data, $options:'i'}},
                    {"padre.nombre":{$regex:'^'+data, $options:'i'}},
                    {"madre.apellidos":{$regex:'^'+data, $options:'i'}},
                    {"madre.nombre":{$regex:'^'+data, $options:'i'}},
                    {"apoderado.apellidos":{$regex:'^'+data, $options:'i'}},
                    {"apoderado.nombre":{$regex:'^'+data, $options:'i'}},    
                ]
            }]
        }},
        {$sort:{carpeta:+1}},
        {$limit:10},
        {$lookup:{from:'estudiantes', localField:'_id',foreignField:'familia', as:'estudiantes'}},
        {$project:{'estudiantes.QRCode':0}}
    ])
    .exec((err,familias)=>{
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

    EstudianteMdl.find({
            $and:[
                {$or:[
                    {estado:"activo"}, 
                    {estado:"pendiente"}
                ]},
                {$or:[   
                    {apellidos:{$regex:'^'+data,$options:'i'}},
                    {dni : {$regex:'^'+data,$options:'i'}},
                    {nombre:{$regex:'^'+data,$options:'i'}}
                ]}
            ]}).
        sort({apellidos:+1, nombre:+1}).
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