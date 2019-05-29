'use strict'

var EstudianteMdl = require('../models/estudiante.model');
var FamiliaMdl =  require('../models/familia.model');

function getEstudiantes(req,res){
    EstudianteMdl.find({}).sort({apellidos:+1}).exec((err,estudiantes)=>{
        if(err){
            res.status(500).send({message:'error en la peticion'});
        }
        else{
            if(!estudiantes){
                res.status(404).send({message:'No existe estudintes'});
            }
            else{
                FamiliaMdl.populate(estudiantes,{path:"familia"},(err,estudiante)=>{
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

function getEstudiantesByFamilia(req, res){
    var familia_id =req.params.id;
    EstudianteMdl.find({familia:familia_id}).sort({grado_actual:+1}).exec((err,estudiantes)=>{
        if(err){
            res.status(500).send("Error en la perticion");
        }
        else{
            if(!estudiantes){
                res.status(404).send('No existe estudiantes en la familia');
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
    estudiante.sexo = params.sexo;
    //id de la familia
    estudiante.familia = params.familia;

    estudiante.traslado_anterior = params.traslado_anterior;
    //estudiante.partida_nacimiento =params.partida_nacimiento;
   // estudiante.ficha_matricula = params.ficha_matricula;
    //estudiante.sis = params.sis;
    estudiante.estado = params.estado;
    estudiante.matricula = params.matricula;
    estudiante.observaciones = params.observaciones;
    
    estudiante.grado_actual = params.grado;

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

function updateEstudiante(req,res){
    var estudianteId=req.params.id;
    var params = req.body;

    EstudianteMdl.findOne({_id:estudianteId},(err,estudiante)=>{
        if(err){
            res.status(500).send('Error en la peticion');
        }else{
            if(!estudiante){
                res.status(404).send('estudiante no existe');
            }else{

                estudiante.dni = params.dni;
                estudiante.apellidos = params.apellidos;
                estudiante.nombre = params.nombre;
                estudiante.sexo = params.sexo;
                //id de la familia
                estudiante.familia = params.familia;

                estudiante.estado = params.estado;
                estudiante.matricula = params.matricula;
                estudiante.observaciones = params.observaciones;
                
                estudiante.grado_actual = params.grado;

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
                EstudianteMdl.findByIdAndUpdate(estudianteId,estudiante,{new:true},(err,estudianteUpdate)=>{
                    if(err){
                        res.status(500).send({message:'Error en la actulizacion'});
                    }else{
                        if(!estudianteUpdate){
                            res.status(404).send({message:'estudiante no existe'});
                        }else{
                            res.status(200).send({estudianteUpdate});
                        }
                    }
                });

            }
        }
    });
}


// guardar y actulizar documentos
function saveDocumentos(req,res){
    var estudianteId = req.params.id;
    var params = req.body;

    EstudianteMdl.findOne({_id:estudianteId},(err,estudiante)=>{
        if(err){
            res.status(500).send({message:'Error en la actulizacion'});
        }else{
            if(!estudiante){
                res.status(400).send({message:'Estudiante no existe'});
            }else{
                estudiante.documentos.copia_dni = params.copia_dni;
                estudiante.documentos.partida_nacimiento = params.partida_nacimiento;
                estudiante.documentos.ficha_matricula = params.ficha_matricula;
                estudiante.documentos.ficha_seguro = params.ficha_seguro;

                EstudianteMdl.findByIdAndUpdate(estudianteId,estudiante,{new:true},(err,estudianteUpdate)=>{
                    if(err){
                        res.status(500).send({message:'Error en la actualizacion'});
                    }else{
                        if(!estudianteUpdate){
                            res.status(404).send({message:'Estudiante no existe'});
                        }else{
                            res.status(200).send(estudianteUpdate);
                        }
                    }
                });
            }
        }
    });
}
function updateReferencia(req,res){
    var estudianteId = req.params.id;
    var grado =req.params.grado;
    var params = req.body;

    EstudianteMdl.findOne({_id:estudianteId},(err,estudiante)=>{
        if(err){
            res.status(500).send({message:'Error en la actualizacion'});
        }else{
            if(!estudiante){
                res.status(404).send({message:'Estudiante no existe'});
            }else{
                switch (grado) {
                    case 'primaria':
                        estudiante.primaria.promocion = params.year;
                        estudiante.primaria.escuela = params.ieducativa;
                        estudiante.primaria.certificado = params.cerfificado;
                        break;
                    case 'primero':
                        estudiante.referencia.primero.year = params.year;
                        estudiante.referencia.primero.seccion = params.seccion;
                        estudiante.referencia.primero.puntos = params.puntos;
                        estudiante.referencia.primero.promedio = params.promedio;
                        estudiante.referencia.primero.colegio = params.ieducativa;
                        estudiante.referencia.primero.cerfificado = params.ieducativa;
                        break;
                    case 'segundo':
                        estudiante.referencia.segundo.year = params.year;
                        estudiante.referencia.segundo.seccion = params.seccion;
                        estudiante.referencia.segundo.puntos = params.puntos;
                        estudiante.referencia.segundo.promedio = params.promedio;
                        estudiante.referencia.segundo.colegio = params.ieducativa;
                        estudiante.referencia.segundo.cerfificado = params.ieducativa;
                        break;
                    case 'tercero':
                        estudiante.referencia.tercero.year = params.year;
                        estudiante.referencia.tercero.seccion = params.seccion;
                        estudiante.referencia.tercero.puntos = params.puntos;
                        estudiante.referencia.tercero.promedio = params.promedio;
                        estudiante.referencia.tercero.colegio = params.ieducativa;
                        estudiante.referencia.tercero.cerfificado = params.ieducativa;
                        break;
                    case 'cuarto':
                        estudiante.referencia.cuarto.year = params.year;
                        estudiante.referencia.cuarto.seccion = params.seccion;
                        estudiante.referencia.cuarto.puntos = params.puntos;
                        estudiante.referencia.cuarto.promedio = params.promedio;
                        estudiante.referencia.cuarto.colegio = params.ieducativa;
                        estudiante.referencia.cuarto.cerfificado = params.ieducativa;
                        break;
                    case 'quinto': 
                        estudiante.referencia.quinto.year = params.year;
                        estudiante.referencia.quinto.seccion = params.seccion;
                        estudiante.referencia.quinto.puntos = params.puntos;
                        estudiante.referencia.quinto.promedio = params.promedio;
                        estudiante.referencia.quinto.colegio = params.ieducativa;
                        estudiante.referencia.quinto.cerfificado = params.ieducativa;
                        break
                }
                EstudianteMdl.findByIdAndUpdate(estudianteId, estudiante,{new:true},(err, estudianteUpdate)=>{
                    if(err){
                        res.status(500).send({message:'error al actualizar estudiante'});
                    }else{
                        if(!estudianteUpdate){
                            res.status(404).send({message:'no existe estudiante'});
                        }else{
                            res.status(200).send({estudianteUpdate});
                        }
                    }
                });
            }
        }
    });

}

module.exports ={
    getEstudiantes,
    getEstudiante,
    saveEstudiante,
    getEstudiantesByFamilia,
    updateEstudiante,
    saveDocumentos,
    updateReferencia
}