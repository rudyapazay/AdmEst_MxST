import { Component, OnInit, ViewChild } from '@angular/core';
import { ResumenComponent } from '../resumen/resumen.component';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FamiliaService } from 'src/app/services/familia.service';

@Component({
  selector: 'app-reg-padre',
  templateUrl: './reg-padre.component.html',
  styleUrls: ['./reg-padre.component.css']
})
export class RegPadreComponent implements OnInit {

  public familia_id:string;
  public detalles : {
    padre:boolean,
    madre:boolean,
    apoderado:boolean
  };
  
  public ruta_registro:string;

  public padre : {
    dni:string,
    apellidos:string,
    nombre:string,
    celular:string,
    direccion:string,
    nota: string,
  }

  @ViewChild(ResumenComponent) resumen:ResumenComponent;

  constructor(
    private _route :ActivatedRoute,
    private _router:Router,
    private _familia_service:FamiliaService
  ){ 
    this.padre={dni:"",apellidos:"", nombre:"", celular:"", direccion:"",nota:""};

    this.detalles={padre:true, madre:true, apoderado:true};
  }

  ngOnInit() {
    this.resumen.titulo="padre"
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
          this.padre.direccion = result.familia.direccion;  
          //Verificacion de datos
          if(result.familia.madre) {
            this.detalles.madre  = false;
            this.ruta_registro = "madre";
          }

          if(result.familia.padre) {
            this.detalles.padre = false;
            this.ruta_registro = "padre";
          }
          if(result.familia.apoderado) this.detalles.apoderado =false;
        
          
          //De forma particular para el registro de padres
          this.detalles.padre = false;
          
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

  regPadre(){
    //console.log(this.familia_id);
    //console.log(this.padre);
    
    this._familia_service.addPadre(this.familia_id, this.padre).subscribe(
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
