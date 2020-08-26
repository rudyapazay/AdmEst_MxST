'use strict'

var mongoose = require('mongoose');

var port = process.env.PORT || 3700;

var app = require('./app');

var mongoURI= 'mongodb://localhost:27017';
mongoose.connect('mongodb://localhost:27017/appAdmEstMxST',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err,res)=>{
    if(err){
        throw err;
    }
    else{
        console.log("Base de datos funcionando correctamente...");

        app.listen(port, () => {
             console.log(`Listening on port ${port}...`);
        });
        
    }
});

mongoose.set('useFindAndModify', false);

