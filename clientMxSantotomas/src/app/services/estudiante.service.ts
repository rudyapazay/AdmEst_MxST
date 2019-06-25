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

  //traer un solo estudiante por id
  getEstudiante(estudiante_id:string):Observable<any>{
    return this._http.get(this.url+"estudiante/"+estudiante_id);
  }

  //traer un solo estudinate con su QRCode
  getEstudianteQRCode(id:string):Observable<any>{
    return this._http.get(this.url+"estudiante/QRCode/"+id);
  }
  //agregar un estudiante
  addEstudiante(estudiante:any):Observable<any>{
    let json = JSON.stringify(estudiante);
    let params = json;
 
    //Se esta usando apliacion json
    let headers = new HttpHeaders().set('Content-Type','application/json');
    
    return this._http.post(this.url+'estudiante',params,{headers:headers});
  }

  //actualizar un estudiante
  updateEstudiante(estudiante_id:string,estudiante:any):Observable<any>{
    let json = JSON.stringify(estudiante);
    let params = json;
    //se esta usando aplicacion json
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url+'estudiante/update/'+estudiante_id,params,{headers:headers});
  }

  //mostrar estudiantes por grado y seccion
  getEstudianteGradoSeccion(grado:string, seccion:string):Observable<any>{
    return this._http.get(this.url+'estudiantes/'+grado+'/'+seccion);
  }

  // agregar documentos a estudiantes
  addDocumentos(id, documentos:any){
    let json = JSON.stringify(documentos);
    let params = json;

    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.put(this.url+'estudiante/documentos/'+id,params,{headers:headers});
    
  }

}
