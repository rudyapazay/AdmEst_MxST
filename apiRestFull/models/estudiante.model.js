'use string'

var mongoose= require('mongoose');
var Schema = mongoose.Schema;

var EstudianteSchema = Schema({
    dni:String,
    apellidos:String,
    nombre:String,

    //Cuando llegue CIST se registrara los estudios de los estudiantes
    referencia:{
        primero:{
            year:String,
            seccion:String,
            colegio:{type:Schema.ObjectId,ref:'IEducativa'},
            certificado:String
        },
        segundo:{
            year:String,
            seccion:String,
            colegio:{type:Schema.ObjectId,ref:'IEducativa'},
            certificado:String
        },
        tercero:{
            year:String,
            seccion:String,
            colegio:{type:Schema.ObjectId,ref:'IEducativa'},
            certificado:String
        },
        cuarto:{
            year:String,
            seccion:String,
            colegio:{type:Schema.ObjectId,ref:'IEducativa'},
            certificado:String
        },
        quinto:{
            year:String,
            seccion:String,
            colegio:{type:Schema.ObjectId,ref:'IEducativa'},
            certificado:String
        }
    },
    primaria:{
        promocion:String,
        escuela:{type:Schema.ObjectId,ref:'IEducativa'},
        certificado:String
    },

    // Vinculacion con una familia
    familia: {type:Schema.ObjectId, ref:'Familia'},
       
    // Bandera para corregir despues mediante terminal
    traslado_anterior:Boolean,

    //Dependiendo del tiempo se puede implementar para digitalizar toda la informacion
    partida_nacimiento:Boolean,
    ficha_matricula:Boolean,
    sis:Boolean,
    imagen:String,
    estado: String, //  Activo || Retirado || trasladado || Concluido
    matricula:String, //Situacion al 2019 Ratificado || traslado
    observaciones:String
});

module.exports = mongoose.model('Estudiante', EstudianteSchema);

