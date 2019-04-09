'use strict'

var FamiliaMdl =  require('../models/familia.model');
 
function getFamilias(req,res){
    FamiliaMdl.find({},(err,familias)=>{
        if(err){
            res.status(500).send({message:'error en la peticion'});
        }
        else{
            if(!familias.cont){
                res.status(404).send({message:'No existe familias'});
            }
            else{
                res.status(200).send({familias});
            }
        }
    });
}





module.exports={
    getFamilias,
}