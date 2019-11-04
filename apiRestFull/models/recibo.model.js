'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;   

var ReciboSchema = Schema({
  familia: {type:Schema.ObjectId, ref:'Familia'},
  fecha:Date,
  boleta:String,
  monto:Number
});

module.exports = mongoose.model('Recibo', ReciboSchema);