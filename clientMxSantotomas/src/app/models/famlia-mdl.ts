export class FamiliaMdl {
    constructor(
        public _id:string,
        public codigo:String,
        public carpeta:String,
        
        public madre:{
            dni:String,
            nombre:String,
            apellidos:String,
            celular:String,
            direccion:String,
            nota:String
        },
        public padre:{
            dni:String,
            nombre:String,
            apellidos:String,
            celular:String,
            direccion:String,
            nota:String
        },
        public apoderado:{
            dni:String,
            nombre:String,
            apellidos:String,
            celular:String,
            direccion:String,
            relacion:String,
            nota:String
        },
        //documentos que se tiene de los padres
        public documentos:{
            cdnipadre:Boolean,
            cdnimadre:Boolean,
            cdniapoderado:Boolean,
            djurada:Boolean
        },
        
        public faena:String,

        public direccion:String,
        public observaciones:String,
        public estado:String
    ){}
}
