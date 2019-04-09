'use strict'

var express = require('express');

var app = express();

const familia_router = require('./routers/familia.router');
const estudiante_router = require('./routers/estudiante.route');
const responsable_router = require('./routers/responsable.route');

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
app.use('/api/',responsable_router);



module.exports = app;