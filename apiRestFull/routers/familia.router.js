'use strict'

var express = require('express');

var familia_controller = require('../controllers/familia.controller');


const familia_router = express.Router();

familia_router.route('/familias').get(familia_controller.getFamilias);


module.exports = familia_router;