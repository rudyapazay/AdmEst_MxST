import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable} from 'rxjs';
import { GLOBAL } from './global';


@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  private url:string;

  constructor(
    private _http:HttpClient
  ) {
    this.url = GLOBAL.url
   }

   entradaDiaGeneral():Observable<any>{
     return this._http.get(this.url+'asistencia/resumen/entrada/general');
    
   }
   entradaSeccionGeneral():Observable<any>{
     return this._http.get(this.url+'asistencia/reporte/entrada/general');
   }

  //('/asistencia/reporte/entrada/seccion/:grado/:seccion').get(astRptSecCtrl.reporteEntradaSeccion);
   entradaGradoSeccion(grado:any, seccion:any):Observable<any>{
    return this._http.get(this.url+'asistencia/reporte/entrada/seccion/'+grado+'/'+seccion);
   }

   //asistencia de estudiantes
   asistenciaEstudiante(id:any):Observable<any>{
     return this._http.get(this.url+'asistencia/estudiante/'+id);
   }

   //inciar asistencia
   asistenciaIniciarDia():Observable<any>{
     return this._http.get(this.url+'asistencia/admin/iniciar');
   }
}
