import { Component, OnInit } from '@angular/core';

import { FamiliaService } from 'src/app/services/familia.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg-familia',
  templateUrl: './reg-familia.component.html',
  styleUrls: ['./reg-familia.component.css'],
  providers:[FamiliaService]
})
export class RegFamiliaComponent implements OnInit {
  public titulo:String;

  // para el proceso de registro no se usando el modelo
  public familia:{
    direccion:string,
    estado:string,
    observaciones:String,
    carpeta:string
  };

  constructor(
    private _familiaService:FamiliaService,
    private _router:Router
  ) { 
    this.titulo = "Registro de familia";
    this.familia={direccion:"",estado:"Activo",observaciones:"",carpeta:""};
  }

  ngOnInit() {
    
  }

  //procesando evento de submit del formulario
  onSubmit(){
    
    this._familiaService.addFamilia(this.familia).subscribe(
      result=>{
        if(!result.familia)
          console.log('error en el servidor');
        else{
          console.log(result.familia._id);
          this._router.navigate(['/registrar/padre/'+result.familia._id]);
        }
      },
      err=>{
        console.log(<any>err);
      }
      
    );
    //console.log(this.familia);
  }
}
