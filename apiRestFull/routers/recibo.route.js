'use strict'
const express = require('express');

var ReciboCtrl = require('../controllers/Recibo.controller');

const ReciboRtr = express.Router();

//declara un parametro 
ReciboRtr.route('/recibo/registrar/:familia').post(ReciboCtrl.saveRecibo);
ReciboRtr.route('/recibos').get(ReciboCtrl.getRecibos);
ReciboRtr.route('/recibo/faltas/familias').get(ReciboCtrl.getFamiliasFalta);
ReciboRtr.route('/recibo/familia/estudiante/recibo').get(ReciboCtrl.getFamiliaEstudianteRecibo);
ReciboRtr.route('/recibos/reporte').get(ReciboCtrl.getRecibosFamiliaEstudiante);

module.exports = ReciboRtr;