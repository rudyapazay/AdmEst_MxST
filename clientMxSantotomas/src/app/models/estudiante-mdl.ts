import { FamiliaMdl } from './famlia-mdl';


export class EstudianteMdl {
  
    
    public _id:string;
    public dni:String;
    public apellidos:String;
    public nombre:String;
    public sexo:String;

    public familia:FamiliaMdl;
    //Referencias para los estudiantes
    public  referencia:{
        primero:{
            year:String;
            seccion:String;
            puntos:String;
            promedio:String;
            colegio:string;
            certificado:Boolean
        };
        segundo:{
            year:String;
            seccion:String;
            puntos:String;
            promedio:String;
            colegio:string;
            certificado:Boolean
        };
        tercero:{
            year:String;
            seccion:String;
            puntos:String;
            promedio:String;
            colegio:string;
            certificado:Boolean
        };
        cuarto:{
            year:String;
            seccion:String;
            puntos:String;
            promedio:String;
            colegio:string;
            certificado:Boolean
        };
        quinto:{
            year:String;
            seccion:String;
            puntos:String;
            promedio:String;
            colegio:string;
            certificado:Boolean
        }
    };

    public primaria:{
        promocion:String;
        escuela:string; 
        certificado:Boolean
    };

    // Vinculacion con una familia
    
    //Dependiendo del tiempo se puede implementar para digitalizar toda la informacion
    public  documentos:{
        folder:boolean;
        copia_dni:Boolean;
        partida_nacimiento:Boolean;
        ficha_matricula:Boolean;
        ficha_seguro:Boolean;
        certificado_primaria:Boolean;
        traslado:{
            certificado:Boolean;
            resolucion:Boolean;
            boleta_notas:Boolean;
        }
    };

    public QRCode:String;
    public imagen:String;

    public fnacimiento:String;
    public seguro:String;  //sis || essalud
    public estado: String;  // activo|| pendiente || Retirado || traslado || egresado
    public matricula:String;  //Situacion al 2019 Ratificado || reciente
    public siagie:String;  // true  registrado en Siagie || false  falta registrar

    public observaciones:String

    constructor(){
    
        this._id = "";
        this.dni = "";
        this.apellidos = "";
        this.nombre = "";
        this.sexo= "";

        //Referencias para los estudiantes
        this.referencia = {
            primero:{
                year: "",
                seccion:"",
                puntos:"",
                promedio:"",
                colegio:"",
                certificado:false
            },
            segundo:{
                year: "",
                seccion:"",
                puntos:"",
                promedio:"",
                colegio:"",
                certificado:false
            },
            tercero:{
                year: "",
                seccion:"",
                puntos:"",
                promedio:"",
                colegio:"",
                certificado:false
            },
            cuarto:{
                year: "",
                seccion:"",
                puntos:"",
                promedio:"",
                colegio:"",
                certificado:false
            },
            quinto:{
                year: "",
                seccion:"",
                puntos:"",
                promedio:"",
                colegio:"",
                certificado:false
            }
        };

        this.primaria = {
            promocion:"",
            escuela:"", 
            certificado:true
        };

        // Vinculacion con una familia
        this.familia = new FamiliaMdl();
        
        

        //Dependiendo del tiempo se puede implementar para digitalizar toda la informacion
        this.documentos = {
            folder:false,
            copia_dni:false,
            partida_nacimiento:false,
            ficha_matricula:false,
            ficha_seguro:false,
            certificado_primaria:false,
            traslado:{
                certificado:false,
                resolucion:false,
                boleta_notas:false,
            }
        };

        this.QRCode = "";
        this.imagen = "";

        this.fnacimiento = "";
        this.seguro = "";  //sis || essalud
        this.estado= "";  // activo|| pendiente || Retirado || traslado || egresado
        this.matricula= "";  //Situacion al 2019 Ratificado || reciente
        this.siagie= "";  // true  registrado en Siagie || false  falta registrar

        this.observaciones= ""
    }
}

