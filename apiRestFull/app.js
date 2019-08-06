'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

const familia_router = require('./routers/familia.router');
const estudiante_router = require('./routers/estudiante.route');
const buscarRtr = require('./routers/buscar.route');
const ieducativaRtr = require('./routers/ieducativa.route');
const asistenciaRtr = require('./routers/asistencia.route');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//configuracion global de paginas
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','X-API-KEY, Origin, X-Requested-With,Content-Type,Accept,Access-Control-Request-Method');
    res.header('Access-Control-Allow-Methods','GET,POST, OPTIONS, PUT, DELETE');
    res.header('Allow','GET,POST, OPTIONS, PUT, DELETE');

    next();
});


app.use('/api/',familia_router);
app.use('/api/', estudiante_router);
app.use('/api/', buscarRtr);
app.use('/api/',ieducativaRtr);
app.use('/api/', asistenciaRtr);

module.exports = app;