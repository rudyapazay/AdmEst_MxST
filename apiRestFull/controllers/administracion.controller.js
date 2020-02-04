'use strict'
var EstudianteMdl = require('../models/estudiante.model');
var FamiliaMdl = require('../models/familia.model');

async function bbddMatenimiento(req, res){
    var estudiantes = await EstudianteMdl.find({});
    var i = 0;
    estudiantes.forEach(async est =>{
        if(!est.estado ){
            est.estado = 'pendiente';
            var estAct =  await EstudianteMdl.findOneAndUpdate({_id:est._id},est, {new:true});
            console.log(estAct.nombre+'  ->' +estAct.estado);
        }
        
    })
    
}

module.exports = {
    bbddMatenimiento
}