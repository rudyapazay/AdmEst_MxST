'use strict'

var FamiliaMdl =  require('../models/familia.model');
 
function getFamilias(req,res){
    FamiliaMdl.find({},(err,familias)=>{
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

function saveFamilia(req,res){
    var familia = new FamiliaMdl();
    var params = req.body;
    // asignando valores a la carga
    
    familia.nombre = params.nombre;
    familia.direccion = params.direccion; 
    familia.estado = params.estado;
    familia.observaciones = params.observaciones; 
    // generando codigo de familia
    //investigar la relizacion de subcadenas

    
    familia.save((err, familiaStored)=>{
        if(err){
            res.status('500').send({message:'Error al generar la familia'});
        }
        else{
            if(!familiaStored){
                res.status('404').send({message:'NO se ha guardado la familia'});
            }
            else{
                res.status('200').send({familia:familiaStored});
            }
        }
    });
}

function savePadre(req,res){
    res.send('padre guardado');
}



module.exports={
    getFamilias,
    saveFamilia
}