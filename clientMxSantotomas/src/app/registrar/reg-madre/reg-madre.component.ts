import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute,Params, Router } from '@angular/router';

// componentes propios
import { ResumenComponent } from '../resumen/resumen.component';
import { FamiliaService } from 'src/app/services/familia.service';

@Component({
  selector: 'app-reg-madre',
  templateUrl: './reg-madre.component.html',
  styleUrls: ['./reg-madre.component.css']
})
export class RegMadreComponent implements OnInit {

  public familia_id:string;
  public detalles : {
    padre:boolean,
    madre:boolean,
    apoderado:boolean
  };
  
  public ruta_registro:string;

  public madre : {
    dni:string,
    apellidos:string,
    nombre:string,
    celular:string,
    direccion:string,
    nota: string,
  }

  @ViewChild(ResumenComponent, { static: true }) resumen:ResumenComponent;

  constructor(
    private _route :ActivatedRoute,
    private _router:Router,
    private _familia_service:FamiliaService
  ){ 
    this.madre={dni:"",apellidos:"", nombre:"", celular:"", direccion:"",nota:""};

    this.detalles={madre:true, padre:true, apoderado:true};
  }

  ngOnInit() {
    this.resumen.titulo="madre"
    this.getFamilia();
  
  }


  getFamilia(){
    this._route.params.forEach((params:Params)=>{
      let id = params['id'];
      this._familia_service.getFamilia(id).subscribe(
        result =>{
          // Enviando informacion al componente hijo
          this.resumen.familia = result.familia;
          this.familia_id = result.familia._id;
          this.madre.direccion = result.familia.direccion;  
          //Verificacion de datos
          if(result.familia.padre) {
            this.detalles.padre  = false;
            this.ruta_registro = "madre";
          }

          if(result.familia.madre) {
            this.detalles.madre = false;
            this.ruta_registro = "padre";
          }
          if(result.familia.apoderado) this.detalles.apoderado =false;
          
          //De forma particular para el registro de madres
          this.detalles.madre = false;
          
          if(!this.detalles.madre && !this.detalles.padre){
            this.ruta_registro = "estudiante";
          }
          //console.log(result.familia._id);
          
        },
        err=>{
          this._router.navigate(['/error/servidor']);
          console.log(err);
        }
      );
    });
  }

  regMadre(){
    //console.log(this.familia_id);
    //console.log(this.madre);
    
    this._familia_service.addMadre(this.familia_id, this.madre).subscribe(
      result=>{
        console.log(result);
        this._router.navigate(['/registrar/'+this.ruta_registro+'/'+this.familia_id]);
      },
      err=>{
        console.log(err);
      }

    );
  }

}
