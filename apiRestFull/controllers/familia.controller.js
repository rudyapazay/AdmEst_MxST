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
                console.log(familia);
                res.status(200).send({familia});
            }
        }
    });
}

function saveFamilia(req,res){
    var familia = new FamiliaMdl();
    var params = req.body;
    // asignando valores a la carga
    
    familia.nombre = params.nombre.toUpperCase();
    familia.direccion = params.direccion; 
    familia.estado = params.estado;
    familia.observaciones = params.observaciones; 
    
    // generando codigo de familia
    //var codigo = familia.nombre.charCodeAt(0)*2;
    var cadFamilia =  familia.nombre.toUpperCase();
    var codigo = 0, i=1;
    while(cadFamilia.charCodeAt(i)){
        codigo += cadFamilia.charCodeAt(i)/(i*i);
         i++;
    }
    codigo=Math.trunc(codigo*100);
    codigo -= 10000;
    
    FamiliaMdl.countDocuments({nombre:familia.nombre},(err,count)=>{
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
                familia.padre.celular = padreSave.celular;

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
                familia.madre.celular = madreSave.celular;
                
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


module.exports={
    getFamilias,
    saveFamilia, 
    getFamilia,
    savePadre,
    saveMadre,
    saveApoderado
}