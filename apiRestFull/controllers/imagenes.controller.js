//recuperacion de imagenes 
'use strict'

var path = require('path');
var fs = require('fs');

function getImagenSystem(req,res){
    var imgFile = req.params.imagen;

    fs.exists('./imagenes/sistema/'+imgFile, (exists)=>{
        if(exists){
            res.sendFile(path.resolve('./imagenes/sistema/'+imgFile));
        }
        else{
            res.status(200).send({message:'no existe imagen'});
        }
    });

};

module.exports = {
    getImagenSystem
}