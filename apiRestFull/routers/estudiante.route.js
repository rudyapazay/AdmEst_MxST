'use strict'

var express = require('express');


const estudiante_router = express.Router();


estudiante_router.route('/estudiantes')
    .get((req,res)=>{
        res.send('Lista de estudiantes');
    });

module.exports = estudiante_router;