'use strict'

var express = require('express');

var estudiante_ctrl = require("../controllers/estudiante.controller")


const estudiante_router = express.Router();


estudiante_router.route('/estudiantes').get(estudiante_ctrl.getEstudiantes);
estudiante_router.route('/estudiantes/familia/:id').get(estudiante_ctrl.getEstudiantesByFamilia);
estudiante_router.route('/estudiante').post(estudiante_ctrl.saveEstudiante);
estudiante_router.route('/estudiante/:id').get(estudiante_ctrl.getEstudiante);

module.exports = estudiante_router;