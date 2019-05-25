import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  
  public url:string;

  constructor(
    private _http:HttpClient
  ) { 
    this.url = GLOBAL.url;
  }

  // traer todos los estudiantes
  getEstudiantes():Observable<any>{
    return this._http.get(this.url+"estudiantes");
  }

  // traer todos los estudiantes de una familia
  getEstudiantesByFamilia(familia_id:string):Observable<any>{
    return this._http.get(this.url+"estudiantes/familia/"+familia_id);
  }

  //agregar un estudiante
  addEstudiante(estudiante:any):Observable<any>{
    let json = JSON.stringify(estudiante);
    let params = json;
 
    //Se esta usando apliacion json
    let headers = new HttpHeaders().set('Content-Type','application/json');
    
    return this._http.post(this.url+'estudiante',params,{headers:headers});
  }


}
