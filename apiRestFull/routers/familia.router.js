'use strict'

var express = require('express');

var familia_controller = require('../controllers/familia.controller');


const familia_router = express.Router();

familia_router.route('/familias').get(familia_controller.getFamilias);
//familia_router.route('/familia').post(familia_controller.saveFamilia);
familia_router.post('/familia',familia_controller.saveFamilia);

module.exports = familia_router;