'use strict'

const express = require('express');

var reportEstudianteCtrl = require('../controllers/estudiantes/reporte.controller');
var reporteCtrl = require('../controllers/reporte.controller');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: './uploads'});
 
const reporteRtr = express.Router();

reporteRtr.route('/estudiantes/reporte/pdf/grado/:grado')
    .get(multipartMiddleware, reportEstudianteCtrl.pdfEstudianteByGrado);

    reporteRtr.route('/reporte/generar/familias/padron').get(reporteCtrl.generarPadronFamilias);
    reporteRtr.route('/reporte/descargar/familias/padron').get(multipartMiddleware, reporteCtrl.descargarPadronFamilias);

module.exports = reporteRtr;