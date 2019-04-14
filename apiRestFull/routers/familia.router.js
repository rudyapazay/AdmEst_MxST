'use strict'

var express = require('express');

var familia_ctl = require('../controllers/familia.controller');


const familia_router = express.Router();


familia_router.route('/familias').get(familia_ctl.getFamilias);
familia_router.route('/familia').post(familia_ctl.saveFamilia);
familia_router.route('/familia/:id/').get(familia_ctl.getFamilia);

//agregando a los padres de familia
familia_router.route('/familia/padre/:id').put(familia_ctl.savePadre);
familia_router.route('/familia/madre/:id').put(familia_ctl.saveMadre);

//agregando al tutor 
familia_router.route('/familia/apoderado/:id').put(familia_ctl.saveApoderado);

//considerar para casos que un padre de familia es tambien apoderado 
// de otro sobrino




module.exports = familia_router;