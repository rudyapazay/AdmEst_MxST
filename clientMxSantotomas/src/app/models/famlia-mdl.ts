export class FamliaMdl {
    constructor(
        public codigo:String,
        public carpeta:String,
    
        public madre:{
            dni:String,
            nombre:String,
            apellidos:String,
            celular:String,
            direccion:String
        },
        public padre:{
            dni:String,
            nombre:String,
            apellidos:String,
            celular:String
        },
        public apoderado:{
            dni:String,
            nombre:String,
            apellido:String,
            celular:String,
            relacion:String
        },
        public direccion:String,
        public observaciones:String,
        public estado:String
    ){}
}
