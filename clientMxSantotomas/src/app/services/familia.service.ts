import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable, observable} from 'rxjs';
import { GLOBAL } from './global';


import {FamiliaMdl} from '../models/famlia-mdl';

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
  // nota: El parse a JSON es automatico
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


  
}
