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
            nota:string
        },
        public padre:{
            dni:String,
            nombre:String,
            apellidos:String,
            celular:String,
            direccion:String,
            nota:string
        },
        public apoderado:{
            dni:String,
            nombre:String,
            apellidos:String,
            celular:String,
            direccion:string,
            relacion:String,
            nota:string
        },
        public direccion:String,
        public observaciones:String,
        public estado:String
    ){}
}
