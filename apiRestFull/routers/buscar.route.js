'use strict'

var express = require('express');

var BuscarCtrl = require('../controllers/buscar.controller');

var buscarRtr = express.Router();

buscarRtr.route('/buscar/familia/:data').get(BuscarCtrl.getFamilias);
buscarRtr.route('/buscar/estudiante/:data').get(BuscarCtrl.getEstudiantes);

module.exports = buscarRtr;