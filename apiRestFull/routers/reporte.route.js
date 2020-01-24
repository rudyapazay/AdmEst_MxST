'use strict'

const express = require('express');

var reportEstudianteCtrl = require('../controllers/estudiantes/reporte.controller');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: './uploads'});
 
const reporteRtr = express.Router();

reporteRtr.route('/estudiantes/reporte/pdf/grado/:grado')
    .get(multipartMiddleware, reportEstudianteCtrl.pdfEstudianteByGrado);

module.exports = reporteRtr;