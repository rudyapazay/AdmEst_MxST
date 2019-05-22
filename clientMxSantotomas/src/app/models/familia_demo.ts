export class familiasDemo{
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
    public direccion:String;
    public observaciones:String;
    public estado:String;

    constructor(){
        this.codigo = "";
        this.madre.apellidos= "";
    }
}