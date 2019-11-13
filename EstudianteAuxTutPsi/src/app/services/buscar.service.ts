import { Injectable } from '@angular/core';


import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable} from 'rxjs';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class BuscarService {
  public url:string;
  constructor(
    private _http:HttpClient
    ){
      this.url = GLOBAL.url;
    }

  //busqueda de familias
  buscarfamilia(data):Observable<any>{
    return this._http.get(this.url + "buscar/familia/"+data);
  }

  //busqueda de estudiantes
  buscarEstudiante(data):Observable<any>{
    return this._http.get(this.url + "buscar/estudiante/"+data);
  }

}
