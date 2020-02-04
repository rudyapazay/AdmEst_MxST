'use strict'

const express = require('express'); 
var administracionCtrl = require('../controllers/administracion.controller');
var administracionRtr = express.Router();

administracionRtr.route('/server/mantenimiento/bbdd').get(administracionCtrl.bbddMatenimiento);


module.exports = administracionRtr;