import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable} from 'rxjs';
import { GLOBAL } from './global';
import { ThrowStmt } from '@angular/compiler';


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

   //fechas laboradas por mes
   asistenciaDiasLaborados(mes:any):Observable<any>{
     return this._http.get(this.url+'asistencia/dias/laborados/'+mes);
   }

   //Mostrar asistencia de dia y estudiantes
   asistenciasEstudianteDia(est:any, dia:any):Observable<any>{
     return this._http.get(this.url+'asistencia/estudiante/'+est+'/'+dia);
   }
   //Recuperar asistencia por meses, grado y seccion
   //asistencia/reporte/mensual/10/quinto/C
   asistenciaMensualGradoSeccion(mes:any, grado:any, seccion:any):Observable<any>{
     return this._http.get(this.url+'asistencia/reporte/mensual/'+mes+'/'+grado+'/'+seccion);
   }
}
