'use strict'

var express = require('express');

var asistenciaCtrl = require("../controllers/asistencia.controller");

var asistenciaRtr = express.Router();
//pruebas de la conexion
asistenciaRtr.route('/asistencia/registrar/entrada/').get(asistenciaCtrl.registrarAsistencia);
//registro de asistencia
asistenciaRtr.route('/asistencia/registrar/entrada/:uniforme/:id').get(asistenciaCtrl.registrarAsistencia);
asistenciaRtr.route('/asistencia/registrar/almuerzo/:id').get(asistenciaCtrl.registrarAsistencia);
asistenciaRtr.route('/asistencia/registrar/retorno/:uniforme/:id').get(asistenciaCtrl.registrarAsistencia);
asistenciaRtr.route('/asistencia/registrar/salida/:id').get(asistenciaCtrl.registrarAsistencia);

//reportes 
asistenciaRtr.route('/asistencias/').get(asistenciaCtrl.getAsistencias);


module.exports = asistenciaRtr ;