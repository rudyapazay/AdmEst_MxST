export class EstudianteRegMdl {
    constructor(
        public dni:string,
        public apellidos:string,
        public nombre: string,
        public familia:string,
        public traslado_anterior:string,
        public partida_nacimiento:string,
        public ficha_matricula:string,
        public sis:string,
        public estado:string,
        public matricula:string,
        public observaciones:string,
        public grado:string,
        public seccion:string
    ){}
}
