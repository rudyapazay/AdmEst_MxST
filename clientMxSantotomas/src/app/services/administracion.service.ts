import { Injectable } from '@angular/core';

import {GLOBAL} from './global';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AdministracionService {
  private url:String;
  
  constructor(
    private _http : HttpClient
  ){ 
    this.url = GLOBAL.url;
  }

  serverMantenimientoBBDD():Observable<any>{
    return this._http.get(this.url + 'server/mantenimiento/bbdd');
  }

}
