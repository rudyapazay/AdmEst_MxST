'use strict'

var express = require('express');

var familia_ctl = require('../controllers/familia.controller');


const familia_router = express.Router();


familia_router.route('/familias').get(familia_ctl.getFamilias);
familia_router.route('/familia/:id/').get(familia_ctl.getFamilia);

// creando una familia
familia_router.route('/familia').post(familia_ctl.saveFamilia);
//guardar documentos de una familia
familia_router.route('/familia/documentos/:id').put(familia_ctl.saveFamiliaDoc);

//agregando o actualizando a los padres de familia
familia_router.route('/familia/padre/:id').put(familia_ctl.savePadre);
familia_router.route('/familia/madre/:id').put(familia_ctl.saveMadre);

//agregando  o actulizando al apoderado
familia_router.route('/familia/apoderado/:id').put(familia_ctl.saveApoderado);

//actualizando una familia
familia_router.route('/familia/:id').put(familia_ctl.updateFamilia);

//eliminando 
familia_router.route('/familia/:id').delete(familia_ctl.deleteFamilia);




module.exports = familia_router;