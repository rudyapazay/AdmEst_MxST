'use strict'

var express = require('express');

var estudiante_ctrl = require("../controllers/estudiante.controller")


const estudiante_router = express.Router();


estudiante_router.route('/estudiantes').get(estudiante_ctrl.getEstudiantes);
estudiante_router.route('/estudiantes/familia/:id').get(estudiante_ctrl.getEstudiantesByFamilia);
estudiante_router.route('/estudiante').post(estudiante_ctrl.saveEstudiante);
estudiante_router.route('/estudiante/:id').get(estudiante_ctrl.getEstudiante);

//actuliazacion de informacion basica de los estudiantes
estudiante_router.route('/estudiante/:id').put(estudiante_ctrl.updateEstudiante);

//actuliazacion de los documentos
estudiante_router.route('/estudiante/documentos/:id').put(estudiante_ctrl.saveDocumentos);

//actulizacion de los grados
estudiante_router.route('/estudiante/:grado/:id').put(estudiante_ctrl.updateReferencia);

module.exports = estudiante_router;