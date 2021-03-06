import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable} from 'rxjs';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})

//@Injectable()


export class FamiliaService {
  public url:string;

  constructor(
    //cabecera http
    private _http:HttpClient
  ) { 
    this.url = GLOBAL.url;
  }

  ///mostrar familias, 
  // nota: El parseo a JSON es automatico
  getFamilias():Observable<any>{
    return this._http.get(this.url+"familias");
  
  }
  
  // agregando una nueva familia
  addFamilia(familia:any):Observable<any>{
    let json = JSON.stringify(familia);
    let params = json;
 
    //Se esta usando apliacion json
    let headers = new HttpHeaders().set('Content-Type','application/json');
    
    return this._http.post(this.url+'familia',params,{headers:headers});
  }

  // sacar una familia
  getFamilia(id):Observable<any>{
    return this._http.get(this.url+"familia/"+id);
  }

  addMadre(id, madre:any){
    let json = JSON.stringify(madre);
    let params = json;

    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.put(this.url+'familia/madre/'+id,params,{headers:headers});
    
  }

  addPadre(id, padre:any){
    let json = JSON.stringify(padre);
    let params = json;

    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.put(this.url+'familia/padre/'+id,params,{headers:headers});
    
  }

  addApoderado(id, padre:any):Observable<any>{
    let json = JSON.stringify(padre);
    let params = json;

    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.put(this.url+'familia/apoderado/'+id,params,{headers:headers});
    
  }
  
  updateFamilia(id, familia:any):Observable<any>{
    let json = JSON.stringify(familia);
    let params = json;
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url+'familia/'+id, params,{headers:headers});
  }

  addDocumentos(id:any, documentos:any):Observable<any>{
    let json = JSON.stringify(documentos);
    let params = json;
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url+'familia/documentos/'+id,params,{headers:headers});
  }

  //Eliminar una familia
  delFamilia(id:string):Observable<any>{
    return this._http.delete(this.url+'familia/'+id);
  }

  //eliminar padre
  deletePadre(id:string):Observable<any>{
    return this._http.delete(this.url+'familia/padre/'+id);
  }
  //eliminar madre
  deleteMadre(id:string):Observable<any>{
    return this._http.delete(this.url+'familia/madre/'+id);
  }
  //eliminar apoderado
  deleteApoderado(id:string):Observable<any>{
    return this._http.delete(this.url+'familia/apoderado/'+id);
  }
  deleteDocumentos(id:string):Observable<any>{
    return this._http.delete(this.url+'familia/documentos/'+id);
  }
}
