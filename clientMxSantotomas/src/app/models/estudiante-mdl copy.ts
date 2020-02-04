export class EstudianteMdl {
    constructor(
    public _id:string,
    public dni:String,
    public apellidos:String,
    public nombre:String,
    public sexo:String,

    //Referencias para los estudiantes
    public  referencia:{
        primero:{
            year:String,
            seccion:String,
            puntos:String,
            promedio:String,
            colegio:string,
            certificado:Boolean
        },
        segundo:{
            year:String,
            seccion:String,
            puntos:String,
            promedio:String,
            colegio:string,
            certificado:Boolean
        },
        tercero:{
            year:String,
            seccion:String,
            puntos:String,
            promedio:String,
            colegio:string,
            certificado:Boolean
        },
        cuarto:{
            year:String,
            seccion:String,
            puntos:String,
            promedio:String,
            colegio:string,
            certificado:Boolean
        },
        quinto:{
            year:String,
            seccion:String,
            puntos:String,
            promedio:String,
            colegio:string,
            certificado:Boolean
        }
    },

    public primaria:{
        promocion:String,
        escuela:string; 
        certificado:Boolean
    },

    // Vinculacion con una familia
    public  familia:string,
       
    

    //Dependiendo del tiempo se puede implementar para digitalizar toda la informacion
    public  documentos:{
        folder:boolean,
        copia_dni:Boolean,
        partida_nacimiento:Boolean,
        ficha_matricula:Boolean,
        ficha_seguro:Boolean,
        certificado_primaria:Boolean,
        traslado:{
            certificado:Boolean;
            resolucion:Boolean;
            boleta_notas:Boolean;
        }
    },

    public QRCode:String,
    public imagen:String,

    public fecha_nacimiento:String,
    public seguro:String,  //sis || essalud
    public estado: String,  // activo|| pendiente || Retirado || traslado || egresado
    public matricula:String,  //Situacion al 2019 Ratificado || reciente
    public siagie:String,  // true  registrado en Siagie || false  falta registrar

    public observaciones:String
    ){}
}

