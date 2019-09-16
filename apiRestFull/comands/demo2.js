'use strict'

var mongoose = require('mongoose');

var EstudianteMDL = require('../models/estudiante.model');
var FamiliaMDL = require('../models/familia.model');

mongoose.connect('mongodb://localhost:27017/appAdmEstMxST',{useNewUrlParser: true}, (err,res)=>{
    if(err){
        throw err;
    }
    else{
        /**/
        FamiliaMDL.find().populate({path:'estudiante'}).limit(1).exec((err, familia)=>{
          console.log(result);
          console.log(familia);
        });
        /**/
       /*EstudianteMDL.find().populate({path:'familia'}).limit(1).exec((err, estudiante)=>{
         console.log(estudiante);
       })
       */
    }
});