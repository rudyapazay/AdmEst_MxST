'use strict'

const express = require('express'); 

const responsable_route = express.Router();

responsable_route.route('/responsables').get((req,res)=>{
    res.send('ruta de los responsables');
});


module.exports = responsable_route;