export class EstudianteModelo{
    public dni:string;
    public apellidos:string;
    public nombre:string; 
    public sexo:string;
    
    constructor(){
        this.dni = "";
        this.apellidos = "";
        this.nombre = "";
        this.sexo="masculino";
    }
}