'use strict'
var EstudianteMdl = require('../models/estudiante.model');
var FamiliaMdl = require('../models/familia.model');

async function bbddMatenimiento(req, res){
    var estudiantes = await EstudianteMdl.find({});
    var yearActual =  new Date().getFullYear();
    var yearAnt = yearActual -1 ; 
    //console.log(yearAnt);
    var i = 0;
    estudiantes.forEach(async est =>{
        if(est.referencia.quinto.year == yearAnt && est.referencia.quinto.seccion != null ){
            est.estado = 'egresado';
            await EstudianteMdl.findOneAndUpdate({_id:est._id},est, {new:true});
            //console.log(estAct.nombre+'  ->' +estAct.estado);
        }
        else {
            est.referencia.quinto = null;
            est.estado = 'pendiente';
            await EstudianteMdl.findOneAndUpdate({_id:est._id},est, {new:true});
        }
        
    })
    
}

// mantenimineto de estudiantes 
async function estudianteMantenimiento(){
    var estudiantes  = await EstudianteMdl.find({});
    
}

//mantenimiento de padres de familia
async function familiaMantenimiento(){

}

//actulizacion de codigos QR
async function QRMantenimiento(){
    
}

module.exports = {
    bbddMatenimiento
}