'use strict'

var express = require('express');

var estudiante_ctrl = require("../controllers/estudiante.controller")


const estudiante_router = express.Router();


estudiante_router.route('/estudiantes').get(estudiante_ctrl.getEstudiantes);
estudiante_router.route('/estudiantes/familia/:id').get(estudiante_ctrl.getEstudiantesByFamilia);
estudiante_router.route('/estudiante').post(estudiante_ctrl.saveEstudiante);
estudiante_router.route('/estudiante/:id').get(estudiante_ctrl.getEstudiante);

//devolver con QRCode estudiante
estudiante_router.route('/estudiante/QRCode/:id').get(estudiante_ctrl.getEstudianteQRCode);

//actuliazacion de informacion de los estudiantes
//estudiante_router.route('/estudiante/:id').put(estudiante_ctrl.updateEstudiante);
estudiante_router.route('/estudiante/update/:id').put(estudiante_ctrl.updateEstudianteBasica);

//actuliazacion de los documentos
estudiante_router.route('/estudiante/documentos/:id').put(estudiante_ctrl.saveDocumentos);

//actulizacion de los grados
estudiante_router.route('/estudiante/:grado/:id').put(estudiante_ctrl.updateReferencia);

//sacar estudiantes por grado y seccion
estudiante_router.route('/estudiantes/:grado/:seccion').get(estudiante_ctrl.getEstudiantesGradoSeccion);

module.exports = estudiante_router;