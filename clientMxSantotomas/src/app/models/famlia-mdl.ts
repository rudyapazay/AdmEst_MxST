import { EstudianteMdl } from './estudiante-mdl';


export class FamiliaMdl {
    
        public _id:string;
        public codigo:String;
        public carpeta:String;
        
        public madre:{
            dni:String;
            nombre:String;
            apellidos:String;
            celular:String;
            direccion:String;
            nota:String
        };
        public padre:{
            dni:String;
            nombre:String;
            apellidos:String;
            celular:String;
            direccion:String;
            nota:String
        };
        public apoderado:{
            dni:String;
            nombre:String;
            apellidos:String;
            celular:String;
            direccion:String;
            relacion:String;
            nota:String
        };
        //documentos que se tiene de los padres
        public documentos:{
            folder:Boolean;
            cdnipadre:Boolean;
            cdnimadre:Boolean;
            cdniapoderado:Boolean;
            djurada:Boolean
        };
        
        public faena:String;

        public direccion:String;
        public observaciones:String;
        public estado:String;

        
        //inicializacion del modelo
    constructor(){

        this._id="";
        this.codigo="";
        this.carpeta="";
        
        this.madre = {
            dni:"",
            nombre:"",
            apellidos:"",
            celular:"",
            direccion:"",
            nota:""
        };
        this.padre ={
            dni:"",
            nombre:"",
            apellidos:"",
            celular:"",
            direccion:"",
            nota:"",
        };
        this.apoderado = {
            dni:"",
            nombre:"",
            apellidos:"",
            celular:"",
            direccion:"",
            relacion:"",
            nota:""
        };
        //documentos que se tiene de los padres
        this.documentos= {
            folder:false, 
            cdnipadre:false,
            cdnimadre:false,
            cdniapoderado:false,
            djurada:false
        };
        
        
        this.faena="";

        this.direccion="";
        this.observaciones="";
        this.estado="";
    }
}
