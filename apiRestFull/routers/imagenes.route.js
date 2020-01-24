'use strict'

const express = require('express');

var imagenCtrl = require('../controllers/imagenes.controller');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: './uploads'});
 
const imagenRtr = express.Router();

imagenRtr.route('/imagenes/sistema/:imagen').get(multipartMiddleware, imagenCtrl.getImagenSystem);

module.exports = imagenRtr;