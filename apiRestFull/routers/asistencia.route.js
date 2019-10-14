'use strict'

var express = require('express');

var asistenciaCtrl = require("../controllers/asistencia.controller");
var astRegXOCtrl = require("../controllers/asistencia/AsitenciaRegXO");
var astAdmCtrl = require("../controllers/asistencia/asistenciaAdm");
var astRptCtrl = require("../controllers/asistencia/asistenciaRep");

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

//administracion
asistenciaRtr.route('/asistencia/admin/iniciar/').get(astAdmCtrl.iniciarDia); 

//reportes de asistencia
//asistenciaRtr.route('/asistencia/reporte/dia/general').get(astRptCtrl.reportFaltaDia);
asistenciaRtr.route('/asistencia/reporte/dia/general').get(astRptCtrl.reporteDiaGeneral);
asistenciaRtr.route('/asistencia/reporte/dia/seccion').get(astRptCtrl.reporteDiaSeccion);

module.exports = asistenciaRtr ;