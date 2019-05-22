'use strict'
const express = require('express');

var IEducativaCtrl = require('../controllers/ieducativa.controller');

const IEducativaRtr = express.Router();

//declara un parametro 
IEducativaRtr.route('/ieducativas').get(IEducativaCtrl.getIEducativas);
IEducativaRtr.route('/ieducativa/:id').get(IEducativaCtrl.getIEducativa);
IEducativaRtr.route('/ieducativa').post(IEducativaCtrl.addIEducativa);
IEducativaRtr.route('/ieducativa/:id').put(IEducativaCtrl.updateIEducativa);
IEducativaRtr.route('/ieducativa/:id').delete(IEducativaCtrl.deleteIEducativa);
// buscar un colegio o escuela
IEducativaRtr.route('/ieducativa/buscar/:data').get(IEducativaCtrl.buscarIEducativa);

module.exports = IEducativaRtr;