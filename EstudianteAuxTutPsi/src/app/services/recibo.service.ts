import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReciboService {
  public url :string;

  constructor(
    private _http:HttpClient
  ){
    this.url = GLOBAL.url
  }

  addRecibo(familia:string, recibo:any):Observable<any>{

    let json = JSON.stringify(recibo);
    let params =json;

    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+"recibo/registrar/"+familia,params,{headers:headers});
  }

  getFamiliaFaltas():Observable<any>{
    return this._http.get(this.url+"recibo/faltas/familias");
  }

}
