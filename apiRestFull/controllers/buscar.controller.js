'use strict'

var EstudianteMdl = require('../models/estudiante.model');
var FamiliaMdl =  require('../models/familia.model');

function getFamilias(req,res){
    var data = req.params.data;
    data = data.toUpperCase();

    //primero buscamos por codigo
    FamiliaMdl.find({codigo:data}).sort({carpeta:+1}).exec((err,familias)=>{
        if(err){
            res.status(500).send({message:'error en la peticion'});
        }
        else{
            if(!familias){
                //buscamos por carpeta
                FamiliaMdl.find({carpeta:data}).sort({carpeta:+1}).exec((err,familias)=>{
                    if(err){
                        res.status(500).send({message:'error en la peticion'});
                    }else{
                     if(!familias){
                        res.status(404).send({message:'no existe familia'});
                     }else{
                        res.status(200).send({familias});
                     } 
                    }
                });

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

    EstudianteMdl.find({apellidos:data}).sort({apellidos:+1}).exec((err,estudiantes)=>{
        if(err){
            res.status(500).send({message:'error en la peticion'});
        }else{
            if(!estudiantes){
                EstudianteMdl.find({dni:data}).sort({apellido:+1}).exec((err, estudiantes)=>{
                    if(err){
                        res.status(500).send({message:'error en la peticion'});
                    }
                    else{
                        if(!estudiantes){
                            res.status(500).send({message:'no existe estudiante'});
                        }else{
                            res.status(200).send({estudiantes});
                        }
                    }
                });
            }
            else{
                res.status(200).send({estudiantes});
            }
        }
    });
}

module.exports={
    getFamilias,
    getEstudiantes
}