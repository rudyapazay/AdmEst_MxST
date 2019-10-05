'use strict'

var express = require('express');

var asistenciaCtrl = require("../controllers/asistencia.controller");
var astRegXOCtrl = require("../controllers/asistencia/AsitenciaRegXO");

var asistenciaRtr = express.Router();
//pruebas de la conexion
asistenciaRtr.route('/asistencia/registrar/entrada/').get(asistenciaCtrl.registrarAsistenciaEntrada);
//registro de asistencia
asistenciaRtr.route('/asistencia/registrar/entrada/:uniforme/:id').get(asistenciaCtrl.registrarAsistenciaEntrada);
asistenciaRtr.route('/asistencia/registrar/almuerzo/:id').get(asistenciaCtrl.registrarAsistenciaAlmuerzo);
asistenciaRtr.route('/asistencia/registrar/retorno/:uniforme/:id').get(asistenciaCtrl.registrarAsistenciaRetorno);
asistenciaRtr.route('/asistencia/registrar/salida/:id').get(asistenciaCtrl.registrarAsistenciaSalida);

//registrode asistencia en XO
asistenciaRtr.route('/asistencia/registrar/estudiante/:id').get(astRegXOCtrl.registrarAsistenciaXO);

//reportes 
asistenciaRtr.route('/asistencias/').get(asistenciaCtrl.getAsistencias);
asistenciaRtr.route('/asistencias/estudiante/:id').get(asistenciaCtrl.getAsistenciaEstudiante);

module.exports = asistenciaRtr ;