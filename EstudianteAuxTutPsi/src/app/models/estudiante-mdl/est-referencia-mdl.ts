export class EstReferenciaMdl {
    constructor(
        public primero:{
            year:String,
            seccion:String,
            puntos:String,
            promedio:String,
            //colegio:{type:Schema.ObjectId,ref:'IEducativa'},
            certificado:Boolean
        },
        public segundo:{
            year:String,
            seccion:String,
            puntos:String,
            promedio:String,
            //colegio:{type:Schema.ObjectId,ref:'IEducativa'},
            certificado:Boolean
        },
        public tercero:{
            year:String,
            seccion:String,
            puntos:String,
            promedio:String,
            //colegio:{type:Schema.ObjectId,ref:'IEducativa'},
            certificado:Boolean
        },
        public cuarto:{
            year:String,
            seccion:String,
            puntos:String,
            promedio:String,
            //colegio:{type:Schema.ObjectId,ref:'IEducativa'},
            certificado:Boolean
        },
        public quinto:{
            year:String,
            seccion:String,
            puntos:String,
            promedio:String,
            //colegio:{type:Schema.ObjectId,ref:'IEducativa'},
            certificado:Boolean
        }
    ){}
}
