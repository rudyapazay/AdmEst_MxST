import { Injectable } from '@angular/core';

import { HttpClient  } from '@angular/common/http';
import { Observable } from 'rxjs';

//import 'rxjs/add/operator/map';
//import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})

//@Injectable()


export class FamiliaService {
  
  constructor(
    //cabecera http
    private _http:HttpClient
  ) { 
    
  }

  ///mostrar familias, 
  // nota: El parse a JSON es automatico
  getFamilias(familiaId=null):Observable<any>{
    return this._http.get("http://localhost:3700/api/familias");
  
  }
  
  // guardar familia 



  
}
