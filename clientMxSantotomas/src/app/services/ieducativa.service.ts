import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest  } from '@angular/common/http';
import { Observable} from 'rxjs';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class IeducativaService {
  public url:string;
  constructor(
    private _http:HttpClient
  ) { 
    this.url =GLOBAL.url;
  }

  //traer todas la ieducativas
  getIEducativas():Observable<any>{
    return this._http.get(this.url +"ieducativas");
  }

  //Traer ieducativa por id
  getIEducativa(id):Observable<any>{
    return this._http.get(this.url+"ieducativa/"+id);
  }

  //guardar una institucion educativa
  addIEducativa(ieducativa:any):Observable<any>{
    let json = JSON.stringify(ieducativa);
    let params =json;

    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+"ieducativa",params,{headers:headers});
  }

  //actualizar un institucion educativa
  editIEducativa(id, ieducativa:any):Observable<any>{
    let json = JSON.stringify(ieducativa);
    let params = json;
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url+"ieducativa/"+id, params,{headers:headers});
  }

  //eliminar una intitucion educativa
  deleteIEducativa(id):Observable<any>{
    return this._http.delete(this.url+"ieducativa/"+id);
  }

  //busqueda de colegio
  buscarIEducativa(data):Observable<any>{
    return this._http.get(this.url+"ieducativa/buscar/"+data);
  }
}
