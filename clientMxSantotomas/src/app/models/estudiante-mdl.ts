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
    public  familia: string,
       
    //flag para grado actual
    public grado_actual:String,

    //Dependiendo del tiempo se puede implementar para digitalizar toda la informacion
    public  documentos:{
        copia_dni:Boolean,
        partida_nacimiento:Boolean,
        ficha_matricula:Boolean,
        ficha_seguro:Boolean
    },

    public QRCode:String,
    public fecha_nacimiento:String,
    public seguro:String,  //sis || essalud
    public estado: String,  // Activo|| Retirado || trasladado || Concluido
    public matricula:String,  //Situacion al 2019 Ratificado || nuevo || Sin ratificar
    public observaciones:String
    ){}
}

