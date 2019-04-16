import { Injectable } from '@angular/core';

import { HttpClient  } from '@angular/common/http';

//import 'rxjs/add/operator/map';
//import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})

//@Injectable()


export class FamiliaService {
  private _http:HttpClient;
  constructor(
    //error esta creacion del _http
    //private _http:HttpClient
  ) { 
    
  }

  ///mostrar familias
  getFamilias(familiaId=null){
    return this._http.get("http://localhost:3700/api/familias");
    //return this._http.get()
    //return '[{message:"probando"}]';
  }
  /**/
}
