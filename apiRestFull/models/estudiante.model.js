'use string'

var mongoose= require('mongoose');
var Schema = mongoose.Schema;

var EstudianteSchema = Schema({
    dni:String,
    apellidos:String,
    nombre:String,
    sexo:String,

    //Referencias para los estudiantes
    referencia:{
        primero:{
            year:String,
            seccion:String,
            puntos:String,
            promedio:String,
            colegio:{type:Schema.ObjectId,ref:'IEducativa'},
            certificado:Boolean
        },
        segundo:{
            year:String,
            seccion:String,
            puntos:String,
            promedio:String,
            colegio:{type:Schema.ObjectId,ref:'IEducativa'},
            certificado:Boolean
        },
        tercero:{
            year:String,
            seccion:String,
            puntos:String,
            promedio:String,
            colegio:{type:Schema.ObjectId,ref:'IEducativa'},
            certificado:Boolean
        },
        cuarto:{
            year:String,
            seccion:String,
            puntos:String,
            promedio:String,
            colegio:{type:Schema.ObjectId,ref:'IEducativa'},
            certificado:Boolean
        },
        quinto:{
            year:String,
            seccion:String,
            puntos:String,
            promedio:String,
            colegio:{type:Schema.ObjectId,ref:'IEducativa'},
            certificado:Boolean
        }
    },

    primaria:{
        promocion:String,
        escuela:{type:Schema.ObjectId,ref:'IEducativa'},
        certificado:Boolean
    },

    // Vinculacion con una familia
    familia: {type:Schema.ObjectId, ref:'Familia'},
       
    //flag para grado actual
    grado_actual:String,

    //Dependiendo del tiempo se puede implementar para digitalizar toda la informacion
    documentos:{
        folder:Boolean,
        copia_dni:Boolean,
        partida_nacimiento:Boolean,
        ficha_matricula:Boolean,
        ficha_seguro:Boolean
    },

    QRCode:String,
    
    fecha_nacimiento:String,
    seguro:String,  //sis || essalud
    estado: String,  // activo|| retirado || trasladado || concluido
    matricula:String,  //Situacion al 2019 ratificado || nuevo || pendiente
    observaciones:String

});

module.exports = mongoose.model('Estudiante', EstudianteSchema);

