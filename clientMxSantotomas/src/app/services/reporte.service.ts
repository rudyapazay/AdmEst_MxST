import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  public url:string;

  constructor(
    private _http:HttpClient
  ) { 
    this.url = GLOBAL.url;
  }

  createPadronFramilias():Observable<any>{
    return this._http.get(this.url + 'reporte/generar/familias/padron');
  }
  getPadronFamilias(){
    return this.url + 'reporte/descargar/familias/padron';
  }

}
