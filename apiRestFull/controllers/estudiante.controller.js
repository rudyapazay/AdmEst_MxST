'use strict'

var EstudianteMdl = require('../models/estudiante.model');
var FamiliaMdl =  require('../models/familia.model');

function getEstudiantes(req,res){
    EstudianteMdl.find({},{QRCode:0}).sort({apellidos:+1}).exec((err,estudiantes)=>{
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
    EstudianteMdl.find({familia:familia_id},{QRCode:0}).sort({grado_actual:+1}).exec((err,estudiantes)=>{
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


//considerar no hacer un populate para estudiantes
function getEstudiante(req,res){
    var estudianteId =  req.params.id;

    EstudianteMdl.findOne({_id:estudianteId}, {QRCode:0}).exec((err,estudiante)=>{
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

// informacion con QR code del estudiante
function getEstudianteQRCode(req,res){
    var estudianteId =  req.params.id;

    EstudianteMdl.findOne({_id:estudianteId}).exec((err,estudiante)=>{
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



// actualizacion basica de estudiante
function updateEstudianteBasica(req,res){
    var estudianteId = req.params.id;
    
    EstudianteMdl.findOne({_id:estudianteId}, (err,estudiante)=>{
        if(err){
            res.status(500).send({message:'Error en la base de datos'});
        }else{
            if(!estudiante){
                res.status(404).send({message:'Estudiante no existe'});
            }else{
                estudiante = req.body;

                EstudianteMdl.findByIdAndUpdate(estudianteId, estudiante,{new:true},(err,estudianteUpdate)=>{
                    if(err){
                        res.status(500).send({message:'error en la actualizacion'});
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
                estudiante.documentos.folder = params.folder;
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
//funcion para sacar estudiantes por grado y seccion
function getEstudiantesGradoSeccion(req,res){
    var grado=req.params.grado;
    var seccion  =  req.params.seccion;
    let year  = 2019; 
    var query ;
    let $search = 'referencia.'+grado+'.year';
    let $sseccion = 'referencia.'+grado+'.'+seccion;
    // falta sacar el anio actual
    switch (grado) {
        case 'primero':
            query = EstudianteMdl.find({'referencia.primero.year':year, 
                'referencia.primero.seccion':seccion},{QRCode:0});
            break;
    
        case 'segundo':
            query = EstudianteMdl.find({'referencia.segundo.year':year, 
                'referencia.segundo.seccion':seccion},{QRCode:0});
            break;
        case 'tercero':
            query = EstudianteMdl.find({'referencia.tercero.year':year, 
                'referencia.tercero.seccion':seccion},{QRCode:0});
            break;
        case 'cuarto':
            query = EstudianteMdl.find({'referencia.cuarto.year':year, 
                'referencia.cuarto.seccion':seccion},{QRCode:0});
            break;
        case 'quinto':
            query = EstudianteMdl.find({'referencia.quinto.year':year, 
                'referencia.quinto.seccion':seccion},{QRCode:0});
            break;
    }
    
    query.sort({apellidos:+1}).exec((err,estudiantes)=>{
        if(err){
            res.status(500).send({message:'error en la base de datos'});
        }
        else{
            if(!estudiantes){
                res.status(404).send({message:'no existe estudiantes del grado y seccion'});
            }
            else{
                //res.status(200).send({estudiantes});
                // para mostrar el padre y la madre
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

//funcion para cambiar el grado y seccion del estudiantes
function cambiarGradoSeccion(req,res){
    var id = req.params.id;
    var grado = req.params.grado;
    var seccion = req.params.seccion;
    var query;
    var yearActual = '2019';
    
    EstudianteMdl.findById(id,(err,estudiante)=>{
        if(err){
            res.status(500).send({message:'Error en la base de datos'});
        }
        else{
            if(!estudiante){
                res.status(404).send({message:'no existe el estudiante'});
            }
            //actulizacion del estudiante en grado y seccion
            else{
                if(estudiante.referencia.primero.year ==  yearActual){
                    estudiante.referencia.primero = null;
                    estudiante.referencia.segundo = null;
                    estudiante.referencia.tercero = null;
                    estudiante.referencia.cuarto= null;
                    estudiante.referencia.quinto = null;

                }
                if(estudiante.referencia.segundo.year == yearActual ){
                    estudiante.referencia.segundo = null;
                    estudiante.referencia.tercero = null;
                    estudiante.referencia.cuarto= null;
                    estudiante.referencia.quinto = null;
                }
                if(estudiante.referencia.tercero.year == yearActual){
                    estudiante.referencia.tercero = null;
                    estudiante.referencia.cuarto= null;
                    estudiante.referencia.quinto = null;
                }
                if(estudiante.referencia.cuarto.year == yearActual){
                    estudiante.referencia.cuarto= null;
                    estudiante.referencia.quinto = null;
                }
                if(estudiante.referencia.quinto.year == yearActual){
                    estudiante.referencia.quinto = null;

                }
                
                switch (grado) {
                    case 'primero':
                        estudiante.referencia.primero.year = yearActual;
                        estudiante.referencia.primero.seccion = seccion;
                        break;
                    case 'segundo':
                        estudiante.referencia.segundo.year = yearActual;
                        estudiante.referencia.segundo.seccion = seccion;
                        break;
                    case 'tercero':
                        estudiante.referencia.tercero.year = yearActual;
                        estudiante.referencia.tercero.seccion = seccion;
                        break;
                    case 'cuarto':
                        estudiante.referencia.cuarto.year = yearActual;
                        estudiante.referencia.cuarto.seccion = seccion;
                        break;
                    case 'quinto':
                        estudiante.referencia.quinto.year = yearActual;
                        estudiante.referencia.quinto.seccion = seccion;
                        break;
                    default:
                        res.status(500).send({message:'error en la peticion'});
                        break;
                }
            
                EstudianteMdl.findByIdAndUpdate(id, estudiante,{new:true},(err, estudianteUpdate)=>{
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

//delete
function delEstudiante(req,res){
    var id = req.params.id;
    EstudianteMdl.deleteOne({_id:id},(err)=>{
        if(err){
            res.status(500).send({message:"error con la base de datos"});
        }else{
            res.status(200).send({message:"Eliminacion correcta"});
        }
    });
}

module.exports ={
    getEstudiantes,
    getEstudiante,
    getEstudianteQRCode, //devolver con QRCode
    saveEstudiante,
    getEstudiantesByFamilia,
    //updateEstudiante,
    saveDocumentos,
    updateReferencia,
    updateEstudianteBasica,
    
    getEstudiantesGradoSeccion,
    cambiarGradoSeccion,

    //eliminar
    delEstudiante,
}
