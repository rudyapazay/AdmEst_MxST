export class AsistenciaMdl {
constructor(
  public estudiante: {},
  
  public fecha:Date, //fecha de registro
  public entrada:Date,  // hora de entrada
  public salida:Date, // hora de salida, para despues
  public uniforme:String, // 1 completo || 2 sin sombrero || 3 incompleto || 4  sin uniforme
  public estado:String, // puntual, tarde, evasion, falta, permiso

  public almuerzo:{
    entrada:Date,  // hora de retorno del almuerzo
    estado:String, // puntual, tarde, evasion, falta, permiso
    uniforme:String, // 1 completo || 2 sin sombrero || 3 incompleto || 4  sin uniforme
  },

  public permisoExp: {},  //expediente del permiso 

  public resumen:{
    siagie:String, // . Asistio, F Falta, J Falta justificada, T Tardanza, U Tardanza justificada
    reporte:String, // P Puntual, F Falta, E Evasion, T Tarde, L Licencia
    uniforme: String // // C completo || SS sin sombrero || I incompleto || SU  sin uniforme
  }
  

){}
}
