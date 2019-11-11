'use strict'
const express = require('express');

var ReciboCtrl = require('../controllers/Recibo.controller');

const ReciboRtr = express.Router();

//declara un parametro 
ReciboRtr.route('/recibo/registrar/:familia').post(ReciboCtrl.saveRecibo);
ReciboRtr.route('/recibos').get(ReciboCtrl.getRecibos);
ReciboRtr.route('/recibo/faltas/familias').get(ReciboCtrl.getFamiliasFalta);

module.exports = ReciboRtr;