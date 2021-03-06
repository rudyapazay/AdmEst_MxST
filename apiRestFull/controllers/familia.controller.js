'use strict'

var FamiliaMdl =  require('../models/familia.model');
var EstudianteMdl = require('../models/estudiante.model');

 function getFamilias(req,res){
    FamiliaMdl.aggregate([
        {$match:{estado:'Activo'}},
        {$sort:{carpeta:+1}},
        {$limit:10},
        {$lookup:{from:'estudiantes', localField:'_id',foreignField:'familia', as:'estudiantes'}},
        {$project:{'estudiantes.QRCode':0}},
    ])
    //find({estado:'Activo'}).populate({path:"estudiantes", select:'-QRCode'}).limit(10).sort({carpeta:+1})
    .exec((err,familias)=>{
        if(err){
            res.status(500).send({message:'error en la peticion'});
        }
        else{
            if(!familias){
                res.status(404).send({message:'No existe familias'});
            }
            else{
               // console.log(familias);
                res.status(200).send({familias});
            }
        }
    });
}

function getFamilia(req,res){
    var familiaId = req.params.id;

    FamiliaMdl.findOne({_id:familiaId}, (err,familia)=>{
        if(err){
            res.status(500).send('Error en la peticion');
        }
        else{
            if(!familia){
                res.status(404).send('La familia no existe');
            }
            else{
                
                //investigar como hacer populate
                res.status(200).send({familia});
            }
        }
    });
}

function saveFamilia(req,res){
    var familia = new FamiliaMdl();
    var params = req.body;
    // asignando valores a la carga
    //console.log(req.body);

    familia.carpeta = params.carpeta.toUpperCase();
    familia.direccion = params.direccion; 
    familia.estado = params.estado;
    familia.observaciones = params.observaciones; 
    
    // generando codigo de familia
    //var codigo = familia.nombre.charCodeAt(0)*2;
    var cadFamilia =  familia.carpeta.toUpperCase();
    var codigo = 0, i=2;
    while(cadFamilia.charCodeAt(i)){
        var temp =cadFamilia.charCodeAt(i);
        switch (temp) {
            case 209:
                codigo += 78/(i*i);
                break;
            case 193:
                codigo += 65/(i*i);
                break;
            case 201:
                codigo += 69/(i*i);
                break;
            case 205:
                codigo += 73/(i*i);
                break;
            case 211:
                codigo += 79/(i*i);
                break;
            case 218:
                codigo += 85/(i*i);
                break;
            default:
                codigo += temp/(i*i);
                break;
        }
        
        i++;
    }

    codigo=Math.trunc(codigo*6);
    //console.log(cadFamilia.charCodeAt(1));
    var temp =cadFamilia.charCodeAt(1);
    switch (temp) {
        case 209:
            codigo += (78%65)*380;
            break;
        case 193:
            codigo += (65%65)*380;
            break;
        case 201:
            codigo += (69%65)*380;
            break;
        case 205:
            codigo += (73%65)*380;
            break;
        case 211:
            codigo += (79%65)*380;
            break;
        case 218:
            codigo += (85%65)*380;
            break;
        default:
            codigo += (temp%65)*380;
            break;
    }
       
   
    if(codigo < 1000)
        var codFamilia = cadFamilia.substr(0,1) + '-0'+codigo+'-';
    else
        var codFamilia = cadFamilia.substr(0,1) + '-'+codigo+'-';
    
    familia.codigo =  codFamilia;
    console.log(codFamilia);
    FamiliaMdl.findOne({codigo:new RegExp('^'+codFamilia)}).sort({_id:-1}).exec((err,dbfamilia)=>{
        var count = 0;
        //console.log(dbfamilia);
        if(dbfamilia){
            var arrayCod = dbfamilia.codigo.split("-");
            //console.log(arrayCod);
            count = parseInt(arrayCod[2],10)+1;
        }
        
        if(codigo < 1000)
            var codFamilia = cadFamilia.substr(0,1) + '-0'+codigo+'-'+count;
        else
            var codFamilia = cadFamilia.substr(0,1) + '-'+codigo+'-'+count;
        
        familia.codigo =  codFamilia;

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
    });

}


function savePadre(req,res){
    var familiaId = req.params.id;
    var padreSave = req.body;

    FamiliaMdl.findOne({_id:familiaId},(err,familia)=>{
        if(err){
            res.status(500).send('Error en la peticion');
        }
        else{
            if(!familia){
                res.status(404).send('La familia no existe');
            }
            else{
                
                familia.padre.dni =  padreSave.dni;
                familia.padre.nombre = padreSave.nombre;
                familia.padre.apellidos = padreSave.apellidos;
                familia.padre.direccion = padreSave.direccion;
                familia.padre.celular = padreSave.celular;
                familia.padre.nota = padreSave.nota;
                familia.documentos.cdnipadre = false;

                FamiliaMdl.findByIdAndUpdate(familiaId,familia,{new:true},(err,familiaUpdate)=>{
                    if(err){
                        res.status(500).send('Error en la actualizacion');
                    }
                    else{
                        if(!familiaUpdate){
                            res.status(404).send('Familia no actulizada');
                        }
                        else{
                            res.status(200).send(familiaUpdate);
                        }
                    }

                });

            }
        }
    });
}


function saveMadre(req,res){
    var familiaId = req.params.id;
    var madreSave = req.body;

    FamiliaMdl.findOne({_id:familiaId},(err,familia)=>{
        if(err){
            res.status(500).send('Error en la peticion');
        }
        else{
            if(!familia){
                res.status(404).send('La familia no existe');
            }
            else{
                
                familia.madre.dni =  madreSave.dni;
                familia.madre.nombre = madreSave.nombre;
                familia.madre.apellidos = madreSave.apellidos;
                familia.madre.direccion = madreSave.direccion;
                familia.madre.celular = madreSave.celular;
                familia.madre.nota = madreSave.nota; 
                familia.documentos.cdnimadre = false;

                FamiliaMdl.findByIdAndUpdate(familiaId,familia,{new:true},(err,familiaUpdate)=>{
                    if(err){
                        res.status(500).send('Error en la actualizacion');
                    }
                    else{
                        if(!familiaUpdate){
                            res.status(404).send('Familia no actulizada');
                        }
                        else{
                            res.status(200).send(familiaUpdate);
                        }
                    }

                });

            }
        }
    }); 
}

function saveApoderado(req,res){
    var familiaId = req.params.id;
    var apoderadoSave = req.body;

    FamiliaMdl.findOne({_id:familiaId},(err,familia)=>{
        if(err){
            res.status(500).send('Error en la peticion');
        }
        else{
            if(!familia){
                res.status(404).send('La familia no existe');
            }
            else{
                
                familia.apoderado.dni =  apoderadoSave.dni;
                familia.apoderado.nombre = apoderadoSave.nombre;
                familia.apoderado.apellidos = apoderadoSave.apellidos;
                familia.apoderado.celular = apoderadoSave.celular;
                familia.apoderado.direccion = apoderadoSave.direccion;
                familia.apoderado.relacion = apoderadoSave.relacion;
                familia.apoderado.nota = apoderadoSave.nota;
                familia.documentos.cdniapoderado = false;

                FamiliaMdl.findByIdAndUpdate(familiaId,familia,{new:true},(err,familiaUpdate)=>{
                    if(err){
                        res.status(500).send('Error en la actualizacion');
                    }
                    else{
                        if(!familiaUpdate){
                            res.status(404).send('Familia no actulizada');
                        }
                        else{
                            res.status(200).send(familiaUpdate);
                        }
                    }

                });

            }
        }
    }); 
}

function saveFamiliaDoc(req,res){
    var familiaId = req.params.id;
    var familiaDoc = req.body;
    FamiliaMdl.findOne({_id:familiaId},(err,familia)=>{
        if(err){
            res.status(500).send('Error en la peticion');
        }
        else{
            if(!familia){
                res.status(404).send('La familia no existe');
            }
            else{
                familia.documentos.folder = familiaDoc.folder;
                familia.documentos.cdnipadre = familiaDoc.cdnipadre;
                familia.documentos.cdnimadre =familiaDoc.cdnimadre;
                familia.documentos.cdniapoderado = familiaDoc.cdniapoderado;
                familia.documentos.djurada = familiaDoc.djurada;
                
                FamiliaMdl.findByIdAndUpdate(familiaId,familia,{new:true},(err,familiaUpdate)=>{
                    if(err){
                        res.status(500).send('Error en la actualizacion');
                    }
                    else{
                        if(!familiaUpdate){
                            res.status(404).send('Familia no actulizada');
                        }
                        else{
                            res.status(200).send(familiaUpdate);
                        }
                    }

                });
            }
        }
    });
}

// actualizacion de datos generales de familia
function updateFamilia(req,res){
    var familiaId = req.params.id;
    var familiaUpdate = req.body;
    
    FamiliaMdl.findOne({_id:familiaId},(err,familia)=>{
        if(err){
            res.status(500).send('Error en la peticion');
        }
        else{
            if(!familia){
                res.status(404).send('La familia no existe');
            }
            else{
                

                FamiliaMdl.findByIdAndUpdate(familiaId,familiaUpdate,{new:true},(err,familiaStored)=>{
                    if(err){
                        res.status(500).send('Error en la actualizacion');
                    }
                    else{
                        if(!familiaStored){
                            res.status(404).send('Familia no actulizada');
                        }
                        else{
                            res.status(200).send(familiaStored);
                        }
                    }

                });
            }
        }
    });
    
}
// eliminacion de una familia
// se elimina familia, se elimina estudiantes
function deleteFamilia(req,res){
    var id = req.params.id;
    EstudianteMdl.deleteMany({familia:id},(err)=>{
        if(err){
            res.status(500).send('Error en la eliminacion');
        }
        else{
            FamiliaMdl.deleteOne({_id:id},(err)=>{
                if(err){
                    res.status(500).send('Error en la eliminacion');
                }
                else{
                    res.status(200).send({message:'Familia eliminada'});
                }
            });
        }
    });
}
//eliminar padre
function deletePadre(req,res){
    var id = req.params.id;
    var familiaUpdate = {$unset:{padre:null, 'documentos.cdnipadre':null}};
    FamiliaMdl.findByIdAndUpdate(id, familiaUpdate,{new:true}, (err,familiaStored)=>{
        if(err){
            res.status(500).send('Error en la actualizacion');
        }
        else{
            if(!familiaStored){
                res.status(404).send('Familia no actulizada');
            }
            else{
                res.status(200).send(familiaStored);
            }
        }
    });
    
}
//eliminar madre
function deleteMadre(req,res){
    var id = req.params.id;
    var familiaUpdate = {$unset:{madre:null, 'documentos.cdnimadre':null}};
    FamiliaMdl.findByIdAndUpdate(id, familiaUpdate,{new:true}, (err,familiaStored)=>{
        if(err){
            res.status(500).send('Error en la actualizacion');
        }
        else{
            if(!familiaStored){
                res.status(404).send('Familia no actulizada');
            }
            else{
                res.status(200).send(familiaStored);
            }
        }
    });
}
//eliminar apoderado
function deleteApoderado(req,res){
    var id = req.params.id;
    var familiaUpdate = {$unset:{apoderado:null,'documentos.cdniapoderado':null}};
    FamiliaMdl.findByIdAndUpdate(id, familiaUpdate,{new:true}, (err,familiaStored)=>{
        if(err){
            res.status(500).send('Error en la actualizacion');
        }
        else{
            if(!familiaStored){
                res.status(404).send('Familia no actulizada');
            }
            else{
                res.status(200).send(familiaStored);
            }
        }
    });
}

function deleteDocumentos(req,res){
    var id = req.params.id;
    var familiaUpdate = {$unset:{documentos:null}};
    FamiliaMdl.findByIdAndUpdate(id, familiaUpdate,{new:true}, (err,familiaStored)=>{
        if(err){
            res.status(500).send('Error en la actualizacion');
        }
        else{
            if(!familiaStored){
                res.status(404).send('Familia no actulizada');
            }
            else{
                res.status(200).send(familiaStored);
            }
        }
    }); 
}

module.exports={
    getFamilias,
    saveFamilia, 
    getFamilia,
    savePadre, saveMadre, saveApoderado,
    saveFamiliaDoc,
    updateFamilia,
    deleteFamilia,
    deletePadre, deleteMadre, deleteApoderado, deleteDocumentos
}