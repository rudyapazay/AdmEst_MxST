'use strict'

var EstudianteMdl = require('../models/estudiante.model');
var FamiliaMdl =  require('../models/familia.model');

function getEstudiantes(req,res){
    EstudianteMdl.find({},(err,estudiantes)=>{
        if(err){
            res.status(500).send({message:'error en la peticion'});
        }
        else{
            if(!estudiantes){
                res.status(404).send({message:'No existe estudintes'});
            }
            else{
                res.status(200).send({estudiantes});
            }
        }
    });
}

function saveEstudiante(req,res){
    var estudiante = new EstudianteMdl();
    var params = req.body;
    
    estudiante.dni = params.dni;
    estudiante.apellidos = params.apellidos;
    estudiante.nombre = params.nombre;

    estudiante.familia = params.familia;

    estudiante.traslado_anterior = params.traslado_anterior;
    estudiante.partida_nacimiento =params.partida_nacimiento;
    estudiante.ficha_matricula = params.ficha_matricula;
    estudiante.sis = params.sis;
    estudiante.estado = params.estado;
    estudiante.matricula = params.matricula;
    estudiante.observaciones = params.observaciones;

    estudiante.imagen = null;

    switch (params.grado) {
        case 'primero':
            estudiante.referencia.primero.year = '2019';
            estudiante.referencia.primero.seccion = params.seccion;
            break;
        case 'segundo':
            estudiante.referencia.segundo.year = '2019';
            estudiante.referencia.segundo.seccion = params.seccion;
        break;
        case 'tercero':
            estudiante.referencia.tercero.year = '2019';
            estudiante.referencia.tercero.seccion = params.seccion;
        break;
        case 'cuarto':
            estudiante.referencia.cuarto.year = '2019';
            estudiante.referencia.cuarto.seccion = params.seccion;
        break;
        case 'quinto':
            estudiante.referencia.quinto.year = '2019';
            estudiante.referencia.quinto.seccion = params.seccion;
        break;
        
    }


    estudiante.save((err, estudianteStored)=>{
        if(err){
            res.status('500').send({message:'Error al generar el Estudiante'});
        }
        else{
            if(!estudianteStored){
                res.status('404').send({message:'NO se ha guardado al Estudiante'});
            }
            else{
                res.status('200').send({estudiante:estudianteStored});
            }
        }
    });

}


function getEstudiante(req,res){
    var estudianteId =  req.params.id;

    EstudianteMdl.findOne({_id:estudianteId},(err,estudiante)=>{
        if(err){
            res.status(500).send('Error en la peticion');
        }
        else{
            if(!estudiante){
                res.status(404).send('estudiante no existe');
            }
            else{
                //console.log(familia);
                //res.status(200).send({estudiante});
                //populate para mostrar los padres mas
                FamiliaMdl.populate(estudiante,{path:"familia"},(err,estudiante)=>{
                    if(err){
                        res.status(500).send('Error en la peticion');
                    }
                    else{
                        res.status(200).send({estudiante});
                    }
                });
            }
        }
    });
}


module.exports ={
    getEstudiantes,
    getEstudiante,
    saveEstudiante
}