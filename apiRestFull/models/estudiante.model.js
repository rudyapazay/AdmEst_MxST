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
        escuela:{type:Schema.ObjectId,ref:'IEducativa'}
    },

    // Vinculacion con una familia
    familia: {type:Schema.ObjectId, ref:'Familia'},
       
    //Dependiendo del tiempo se puede implementar para digitalizar toda la informacion
    documentos:{
        folder:Boolean,
        copia_dni:Boolean,
        partida_nacimiento:Boolean,
        ficha_matricula:Boolean,
        ficha_seguro:Boolean,
        certificado_primaria:Boolean,
        traslado:{
            certificado:Boolean,
            resolucion:Boolean,
            boleta_notas:Boolean
        }
    },

    QRCode:String,
    imagen:String,
    
    fnacimiento:Date, //fecha de nacimiento
    seguro:String,  // sis || essalud || no tiene
    estado: String,  // activo || pendiente || retirado || traslado || egresado(solo promociones)  ** se cambia en cada año 
    matricula:String,  //Situacion al 2019 ratificado || reciente   ** se cambiara en cada año
    siagie:Boolean,  // true - registrado Siagie || false -falta registrar ** se cambiara en cada año 
    observaciones:String

});

module.exports = mongoose.model('Estudiante', EstudianteSchema);

